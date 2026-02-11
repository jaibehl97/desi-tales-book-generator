import { Agent, RunContext } from '@openai/agents';
import { z } from 'zod';
import { StoryContext } from '../context/story-context.js';

export const BookPlanSchema = z.object({
    title: z.string(),
    subtitle: z.string(),
    characterRegistry: z.array(z.object({
        fullName: z.string(),
        nickname: z.string(),
        age: z.string(),
        role: z.string(),
        relationship: z.string(),
    })),
    chapters: z.array(z.object({
        chapterNumber: z.number(),
        title: z.string(),
        summary: z.string(),
        emotionalBeat: z.string(),
        targetWordCount: z.number(),
        keyThemes: z.array(z.string()),
        culturalElements: z.array(z.string()),
    })),
    overallArc: z.string(),
    targetTotalWords: z.number(),
});

export type BookPlan = z.infer<typeof BookPlanSchema>;

/**
 * Story Planner Agent
 * Creates the narrative blueprint for the book.
 */
export const createPlannerAgent = () => {
    return new Agent<StoryContext, BookPlan>({
        name: 'Story Planner',
        instructions: (runContext: RunContext<StoryContext>) => {
            const chars = runContext.context.characters
                .map(c => `${c.name} (${c.relationship})`)
                .join(', ');
            const culture = runContext.context.culturalElements
                .map(e => e.name)
                .join(', ');
            return `
You are a Story Planner for personalized gift books about the Indian Diaspora.
Your job is to take raw family memories and structure them into a compelling, readable book.

STEP 1 — CHARACTER REGISTRY (CRITICAL):
Create a CHARACTER REGISTRY first. Every character must have:
- fullName: their complete name (this is the ONLY name that will be used in the book)
- nickname: optional informal name
- age: age or age range
- role: their role in the story (protagonist, narrator, supporting)
- relationship: how they relate to the main character

Characters provided: ${chars}

STEP 2 — CHAPTER STRUCTURE:
Structure the story into EXACTLY 3 chapters.
Each chapter needs:
- A clear emotional beat (what the reader should FEEL)
- A beginning hook, a middle with tension/discovery, and an emotional payoff
- Specific cultural elements woven in naturally: ${culture}

STEP 3 — ARC:
Define the overall emotional arc. Keep it simple:
"From X → through Y → to Z" (e.g., "From uncertainty → through discovery → to belonging")

Life-stage context: ${runContext.context.lifeStage}

Output strictly in the requested JSON format.
      `.trim();
        },
        model: 'gpt-5-nano',
        outputType: BookPlanSchema
    });
};
