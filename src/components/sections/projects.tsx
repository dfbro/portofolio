'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ICONS } from '@/lib/data';
import { Section } from './section-wrapper';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { getProjects } from '@/app/admin/projects/actions';
import { Skeleton } from '@/components/ui/skeleton';

type Project = {
  id: string;
  title: string;
  description: string;
  techStack: string[];
  repoUrl: string;
  liveUrl?: string;
  imageUrl?: string;
};

export function Projects({ showAll = false }: { showAll?: boolean }) {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProjects() {
      try {
        const data = await getProjects();
        setProjects(data);
      } catch (error) {
        console.error("Failed to fetch projects:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchProjects();
  }, []);

  const projectsToShow = showAll ? projects : projects.slice(0, 3);
  const totalProjects = projects.length;

  if (loading) {
    return (
      <Section id="projects" title="Projects">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {[...Array(3)].map((_, i) => (
            <Card key={i} className="flex flex-col">
              <CardHeader className="p-0">
                <Skeleton className="h-[215px] w-full rounded-t-lg" />
                 <div className="p-6">
                    <Skeleton className="h-8 w-3/4" />
                 </div>
              </CardHeader>
              <CardContent className="flex-grow space-y-2 p-6 pt-0">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
                <div className="mt-4 flex flex-wrap gap-2 pt-2">
                  <Skeleton className="h-6 w-20 rounded-full" />
                  <Skeleton className="h-6 w-24 rounded-full" />
                  <Skeleton className="h-6 w-16 rounded-full" />
                </div>
              </CardContent>
              <CardFooter className="flex justify-end gap-2">
                <Skeleton className="h-9 w-24" />
                <Skeleton className="h-9 w-28" />
              </CardFooter>
            </Card>
          ))}
        </div>
      </Section>
    );
  }

  return (
    <Section id="projects" title="Projects">
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {projectsToShow.map((project) => (
          <Card key={project.id} className="flex flex-col overflow-hidden transition-transform duration-300 ease-in-out hover:-translate-y-2">
            <CardHeader className="p-0">
              {project.imageUrl ? (
                <div className="aspect-video overflow-hidden rounded-t-lg border-b">
                  <Image
                    src={project.imageUrl}
                    alt={project.title}
                    width={600}
                    height={400}
                    className="h-full w-full object-cover"
                    data-ai-hint="project image"
                  />
                </div>
              ) : (
                <div className="aspect-video overflow-hidden rounded-t-lg border-b bg-muted flex items-center justify-center">
                  <ICONS.code className="h-16 w-16 text-muted-foreground" />
                </div>
              )}
               <div className="p-6 pb-0">
                 <CardTitle>{project.title}</CardTitle>
               </div>
            </CardHeader>
            <CardContent className="flex-grow p-6">
              <p className="text-muted-foreground">{project.description}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {project.techStack.map((tech) => (
                  <Badge key={tech} variant="secondary">{tech}</Badge>
                ))}
              </div>
            </CardContent>
            <CardFooter className="mt-auto flex justify-end gap-2 p-6 pt-0">
              {project.repoUrl && (
                <Button asChild variant="ghost" size="sm">
                  <Link href={project.repoUrl} target="_blank">
                    <ICONS.github className="mr-2" /> Code
                  </Link>
                </Button>
              )}
              {project.liveUrl && (
                <Button asChild variant="default" size="sm">
                  <Link href={project.liveUrl} target="_blank">
                    <ICONS.globe className="mr-2" /> Live Demo
                  </Link>
                </Button>
              )}
            </CardFooter>
          </Card>
        ))}
      </div>
      {!showAll && totalProjects > 3 && (
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
