'use server';
/**
 * @fileOverview An AI agent to generate AI-powered insights and recommendations based on organizational data.
 *
 * - getAiPoweredInsights - A function that handles the generation of insights and recommendations.
 * - GetAiPoweredInsightsInput - The input type for the getAiPoweredInsights function.
 * - GetAiPoweredInsightsOutput - The return type for the getAiPoweredInsights function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GetAiPoweredInsightsInputSchema = z.object({
  organizationalData: z
    .string()
    .describe('The organizational data to analyze.'),
});
export type GetAiPoweredInsightsInput = z.infer<typeof GetAiPoweredInsightsInputSchema>;

const GetAiPoweredInsightsOutputSchema = z.object({
  insights: z.string().describe('The generated insights.'),
  recommendations: z.string().describe('The recommendations based on the insights.'),
});
export type GetAiPoweredInsightsOutput = z.infer<typeof GetAiPoweredInsightsOutputSchema>;

export async function getAiPoweredInsights(input: GetAiPoweredInsightsInput): Promise<GetAiPoweredInsightsOutput> {
  return getAiPoweredInsightsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'getAiPoweredInsightsPrompt',
  input: {schema: GetAiPoweredInsightsInputSchema},
  output: {schema: GetAiPoweredInsightsOutputSchema},
  prompt: `You are an AI assistant designed to provide insights and recommendations based on organizational data.

  Analyze the following organizational data:
  {{organizationalData}}

  Based on the analysis, provide key insights and actionable recommendations.
  Insights:
  Recommendations:`,
});

const getAiPoweredInsightsFlow = ai.defineFlow(
  {
    name: 'getAiPoweredInsightsFlow',
    inputSchema: GetAiPoweredInsightsInputSchema,
    outputSchema: GetAiPoweredInsightsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
