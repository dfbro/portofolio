'use server';

import fs from 'fs/promises';
import path from 'path';
import { z } from 'zod';
import { revalidatePath } from 'next/cache';

const projectSchema = z.object({
  id: z.string(),
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
  techStack: z.array(z.string()),
  repoUrl: z.string().url('Invalid URL format for repository').or(z.literal('')),
  liveUrl: z.string().url('Invalid URL format for live demo').or(z.literal('')),
  imageUrl: z.string().url('Invalid URL format for image').or(z.literal('')),
});

const projectsFileSchema = z.object({
  projects: z.array(projectSchema),
});

const projectsFilePath = path.join(process.cwd(), 'src/data/projects.json');

export async function updateProjects(
  prevState: { message: string; success: boolean },
  formData: FormData
): Promise<{ message: string; success: boolean }> {
  try {
    const rawData = formData.get('projectsData') as string;
    const parsedData = JSON.parse(rawData);

    const updatedProjects = parsedData.map((project: any) => ({
      ...project,
      techStack: typeof project.techStack === 'string'
        ? project.techStack.split(',').map((s: string) => s.trim()).filter(Boolean)
        : [],
    }));

    const validation = projectsFileSchema.safeParse({ projects: updatedProjects });

    if (!validation.success) {
      return { message: `Invalid data format: ${JSON.stringify(validation.error.flatten().fieldErrors)}`, success: false };
    }
    
    await fs.writeFile(projectsFilePath, JSON.stringify(validation.data, null, 2));
    
    revalidatePath('/projects');
    revalidatePath('/');
    revalidatePath('/api/projects');

    return { message: 'Projects updated successfully!', success: true };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred.';
    return { message: `Failed to update projects: ${errorMessage}`, success: false };
  }
}
