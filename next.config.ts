import type { NextConfig } from "next";
const nextConfig: NextConfig = { poweredByHeader: false, images: { remotePatterns: [
  { protocol: "https", hostname: "api.ibrahimyeler.com", pathname: "/uploads/**" },
  { protocol: "https", hostname: "ibrahimyeler.com", pathname: "/images/**" },
] } };
export default nextConfig;
