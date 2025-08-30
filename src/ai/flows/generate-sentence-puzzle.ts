'use server';

/**
 * @fileOverview This file defines a Genkit flow for generating sentence puzzles based on the user's age.
 *
 * @exports generateSentencePuzzle - A function that generates a sentence puzzle appropriate for the user's age.
 * @exports GenerateSentencePuzzleInput - The input type for the generateSentencePuzzle function.
 * @exports GenerateSentencePuzzleOutput - The output type for the generateSentencePuzzle function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateSentencePuzzleInputSchema = z.object({
  userAge: z
    .number()
    .describe('The age of the user.  Must be a positive integer.'),
});
export type GenerateSentencePuzzleInput = z.infer<
  typeof GenerateSentencePuzzleInputSchema
>;

const GenerateSentencePuzzleOutputSchema = z.object({
  puzzleType: z.string().describe('The type of puzzle generated.'),
  puzzleContent: z.string().describe('The puzzle content.'),
  solution: z.string().describe('The solution to the puzzle.'),
});
export type GenerateSentencePuzzleOutput = z.infer<
  typeof GenerateSentencePuzzleOutputSchema
>;

export async function generateSentencePuzzle(
  input: GenerateSentencePuzzleInput
): Promise<GenerateSentencePuzzleOutput> {
  return generateSentencePuzzleFlow(input);
}

const generateSentencePuzzlePrompt = ai.definePrompt({
  name: 'generateSentencePuzzlePrompt',
  input: {schema: GenerateSentencePuzzleInputSchema},
  output: {schema: GenerateSentencePuzzleOutputSchema},
  prompt: `You are a puzzle generator that creates sentence puzzles appropriate for the user's age.

  Generate one puzzle based on the user's age.  The puzzle should be fun and engaging.

  User's Age: {{{userAge}}}
  `,
});

const generateSentencePuzzleFlow = ai.defineFlow(
  {
    name: 'generateSentencePuzzleFlow',
    inputSchema: GenerateSentencePuzzleInputSchema,
    outputSchema: GenerateSentencePuzzleOutputSchema,
  },
  async input => {
    const {output} = await generateSentencePuzzlePrompt(input);
    return output!;
  }
);
