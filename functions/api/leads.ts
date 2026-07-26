interface Env {
  ACTIVEPIECES_GENERAL_WEBHOOK?: string;
  ACTIVEPIECES_INQUIRY_WEBHOOK?: string;
}
type PagesFunction<Bindings = Record<string, unknown>> = (context: { request: Request; env: Bindings }) => Response | Promise<Response>;

const json = (body: unknown, status = 200) => Response.json(body, { status });

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  try {
    const lead = await request.json() as Record<string, unknown>;
    const name = String(lead.name || "").trim();
    const number = String(lead.number || "").trim();
    if (!name || !number) return json({ error: "Name and number are required" }, 400);

    const source = String(lead.source || "Unknown");
    const isCalculatorOrResource = /calculator|resource|mock test|test/i.test(source);
    const defaultWebhook = isCalculatorOrResource
      ? "https://cloud.activepieces.com/api/v1/webhooks/wjKhP0jGALa4bmUVYcw5F"
      : "https://cloud.activepieces.com/api/v1/webhooks/h3HoLiVtxuydbGOfr11F3";
    const webhook = isCalculatorOrResource
      ? (env.ACTIVEPIECES_GENERAL_WEBHOOK || defaultWebhook)
      : (env.ACTIVEPIECES_INQUIRY_WEBHOOK || defaultWebhook);

    const details = typeof lead.details === "object" && lead.details !== null ? lead.details : {};
    const payload = {
      id: crypto.randomUUID(),
      name,
      number,
      email: String(lead.email || ""),
      location: String(lead.location || ""),
      course: String(lead.course || ""),
      source,
      message: String(lead.message || ""),
      budget: String(lead.budget || ""),
      preferredLocation: String(lead.preferredLocation || ""),
      timestamp: new Date().toISOString(),
      ...details,
      ...lead,
    };

    let response = await fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!response.ok && webhook !== defaultWebhook) {
      console.warn("Primary webhook failed, retrying with default Activepieces webhook...");
      response = await fetch(defaultWebhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
    }

    if (!response.ok) {
      const errText = await response.text().catch(() => "");
      console.error(`Webhook failed to save the lead: status ${response.status} - ${errText}`);
      return json({ success: false, error: "Activepieces webhook failed" }, 502);
    }

    return json({ success: true });
  } catch (error: any) {
    console.error("Lead submission failed", error);
    return json({ success: false, error: error.message || "Invalid lead submission" }, 400);
  }
};
