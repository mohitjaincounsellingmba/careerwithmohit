import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { method, value } = await req.json();

    if (!method || !value) {
      return NextResponse.json(
        { error: 'Method and value are required.' },
        { status: 400 }
      );
    }

    if (method === 'email') {
      // 1. MAILCHIMP INTEGRATION
      const MAILCHIMP_API_KEY = process.env.MAILCHIMP_API_KEY;
      const MAILCHIMP_AUDIENCE_ID = process.env.MAILCHIMP_AUDIENCE_ID;
      const MAILCHIMP_API_SERVER = process.env.MAILCHIMP_API_SERVER; // e.g., 'us21'

      if (!MAILCHIMP_API_KEY || !MAILCHIMP_AUDIENCE_ID || !MAILCHIMP_API_SERVER) {
        // If keys aren't set in production yet, we simulate success for demo
        console.warn('Mailchimp environment variables are missing. Simulating success.');
        return NextResponse.json({ success: true, message: 'Simulated email subscription' });
      }

      const url = `https://${MAILCHIMP_API_SERVER}.api.mailchimp.com/3.0/lists/${MAILCHIMP_AUDIENCE_ID}/members`;
      const data = {
        email_address: value,
        status: 'subscribed',
      };

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          Authorization: `apikey ${MAILCHIMP_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        // Mailchimp returns 400 if user is already subscribed, which isn't a hard failure for us
        if (errorData.title === 'Member Exists') {
           return NextResponse.json({ success: true, message: 'Already subscribed' });
        }
        throw new Error(errorData.detail || 'Error subscribing to Mailchimp.');
      }

      return NextResponse.json({ success: true, message: 'Successfully subscribed to Mailchimp' });
    } else if (method === 'whatsapp') {
      // 2. ZAPIER INTEGRATION
      const ZAPIER_WEBHOOK_URL = process.env.ZAPIER_WEBHOOK_URL;

      if (!ZAPIER_WEBHOOK_URL) {
        console.warn('Zapier Webhook URL is missing. Simulating success.');
        return NextResponse.json({ success: true, message: 'Simulated WhatsApp subscription' });
      }

      const response = await fetch(ZAPIER_WEBHOOK_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ phone: value, source: 'Blog Subscribe Form' }),
      });

      if (!response.ok) {
        throw new Error('Error sending data to Zapier webhook.');
      }

      return NextResponse.json({ success: true, message: 'Successfully sent to Zapier' });
    }

    return NextResponse.json({ error: 'Invalid method.' }, { status: 400 });
  } catch (error: any) {
    console.error('Subscription error:', error);
    return NextResponse.json(
      { error: error.message || 'An error occurred during subscription.' },
      { status: 500 }
    );
  }
}
