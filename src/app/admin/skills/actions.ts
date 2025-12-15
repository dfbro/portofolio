'use server';

import fs from 'fs/promises';
import path from 'path';
import { z } from 'zod';
import { revalidatePath } from 'next/cache';

const skillsSchema = z.record(z.string().min(1), z.array(z.string().min(1)));

const skillsFilePath = path.join(process.cwd(), 'src/data/skills.json');

export async function getSkills() {
  try {
    const data = await fs.readFile(skillsFilePath, 'utf-8');
    const skills = JSON.parse(data);
    return skillsSchema.parse(skills);
  } catch (error) {
    console.error('Error reading skills data:', error);
    return null;
  }
}

export async function updateSkills(
  prevState: { message: string; success: boolean },
  formData: FormData
): Promise<{ message: string; success: boolean }> {
  try {
    const data = JSON.parse(formData.get('skillsData') as string);
    
    const updatedSkills: Record<string, string[]> = {};

    for (const item of data) {
       if (item.category && item.skills) {
         updatedSkills[item.category] = item.skills.split(',').map((s: string) => s.trim()).filter(Boolean);
       }
    }
    
    // Allow empty object for skills
    const validation = z.record(z.string(), z.array(z.string())).safeParse(updatedSkills);

    if (!validation.success) {
      return { message: `Invalid data format: ${validation.error.message}`, success: false };
    }
    
    await fs.writeFile(skillsFilePath, JSON.stringify(validation.data, null, 2));
    
    revalidatePath('/');
    revalidatePath('/#skills');

    return { message: 'Skills updated successfully!', success: true };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred.';
    return { message: `Failed to update skills: ${errorMessage}`, success: false };
  }
}
