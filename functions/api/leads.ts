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
    const number = String(lead.number || lead.phone || "").trim();
    if (!name || !number) return json({ error: "Name and number are required" }, 400);

    const source = String(lead.source || "Unknown");
    const course = String(lead.course || lead.program || lead.specialization || "");
    const details = typeof lead.details === "object" && lead.details !== null ? lead.details as Record<string, unknown> : {};

    // 100% Flat, top-level string properties for Google Sheets compatibility (both lower & capitalized keys)
    const cleanPayload: Record<string, string> = {
      id: String(lead.id || crypto.randomUUID()),
      name,
      Name: name,
      number,
      phone: number,
      Phone: number,
      mobile: number,
      Mobile: number,
      email: String(lead.email || ""),
      Email: String(lead.email || ""),
      location: String(lead.location || lead.city || "Online"),
      Location: String(lead.location || lead.city || "Online"),
      course,
      Course: course,
      program: course,
      Program: course,
      source,
      Source: source,
      message: String(lead.message || ""),
      Message: String(lead.message || ""),
      goal: String(lead.goal || lead.message || ""),
      reason: String(lead.reason || ""),
      budget: String(lead.budget || "Not Specified"),
      preferredLocation: String(lead.preferredLocation || "Online"),
      college: String(lead.college || details.preferredUniversity || ""),
      preferredUniversity: String(details.preferredUniversity || lead.college || ""),
      timestamp: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
      Timestamp: new Date().toISOString(),
      Date: new Date().toLocaleDateString('en-IN', { timeZone: 'Asia/Kolkata' }),
      Time: new Date().toLocaleTimeString('en-IN', { timeZone: 'Asia/Kolkata' }),
    };

    // Also include any extra primitive string/number values from lead or details without nesting
    for (const [key, val] of Object.entries(details)) {
      if (typeof val === "string" || typeof val === "number") {
        cleanPayload[key] = String(val);
      }
    }
    for (const [key, val] of Object.entries(lead)) {
      if ((typeof val === "string" || typeof val === "number") && key !== "details") {
        cleanPayload[key] = String(val);
      }
    }

    const deadUrls = new Set([
      "https://cloud.activepieces.com/api/v1/webhooks/LG8KMFgSwrLMGBRVoOOk2",
      "https://cloud.activepieces.com/api/v1/webhooks/5RBKTlNE1jXtKEfs7IMK4"
    ]);
    const urls = new Set<string>([
      "https://cloud.activepieces.com/api/v1/webhooks/h3HoLiVtxuydbGOfr11F3",
      "https://cloud.activepieces.com/api/v1/webhooks/wjKhP0jGALa4bmUVYcw5F",
      "https://cloud.activepieces.com/api/v1/webhooks/1yBqzhTcnXyDOOBsL9B4p",
    ]);

    if (env.ACTIVEPIECES_GENERAL_WEBHOOK && !deadUrls.has(env.ACTIVEPIECES_GENERAL_WEBHOOK)) {
      urls.add(env.ACTIVEPIECES_GENERAL_WEBHOOK);
    }
    if (env.ACTIVEPIECES_INQUIRY_WEBHOOK && !deadUrls.has(env.ACTIVEPIECES_INQUIRY_WEBHOOK)) {
      urls.add(env.ACTIVEPIECES_INQUIRY_WEBHOOK);
    }

    // Send to all candidate webhooks simultaneously so whichever flow is connected to Google Sheets in Activepieces always receives the lead
    const results = await Promise.allSettled(
      Array.from(urls).map(url =>
        fetch(url, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(cleanPayload),
        })
      )
    );

    const anySuccess = results.some(r => r.status === "fulfilled" && r.value.ok);

    if (!anySuccess) {
      console.error("All Activepieces webhooks failed to save the lead");
      return json({ success: false, error: "Activepieces webhook failed" }, 502);
    }

    return json({ success: true });
  } catch (error: any) {
    console.error("Lead submission failed", error);
    return json({ success: false, error: error.message || "Invalid lead submission" }, 400);
  }
};
