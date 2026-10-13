import http from "node:http";
import fs from "node:fs";
const projects = JSON.parse(fs.readFileSync(new URL("../../scripts/initial-projects.json", import.meta.url)));
http.createServer((request, response) => {
  response.setHeader("Content-Type", "application/json");
  if (request.url === "/api/projects") return response.end(JSON.stringify(projects));
  if (request.url === "/api/messages" && request.method === "POST") { response.statusCode = 201; return response.end('{"success":true}'); }
  response.statusCode = 404; response.end('{}');
}).listen(3191, "127.0.0.1");
