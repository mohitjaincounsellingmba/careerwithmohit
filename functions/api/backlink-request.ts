interface Env {
  RESEND_API_KEY?: string;
}
type PagesFunction<Bindings = Record<string, unknown>> = (context: { request: Request; env: Bindings }) => Response | Promise<Response>;

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  try {
    const { name, email, websiteUrl, collaborationType, message } = await request.json() as Record<string, string>;
    if (!name || !email || !websiteUrl) return Response.json({ error: "Missing required fields" }, { status: 400 });
    if (!env.RESEND_API_KEY) return Response.json({ error: "Email delivery is not configured" }, { status: 503 });

    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${env.RESEND_API_KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: "Backlink Bot <notifications@resend.dev>",
        to: ["advik.mohit.jain@gmail.com"],
        subject: `Backlink Request: ${websiteUrl}`,
        html: `<h2>New collaboration request</h2><p><b>Name:</b> ${name}</p><p><b>Email:</b> ${email}</p><p><b>Website:</b> ${websiteUrl}</p><p><b>Type:</b> ${collaborationType || ""}</p><p>${message || ""}</p>`,
      }),
    });
    if (!response.ok) return Response.json({ error: "Could not send request" }, { status: 502 });
    return Response.json({ success: true });
  } catch {
    return Response.json({ error: "Invalid request" }, { status: 400 });
  }
};
