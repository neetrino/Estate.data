import {
  HomeHeroContent,
  HomeHeroOverlay,
} from "@/features/home/components/HomeHeroContent";
import { HomeHero } from "@/features/home/components/HomeHero";
import { Navbar } from "@/shared/components/navbar";

export function HomePage() {
  return (
    <div className="relative h-svh overflow-hidden bg-black">
      <HomeHero />
      <HomeHeroOverlay />
      <Navbar overlay />
      <HomeHeroContent />
    </div>
  );
}
