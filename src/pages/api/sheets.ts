import type { APIRoute } from 'astro';
import { config } from 'dotenv';

// Load environment variables
config();

// Dynamic import at module level to handle CommonJS/ES module compatibility
const googleapis = await import('googleapis');
const google = googleapis.google;

export const prerender = false;

// Google Sheets configuration
const SHEET_ID = process.env.GOOGLE_SHEET_ID || '';
const SHEET_NAME = 'Lead Submissions';
const SCOPES = ['https://www.googleapis.com/auth/spreadsheets'];

// Service account credentials
const credentials = {
  type: 'service_account',
  project_id: process.env.GOOGLE_PROJECT_ID,
  private_key_id: process.env.GOOGLE_PRIVATE_KEY_ID,
  private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
  client_email: process.env.GOOGLE_CLIENT_EMAIL,
  client_id: process.env.GOOGLE_CLIENT_ID,
  auth_uri: 'https://accounts.google.com/o/oauth2/auth',
  token_uri: 'https://oauth2.googleapis.com/token',
  auth_provider_x509_cert_url: 'https://www.googleapis.com/oauth2/v1/certs',
  client_x509_cert_url: process.env.GOOGLE_CLIENT_X509_CERT_URL,
};

async function getGoogleSheetsInstance() {
  try {
    const auth = new google.auth.GoogleAuth({
      credentials,
      scopes: SCOPES,
    });

    const authClient = await auth.getClient();
    const sheets = google.sheets({ version: 'v4', auth: authClient });

    return sheets;
  } catch (error) {
    console.error('Failed to initialize Google Sheets:', error);
    throw new Error('Google Sheets authentication failed');
  }
}

function formatTimestamp(date: Date): string {
  // Format for Pakistan timezone (UTC+5)
  const pakistanTime = new Date(date.getTime() + 5 * 60 * 60 * 1000);
  return pakistanTime.toLocaleString('en-US', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true,
  });
}

export const POST: APIRoute = async ({ request }) => {
  console.log('=== Google Sheets API Starting ===');
  
  try {
    const body = await request.json();
    console.log('Request body received:', body);

    // Check environment variables
    console.log('Environment check:', {
      GOOGLE_SHEET_ID: !!process.env.GOOGLE_SHEET_ID,
      GOOGLE_PROJECT_ID: !!process.env.GOOGLE_PROJECT_ID,
      GOOGLE_CLIENT_EMAIL: !!process.env.GOOGLE_CLIENT_EMAIL,
      GOOGLE_PRIVATE_KEY: !!process.env.GOOGLE_PRIVATE_KEY,
    });

    // Check if environment variables are loaded
    if (!process.env.GOOGLE_SHEET_ID) {
      console.error('Environment variables not loaded');
      return new Response(
        JSON.stringify({
          success: false,
          error:
            'Environment variables not configured. Please check .env file.',
        }),
        {
          status: 500,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    // Extract fields (all optional)
    const { fullName, email, phone, property } = body;

    // Only validate email format if email is provided
    if (email && email.trim()) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return new Response(
          JSON.stringify({
            success: false,
            error: 'Invalid email format',
          }),
          {
            status: 400,
            headers: { 'Content-Type': 'application/json' },
          }
        );
      }
    }

    // Get Google Sheets instance
    console.log('Attempting to get Google Sheets instance...');
    const sheets = await getGoogleSheetsInstance();
    console.log('Google Sheets instance created successfully');

    // Prepare data row (handle empty/undefined values)
    const timestamp = formatTimestamp(new Date());
    const rowData = [
      timestamp,
      fullName || '',
      email || '',
      phone || '',
      property || '',
      body.howHeard || '',
      body.message || '',
      body.source || 'website_lead_form',
      body.url || '',
      body.userAgent || '',
      'New', // Status column
    ];

    // Check if sheet exists and has headers, create/recreate if needed
    console.log('Checking if sheet exists and has proper headers...');
    let needsHeaders = false;

    try {
      const headerCheck = await sheets.spreadsheets.values.get({
        spreadsheetId: SHEET_ID,
        range: `${SHEET_NAME}!A1:K1`,
      });

      // Check if headers exist and are correct
      const existingHeaders = headerCheck.data.values?.[0] || [];
      const expectedHeaders = [
        'Timestamp',
        'Full Name',
        'Email',
        'Phone',
        'Property Interest',
        'How Heard',
        'Message',
        'Source',
        'URL',
        'User Agent',
        'Status',
      ];

      if (
        existingHeaders.length === 0 ||
        existingHeaders.join(',') !== expectedHeaders.join(',')
      ) {
        console.log('Headers missing or incorrect, will recreate...');
        needsHeaders = true;
      } else {
        console.log(
          'Sheet exists with correct headers, proceeding with data append'
        );
      }
    } catch {
      console.log('Sheet does not exist, creating new sheet...');
      needsHeaders = true;
    }

    if (needsHeaders) {
      console.log('Creating/updating sheet headers...');
      const headers = [
        'Timestamp',
        'Full Name',
        'Email',
        'Phone',
        'Property Interest',
        'How Heard',
        'Message',
        'Source',
        'URL',
        'User Agent',
        'Status',
      ];

      // Try to create sheet if it doesn't exist, otherwise just update headers
      try {
        await sheets.spreadsheets.batchUpdate({
          spreadsheetId: SHEET_ID,
          requestBody: {
            requests: [
              {
                addSheet: {
                  properties: {
                    title: SHEET_NAME,
                  },
                },
              },
            ],
          },
        });
      } catch {
        // Sheet already exists, that's fine
        console.log('Sheet already exists, updating headers only');
      }

      // Add/update headers
      await sheets.spreadsheets.values.update({
        spreadsheetId: SHEET_ID,
        range: `${SHEET_NAME}!A1:K1`,
        valueInputOption: 'RAW',
        requestBody: {
          values: [headers],
        },
      });
    }

    // Append the new data
    console.log('Appending data to sheet:', rowData);
    const response = await sheets.spreadsheets.values.append({
      spreadsheetId: SHEET_ID,
      range: `${SHEET_NAME}!A:K`,
      valueInputOption: 'RAW',
      insertDataOption: 'INSERT_ROWS',
      requestBody: {
        values: [rowData],
      },
    });

    console.log('Successfully added row to Google Sheets:', response.data);
    console.log('=== End Debug ===');

    // Send email notification (optional)
    // You can add email notification logic here using services like SendGrid, Nodemailer, etc.

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Lead submitted successfully',
        rowsUpdated: response.data.updates?.updatedRows || 0,
      }),
      {
        status: 200,
        headers: { 
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      }
    );
  } catch (error) {
    console.error('=== Google Sheets API Error ===');
    console.error('Error details:', error);
    console.error('Error message:', error instanceof Error ? error.message : 'Unknown error');
    console.error('Error stack:', error instanceof Error ? error.stack : 'No stack trace');

    return new Response(
      JSON.stringify({
        success: false,
        error: 'Failed to submit lead. Please try again later.',
        details: error instanceof Error ? error.message : 'Unknown error',
      }),
      {
        status: 500,
        headers: { 
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      }
    );
  }
};

// Handle OPTIONS request for CORS
export const OPTIONS: APIRoute = async () => {
  return new Response(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
};
