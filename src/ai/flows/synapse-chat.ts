'use server';

/**
 * @fileOverview A chatbot flow for SynapseAI that can answer questions about projects.
 *
 * - synapseChat - A function that handles the chatbot interaction.
 * - getProjectStatus - A tool that allows the AI to fetch the status of a project.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

// Mock data source for project statuses. In a real application, this would
// likely come from a database or a project management API.
const projectData = [
  {
    name: 'Project Phoenix',
    status: 'On Track',
    summary: 'The project is currently in the final stages of user acceptance testing. Deployment to staging is complete.',
  },
  {
    name: 'QuantumLeap',
    status: 'In Progress',
    summary: 'The team is actively working on user feedback from the last session and fixing critical bugs.',
  },
  { name: 'Project Nova', status: 'On Hold', summary: 'The project is currently on hold pending budget approval for the next phase.' },
  { name: 'Orion', status: 'At Risk', summary: 'Project Orion is facing some delays due to unforeseen technical challenges.' },
  { name: 'Helios', status: 'Delayed', summary: 'Helios is behind schedule. A revised timeline is being prepared.' },
  { name: 'Vega', status: 'Completed', summary: 'Project Vega was successfully completed last month.' },
];

const getProjectStatus = ai.defineTool(
  {
    name: 'getProjectStatus',
    description: 'Returns the status and summary for a given project.',
    inputSchema: z.object({
      projectName: z.string().describe('The name of the project to get the status for.'),
    }),
    outputSchema: z.object({
      status: z.string(),
      summary: z.string(),
    }),
  },
  async (input) => {
    const project = projectData.find((p) => p.name.toLowerCase() === input.projectName.toLowerCase());
    if (!project) {
      return {
        status: 'Not Found',
        summary: `Project '${input.projectName}' could not be found.`,
      };
    }
    return {
      status: project.status,
      summary: project.summary,
    };
  }
);

const synapseChatPrompt = ai.definePrompt({
  name: 'synapseChatPrompt',
  tools: [getProjectStatus],
  system: `You are SynapseAI, the cognitive nervous system for organizations.
Your role is to provide clear, concise, and accurate information about project status.
When a user asks about a project, use the getProjectStatus tool to fetch the latest information.
If the project is not found, inform the user politely.
Keep your answers brief and to the point.`,
});

export const synapseChat = ai.defineFlow(
  {
    name: 'synapseChatFlow',
    inputSchema: z.string(),
    outputSchema: z.string(),
  },
  async (query) => {
    const llmResponse = await synapseChatPrompt(query);
    const text = llmResponse.text;
    if (text) {
      return text;
    }

    const toolCalls = llmResponse.toolCalls;
    if (toolCalls.length > 0) {
      const toolResponse = await llmResponse.performTools();
      const finalResponse = await synapseChatPrompt(query, {toolResponse});
      return finalResponse.text ?? "I'm sorry, I couldn't process that request.";
    }

    return "I'm not sure how to help with that. Can you ask about a project's status?";
  }
);
