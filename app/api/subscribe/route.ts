import { NextResponse } from 'next/server';
import { Resend } from 'resend';

export async function POST(req: Request) {
  try {
    const { method, value } = await req.json();

    if (!method || !value) {
      return NextResponse.json(
        { error: 'Method and value are required.' },
        { status: 400 }
      );
    }

    const RESEND_API_KEY = process.env.RESEND_API_KEY;

    if (!RESEND_API_KEY) {
      console.warn('RESEND_API_KEY is missing. Simulating success.');
      return NextResponse.json({ success: true, message: 'Simulated subscription' });
    }

    const resend = new Resend(RESEND_API_KEY);

    let subject = '';
    let htmlContent = '';

    if (method === 'email') {
      subject = 'New Blog Follower (Email)! 🎉';
      htmlContent = `
        <h2>You have a new blog follower!</h2>
        <p>Someone just subscribed to your blog via Email.</p>
        <p><strong>Email Address:</strong> ${value}</p>
        <br/>
        <p><em>Career with Mohit Automated Notification</em></p>
      `;
    } else if (method === 'whatsapp') {
      subject = 'New Blog Follower (WhatsApp)! 📱';
      htmlContent = `
        <h2>You have a new blog follower!</h2>
        <p>Someone just subscribed to your blog via WhatsApp.</p>
        <p><strong>WhatsApp Number:</strong> ${value}</p>
        <br/>
        <p><em>Career with Mohit Automated Notification</em></p>
      `;
    } else {
      return NextResponse.json({ error: 'Invalid method.' }, { status: 400 });
    }

    // Send the email to the admin
    const { data, error } = await resend.emails.send({
      from: 'CareerWithMohit <notifications@resend.dev>', // You can change this if you verify a custom domain on Resend
      to: ['advik.mohit.jain@gmail.com'],
      subject: subject,
      html: htmlContent,
    });

    // Send to Activepieces Webhook for Google Sheets tracking
    const ACTIVEPIECES_WEBHOOK = 'https://cloud.activepieces.com/api/v1/webhooks/h3HoLiVtxuydbGOfr11F3';
    try {
      await fetch(ACTIVEPIECES_WEBHOOK, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: Math.random().toString(36).substr(2, 9),
          name: 'Subscriber',
          number: method === 'whatsapp' ? value : '',
          email: method === 'email' ? value : '',
          source: `Newsletter (${method})`,
          timestamp: new Date().toISOString()
        })
      });
    } catch (webhookErr) {
      console.error('Activepieces Subscription Webhook Error:', webhookErr);
    }

    if (error) {
      console.error('Resend Error:', error);
      throw new Error('Failed to send email notification.');
    }

    return NextResponse.json({ success: true, message: 'Successfully subscribed' });

  } catch (error: any) {
    console.error('Subscription error:', error);
    return NextResponse.json(
      { error: error.message || 'An error occurred during subscription.' },
      { status: 500 }
    );
  }
}

