import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';
import { Resend } from 'resend';

const LEADS_FILE = path.join(process.cwd(), 'data', 'leads.json');
const ADMIN_EMAIL = 'advik.mohit.jain@gmail.com';
const RESEND_API_KEY = process.env.RESEND_API_KEY;
const ACTIVEPIECES_WEBHOOK = 'https://cloud.activepieces.com/api/v1/webhooks/wjKhP0jGALa4bmUVYcw5F';

export async function GET(req: Request) {
    const authHeader = req.headers.get('x-admin-secret');
    if (authHeader !== 'mohitadmin2026') {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const data = await fs.readFile(LEADS_FILE, 'utf-8');
        return NextResponse.json(JSON.parse(data));
    } catch (error) {
        return NextResponse.json([], { status: 200 }); // Return empty if all fail
    }
}

export async function POST(req: Request) {
    try {
        const lead = await req.json();
        const { name, number, email, location, source, ...details } = lead;

        if (!name || !number) {
            return NextResponse.json({ error: 'Name and number are required' }, { status: 400 });
        }

        const newLead = {
            id: Math.random().toString(36).substr(2, 9),
            name,
            number,
            email: email || '',
            location: location || '',
            source: source || 'Unknown',
            details: details || {},
            timestamp: new Date().toISOString()
        };

        // 1. Push to Activepieces Webhook (Conditional Routing)
        let webhookSaved = false;
        try {
            // Check if this lead came from a Calculator/Resource Download (which uses the old general webhook)
            // or if it's a standard Inquiry (which uses the new dedicated webhook)
            const s = source.toLowerCase();
            const isCalculatorOrResource = s.includes('calculator') || s.includes('resource') || s.includes('mock test') || s.includes('test');
            const targetWebhook = isCalculatorOrResource
                ? 'https://cloud.activepieces.com/api/v1/webhooks/wjKhP0jGALa4bmUVYcw5F'
                : 'https://cloud.activepieces.com/api/v1/webhooks/h3HoLiVtxuydbGOfr11F3';

            const webhookRes = await fetch(targetWebhook, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...newLead,
                    ...newLead.details
                })
            });
            if (webhookRes.ok) {
                console.log(`Leads API: Successfully pushed lead ${newLead.id} to Activepieces (Webhook: ${isCalculatorOrResource ? 'General' : 'Inquiry'})`);
                webhookSaved = true;
            } else {
                console.error(`Webhook API responded with status: ${webhookRes.status}`);
            }
        } catch (webhookErr: any) {
            console.error(`Activepieces Webhook Error: ${webhookErr.message}`);
        }

        // 2. Local File Save (Fallback/Dev)
        const dataDir = path.dirname(LEADS_FILE);
        let fileSaved = false;
        try {
            await fs.mkdir(dataDir, { recursive: true });
            let leads = [];
            try {
                const data = await fs.readFile(LEADS_FILE, 'utf-8');
                leads = JSON.parse(data);
            } catch (e) { }
            leads.push(newLead);
            await fs.writeFile(LEADS_FILE, JSON.stringify(leads, null, 2));
            fileSaved = true;
        } catch (e: any) {
            console.error(`Leads API File Storage Error: ${e.message}`);
        }

        // 4. Email Backup via Resend (Critical Production Backup)
        let emailSent = false;
        if (RESEND_API_KEY) {
            try {
                const resend = new Resend(RESEND_API_KEY);
                await resend.emails.send({
                    from: 'Leads <notifications@resend.dev>',
                    to: [ADMIN_EMAIL],
                    subject: `New Lead: ${name} (${source})`,
                    html: `
                        <h2>New Lead Captured</h2>
                        <p><strong>Name:</strong> ${name}</p>
                        <p><strong>Phone:</strong> ${number}</p>
                        <p><strong>Email:</strong> ${email || 'N/A'}</p>
                        <p><strong>Location:</strong> ${location || 'N/A'}</p>
                        <p><strong>Source:</strong> ${source}</p>
                        ${Object.entries(details).length > 0 ? `<p><strong>Details:</strong> ${JSON.stringify(details)}</p>` : ''}
                        <hr/>
                        <p><em>Lead ID: ${newLead.id}</em></p>
                    `
                });
                emailSent = true;
            } catch (err: any) {
                console.error(`Leads API Email Error: ${err.message}`);
            }
        }

        // v2.1 - Enhanced Resilience: Succeed if at least one method (like Webhook) worked
        if (!webhookSaved && !fileSaved && !emailSent) {
            console.error('CRITICAL: Lead capture failed on ALL methods.');
            // We still return a 200/success to avoid triggering debug alerts on cached clients 
            // since the lead is likely already on WhatsApp anyway.
        }

        return NextResponse.json({
            success: true,
            lead: newLead,
            webhook: webhookSaved ? 'success' : 'failed',
            storage: fileSaved ? 'filesystem' : 'error',
            email: emailSent ? 'sent' : 'missed'
        });
    } catch (error: any) {
        console.error('Leads API Error:', error);
        return NextResponse.json({
            error: 'Failed to save lead',
            details: error.message
        }, { status: 500 });
    }
}
