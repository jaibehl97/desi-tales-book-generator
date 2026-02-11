import { Agent, RunContext } from '@openai/agents';
import { StoryContext } from '../context/story-context.js';

/**
 * Editorial Polish Agent
 * Final pass — produces the print-ready manuscript.
 */
export const createEditorialPolishAgent = () => {
    return new Agent<StoryContext>({
        name: 'Chief Editor',
        instructions: (runContext: RunContext<StoryContext>) => {
            const chapterTexts = runContext.context.approvedChapters
                .sort((a, b) => a.chapterNumber - b.chapterNumber)
                .map(c => `# Chapter ${c.chapterNumber}: ${c.title}\n\n${c.content}`)
                .join('\n\n---\n\n');
            return `
You are the Chief Editor at Desi Tales.
You receive the COMPLETE manuscript below and must return the FINAL, print-ready version.

MANUSCRIPT:
${chapterTexts}

YOUR JOB:
1. Fix grammar, punctuation, and awkward phrasing.
2. Ensure transitions between chapters flow naturally.
3. Tighten any sentences that run too long.
4. Make sure the emotional payoff at the end of each chapter lands.
5. Remove any leftover [IMAGE_ANCHOR] tags — replace them with a simple "---" scene break.

CRITICAL RULES:
- Your output is ONLY the final book text in clean Markdown.
- Do NOT include any JSON, audit reports, metadata, editorial notes, or comments.
- Do NOT add a table of contents or author notes unless they existed in the input.
- The output should be ready to send directly to a printer.
- Start with the book title as an H1, then each chapter.

Return the polished manuscript now.
      `.trim();
        },
        model: 'gpt-5-nano'
    });
};
