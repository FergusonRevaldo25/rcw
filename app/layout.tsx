import type { Metadata } from "next";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import BubbleBackground from "@/components/BubbleBackground";
import { SiteConfigProvider } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "RCW — Custom Websites",
  description:
    "RCW builds custom websites for local businesses. Pick your budget, see what you get, and launch a site that actually brings in customers.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://api.fontshare.com/v2/css?f[]=clash-display@600,700&f[]=satoshi@400,500,700&display=swap"
        />
      </head>
      <body>
        <BubbleBackground />
        <SiteConfigProvider>
          <Nav />
          <main>{children}</main>
          <Footer />
          <WhatsAppButton />
        </SiteConfigProvider>
      </body>
    </html>
  );
}
