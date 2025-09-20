// src/ai/flows/generate-strategic-narrative.ts
'use server';

/**
 * @fileOverview This file defines a Genkit flow for generating strategic narratives from project data.
 *
 * - generateStrategicNarrative - An async function that takes project data as input and returns a strategic narrative.
 * - GenerateStrategicNarrativeInput - The input type for the generateStrategicNarrative function.
 * - GenerateStrategicNarrativeOutput - The output type for the generateStrategicNarrative function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateStrategicNarrativeInputSchema = z.object({
  projectName: z.string().describe('The name of the project.'),
  projectGoals: z.string().describe('The goals of the project.'),
  progressSummary: z.string().describe('A summary of the project progress.'),
  keyAchievements: z.string().describe('Key achievements of the project.'),
  challengesFaced: z.string().describe('Challenges faced during the project.'),
  alignmentToStrategicGoals: z.string().describe('How the project aligns with strategic goals.'),
});
export type GenerateStrategicNarrativeInput = z.infer<
  typeof GenerateStrategicNarrativeInputSchema
>;

const GenerateStrategicNarrativeOutputSchema = z.object({
  strategicNarrative: z
    .string()
    .describe('A strategic narrative summarizing the project.'),
});
export type GenerateStrategicNarrativeOutput = z.infer<
  typeof GenerateStrategicNarrativeOutputSchema
>;

export async function generateStrategicNarrative(
  input: GenerateStrategicNarrativeInput
): Promise<GenerateStrategicNarrativeOutput> {
  return generateStrategicNarrativeFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateStrategicNarrativePrompt',
  input: {schema: GenerateStrategicNarrativeInputSchema},
  output: {schema: GenerateStrategicNarrativeOutputSchema},
  prompt: `You are a strategic communications expert tasked with crafting compelling narratives from project data.

  Based on the following project information, generate a strategic narrative that highlights the project's progress, achievements, and alignment with overall strategic goals.  The narrative should be clear, concise, and engaging for stakeholders.

  Project Name: {{{projectName}}}
  Project Goals: {{{projectGoals}}}
  Progress Summary: {{{progressSummary}}}
  Key Achievements: {{{keyAchievements}}}
  Challenges Faced: {{{challengesFaced}}}
  Alignment to Strategic Goals: {{{alignmentToStrategicGoals}}}

  Strategic Narrative:`,
});

const generateStrategicNarrativeFlow = ai.defineFlow(
  {
    name: 'generateStrategicNarrativeFlow',
    inputSchema: GenerateStrategicNarrativeInputSchema,
    outputSchema: GenerateStrategicNarrativeOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
