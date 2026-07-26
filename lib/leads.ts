export async function submitLead(payload: Record<string, unknown>): Promise<{ success: boolean; error?: string }> {
  const name = String(payload.name || "").trim();
  const number = String(payload.number || "").trim();
  if (!name || !number) {
    return { success: false, error: "Name and phone number are required" };
  }

  const source = String(payload.source || "Unknown");
  const isCalculatorOrResource = /calculator|resource|mock test|test/i.test(source);
  const fallbackWebhook = isCalculatorOrResource
    ? "https://cloud.activepieces.com/api/v1/webhooks/wjKhP0jGALa4bmUVYcw5F"
    : "https://cloud.activepieces.com/api/v1/webhooks/h3HoLiVtxuydbGOfr11F3";

  const flatPayload = {
    id: crypto.randomUUID(),
    name,
    number,
    email: String(payload.email || ""),
    location: String(payload.location || ""),
    course: String(payload.course || ""),
    source,
    message: String(payload.message || ""),
    budget: String(payload.budget || ""),
    preferredLocation: String(payload.preferredLocation || ""),
    timestamp: new Date().toISOString(),
    ...(typeof payload.details === "object" && payload.details !== null ? payload.details : {}),
    ...payload,
  };

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
    console.warn(`[Leads] /api/leads returned status ${res.status}, falling back to direct Activepieces webhook`);
  } catch (err) {
    console.warn("[Leads] Network/404 error calling /api/leads, falling back to direct Activepieces webhook", err);
  }

  // 2. Fallback: Directly invoke Activepieces webhook from client (works in local dev, static exports, or if edge API fails)
  try {
    const webhookRes = await fetch(fallbackWebhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(flatPayload),
    });
    if (!webhookRes.ok) {
      const errText = await webhookRes.text().catch(() => "");
      return { success: false, error: `Webhook failed (${webhookRes.status}): ${errText}` };
    }
    return { success: true };
  } catch (err: any) {
    console.error("[Leads] Direct webhook error:", err);
    return { success: false, error: err.message || "Failed to submit lead" };
  }
}
