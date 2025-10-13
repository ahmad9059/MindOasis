
'use server';

/**
 * @fileOverview A conversational AI flow to recommend therapists.
 *
 * - recommendTherapist - A function that provides recommendations based on user queries.
 */

import { ai } from '@/ai/genkit';
import { RecommendTherapistInputSchema, RecommendTherapistOutputSchema, type RecommendTherapistInput, type RecommendTherapistOutput } from '@/lib/types';


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
  async ({ query, history, therapists }) => {
    const systemPrompt = `You are a compassionate and helpful AI assistant for "Mind Oasis," a platform that helps users find mental health professionals. Your goal is to understand the user's needs and provide recommendations from the provided list of therapists.

- **Available Therapists**: You have been provided with a JSON list of available therapists. Use this information exclusively to answer questions about therapists and to make recommendations.
- **NEVER** make up information about a therapist. Only use the data provided.
- **Recommendation**: If a user describes a problem (e.g., "I'm feeling anxious," "I have relationship problems"), identify relevant therapists from the list based on their 'expertise' and 'about' sections. Present 1-3 recommendations. For each, include:
    - Name
    - City
    - A brief (1-2 sentence) summary of why they might be a good fit, based on their profile.
    - Fee per session.
- **Specific Questions**: If a user asks a specific question about a therapist (e.g., "What is Dr. Ahmed's specialty?"), find that therapist in the list and provide the requested information.
- **General Guidance**: If you cannot find a suitable therapist, or if the user asks a general question, suggest they use the search and filter features on the website to explore options themselves.
- **Tone**: Your tone should be empathetic, supportive, and professional. Use Markdown for formatting (e.g., bolding names, using bullet points for lists).
- **Safety**: Do NOT ask for personally identifiable information (PII). Do not act as a therapist; your primary role is to guide the user to a professional on the platform.

**Therapist Data:**
\`\`\`json
${JSON.stringify(therapists, null, 2)}
\`\`\`
`;
    
    const response = await ai.generate({
        history: [
            ...toGenkitHistory(history),
        ],
        prompt: query,
        system: systemPrompt,
    });

    return {
      recommendation: response.text,
    };
  }
);
