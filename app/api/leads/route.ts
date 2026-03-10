import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

const LEADS_FILE = path.join(process.cwd(), 'data', 'leads.json');

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
        try {
            await fs.mkdir(dataDir, { recursive: true });
            const data = await fs.readFile(LEADS_FILE, 'utf-8');
            leads = JSON.parse(data);
        } catch (e) {
            console.log(`Leads API: Initializing new leads file at ${LEADS_FILE}`);
        }

        leads.push(newLead);
        await fs.writeFile(LEADS_FILE, JSON.stringify(leads, null, 2));
        console.log(`Leads API: Successfully saved lead ${newLead.id}`);

        return NextResponse.json({
            success: true,
            lead: newLead,
            debugPath: LEADS_FILE
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
