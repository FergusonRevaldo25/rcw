import HeroBanner from "@/components/HeroBanner";
import BuildDemo from "@/components/BuildDemo";
import ClientSitesCarousel from "@/components/ClientSitesCarousel";
import ProcessSteps from "@/components/ProcessSteps";
import FeaturedProjects from "@/components/FeaturedProjects";
import MobileAppsSection from "@/components/MobileAppsSection";
import MascotSticker from "@/components/MascotSticker";
import TopRightMascotPeek from "@/components/TopRightMascotPeek";

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
    </>
  );
}
