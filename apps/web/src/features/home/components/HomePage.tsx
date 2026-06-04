import { DEFAULT_RECENT_WORK_LIMIT } from "@estate/db";
import { HomeLandingPage } from "@/features/home/landing";
import { fetchRecentWorkProjects } from "@/features/home/services/fetchRecentWorkProjects";
import { getHomeHeroForPage } from "@/server/features/home-hero/get-home-hero";

export async function HomePage() {
  const [projects, hero] = await Promise.all([
    fetchRecentWorkProjects(DEFAULT_RECENT_WORK_LIMIT),
    getHomeHeroForPage(),
  ]);

  return <HomeLandingPage projects={projects} hero={hero} />;
}
