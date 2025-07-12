import type { APIRoute } from 'astro';
import { google } from 'googleapis';

export const prerender = false;

export const GET: APIRoute = async () => {
  try {
    console.log('=== Testing Google Sheets Connection ===');
    
    // Check environment variables
    const envVars = {
      GOOGLE_SHEET_ID: !!process.env.GOOGLE_SHEET_ID,
      GOOGLE_PROJECT_ID: !!process.env.GOOGLE_PROJECT_ID,
      GOOGLE_CLIENT_EMAIL: !!process.env.GOOGLE_CLIENT_EMAIL,
      GOOGLE_PRIVATE_KEY: !!process.env.GOOGLE_PRIVATE_KEY
    };
    
    console.log('Environment variables:', envVars);
    
    if (!process.env.GOOGLE_SHEET_ID) {
      return new Response(JSON.stringify({
        success: false,
        error: 'Environment variables not configured',
        envVars
      }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    // Test authentication
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
    
    const auth = new google.auth.GoogleAuth({
      credentials,
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });
    
    console.log('Testing authentication...');
    const authClient = await auth.getClient();
    console.log('Authentication successful');
    
    const sheets = google.sheets({ version: 'v4', auth: authClient });
    
    // Test sheet access
    console.log('Testing sheet access...');
    const sheetInfo = await sheets.spreadsheets.get({
      spreadsheetId: process.env.GOOGLE_SHEET_ID
    });
    
    console.log('Sheet access successful');
    
    return new Response(JSON.stringify({
      success: true,
      message: 'Google Sheets connection successful',
      sheetTitle: sheetInfo.data.properties?.title,
      envVars
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
    
  } catch (error) {
    console.error('Google Sheets test error:', error);
    
    return new Response(JSON.stringify({
      success: false,
      error: 'Google Sheets connection failed',
      details: error instanceof Error ? error.message : 'Unknown error'
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};