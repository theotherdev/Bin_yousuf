import type { APIRoute } from 'astro';

export const prerender = false;

export const GET: APIRoute = async () => {
  try {
    console.log('Testing form submission to sheets API...');
    
    // Simulate form data
    const testData = {
      fullName: 'Test User',
      email: 'test@example.com',
      phone: '+92 300 1234567',
      property: 'The Views',
      source: 'test_endpoint',
      url: 'https://www.binyousufgroup.com/test',
      userAgent: 'Test Agent'
    };
    
    // Test the Google Sheets functionality directly (without HTTP call)
    console.log('Testing Google Sheets functionality directly...');
    
    // Import and test the sheets functionality directly
    const { google } = await import('googleapis');
    
    // Test credentials
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
    
    const authClient = await auth.getClient();
    const sheets = google.sheets({ version: 'v4', auth: authClient });
    
    // Test actual data submission
    const timestamp = new Date().toISOString();
    const rowData = [
      timestamp,
      testData.fullName,
      testData.email,
      testData.phone,
      testData.property,
      '', // residency
      '', // features
      testData.source,
      testData.url,
      testData.userAgent,
      'New'
    ];
    
    console.log('Attempting to append data to sheet:', rowData);
    
    const response = await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      range: 'Lead Submissions!A:K',
      valueInputOption: 'RAW',
      insertDataOption: 'INSERT_ROWS',
      requestBody: {
        values: [rowData],
      },
    });
    
    console.log('Sheet append response:', response.data);
    
    return new Response(JSON.stringify({
      success: true,
      message: 'Direct Google Sheets test completed successfully',
      testData,
      sheetsResponse: response.data,
      rowsAdded: response.data.updates?.updatedRows || 0
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
    
  } catch (error) {
    console.error('Test form submission error:', error);
    
    return new Response(JSON.stringify({
      success: false,
      error: 'Test form submission failed',
      details: error instanceof Error ? error.message : 'Unknown error'
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};