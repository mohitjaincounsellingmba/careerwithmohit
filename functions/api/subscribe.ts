interface Env {
  ACTIVEPIECES_GENERAL_WEBHOOK?: string;
  ACTIVEPIECES_INQUIRY_WEBHOOK?: string;
}
type PagesFunction<Bindings = Record<string, unknown>> = (context: { request: Request; env: Bindings }) => Response | Promise<Response>;

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  try {
    const { method, value } = await request.json() as { method?: string; value?: string };
    if ((method !== "email" && method !== "whatsapp") || !value) {
      return Response.json({ error: "A valid email or WhatsApp number is required." }, { status: 400 });
    }
    const webhooks = [
      env.ACTIVEPIECES_GENERAL_WEBHOOK || "https://cloud.activepieces.com/api/v1/webhooks/wjKhP0jGALa4bmUVYcw5F",
      env.ACTIVEPIECES_INQUIRY_WEBHOOK || "https://cloud.activepieces.com/api/v1/webhooks/h3HoLiVtxuydbGOfr11F3",
    ];

    const payload = {
      id: crypto.randomUUID(),
      name: "Subscriber",
      number: method === "whatsapp" ? value : "",
      phone: method === "whatsapp" ? value : "",
      email: method === "email" ? value : "",
      course: "Newsletter",
      program: "Newsletter",
      source: `Newsletter (${method})`,
      location: "Online",
      message: `Subscribed via ${method}`,
      timestamp: new Date().toISOString(),
    };

    const results = await Promise.allSettled(
      webhooks.map(webhook =>
        fetch(webhook, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        })
      )
    );

    const anySuccess = results.some(r => r.status === "fulfilled" && r.value.ok);
    if (!anySuccess) {
      return Response.json({ error: "Could not save subscription" }, { status: 502 });
    }
    return Response.json({ success: true, message: "Successfully subscribed" });
  } catch {
    return Response.json({ error: "Invalid subscription request" }, { status: 400 });
  }
};
