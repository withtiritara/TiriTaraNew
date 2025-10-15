# Email Configuration Setup for Contact Form

This document provides step-by-step instructions to set up email functionality for the Tiri Tara contact form using EmailJS.

## Overview

The contact form now uses EmailJS to send emails directly from the frontend without requiring a backend server. When a user submits the B2B contact form, the data is automatically sent to your admin email address.

## Setup Instructions

### Step 1: Create EmailJS Account

1. Go to [EmailJS](https://www.emailjs.com/)
2. Sign up for a free account (allows up to 200 emails per month)
3. Verify your email address

### Step 2: Create Email Service

1. In your EmailJS dashboard, go to **Email Services**
2. Click **Add New Service**
3. Choose your email provider (Gmail, Outlook, etc.)
4. Follow the setup instructions for your provider
5. Note down the **Service ID** (you'll need this later)

### Step 3: Create Email Template

1. Go to **Email Templates** in your dashboard
2. Click **Create New Template**
3. Use this template content:

```
Subject: New B2B Trip Request - {{fullName}}

Hello Admin,

You have received a new B2B trip hosting request through the Tiri Tara website.

Client Details:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
👤 Name: {{fullName}}
📧 Email: {{email}}
📱 Phone: {{phone}}
🏢 Company: {{company}}
👥 Participants: {{participants}} people
📅 Preferred Dates: {{dates}}
🗺️  Destination: {{destination}}
✨ Vibe: {{vibe}}
📝 Notes: {{notes}}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Submission Date: {{submissionDate}}

Please reach out to {{fullName}} at {{email}} or {{phone}} to discuss their requirements.

Best regards,
Tiri Tara Website
```

4. Save the template and note down the **Template ID**

### Step 4: Get Public Key

1. Go to **Account** > **General** in your EmailJS dashboard
2. Find your **Public Key**
3. Copy this key (you'll need it for configuration)

### Step 5: Configure the Website

1. Open `src/script.js` in your code editor
2. Find the `EMAILJS_CONFIG` object at the top of the file
3. Replace the placeholder values with your actual EmailJS credentials:

```javascript
const EMAILJS_CONFIG = {
  serviceId: "your_actual_service_id", // From Step 2
  templateId: "your_actual_template_id", // From Step 3
  publicKey: "your_actual_public_key", // From Step 4
};
```

### Step 6: Set Email Destination

By default, emails will be sent to the email address configured in your EmailJS service. To specify a different admin email:

1. In your EmailJS template (Step 3), you can add a "To Email" field
2. Set it to your desired admin email address
3. Or configure this in your EmailJS service settings

## Testing

1. Save your changes to `script.js`
2. Open your website
3. Fill out the contact form with test data
4. Submit the form
5. Check your admin email inbox for the message

## Troubleshooting

### Common Issues:

1. **"EmailJS not configured" in console**

   - Make sure you've replaced all placeholder values in `EMAILJS_CONFIG`
   - Check that your credentials are correct

2. **Emails not being received**

   - Check your spam folder
   - Verify the email service is properly connected in EmailJS dashboard
   - Make sure your EmailJS account is active and within usage limits

3. **"Error sending email" alert**
   - Check browser console for detailed error messages
   - Verify your EmailJS template exists and is published
   - Ensure your service ID, template ID, and public key are correct

### Rate Limits

- EmailJS free plan allows 200 emails/month
- Consider upgrading if you expect higher volume
- The form includes rate limiting to prevent spam

## Security Notes

- The public key is safe to use in frontend code
- Never expose your private key in client-side code
- Consider adding reCAPTCHA for additional spam protection
- EmailJS handles email delivery securely

## Additional Features

The current implementation includes:

- ✅ Form validation
- ✅ Loading states during submission
- ✅ Success/error messaging
- ✅ Prevents duplicate submissions
- ✅ Formatted email template with all form data
- ✅ Timestamp of submission

For questions or issues, refer to the [EmailJS documentation](https://www.emailjs.com/docs/).
