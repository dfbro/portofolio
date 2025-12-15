import { Projects as ProjectsSection } from '@/components/sections/projects';

export default function ProjectsPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">
        <ProjectsSection showAll={true} />
      </main>
    </div>
  );
}
