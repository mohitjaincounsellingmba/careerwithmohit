import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { phone } = await request.json();

    if (!phone) {
      return NextResponse.json({ success: false, error: 'Phone number is required' }, { status: 400 });
    }

    const cleanPhone = String(phone).replace(/\D/g, '').slice(-10);
    if (cleanPhone.length !== 10) {
      return NextResponse.json({ success: false, error: 'Valid 10-digit mobile number required' }, { status: 400 });
    }

    // Generate 4-digit numeric OTP
    const generatedOtp = Math.floor(1000 + Math.random() * 9000).toString();

    // Check for Configured SMS Gateway API Key in .env
    const twoFactorApiKey = process.env.TWOFACTOR_API_KEY;
    const fast2SmsApiKey = process.env.FAST2SMS_API_KEY;

    let smsSent = false;
    let providerName = 'Mock / Simulation';

    // Option A: 2Factor.in SMS API (Instant Indian SMS)
    if (twoFactorApiKey) {
      try {
        const response = await fetch(`https://2factor.in/v1/API/V1/${twoFactorApiKey}/SMS/+91${cleanPhone}/${generatedOtp}/OTP1`, {
          method: 'GET'
        });
        const data = await response.json();
        if (data.Status === 'Success') {
          smsSent = true;
          providerName = '2Factor.in';
        }
      } catch (err) {
        console.error('[SMS 2Factor Error]', err);
      }
    }
    // Option B: Fast2SMS API
    else if (fast2SmsApiKey) {
      try {
        const response = await fetch('https://www.fast2sms.com/dev/bulkV2', {
          method: 'POST',
          headers: {
            'authorization': fast2SmsApiKey,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            route: 'otp',
            variables_values: generatedOtp,
            numbers: cleanPhone
          })
        });
        const data = await response.json();
        if (data.return === true) {
          smsSent = true;
          providerName = 'Fast2SMS';
        }
      } catch (err) {
        console.error('[SMS Fast2SMS Error]', err);
      }
    }

    console.log(`\n========================================`);
    console.log(`[SMS OTP TRIGGER] Target Phone: +91 ${cleanPhone}`);
    console.log(`[SMS OTP CODE]: ${generatedOtp}`);
    console.log(`[GATEWAY STATUS]: ${smsSent ? 'Delivered via ' + providerName : 'Simulated (To deliver real SMS, set TWOFACTOR_API_KEY or FAST2SMS_API_KEY in .env.local)'}`);
    console.log(`========================================\n`);

    return NextResponse.json({
      success: true,
      deliveredLive: smsSent,
      provider: providerName,
      otp: generatedOtp,
      message: smsSent ? 'OTP SMS delivered to your phone' : 'Mock OTP generated (SMS gateway not configured)'
    });
  } catch (error: unknown) {
    const errorMsg = error instanceof Error ? error.message : 'Internal server error';
    return NextResponse.json({ success: false, error: errorMsg }, { status: 500 });
  }
}
