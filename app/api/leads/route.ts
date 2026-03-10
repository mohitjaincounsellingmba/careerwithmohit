import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';
import { Resend } from 'resend';

const LEADS_FILE = path.join(process.cwd(), 'data', 'leads.json');
const ADMIN_EMAIL = 'advik.mohit.jain@gmail.com';
const RESEND_API_KEY = process.env.RESEND_API_KEY;

export async function GET(req: Request) {
    const authHeader = req.headers.get('x-admin-secret');
    if (authHeader !== 'mohitadmin2026') {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const data = await fs.readFile(LEADS_FILE, 'utf-8');
        const leads = JSON.parse(data);
        return NextResponse.json(leads);
    } catch (error) {
        return NextResponse.json([], { status: 200 });
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

        const dataDir = path.dirname(LEADS_FILE);
        console.log(`Leads API: Attempting to write to ${LEADS_FILE}`);

        let leads = [];
        let fileSaved = false;
        try {
            await fs.mkdir(dataDir, { recursive: true });
            try {
                const data = await fs.readFile(LEADS_FILE, 'utf-8');
                leads = JSON.parse(data);
            } catch (e) {
                console.log(`Leads API: Initializing new leads file`);
            }
            leads.push(newLead);
            await fs.writeFile(LEADS_FILE, JSON.stringify(leads, null, 2));
            console.log(`Leads API: Successfully saved lead ${newLead.id} to file`);
            fileSaved = true;
        } catch (e: any) {
            console.error(`Leads API File Storage Error: ${e.message}`);
        }

        // Email Backup via Resend
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
                        <p><em>This lead was also attempted to be saved to the Admin Dashboard.</em></p>
                    `
                });
                console.log(`Leads API: Email backup sent for ${newLead.id}`);
                emailSent = true;
            } catch (err: any) {
                console.error(`Leads API Email Error: ${err.message}`);
            }
        }

        if (!fileSaved && !emailSent) {
            throw new Error('Critical: Failed to save lead to file AND failed to send email backup.');
        }

        return NextResponse.json({
            success: true,
            lead: newLead,
            storage: fileSaved ? 'filesystem' : 'error',
            email: emailSent ? 'sent' : 'missed'
        });
    } catch (error: any) {
        console.error('Leads API Error:', error);
        return NextResponse.json({
            error: 'Failed to save lead',
            details: error.message,
            path: LEADS_FILE
        }, { status: 500 });
    }
}
