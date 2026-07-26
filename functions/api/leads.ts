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

    // 100% Flat, top-level string properties for Google Sheets compatibility
    const cleanPayload: Record<string, string> = {
      id: String(lead.id || crypto.randomUUID()),
      name,
      number,
      phone: number, // duplicate key so either phone or number works in Google Sheet mapping
      email: String(lead.email || ""),
      location: String(lead.location || lead.city || ""),
      course,
      program: course, // duplicate key so either course or program works in Google Sheet mapping
      source,
      message: String(lead.message || ""),
      budget: String(lead.budget || ""),
      preferredLocation: String(lead.preferredLocation || ""),
      college: String(lead.college || details.preferredUniversity || ""),
      preferredUniversity: String(details.preferredUniversity || lead.college || ""),
      timestamp: new Date().toISOString(),
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

    // Collect all valid webhook URLs, always including the two known active ones and filtering out dead 410 URLs
    const deadUrls = new Set([
      "https://cloud.activepieces.com/api/v1/webhooks/LG8KMFgSwrLMGBRVoOOk2",
      "https://cloud.activepieces.com/api/v1/webhooks/5RBKTlNE1jXtKEfs7IMK4"
    ]);
    const urls = new Set<string>([
      "https://cloud.activepieces.com/api/v1/webhooks/h3HoLiVtxuydbGOfr11F3",
      "https://cloud.activepieces.com/api/v1/webhooks/wjKhP0jGALa4bmUVYcw5F"
    ]);
    if (env.ACTIVEPIECES_INQUIRY_WEBHOOK && !deadUrls.has(env.ACTIVEPIECES_INQUIRY_WEBHOOK)) {
      urls.add(env.ACTIVEPIECES_INQUIRY_WEBHOOK);
    }
    if (env.ACTIVEPIECES_GENERAL_WEBHOOK && !deadUrls.has(env.ACTIVEPIECES_GENERAL_WEBHOOK)) {
      urls.add(env.ACTIVEPIECES_GENERAL_WEBHOOK);
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
