import HeroBanner from "@/components/HeroBanner";
import BuildDemo from "@/components/BuildDemo";
import ClientSitesCarousel from "@/components/ClientSitesCarousel";
import ProcessSteps from "@/components/ProcessSteps";
import FeaturedProjects from "@/components/FeaturedProjects";
import MobileAppsSection from "@/components/MobileAppsSection";
import MascotSticker from "@/components/MascotSticker";
import TopRightMascotPeek from "@/components/TopRightMascotPeek";
import Script from "next/script";

export default function Home() {
  return (
    <>
      <HeroBanner />
      <BuildDemo />
      <ClientSitesCarousel />
      <ProcessSteps />
      <FeaturedProjects />
      <MobileAppsSection />
      <MascotSticker />
      <TopRightMascotPeek />

      <Script
        src="/rcw-runner.js"
        data-href="https://rcw-eta.vercel.app"
        strategy="afterInteractive"
      />
    </>
  );
}
