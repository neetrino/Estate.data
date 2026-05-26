import { DEFAULT_RECENT_WORK_LIMIT } from "@estate/db";
import { HomeLandingPage } from "@/features/home/landing";
import { fetchRecentWorkProjects } from "@/features/home/services/fetchRecentWorkProjects";

export async function HomePage() {
  const projects = await fetchRecentWorkProjects(DEFAULT_RECENT_WORK_LIMIT);

  return <HomeLandingPage projects={projects} />;
}
