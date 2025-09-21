'use server';

/**
 * @fileOverview A chatbot flow for SynapseAI that can answer questions about projects.
 *
 * - synapseChat - A function that handles the chatbot interaction.
 * - getProjectStatus - A tool that allows the AI to fetch the status of a project.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import { Message, part } from 'genkit';

// Mock data source for project statuses. In a real application, this would
// likely come from a database or a project management API.
const projectData = [
  {
    name: 'Project Phoenix',
    status: 'On Track',
    summary: 'The project is currently in the final stages of user acceptance testing. Deployment to staging is complete, and we are on track for a launch next week.',
    progress: 95,
  },
  {
    name: 'QuantumLeap',
    status: 'In Progress',
    summary: 'The team is actively working on user feedback from the last session and fixing critical bugs. The current focus is on the data migration module.',
    progress: 78,
  },
  {
    name: 'Project Nova',
    status: 'On Hold',
    summary: 'Project Nova is currently on hold pending budget approval for the next phase. All development work has been paused until further notice.',
    progress: 45,
  },
  {
    name: 'Orion',
    status: 'At Risk',
    summary: "Project Orion is facing significant delays due to unforeseen technical challenges with a third-party API. The team is working on a workaround, but the timeline is at risk.",
    progress: 60,
  },
  {
    name: 'Helios',
    status: 'Delayed',
    summary: 'Helios is behind schedule by two weeks due to a resource shortage. A revised timeline is being prepared and will be shared by the end of the week.',
    progress: 25,
  },
  {
    name: 'Vega',
    status: 'Completed',
    summary: 'Project Vega was successfully completed last month, delivering all key features on time and within budget. The project is now in maintenance mode.',
    progress: 100,
  },
  {
    name: 'Apollo',
    status: 'In Progress',
    summary: "The Apollo project is proceeding as planned. The development team is currently focused on building out the core infrastructure. Sprint 3 is about to commence.",
    progress: 50,
  },
  {
    name: 'Customer Voice',
    status: 'On Track',
    summary: 'The Customer Voice initiative is on schedule. The latest round of customer surveys has been analyzed, and the insights are being compiled for the product team.',
    progress: 80,
  },
  {
    name: 'AutomateIt',
    status: 'Completed',
    summary: 'The AutomateIt project was successfully rolled out across the organization, resulting in a 15% reduction in manual data entry tasks.',
    progress: 100,
  },
  {
    name: 'Market Entry Alpha',
    status: 'In Progress',
    summary: 'The initial market research for the new European market is complete. The team is now developing the go-to-market strategy.',
    progress: 30,
  },
  {
    name: 'Compliance Framework',
    status: 'At Risk',
    summary: 'The Compliance Framework project is at risk due to evolving regulatory requirements. The legal team is reviewing the latest changes, which may impact the project scope.',
    progress: 15,
  },
  {
    name: 'Partner API Integration',
    status: 'On Track',
    summary: 'The integration with our new strategic partner is 90% complete. Final testing is underway, and the API is expected to go live next week.',
    progress: 90,
  },
  {
    name: 'Co-Marketing Campaign',
    status: 'Completed',
    summary: 'The co-marketing campaign with our partner was a success, exceeding lead generation targets by 20%.',
    progress: 100,
  },
  {
    name: 'Project Titan',
    status: 'On Track',
    summary: 'Project Titan is progressing smoothly. The team has just completed a major milestone, and the project is 85% complete and on schedule for its deadline.',
    progress: 85,
  },
  {
    name: 'Localization Initiative',
    status: 'On Track',
    summary: 'The content localization for the German and French markets is on track. The translation phase is 40% complete.',
    progress: 40,
  },
];


const getProjectStatus = ai.defineTool(
  {
    name: 'getProjectStatus',
    description: 'Returns the status, summary, and progress for a given project.',
    inputSchema: z.object({
      projectName: z.string().describe('The name of the project to get the status for.'),
    }),
    outputSchema: z.object({
      status: z.string(),
      summary: z.string(),
      progress: z.number(),
    }),
  },
  async (input) => {
    const project = projectData.find((p) => p.name.toLowerCase() === input.projectName.toLowerCase());
    if (!project) {
      return {
        status: 'Not Found',
        summary: `Project '${input.projectName}' could not be found.`,
        progress: 0,
      };
    }
    return {
      status: project.status,
      summary: project.summary,
      progress: project.progress,
    };
  }
);

const systemPrompt = `You are AGENT X, an AI assistant for SynapseAI, the cognitive nervous system for organizations.
Your role is to provide clear, concise, and accurate information about project status.
When a user asks about a project, use the getProjectStatus tool to fetch the latest information.
If the project is not found, inform the user politely.
Your answers should be helpful and conversational. If you have the data, also include the project's progress percentage.`;


export const synapseChat = ai.defineFlow(
  {
    name: 'synapseChatFlow',
    inputSchema: z.string(),
    outputSchema: z.string(),
  },
  async (query) => {
    const history: Message[] = [
      new Message({
        role: 'user',
        content: [{ text: query }],
      }),
    ];

    const llmResponse = await ai.generate({
      prompt: history,
      system: systemPrompt,
      tools: [getProjectStatus],
    });

    const choice = llmResponse.choices[0];
    if (choice.message.content.length > 0 && choice.finishReason !== 'toolCode') {
      return choice.text;
    }

    if (choice.finishReason === 'toolCode') {
      const toolRequest = choice.message.toolRequest;
      if (!toolRequest) {
        return "I'm sorry, I couldn't process that request.";
      }
      history.push(choice.message);
      const toolResponse = await llmResponse.performTools();

      history.push(
        new Message({
          role: 'tool',
          content: toolResponse.map(r => ({
            toolRequest,
            toolResponse: r,
          }))
        })
      );
      
      const finalResponse = await ai.generate({
        prompt: history,
        system: systemPrompt,
        tools: [getProjectStatus]
      });
      return finalResponse.text ?? "I'm sorry, I couldn't process that request.";
    }

    return "I'm not sure how to help with that. Can you ask about a project's status?";
  }
);
