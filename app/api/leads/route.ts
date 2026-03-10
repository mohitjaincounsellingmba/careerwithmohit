import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

const LEADS_FILE = path.join(process.cwd(), 'data', 'leads.json');

export async function GET() {
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
        const { name, number, email, location, source } = lead;

        if (!name || !number) {
            return NextResponse.json({ error: 'Name and number are required' }, { status: 400 });
        }

        const newLead = {
            id: Date.now().toString(),
            name,
            number,
            email: email || 'N/A',
            location: location || 'N/A',
            source: source || 'Unknown',
            timestamp: new Date().toISOString(),
        };

        let leads = [];
        try {
            const data = await fs.readFile(LEADS_FILE, 'utf-8');
            leads = JSON.parse(data);
        } catch (e) {
            // File might not exist yet
        }

        leads.push(newLead);
        await fs.writeFile(LEADS_FILE, JSON.stringify(leads, null, 2));

        return NextResponse.json({ success: true, lead: newLead });
    } catch (error: any) {
        console.error('Lead storage error:', error);
        return NextResponse.json({ error: 'Failed to save lead' }, { status: 500 });
    }
}
