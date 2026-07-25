interface Env {
  ACTIVEPIECES_GENERAL_WEBHOOK?: string;
}
type PagesFunction<Bindings = Record<string, unknown>> = (context: { request: Request; env: Bindings }) => Response | Promise<Response>;

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  try {
    const { method, value } = await request.json() as { method?: string; value?: string };
    if ((method !== "email" && method !== "whatsapp") || !value) {
      return Response.json({ error: "A valid email or WhatsApp number is required." }, { status: 400 });
    }
    const webhook = env.ACTIVEPIECES_GENERAL_WEBHOOK || "https://cloud.activepieces.com/api/v1/webhooks/LG8KMFgSwrLMGBRVoOOk2";
    if (!webhook) {
      return Response.json({ error: "Subscription delivery is not configured" }, { status: 503 });
    }
    const response = await fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: crypto.randomUUID(),
        name: "Subscriber",
        number: method === "whatsapp" ? value : "",
        email: method === "email" ? value : "",
        source: `Newsletter (${method})`,
        timestamp: new Date().toISOString(),
      }),
    });
    if (!response.ok) return Response.json({ error: "Could not save subscription" }, { status: 502 });
    return Response.json({ success: true, message: "Successfully subscribed" });
  } catch {
    return Response.json({ error: "Invalid subscription request" }, { status: 400 });
  }
};
