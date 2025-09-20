'use server';

/**
 * @fileOverview Implements the Adaptive Project Management flow for SynapseAI.
 *
 * - adaptiveProjectManagement - A function that provides real-time adaptive project management.
 * - AdaptiveProjectManagementInput - The input type for the adaptiveProjectManagement function.
 * - AdaptiveProjectManagementOutput - The return type for the adaptiveProjectManagement function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AdaptiveProjectManagementInputSchema = z.object({
  projectDescription: z
    .string()
    .describe('A detailed description of the project, its goals, and objectives.'),
  teamStructures: z
    .string()
    .describe('An overview of the different teams involved and their roles.'),
  currentStatus: z
    .string()
    .describe('A summary of the current project status, including progress, roadblocks, and recent milestones.'),
  performanceData: z
    .string()
    .describe('Data on team and individual performance, including metrics like task completion rate and time spent on tasks.'),
});
export type AdaptiveProjectManagementInput = z.infer<typeof AdaptiveProjectManagementInputSchema>;

const AdaptiveProjectManagementOutputSchema = z.object({
  recommendations: z
    .string()
    .describe('Specific recommendations for optimizing project management, such as task re-allocation or workflow adjustments.'),
  riskAssessment: z
    .string()
    .describe('An assessment of potential risks to the project and suggested mitigation strategies.'),
  performanceForecast: z
    .string()
    .describe('A forecast of future project performance based on current trends and proposed changes.'),
  strategicAlignment: z
    .string()
    .describe('An explanation of how the project adjustments align with the overall strategic goals of the organization.'),
});
export type AdaptiveProjectManagementOutput = z.infer<typeof AdaptiveProjectManagementOutputSchema>;

export async function adaptiveProjectManagement(
  input: AdaptiveProjectManagementInput
): Promise<AdaptiveProjectManagementOutput> {
  return adaptiveProjectManagementFlow(input);
}

const prompt = ai.definePrompt({
  name: 'adaptiveProjectManagementPrompt',
  input: {schema: AdaptiveProjectManagementInputSchema},
  output: {schema: AdaptiveProjectManagementOutputSchema},
  prompt: `You are an expert project manager, skilled in data-driven optimization.

  Based on the project description, team structures, current status, and performance data, provide actionable recommendations, a risk assessment, a performance forecast, and explain how the changes align with strategic goals.

  Project Description: {{{projectDescription}}}
  Team Structures: {{{teamStructures}}}
  Current Status: {{{currentStatus}}}
  Performance Data: {{{performanceData}}}

  Provide your output using the following keys and datatypes, as Zod descriptions:

  - recommendations: Specific recommendations for optimizing project management, such as task re-allocation or workflow adjustments. (string)
  - riskAssessment: An assessment of potential risks to the project and suggested mitigation strategies. (string)
  - performanceForecast: A forecast of future project performance based on current trends and proposed changes. (string)
  - strategicAlignment: An explanation of how the project adjustments align with the overall strategic goals of the organization. (string)`,
});

const adaptiveProjectManagementFlow = ai.defineFlow(
  {
    name: 'adaptiveProjectManagementFlow',
    inputSchema: AdaptiveProjectManagementInputSchema,
    outputSchema: AdaptiveProjectManagementOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
