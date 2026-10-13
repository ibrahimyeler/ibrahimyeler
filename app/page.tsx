import Portfolio from "@/components/Portfolio";
import { loadProjects } from "@/lib/projects";
export const dynamic = "force-dynamic";
export default async function Page() {
  const { projects, unavailable } = await loadProjects();
  return <Portfolio projects={projects} unavailable={unavailable} />;
}
