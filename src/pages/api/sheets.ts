import type { APIRoute } from 'astro';
import { google } from 'googleapis';

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
  const pakistanTime = new Date(date.getTime() + (5 * 60 * 60 * 1000));
  return pakistanTime.toLocaleString('en-US', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true
  });
}

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    
    // Enhanced debugging for production
    console.log('=== Google Sheets API Debug ===');
    console.log('Environment variables:', {
      GOOGLE_SHEET_ID: !!process.env.GOOGLE_SHEET_ID,
      GOOGLE_PROJECT_ID: !!process.env.GOOGLE_PROJECT_ID,
      GOOGLE_CLIENT_EMAIL: !!process.env.GOOGLE_CLIENT_EMAIL,
      GOOGLE_PRIVATE_KEY: !!process.env.GOOGLE_PRIVATE_KEY,
      sheetIdValue: process.env.GOOGLE_SHEET_ID ? process.env.GOOGLE_SHEET_ID.substring(0, 10) + '...' : 'missing'
    });
    console.log('Request body:', body);
    
    // Check if environment variables are loaded
    if (!process.env.GOOGLE_SHEET_ID) {
      console.error('Environment variables not loaded');
      return new Response(JSON.stringify({ 
        success: false, 
        error: 'Environment variables not configured. Please check .env file.' 
      }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
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
            error: 'Invalid email format' 
          }),
          { 
            status: 400,
            headers: { 'Content-Type': 'application/json' }
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
      body.residency || '',
      body.features || '',
      body.source || 'website_lead_form',
      body.url || '',
      body.userAgent || '',
      'New' // Status column
    ];

    // Check if sheet exists, create if it doesn't
    console.log('Checking if sheet exists...');
    try {
      await sheets.spreadsheets.values.get({
        spreadsheetId: SHEET_ID,
        range: `${SHEET_NAME}!A1:A1`,
      });
      console.log('Sheet exists, proceeding with data append');
    } catch (error) {
      console.log('Sheet does not exist, creating new sheet...');
      // Sheet doesn't exist, create it with headers
      const headers = [
        'Timestamp',
        'Full Name',
        'Email',
        'Phone',
        'Property Interest',
        'Residency',
        'Features',
        'Source',
        'URL',
        'User Agent',
        'Status'
      ];

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

      // Add headers
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
        rowsUpdated: response.data.updates?.updatedRows || 0
      }),
      { 
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      }
    );

  } catch (error) {
    console.error('Google Sheets API error:', error);
    
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: 'Failed to submit lead. Please try again later.',
        details: error instanceof Error ? error.message : 'Unknown error'
      }),
      { 
        status: 500,
        headers: { 'Content-Type': 'application/json' }
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