import type { Metadata, Viewport } from "next";
import "@fontsource-variable/inter";
import "./globals.css";
export const metadata: Metadata = {
  metadataBase: new URL("https://ibrahimyeler.com"),
  title: "İbrahim Yeler — Code. Create. Refine.",
  description:
    "Full stack developer building thoughtful web, mobile and SaaS products. Explore selected work, experiments and the craft behind the interface.",
  openGraph: {
    title: "İbrahim Yeler — Full Stack Developer",
    description: "Human first. Developer always.",
    images: ["/images/hero.webp"],
    type: "website",
  },
};
export const viewport: Viewport = { themeColor: "#03111e" };
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
