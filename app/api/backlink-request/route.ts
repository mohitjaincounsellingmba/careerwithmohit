import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const ADMIN_EMAIL = 'advik.mohit.jain@gmail.com';
const RESEND_API_KEY = process.env.RESEND_API_KEY;

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const { name, email, websiteUrl, collaborationType, message } = data;

    if (!name || !email || !websiteUrl) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    let emailSent = false;
    if (RESEND_API_KEY) {
      try {
        const resend = new Resend(RESEND_API_KEY);
        await resend.emails.send({
          from: 'Backlink Bot <notifications@resend.dev>',
          to: [ADMIN_EMAIL],
          subject: `🔗 Backlink Request: ${websiteUrl}`,
          html: `
            <div style="font-family: sans-serif; padding: 20px; border: 10px solid #000; border-radius: 10px;">
              <h2 style="text-transform: uppercase; font-weight: 900; margin-bottom: 20px;">New Collaboration Request</h2>
              <p><strong>Name:</strong> ${name}</p>
              <p><strong>Email:</strong> ${email}</p>
              <p><strong>Website:</strong> <a href="${websiteUrl}">${websiteUrl}</a></p>
              <p><strong>Type:</strong> ${collaborationType}</p>
              <hr style="border: 1px solid #eee; margin: 20px 0;" />
              <p><strong>Proposal:</strong></p>
              <p style="background: #f9f9f9; padding: 15px; border-radius: 5px;">${message}</p>
            </div>
          `
        });
        emailSent = true;
      } catch (err: any) {
        console.error(`Backlink API Email Error: ${err.message}`);
      }
    }

    return NextResponse.json({
      success: true,
      email: emailSent ? 'sent' : 'missed (Check RESEND_API_KEY)'
    });
  } catch (error: any) {
    console.error('Backlink API Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
