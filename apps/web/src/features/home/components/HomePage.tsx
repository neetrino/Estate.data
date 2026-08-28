import { DEFAULT_RECENT_WORK_LIMIT } from "@estate/db";
import { HomeLandingPage } from "@/features/home/landing";
import { fetchRecentWorkProjects } from "@/features/home/services/fetchRecentWorkProjects";
import { getHomeHeroForPage } from "@/server/features/home-hero/get-home-hero";
import { getHomeHeroSlides } from "@/server/features/home-hero/get-home-hero-slides";
import { getStudioServiceSections } from "@/server/features/studio/get-studio-service-sections";
import { getContactFieldSettings } from "@/server/features/contact/get-contact-field-settings";
import { listFaqItems } from "@/server/features/faq/list-faq-items";
import { getPricingPage } from "@/server/features/pricing/get-pricing-page";

export async function HomePage() {
  const [projects, hero, slides, services, pricing, faq, contactFields] = await Promise.all([
    fetchRecentWorkProjects(DEFAULT_RECENT_WORK_LIMIT),
    getHomeHeroForPage(),
    getHomeHeroSlides(),
    getStudioServiceSections(),
    getPricingPage(),
    listFaqItems(),
    getContactFieldSettings(),
  ]);

  return (
    <HomeLandingPage
      projects={projects}
      hero={hero}
      slides={slides}
      services={services}
      packages={pricing.media}
      faq={faq}
      contactFields={contactFields}
    />
  );
}
