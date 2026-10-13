// Run explicitly with ADMIN_EMAIL and ADMIN_PASSWORD in your local environment.
import fs from "node:fs";
const base = process.env.API_URL || "https://api.ibrahimyeler.com";
const { ADMIN_EMAIL: email, ADMIN_PASSWORD: password } = process.env;
if (!email || !password) throw new Error("ADMIN_EMAIL and ADMIN_PASSWORD are required");
async function call(path, token, body) {
  const response = await fetch(base + path, { method: body ? "POST" : "GET", headers: { "Content-Type": "application/json", ...(token ? { Authorization: `Bearer ${token}` } : {}) }, ...(body ? { body: JSON.stringify(body) } : {}), signal: AbortSignal.timeout(15000), redirect: "error" });
  if (!response.ok) throw new Error(`API HTTP ${response.status}`);
  return response.json();
}
const { token } = await call("/api/auth/login", null, { email, password });
const existing = new Set((await call("/api/projects", token)).map(p => p.slug));
const projects = JSON.parse(fs.readFileSync(new URL("./initial-projects.json", import.meta.url)));
for (const project of projects.reverse()) {
  if (existing.has(project.slug)) continue;
  await call("/api/projects", token, project);
  console.log("Created:", project.slug);
}
