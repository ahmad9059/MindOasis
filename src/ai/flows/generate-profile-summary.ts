'use server';

/**
 * @fileOverview Generates a concise and insightful summary of a therapist's profile using AI.
 *
 * - generateProfileSummary - A function that generates the profile summary.
 * - GenerateProfileSummaryInput - The input type for the generateProfileSummary function.
 * - GenerateProfileSummaryOutput - The return type for the generateProfileSummary function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateProfileSummaryInputSchema = z.object({
  name: z.string().describe('The name of the therapist.'),
  education: z.string().describe('The education history of the therapist.'),
  experience: z.string().describe('The work history and positions of the therapist.'),
  expertise: z.string().describe('The specializations and treatment approaches of the therapist.'),
  about: z.string().describe('A personal statement/bio about the therapist.'),
});
export type GenerateProfileSummaryInput = z.infer<typeof GenerateProfileSummaryInputSchema>;

const GenerateProfileSummaryOutputSchema = z.object({
  summary: z.string().describe('A concise and insightful summary of the therapist profile.'),
});
export type GenerateProfileSummaryOutput = z.infer<typeof GenerateProfileSummaryOutputSchema>;

export async function generateProfileSummary(
  input: GenerateProfileSummaryInput
): Promise<GenerateProfileSummaryOutput> {
  return generateProfileSummaryFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateProfileSummaryPrompt',
  input: {schema: GenerateProfileSummaryInputSchema},
  output: {schema: GenerateProfileSummaryOutputSchema},
  prompt: `You are an AI assistant that specializes in creating concise and insightful summaries of therapist profiles.

  Given the following information about a therapist, generate a summary that highlights their qualifications, experience, and areas of expertise.

  Name: {{{name}}}
  Education: {{{education}}}
  Experience: {{{experience}}}
  Expertise: {{{expertise}}}
  About: {{{about}}}

  Summary:`,
});

const generateProfileSummaryFlow = ai.defineFlow(
  {
    name: 'generateProfileSummaryFlow',
    inputSchema: GenerateProfileSummaryInputSchema,
    outputSchema: GenerateProfileSummaryOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
