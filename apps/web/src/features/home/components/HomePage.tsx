import {
  HomeHeroContent,
  HomeHeroOverlay,
} from "@/features/home/components/HomeHeroContent";
import { HomeHero } from "@/features/home/components/HomeHero";
import { HomeTrustedStrip } from "@/features/home/components/HomeTrustedStrip";
import { Navbar } from "@/shared/components/navbar";

export function HomePage() {
  return (
    <>
      <section className="relative h-svh min-h-svh overflow-hidden bg-black">
        <HomeHero />
        <HomeHeroOverlay />
        <HomeHeroContent />
        <Navbar overlay />
      </section>
      <HomeTrustedStrip />
    </>
  );
}
