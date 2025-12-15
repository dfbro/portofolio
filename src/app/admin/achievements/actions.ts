'use server';

import fs from 'fs/promises';
import path from 'path';
import { z } from 'zod';
import { revalidatePath } from 'next/cache';

const achievementSchema = z.object({
  id: z.string(),
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
  organization: z.string().min(1, 'Organization is required'),
  date: z.string().min(1, 'Date is required'),
  url: z.string().url('Invalid URL format'),
  imageUrl: z.string().url('Invalid URL format').or(z.literal('')),
});

const achievementsFileSchema = z.object({
  achievements: z.array(achievementSchema),
});

const achievementsFilePath = path.join(process.cwd(), 'src/data/achievements.json');

export async function updateAchievements(
  prevState: { message: string; success: boolean },
  formData: FormData
): Promise<{ message: string; success: boolean }> {
  try {
    const rawData = formData.get('achievementsData') as string;
    const parsedData = JSON.parse(rawData);

    const validation = achievementsFileSchema.safeParse({ achievements: parsedData });

    if (!validation.success) {
      return { message: `Invalid data format: ${JSON.stringify(validation.error.flatten().fieldErrors)}`, success: false };
    }
    
    await fs.writeFile(achievementsFilePath, JSON.stringify(validation.data, null, 2));
    
    revalidatePath('/achievements');
    revalidatePath('/');
    revalidatePath('/api/achievements');

    return { message: 'Achievements updated successfully!', success: true };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred.';
    return { message: `Failed to update achievements: ${errorMessage}`, success: false };
  }
}
