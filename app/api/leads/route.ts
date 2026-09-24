import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { isCalculatorOrToolLead, ACTIVEPIECES_INQUIRY_WEBHOOK_URL, ACTIVEPIECES_TOOLS_WEBHOOK_URL } from "@/lib/leads";

export const dynamic = "force-static";

const leadsDataPath = path.join(process.cwd(), "data", "leads.json");

function readLeadsFile(): any[] {
  try {
    if (fs.existsSync(leadsDataPath)) {
      const content = fs.readFileSync(leadsDataPath, "utf8");
      return JSON.parse(content);
    }
  } catch (e) {
    console.error("Error reading data/leads.json", e);
  }
  return [];
}

function writeLeadsFile(leads: any[]) {
  try {
    fs.writeFileSync(leadsDataPath, JSON.stringify(leads, null, 2), "utf8");
  } catch (e) {
    console.warn("Could not write to data/leads.json (read-only filesystem)", e);
  }
}

export async function GET(request: Request) {
  try {
    const leads = readLeadsFile();
    return NextResponse.json(leads, { status: 200 });
  } catch (e: any) {
    return NextResponse.json({ error: e.message || "Failed to fetch leads" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const lead = await request.json();
    const name = String(lead.name || "").trim();
    const number = String(lead.number || lead.phone || "").trim();

    if (!name || !number) {
      return NextResponse.json({ error: "Name and number are required" }, { status: 400 });
    }

    const leadId = lead.id || `lead_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`;
    const fullLead = {
      id: leadId,
      name,
      number,
      phone: number,
      email: String(lead.email || ""),
      location: String(lead.location || lead.city || "Online"),
      source: String(lead.source || "Website Inquiry"),
      category: lead.category || "inquiry",
      course: lead.course || lead.program || "",
      college: lead.college || "",
      score: lead.score,
      percentile: lead.percentile,
      slot: lead.slot || "",
      details: lead.details || {},
      status: lead.status || "New",
      notes: lead.notes || [],
      timestamp: lead.timestamp || new Date().toISOString(),
    };

    // Append to local data file if writable
    const existing = readLeadsFile();
    const index = existing.findIndex((l) => l.id === fullLead.id);
    let updated: any[];
    if (index >= 0) {
      updated = [...existing];
      updated[index] = { ...updated[index], ...fullLead };
    } else {
      updated = [fullLead, ...existing];
    }
    writeLeadsFile(updated);

    // Forward to designated Activepieces webhook
    const isTool = isCalculatorOrToolLead(fullLead);
    const targetWebhook = isTool ? ACTIVEPIECES_TOOLS_WEBHOOK_URL : ACTIVEPIECES_INQUIRY_WEBHOOK_URL;

    fetch(targetWebhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(fullLead),
    }).catch(() => {});

    return NextResponse.json({ success: true, lead: fullLead }, { status: 200 });
  } catch (e: any) {
    return NextResponse.json({ error: e.message || "Failed to process lead" }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  try {
    const body = await request.json();
    const { id, status, notes } = body;
    if (!id) {
      return NextResponse.json({ error: "Lead ID required" }, { status: 400 });
    }

    const existing = readLeadsFile();
    const index = existing.findIndex((l) => l.id === id);
    if (index >= 0) {
      existing[index] = {
        ...existing[index],
        ...(status ? { status } : {}),
        ...(notes ? { notes } : {}),
      };
      writeLeadsFile(existing);
      return NextResponse.json({ success: true, lead: existing[index] });
    }

    return NextResponse.json({ error: "Lead not found" }, { status: 404 });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    if (!id) {
      return NextResponse.json({ error: "Lead ID required" }, { status: 400 });
    }

    const existing = readLeadsFile();
    const filtered = existing.filter((l) => l.id !== id);
    writeLeadsFile(filtered);

    return NextResponse.json({ success: true, deletedId: id });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
