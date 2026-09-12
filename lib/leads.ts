export async function submitLead(payload: Record<string, unknown>): Promise<{ success: boolean; error?: string }> {
  const name = String(payload.name || "").trim();
  const number = String(payload.number || payload.phone || "").trim();
  if (!name || !number) {
    return { success: false, error: "Name and phone number are required" };
  }

  const source = String(payload.source || "Unknown");
  const course = String(payload.course || payload.program || payload.specialization || "");
  const details = typeof payload.details === "object" && payload.details !== null ? payload.details as Record<string, unknown> : {};

  // 100% Flat, top-level string properties for Google Sheets compatibility (both lower & capitalized keys)
  const flatPayload: Record<string, string> = {
    id: String(payload.id || crypto.randomUUID()),
    name,
    Name: name,
    number,
    phone: number,
    Phone: number,
    mobile: number,
    Mobile: number,
    email: String(payload.email || ""),
    Email: String(payload.email || ""),
    location: String(payload.location || payload.city || "Online"),
    Location: String(payload.location || payload.city || "Online"),
    course,
    Course: course,
    program: course,
    Program: course,
    source,
    Source: source,
    message: String(payload.message || ""),
    Message: String(payload.message || ""),
    goal: String(payload.goal || payload.message || ""),
    reason: String(payload.reason || ""),
    budget: String(payload.budget || "Not Specified"),
    preferredLocation: String(payload.preferredLocation || "Online"),
    college: String(payload.college || details.preferredUniversity || ""),
    preferredUniversity: String(details.preferredUniversity || payload.college || ""),
    timestamp: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
    Timestamp: new Date().toISOString(),
    Date: new Date().toLocaleDateString('en-IN', { timeZone: 'Asia/Kolkata' }),
    Time: new Date().toLocaleTimeString('en-IN', { timeZone: 'Asia/Kolkata' }),
  };

  for (const [key, val] of Object.entries(details)) {
    if (typeof val === "string" || typeof val === "number") {
      flatPayload[key] = String(val);
    }
  }
  for (const [key, val] of Object.entries(payload)) {
    if ((typeof val === "string" || typeof val === "number") && key !== "details") {
      flatPayload[key] = String(val);
    }
  }

  // 1. Try Cloudflare Pages / Next.js API endpoint first
  try {
    const res = await fetch("/api/leads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(flatPayload),
    });
    if (res.ok) {
      return { success: true };
    }
    console.warn(`[Leads] /api/leads returned status ${res.status}, falling back to direct Activepieces webhooks`);
  } catch (err) {
    console.warn("[Leads] Network/404 error calling /api/leads, falling back to direct Activepieces webhooks", err);
  }

  // 2. Fallback: Dispatch to all active webhooks simultaneously so whichever flow is connected to Google Sheets in Activepieces receives it
  const fallbackWebhooks = [
    "https://cloud.activepieces.com/api/v1/webhooks/h3HoLiVtxuydbGOfr11F3",
    "https://cloud.activepieces.com/api/v1/webhooks/wjKhP0jGALa4bmUVYcw5F",
    "https://cloud.activepieces.com/api/v1/webhooks/1yBqzhTcnXyDOOBsL9B4p",
  ];

  try {
    const results = await Promise.allSettled(
      fallbackWebhooks.map(webhook =>
        fetch(webhook, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(flatPayload),
        })
      )
    );

    const anySuccess = results.some(r => r.status === "fulfilled" && r.value.ok);
    if (!anySuccess) {
      return { success: false, error: "Activepieces webhooks failed" };
    }
    return { success: true };
  } catch (err: any) {
    console.error("[Leads] Direct webhook error:", err);
    return { success: false, error: err.message || "Failed to submit lead" };
  }
}
