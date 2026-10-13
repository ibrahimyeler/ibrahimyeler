import { apiBase } from "@/lib/projects";
export async function POST(request: Request) {
  const origin = request.headers.get("origin");
  if (origin && new URL(origin).host !== request.headers.get("host") && !["https://ibrahimyeler.com", "https://www.ibrahimyeler.com"].includes(origin)) return Response.json({ error: "Forbidden" }, { status: 403 });
  if (Number(request.headers.get("content-length") || 0) > 12000) return Response.json({ error: "Too large" }, { status: 413 });
  try {
    const text = await request.text();
    if (text.length > 12000) return Response.json({ error: "Too large" }, { status: 413 });
    const data = JSON.parse(text);
    if (typeof data.name !== "string" || !data.name.trim() || data.name.length > 150 || typeof data.email !== "string" || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email) || data.email.length > 254 || typeof data.message !== "string" || !data.message.trim() || data.message.length > 5000) return Response.json({ error: "Invalid message" }, { status: 400 });
    const response = await fetch(`${apiBase()}/api/messages`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ name: data.name.trim(), email: data.email.trim(), message: data.message.trim() }), signal: AbortSignal.timeout(8000) });
    return Response.json({ success: response.ok }, { status: response.ok ? 201 : 502 });
  } catch { return Response.json({ error: "Message unavailable" }, { status: 502 }); }
}
