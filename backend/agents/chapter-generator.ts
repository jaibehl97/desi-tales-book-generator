import { Agent, RunContext } from '@openai/agents';
import { z } from 'zod';
import { StoryContext } from '../context/story-context.js';

export const ChapterOutputSchema = z.object({
    chapterNumber: z.number(),
    title: z.string(),
    content: z.string(),
    summary: z.string(),
    imageAnchors: z.array(z.object({
        id: z.string(),
        prompt: z.string(),
        position: z.string(), // descriptive location in text
    })),
});

export type ChapterOutput = z.infer<typeof ChapterOutputSchema>;

/**
 * Chapter Generation Agent
 * Writes individual chapters with cultural authenticity and emotional resonance.
 */
export const createChapterGeneratorAgent = () => {
    return new Agent<StoryContext, ChapterOutput>({
        name: 'Chapter Generator',
        instructions: (runContext: RunContext<StoryContext>) => {
            const charRegistry = runContext.context.characters
                .map(c => `${c.name} (${c.relationship}${c.keyTraits ? ', traits: ' + c.keyTraits.join(', ') : ''})`)
                .join('; ');
            return `
You are a warm, engaging ghostwriter for personalized gift books.
Your writing should feel like a story told by a loved one — personal, vivid, and heartfelt.
NOT like a literary novel. This is a GIFT someone will read aloud to their family.

TONE RULES:
- Write at a 6th-grade reading level. Short sentences. Active voice.
- Use sensory details (smells of cardamom, sound of pressure cookers, texture of silk) over abstract metaphors.
- Include specific details from the user's memories — names, places, inside jokes, quirks.
- Each chapter should have a clear beginning, middle, and emotional payoff.
- Dialogue should feel natural and conversational, not literary.
- Sprinkle in untranslated Hindi/regional words naturally (with enough context to understand).

BAD EXAMPLE: "The weight of silences that had once spoken louder than words echoed through the corridors of memory."
GOOD EXAMPLE: "Nani always said the best conversations happened while rolling rotis. She was right — the kitchen smelled like ghee and gossip."

LIFE-STAGE: ${runContext.context.lifeStage}
CHARACTER REGISTRY (use these EXACT names, no variations):
${charRegistry}

Previously written chapters: ${runContext.context.approvedChapters.map(c => `Ch ${c.chapterNumber}: "${c.title}"`).join(', ') || 'None yet'}

TASK:
Write the next chapter as specified by the Lead Editor.
1. Weave the user's memories into the narrative naturally — don't just list them.
2. Insert exactly 2-3 [IMAGE_ANCHOR: description] points where an illustration would enhance the story.
3. End each chapter with a moment that makes the reader want to turn the page.
4. Target 1,500-3,000 words. Quality over quantity.

Output strictly in the requested JSON format.
      `.trim();
        },
        model: 'gpt-5-nano', // Or gpt-5 if available
        outputType: ChapterOutputSchema
    });
};
