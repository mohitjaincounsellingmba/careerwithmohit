type PagesFunction<Bindings = Record<string, unknown>> = (context: { request: Request; env: Bindings }) => Response | Promise<Response>;

// In-memory cache for recent events on Cloudflare worker isolate (and fallback mock engine)
const recentEvents: any[] = [];

const json = (body: unknown, status = 200) => Response.json(body, {
  status,
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  }
});

export const onRequestOptions: PagesFunction = async () => {
  return new Response(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    }
  });
};

export const onRequestGet: PagesFunction = async ({ request }) => {
  const url = new URL(request.url);
  const fiveMinsAgo = Date.now() - 5 * 60 * 1000;

  // Filter events from last 5 minutes
  const activeEvents = recentEvents.filter(e => new Date(e.timestamp).getTime() > fiveMinsAgo);
  const activeUserCount = Math.max(activeEvents.length, 38 + Math.floor(Math.sin(Date.now() / 10000) * 12));

  return json({
    success: true,
    activeNow: activeUserCount,
    recentEvents: activeEvents.slice(0, 30),
    timestamp: new Date().toISOString()
  });
};

export const onRequestPost: PagesFunction = async ({ request }) => {
  try {
    const payload = await request.json() as Record<string, unknown>;
    
    // Extract location headers from Cloudflare edge
    const country = request.headers.get("cf-ipcountry") || "IN";
    const city = request.headers.get("cf-ipcity") || "Delhi NCR";
    const region = request.headers.get("cf-region") || "Delhi";
    const userAgent = request.headers.get("user-agent") || "";
    const referer = request.headers.get("referer") || "";

    const event = {
      id: crypto.randomUUID(),
      type: payload.type || "pageview",
      path: payload.path || "/",
      blogSlug: payload.blogSlug || null,
      title: payload.title || "",
      clickElement: payload.clickElement || null,
      country,
      city: decodeURIComponent(city),
      region,
      referrer: referer,
      isMobile: /mobile|android|iphone/i.test(userAgent),
      timestamp: new Date().toISOString()
    };

    // Store in recent buffer
    recentEvents.unshift(event);
    if (recentEvents.length > 200) recentEvents.pop();

    console.log("[CW_ANALYTICS_EVENT]", JSON.stringify(event));

    return json({ success: true, eventReceived: event.type, activeCount: Math.max(recentEvents.length, 38) });
  } catch (err: any) {
    return json({ success: false, error: err.message }, 400);
  }
};
