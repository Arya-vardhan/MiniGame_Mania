'use server';

/**
 * @fileOverview This file defines a Genkit flow for generating a charade word or phrase.
 *
 * @exports generateCharade - A function that generates a charade based on a category.
 * @exports GenerateCharadeInput - The input type for the generateCharade function.
 * @exports GenerateCharadeOutput - The output type for the generateCharade function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateCharadeInputSchema = z.object({
  category: z
    .string()
    .describe('The category for the charade (e.g., Movie, Object, Action).'),
});
export type GenerateCharadeInput = z.infer<typeof GenerateCharadeInputSchema>;

const GenerateCharadeOutputSchema = z.object({
  word: z.string().describe('The word or phrase to be acted out.'),
});
export type GenerateCharadeOutput = z.infer<typeof GenerateCharadeOutputSchema>;

export async function generateCharade(
  input: GenerateCharadeInput
): Promise<GenerateCharadeOutput> {
  return generateCharadeFlow(input);
}

const generateCharadePrompt = ai.definePrompt({
  name: 'generateCharadePrompt',
  input: {schema: GenerateCharadeInputSchema},
  output: {schema: GenerateCharadeOutputSchema},
  prompt: `Generate a single, fun, and commonly known charade word or phrase based on the given category.

  Category: {{{category}}}
  
  The word should be something that can be acted out. Avoid obscure or difficult words.
  `,
});

const generateCharadeFlow = ai.defineFlow(
  {
    name: 'generateCharadeFlow',
    inputSchema: GenerateCharadeInputSchema,
    outputSchema: GenerateCharadeOutputSchema,
  },
  async input => {
    const {output} = await generateCharadePrompt(input);
    return output!;
  }
);
