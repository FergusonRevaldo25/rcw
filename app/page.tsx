import HeroBanner from "@/components/HeroBanner";
import BuildDemo from "@/components/BuildDemo";
import ClientSitesCarousel from "@/components/ClientSitesCarousel";
import ProcessSteps from "@/components/ProcessSteps";
import FeaturedProjects from "@/components/FeaturedProjects";
import ClientLogos from "@/components/ClientLogos";
import MascotSticker from "@/components/MascotSticker";

export default function Home() {
  return (
    <>
      <HeroBanner />
      <BuildDemo />
      <ClientSitesCarousel />
      <ProcessSteps />
      <FeaturedProjects />
      <ClientLogos />
      <MascotSticker />
    </>
  );
}
