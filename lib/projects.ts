import type { Category, Project } from "./project-types";
export const apiBase = () => (process.env.API_INTERNAL_URL || "https://api.ibrahimyeler.com").replace(/\/$/, "");
const known: Record<string, { icon: Project["icon"]; color: string; image: string }> = {
  kolayapartman: { icon: "building", color: "cyan", image: "apartment" },
  momby: { icon: "heart", color: "pink", image: "momby" },
  "e-commerce-platform": { icon: "cart", color: "cyan", image: "commerce" },
  chessflutter: { icon: "chess", color: "gold", image: "chessflutter" },
};
function imageUrl(value: unknown, fallback: string): string {
  if (typeof value !== "string" || !value) return `/images/${fallback}.webp`;
  if (/^\/images\/[a-zA-Z0-9._-]+$/.test(value)) return value;
  try { const url = new URL(value); if (url.protocol === "https:" && ((url.hostname === "api.ibrahimyeler.com" && url.pathname.startsWith("/uploads/")) || (url.hostname === "ibrahimyeler.com" && url.pathname.startsWith("/images/")))) return url.toString(); } catch {}
  return `/images/${fallback}.webp`;
}
export async function loadProjects(): Promise<{ projects: Project[]; unavailable: boolean }> {
  try {
    const response = await fetch(`${apiBase()}/api/projects`, { cache: "no-store", signal: AbortSignal.timeout(4000) });
    if (!response.ok) throw new Error("Project API unavailable");
    const records: unknown = await response.json();
    if (!Array.isArray(records)) throw new Error("Invalid project data");
    const projects = records.filter(r => r?.status === "Published" && typeof r.title === "string").map(r => {
      const style = known[r.slug] || { icon: "building" as const, color: "cyan", image: "architecture" };
      return { name: r.title, image: imageUrl(r.image, style.image), icon: style.icon, color: style.color, description: String(r.description || ""), tags: (Array.isArray(r.tags) ? r.tags : []).filter((t: unknown): t is Category => ["Web", "Mobile", "SaaS"].includes(String(t))), features: (Array.isArray(r.features) ? r.features : []).filter((f: unknown): f is string => typeof f === "string") };
    });
    return { projects, unavailable: false };
  } catch { return { projects: [], unavailable: true }; }
}
