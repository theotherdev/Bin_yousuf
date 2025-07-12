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
    
    // Call our own sheets API
    const sheetsUrl = `${process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:4321'}/api/sheets`;
    console.log('Calling sheets API at:', sheetsUrl);
    
    const response = await fetch(sheetsUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(testData)
    });
    
    const result = await response.json();
    console.log('Sheets API response:', result);
    
    return new Response(JSON.stringify({
      success: true,
      message: 'Test form submission completed',
      testData,
      sheetsResponse: result,
      sheetsUrl
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