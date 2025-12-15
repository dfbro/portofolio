'use server';

import fs from 'fs/promises';
import path from 'path';
import { z } from 'zod';
import { revalidatePath } from 'next/cache';

const skillsSchema = z.record(z.string().min(1), z.array(z.string().min(1)));

const skillsFilePath = path.join(process.cwd(), 'src/data/skills.json');

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
       } else if (item.category) {
         updatedSkills[item.category] = [];
       }
    }
    
    const validation = z.record(z.string(), z.array(z.string())).safeParse(updatedSkills);

    if (!validation.success) {
      return { message: `Invalid data format: ${validation.error.message}`, success: false };
    }
    
    await fs.writeFile(skillsFilePath, JSON.stringify(validation.data, null, 2));
    
    revalidatePath('/#skills');
    revalidatePath('/');
    revalidatePath('/api/skills');


    return { message: 'Skills updated successfully!', success: true };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred.';
    return { message: `Failed to update skills: ${errorMessage}`, success: false };
  }
}
