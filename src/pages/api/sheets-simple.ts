import type { APIRoute } from 'astro';

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  try {
    // Log the request
    console.log('=== Simple Sheets API Called ===');
    
    const body = await request.json();
    console.log('Request body:', body);
    
    // Check environment variables
    const envCheck = {
      GOOGLE_SHEET_ID: !!process.env.GOOGLE_SHEET_ID,
      GOOGLE_PROJECT_ID: !!process.env.GOOGLE_PROJECT_ID,
      GOOGLE_CLIENT_EMAIL: !!process.env.GOOGLE_CLIENT_EMAIL,
      GOOGLE_PRIVATE_KEY: !!process.env.GOOGLE_PRIVATE_KEY
    };
    
    console.log('Environment variables:', envCheck);
    
    if (!process.env.GOOGLE_SHEET_ID) {
      return new Response(JSON.stringify({
        success: false,
        error: 'Environment variables not configured',
        envCheck
      }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    // Try to import googleapis
    console.log('Attempting to import googleapis...');
    const { google } = await import('googleapis');
    console.log('googleapis imported successfully');
    
    // Test authentication setup
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
    
    console.log('Setting up Google Auth...');
    const auth = new google.auth.GoogleAuth({
      credentials,
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });
    
    const authClient = await auth.getClient();
    const sheets = google.sheets({ version: 'v4', auth: authClient });
    
    console.log('Google Sheets client created successfully');
    
    // Prepare data
    const timestamp = new Date().toISOString();
    const rowData = [
      timestamp,
      body.fullName || '',
      body.email || '',
      body.phone || '',
      body.property || '',
      body.residency || '',
      body.features || '',
      body.source || 'simple_api',
      body.url || '',
      body.userAgent || '',
      'New'
    ];
    
    console.log('Attempting to append data:', rowData);
    
    // Append to sheet
    const response = await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      range: 'Lead Submissions!A:K',
      valueInputOption: 'RAW',
      insertDataOption: 'INSERT_ROWS',
      requestBody: {
        values: [rowData],
      },
    });
    
    console.log('Sheet append successful:', response.data);
    console.log('=== End Simple Sheets API ===');
    
    return new Response(JSON.stringify({
      success: true,
      message: 'Data added to sheet successfully',
      rowsAdded: response.data.updates?.updatedRows || 0,
      envCheck
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
    
  } catch (error) {
    console.error('Simple Sheets API error:', error);
    
    return new Response(JSON.stringify({
      success: false,
      error: 'Failed to process request',
      details: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};

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