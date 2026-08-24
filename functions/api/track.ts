type PagesFunction<Bindings = Record<string, unknown>> = (context: { request: Request; env: Bindings }) => Response | Promise<Response>;

// Global in-memory storage for Cloudflare worker instance telemetry
const activeSessions = new Map<string, { path: string; city: string; country: string; timestamp: number }>();
const livePathCounts: Record<string, number> = {};
const liveLocationCounts: Record<string, number> = {};
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
  const now = Date.now();
  const fiveMinsAgo = now - 5 * 60 * 1000;

  // Clean stale sessions older than 5 minutes
  for (const [id, session] of activeSessions.entries()) {
    if (session.timestamp < fiveMinsAgo) {
      activeSessions.delete(id);
    }
  }

  const activeNowCount = Math.max(activeSessions.size, 1);

  // Top active paths
  const topPaths = Object.entries(livePathCounts)
    .map(([path, views]) => ({ path, views }))
    .sort((a, b) => b.views - a.views)
    .slice(0, 10);

  // Top active locations
  const topLocations = Object.entries(liveLocationCounts)
    .map(([city, views]) => ({ city, views }))
    .sort((a, b) => b.views - a.views)
    .slice(0, 10);

  return json({
    success: true,
    gaId: "G-448JRKP87B",
    gaAdsId: "AW-18052249575",
    activeNow: activeNowCount,
    topLivePaths: topPaths,
    topLiveLocations: topLocations,
    recentEvents: recentEvents.slice(0, 40),
    timestamp: new Date().toISOString()
  });
};

export const onRequestPost: PagesFunction = async ({ request }) => {
  try {
    const payload = await request.json() as Record<string, unknown>;
    const now = Date.now();
    
    // Extract real Cloudflare Edge location headers
    const country = request.headers.get("cf-ipcountry") || "IN";
    const city = decodeURIComponent(request.headers.get("cf-ipcity") || "Delhi NCR");
    const region = request.headers.get("cf-region") || "Delhi";
    const userAgent = request.headers.get("user-agent") || "";
    const referer = request.headers.get("referer") || "";
    
    const sessionId = String(payload.sessionId || request.headers.get("cf-connecting-ip") || crypto.randomUUID());
    const path = String(payload.path || "/");

    // Register/update active session
    activeSessions.set(sessionId, {
      path,
      city,
      country,
      timestamp: now
    });

    // Update real-time counts
    livePathCounts[path] = (livePathCounts[path] || 0) + 1;
    liveLocationCounts[city] = (liveLocationCounts[city] || 0) + 1;

    const event = {
      id: crypto.randomUUID(),
      type: payload.type || "pageview",
      path,
      blogSlug: payload.blogSlug || null,
      title: payload.title || "",
      clickElement: payload.clickElement || null,
      country,
      city,
      region,
      referrer: referer,
      isMobile: /mobile|android|iphone/i.test(userAgent),
      timestamp: new Date().toISOString()
    };

    recentEvents.unshift(event);
    if (recentEvents.length > 300) recentEvents.pop();

    return json({
      success: true,
      eventReceived: event.type,
      activeNow: activeSessions.size
    });
  } catch (err: any) {
    return json({ success: false, error: err.message }, 400);
  }
};
