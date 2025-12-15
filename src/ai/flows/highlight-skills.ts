'use server';
/**
 * @fileOverview Dynamically adjusts the emphasis on different skills based on visitor viewing patterns.
 *
 * - aiHighlightSkills - A function that returns a list of skills to highlight based on viewing patterns.
 * - AIHighlightSkillsInput - The input type for the aiHighlightSkills function.
 * - AIHighlightSkillsOutput - The return type for the aiHighlightSkills function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AIHighlightSkillsInputSchema = z.object({
  viewedSkills: z
    .array(z.string())
    .describe('List of skills viewed by the user, in order of viewing.'),
});
export type AIHighlightSkillsInput = z.infer<typeof AIHighlightSkillsInputSchema>;

const AIHighlightSkillsOutputSchema = z.object({
  highlightedSkills: z
    .array(z.string())
    .describe(
      'List of skills to highlight, ordered by relevance based on viewing patterns.'
    ),
});
export type AIHighlightSkillsOutput = z.infer<typeof AIHighlightSkillsOutputSchema>;

export async function aiHighlightSkills(input: AIHighlightSkillsInput): Promise<AIHighlightSkillsOutput> {
  return aiHighlightSkillsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'aiHighlightSkillsPrompt',
  input: {schema: AIHighlightSkillsInputSchema},
  output: {schema: AIHighlightSkillsOutputSchema},
  prompt: `You are an AI assistant that analyzes user viewing patterns on a web developer\'s portfolio to determine which skills should be highlighted. Given the list of skills viewed by a user, order the skills by relevance and importance, with the most relevant skills appearing first.

Viewed Skills: {{viewedSkills}}

Prioritized Skills:`, // Updated prompt to request prioritized skills
});

const aiHighlightSkillsFlow = ai.defineFlow(
  {
    name: 'aiHighlightSkillsFlow',
    inputSchema: AIHighlightSkillsInputSchema,
    outputSchema: AIHighlightSkillsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
