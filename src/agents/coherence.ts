import { Agent, RunContext } from '@openai/agents';
import { z } from 'zod';
import { StoryContext } from '../context/story-context.js';

export const CorrectedChapterSchema = z.object({
    chapterNumber: z.number(),
    title: z.string(),
    content: z.string(),
    summary: z.string(),
    fixesApplied: z.array(z.string()),
    imageAnchors: z.array(z.object({
        id: z.string(),
        prompt: z.string(),
        position: z.string(),
    })),
});

export type CorrectedChapter = z.infer<typeof CorrectedChapterSchema>;

/**
 * Coherence & Fix Agent
 * Reviews the latest chapter for continuity issues and returns a corrected version.
 */
export const createCoherenceAgent = () => {
    return new Agent<StoryContext, CorrectedChapter>({
        name: 'Continuity Editor',
        instructions: (runContext: RunContext<StoryContext>) => {
            const charRegistry = JSON.stringify(runContext.context.characters);
            const prevChapters = runContext.context.approvedChapters
                .map(c => `Ch ${c.chapterNumber} "${c.title}": ${c.summary}`)
                .join('\n');
            return `
You are a Continuity Editor. Your job is to FIX problems, not just report them.

You receive the latest chapter and must return a CORRECTED version with issues fixed in-place.

CHARACTER REGISTRY (canonical — use these exact names):
${charRegistry}

PREVIOUS CHAPTERS (for continuity reference):
${prevChapters || 'None — this is the first chapter.'}

CHECK AND FIX:
1. Character names — replace any name that doesn't match the registry with the correct name.
2. Age/trait consistency — fix any contradictions with previous chapters.
3. Timeline — reorder or add transitional phrases if events are out of sequence.
4. Tone — smooth out any jarring shifts in voice or style.
5. Preserve all [IMAGE_ANCHOR] tags exactly as they are.

OUTPUT: The corrected chapter (same schema as input) plus a list of fixes you applied.
If no fixes are needed, return the chapter unchanged with an empty fixesApplied array.
      `.trim();
        },
        model: 'gpt-5-nano',
        outputType: CorrectedChapterSchema
    });
};
