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
    const webhook = isCalculatorOrResource
      ? env.ACTIVEPIECES_GENERAL_WEBHOOK
      : env.ACTIVEPIECES_INQUIRY_WEBHOOK;

    if (!webhook) {
      console.error("Missing Activepieces webhook binding");
      return json({ error: "Lead delivery is not configured" }, 503);
    }

    const payload = {
      ...lead,
      id: crypto.randomUUID(),
      name,
      number,
      timestamp: new Date().toISOString(),
    };
    const response = await fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!response.ok) return json({ error: "Could not save the lead" }, 502);
    return json({ success: true });
  } catch (error) {
    console.error("Lead submission failed", error);
    return json({ error: "Invalid lead submission" }, 400);
  }
};
