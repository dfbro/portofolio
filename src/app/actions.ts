'use server';

import { z } from 'zod';
import { contactSchema } from '@/lib/schemas';


export async function submitContactForm(data: z.infer<typeof contactSchema>) {
  const validatedFields = contactSchema.safeParse(data);

  if (!validatedFields.success) {
    return {
      success: false,
      message: 'Invalid data provided.',
    };
  }
  
  // Here you would typically send an email or save to a database.
  // For this example, we'll just log the data.
  console.log('New contact form submission:', validatedFields.data);

  return {
    success: true,
    message: 'Thank you for your message! I will get back to you soon.',
  };
}
