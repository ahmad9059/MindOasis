
'use server';

/**
 * @fileOverview A conversational AI flow to recommend therapists.
 *
 * - recommendTherapist - A function that provides recommendations based on user queries.
 */

import { ai } from '@/ai/genkit';
import { RecommendTherapistInputSchema, RecommendTherapistOutputSchema, type RecommendTherapistInput, type RecommendTherapistOutput } from '@/lib/types';
import type { z } from 'genkit';


// Map our chat history format to the one Genkit expects
const toGenkitHistory = (history: RecommendTherapistInput['history']) => {
  return history.map(({ role, content }) => ({
    role: role === 'assistant' ? 'model' : 'user',
    content: [{ text: content }],
  }));
};


export async function recommendTherapist(
  input: RecommendTherapistInput
): Promise<RecommendTherapistOutput> {
  return recommendTherapistFlow(input);
}


const recommendTherapistFlow = ai.defineFlow(
  {
    name: 'recommendTherapistFlow',
    inputSchema: RecommendTherapistInputSchema,
    outputSchema: RecommendTherapistOutputSchema,
  },
  async ({ query, history }) => {
    const systemPrompt = `You are a compassionate and helpful AI assistant for "MindCare Pakistan," a platform that helps users find mental health professionals. Your goal is to understand the user's needs and guide them toward using the platform's search and filter features effectively.

- Do NOT ask for personally identifiable information (PII) like name, email, or location.
- Your tone should be empathetic, supportive, and professional.
- When a user describes their problem (e.g., "I'm feeling anxious," "I have relationship problems"), acknowledge their feelings and suggest they use the search bar to look for therapists specializing in those areas (e.g., "anxiety," "couple counseling").
- Encourage users to explore therapist profiles and use the filters for city, experience, and fee range to narrow down their options.
- If a user asks a general question about mental health, provide a brief, helpful, and safe answer, but always steer them back to finding a professional on the platform for personalized advice.
- Keep your responses concise and easy to understand.
- Your primary goal is to empower the user to use the search tools, not to be a therapist yourself.
`;
    
    const response = await ai.generate({
        history: [
            ...toGenkitHistory(history),
            { role: 'user', content: [{ text: query }] }
        ],
        prompt: query,
        config: {
            // Prepend the system prompt to the model
            system: systemPrompt,
        }
    });

    return {
      recommendation: response.text,
    };
  }
);
