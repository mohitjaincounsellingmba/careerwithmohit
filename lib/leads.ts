export async function submitLead(payload: Record<string, unknown>): Promise<{ success: boolean; error?: string }> {
  const name = String(payload.name || "").trim();
  const number = String(payload.number || payload.phone || "").trim();
  if (!name || !number) {
    return { success: false, error: "Name and phone number are required" };
  }

  const source = String(payload.source || "Unknown");
  const course = String(payload.course || payload.program || payload.specialization || "");
  const details = typeof payload.details === "object" && payload.details !== null ? payload.details as Record<string, unknown> : {};

  // 100% Flat, top-level string properties for Google Sheets compatibility
  const flatPayload: Record<string, string> = {
    id: String(payload.id || crypto.randomUUID()),
    name,
    number,
    phone: number,
    email: String(payload.email || ""),
    location: String(payload.location || payload.city || ""),
    course,
    program: course,
    source,
    message: String(payload.message || ""),
    budget: String(payload.budget || ""),
    preferredLocation: String(payload.preferredLocation || ""),
    college: String(payload.college || details.preferredUniversity || ""),
    preferredUniversity: String(details.preferredUniversity || payload.college || ""),
    timestamp: new Date().toISOString(),
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

  // 2. Fallback: Directly invoke both Activepieces webhooks simultaneously from client
  const fallbackWebhooks = [
    "https://cloud.activepieces.com/api/v1/webhooks/h3HoLiVtxuydbGOfr11F3",
    "https://cloud.activepieces.com/api/v1/webhooks/wjKhP0jGALa4bmUVYcw5F",
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
