# Google Sheets Lead Form Integration Setup

This guide will help you set up Google Sheets integration for the lead generation form.

## Prerequisites

- Google Cloud Console account
- Google Sheets access
- Environment variables setup capability

## Step-by-Step Setup

### 1. Create Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Click "New Project" or select an existing project
3. Note your project ID for later use

### 2. Enable Google Sheets API

1. In the Google Cloud Console, go to "APIs & Services" > "Library"
2. Search for "Google Sheets API"
3. Click on it and press "Enable"

### 3. Create Service Account

1. Go to "APIs & Services" > "Credentials"
2. Click "Create Credentials" > "Service Account"
3. Fill in service account details:
   - Name: `lead-form-sheets-access`
   - Description: `Service account for lead form Google Sheets integration`
4. Click "Create and Continue"
5. Skip role assignment for now (click "Continue")
6. Click "Done"

### 4. Generate Service Account Key

1. Click on the newly created service account
2. Go to the "Keys" tab
3. Click "Add Key" > "Create New Key"
4. Select "JSON" format
5. Click "Create" - this downloads your key file
6. **Important**: Keep this file secure and never commit it to version control

### 5. Create Google Sheet

1. Go to [Google Sheets](https://sheets.google.com)
2. Create a new spreadsheet
3. Name it something like "Lead Form Submissions"
4. Copy the Sheet ID from the URL (the long string between `/d/` and `/edit`)
   - Example: `https://docs.google.com/spreadsheets/d/SHEET_ID_HERE/edit`

### 6. Share Sheet with Service Account

1. In your Google Sheet, click "Share"
2. Add the service account email (found in your JSON key file)
3. Give it "Editor" permissions
4. Uncheck "Notify people" 
5. Click "Share"

### 7. Set Environment Variables

Create a `.env` file in your project root with these variables:

```env
# From your JSON key file
GOOGLE_SHEET_ID=your_sheet_id_from_step_5
GOOGLE_PROJECT_ID=your_project_id
GOOGLE_PRIVATE_KEY_ID=your_private_key_id
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nyour_private_key_here\n-----END PRIVATE KEY-----\n"
GOOGLE_CLIENT_EMAIL=your_service_account_email@project.iam.gserviceaccount.com
GOOGLE_CLIENT_ID=your_client_id
GOOGLE_CLIENT_X509_CERT_URL=your_cert_url
```

### 8. Test the Integration

1. Start your development server: `npm run dev`
2. Navigate to a project page with the contact form
3. Fill out and submit the form
4. Check your Google Sheet for the new submission

## Troubleshooting

### Common Issues

1. **"Sheets API has not been used" error**
   - Make sure you enabled the Google Sheets API in step 2

2. **"Forbidden" or "Access denied" error**
   - Verify the service account email is shared with the Google Sheet
   - Check that environment variables are set correctly

3. **"Sheet not found" error**
   - Verify the GOOGLE_SHEET_ID is correct
   - Make sure the sheet is shared with the service account

4. **Private key format issues**
   - Ensure the private key includes the full header and footer
   - Make sure newlines are properly escaped as `\n`

### Environment Variable Format

The private key should be formatted exactly like this:
```
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQC...\n-----END PRIVATE KEY-----\n"
```

## Sheet Structure

The form automatically creates a sheet with these columns:
- Timestamp
- Full Name
- Email
- Phone
- Property Interest
- Residency
- Features
- Source
- URL
- User Agent
- Status

## Security Notes

- Never commit your `.env` file or service account JSON to version control
- Add `.env` to your `.gitignore` file
- Use environment variables in production (Vercel, Netlify, etc.)
- Regularly rotate your service account keys
- Monitor access logs in Google Cloud Console

## Production Deployment

For production deployments:

1. **Vercel**: Add environment variables in the Vercel dashboard
2. **Netlify**: Add environment variables in the Netlify site settings
3. **Other platforms**: Follow their environment variable setup guide

Make sure all the environment variables from your `.env` file are properly set in your production environment.