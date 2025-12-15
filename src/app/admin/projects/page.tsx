'use client';

import { useEffect, useState, useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { getProjects, updateProjects } from './actions';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import Link from 'next/link';
import { ArrowLeft, Loader2, Plus, Trash2 } from 'lucide-react';

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full md:w-auto">
      {pending ? <Loader2 className="animate-spin" /> : 'Save All Changes'}
    </Button>
  );
}

type Project = {
  id: string;
  title: string;
  description: string;
  techStack: string;
  repoUrl: string;
  liveUrl: string;
  imageUrl: string;
};

export default function ManageProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const { toast } = useToast();

  const [state, formAction] = useActionState(updateProjects, {
    message: '',
    success: false,
  });

  const fetchAndSetProjects = () => {
    getProjects().then(data => {
      if (data) {
        const formattedProjects = data.map(p => ({
          ...p,
          techStack: Array.isArray(p.techStack) ? p.techStack.join(', ') : '',
        }));
        setProjects(formattedProjects);
      }
    });
  };

  useEffect(() => {
    fetchAndSetProjects();
  }, []);

  useEffect(() => {
    if (state.message) {
      toast({
        title: state.success ? 'Success' : 'Error',
        description: state.message,
        variant: state.success ? 'default' : 'destructive',
      });
      if (state.success) {
        fetchAndSetProjects();
      }
    }
  }, [state, toast]);

  const handleAddProject = () => {
    const newId = (projects.length > 0 ? Math.max(...projects.map(p => parseInt(p.id))) + 1 : 1).toString();
    setProjects([...projects, { id: newId, title: '', description: '', techStack: '', repoUrl: '', liveUrl: '', imageUrl: '' }]);
  };

  const handleRemoveProject = (id: string) => {
    setProjects(projects.filter(p => p.id !== id));
  };
  
  const handleProjectChange = (id: string, field: keyof Omit<Project, 'id'>, value: string) => {
    setProjects(projects.map(p => (p.id === id ? { ...p, [field]: value } : p)));
  };

  return (
    <div className="container mx-auto py-10">
      <Button asChild variant="outline" className="mb-8">
        <Link href="/admin/dashboard">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Dashboard
        </Link>
      </Button>

      <Card>
        <CardHeader>
          <CardTitle>Manage Projects</CardTitle>
          <CardDescription>
            Edit, add, or remove projects. Tech stack should be comma-separated. Leave 'Live Demo URL' blank to disable the button.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form action={formAction} className="space-y-8">
            <input type="hidden" name="projectsData" value={JSON.stringify(projects)} />
            
            {projects.map(project => (
              <div key={project.id} className="space-y-4 rounded-lg border p-4">
                <div className="flex items-center justify-between">
                  <Input
                    value={project.title}
                    onChange={(e) => handleProjectChange(project.id, 'title', e.target.value)}
                    placeholder="Project Title"
                    className="text-lg font-semibold"
                  />
                  <Button variant="ghost" size="icon" onClick={() => handleRemoveProject(project.id)}>
                    <Trash2 className="h-4 w-4 text-destructive" />
                    <span className="sr-only">Remove Project</span>
                  </Button>
                </div>
                
                <div className="space-y-2">
                  <Label>Description</Label>
                  <Textarea value={project.description} onChange={(e) => handleProjectChange(project.id, 'description', e.target.value)} placeholder="Project description..." />
                  
                  <Label>Tech Stack (comma-separated)</Label>
                  <Input value={project.techStack} onChange={(e) => handleProjectChange(project.id, 'techStack', e.target.value)} placeholder="React, Next.js, etc." />

                  <Label>Repository URL</Label>
                  <Input value={project.repoUrl} onChange={(e) => handleProjectChange(project.id, 'repoUrl', e.target.value)} placeholder="https://github.com/user/repo" />

                  <Label>Live Demo URL (optional)</Label>
                  <Input value={project.liveUrl} onChange={(e) => handleProjectChange(project.id, 'liveUrl', e.target.value)} placeholder="https://project-demo.com" />

                  <Label>Image URL (optional)</Label>
                  <Input value={project.imageUrl} onChange={(e) => handleProjectChange(project.id, 'imageUrl', e.target.value)} placeholder="https://image-url.com/image.png" />
                </div>
              </div>
            ))}
            
            <div className="flex flex-col md:flex-row gap-4">
              <Button type="button" variant="outline" onClick={handleAddProject}>
                <Plus className="mr-2 h-4 w-4" /> Add New Project
              </Button>
              <SubmitButton />
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
