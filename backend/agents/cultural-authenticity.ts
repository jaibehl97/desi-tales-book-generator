import { Agent, RunContext } from '@openai/agents';
import { z } from 'zod';
import { StoryContext } from '../context/story-context.js';

export const CulturalAuditSchema = z.object({
    isAuthentic: z.boolean(),
    score: z.number().min(0).max(100),
    concerns: z.array(z.object({
        location: z.string(),
        issue: z.string(),
        suggestion: z.string(),
    })),
    praises: z.array(z.string()),
});

export type CulturalAudit = z.infer<typeof CulturalAuditSchema>;

/**
 * Cultural Authenticity Agent
 * Validates cultural accuracy and Diaspora sensitivity.
 */
export const createCulturalAuthenticityAgent = () => {
    return new Agent<StoryContext, CulturalAudit>({
        name: 'Cultural Custodian',
        instructions: (runContext: RunContext<StoryContext>) => {
            return `
You are the Cultural Custodian for Desi Tales. 
Your expertise covers the 32 million-strong Indian Diaspora.

Reference Context:
Region: ${runContext.context.culturalElements.map(e => e.region).join(', ')}
Traditions: ${runContext.context.culturalElements.map(e => e.name).join(', ')}

Review the entire book (text and image prompts) for:
1. Authentic use of regional languages (Hindi, Tamil, Punjabi, etc.).
2. Accurate representation of rituals (weddings, pujas, naming ceremonies).
3. Nuance in the Diaspora experience (the "Immigrant Hustle", identity building).
4. Potential stereotypes or "tourist-gaze" portrayals to avoid.

Provide a detailed cultural audit.
      `.trim();
        },
        model: 'gpt-5-nano',
        outputType: CulturalAuditSchema
    });
};
