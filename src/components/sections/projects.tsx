import Image from 'next/image';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { PROJECTS, ICONS } from '@/lib/data';
import { Section } from './section-wrapper';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export function Projects({ showAll = false }: { showAll?: boolean }) {
  const projectsToShow = showAll ? PROJECTS : PROJECTS.slice(0, 3);
  return (
    <Section id="projects" title="Projects">
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {projectsToShow.map((project) => (
          <Card key={project.title} className="flex flex-col overflow-hidden transition-transform duration-300 ease-in-out hover:-translate-y-2">
            <CardHeader>
              {project.image && (
                <div className="aspect-video overflow-hidden rounded-t-lg border-b">
                  <Image
                    src={project.image.imageUrl}
                    alt={project.image.description}
                    width={600}
                    height={400}
                    className="h-full w-full object-cover"
                    data-ai-hint={project.image.imageHint}
                  />
                </div>
              )}
              <CardTitle className="pt-4">{project.title}</CardTitle>
            </CardHeader>
            <CardContent className="flex-grow">
              <p className="text-muted-foreground">{project.description}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {project.techStack.map((tech) => (
                  <Badge key={tech} variant="secondary">{tech}</Badge>
                ))}
              </div>
            </CardContent>
            <CardFooter className="flex justify-end gap-2">
              <Button asChild variant="ghost" size="sm">
                <Link href={project.repoUrl} target="_blank">
                  <ICONS.github className="mr-2" /> Code
                </Link>
              </Button>
              <Button asChild variant="default" size="sm">
                <Link href={project.liveUrl} target="_blank">
                  <ICONS.globe className="mr-2" /> Live Demo
                </Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
      {!showAll && PROJECTS.length > 3 && (
        <div className="mt-12 flex justify-center">
          <Button asChild>
            <Link href="/projects">
              View All Projects
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      )}
    </Section>
  );
}
