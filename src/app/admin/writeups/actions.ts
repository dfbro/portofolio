
'use server';

import fs from 'fs/promises';
import path from 'path';
import { z } from 'zod';
import { revalidatePath } from 'next/cache';

const writeupSchema = z.object({
  id: z.string(),
  event: z.string().min(1, 'Event name is required'),
  rank: z.string().min(1, 'Rank is required'),
  date: z.string().min(1, 'Date is required'),
  writeupUrl: z.string().url('Invalid URL format').or(z.literal('')),
  imageUrl: z.string().url('Invalid URL format').or(z.literal('')),
});

const writeupsFileSchema = z.object({
  writeups: z.array(writeupSchema),
});

const writeupsFilePath = path.join(process.cwd(), 'src/data/writeups.json');

export async function updateWriteups(
  prevState: { message: string; success: boolean },
  formData: FormData
): Promise<{ message: string; success: boolean }> {
  try {
    const rawData = formData.get('writeupsData') as string;
    const parsedData = JSON.parse(rawData);

    const validation = writeupsFileSchema.safeParse({ writeups: parsedData });

    if (!validation.success) {
      return { message: `Invalid data format: ${JSON.stringify(validation.error.flatten().fieldErrors)}`, success: false };
    }
    
    await fs.writeFile(writeupsFilePath, JSON.stringify(validation.data, null, 2));
    
    revalidatePath('/ctf');
    revalidatePath('/');
    revalidatePath('/api/writeups');

    return { message: 'Write-ups updated successfully!', success: true };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred.';
    return { message: `Failed to update write-ups: ${errorMessage}`, success: false };
  }
}
