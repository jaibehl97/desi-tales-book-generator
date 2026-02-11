import { Agent, RunContext, tool } from '@openai/agents';
import { z } from 'zod';
import { StoryContext } from '../context/story-context.js';

export const ImageSequenceSchema = z.object({
    images: z.array(z.object({
        anchorId: z.string(),
        imageUrl: z.string(),
        prompt: z.string(),
        culturalElements: z.array(z.string()),
    })),
});

export type ImageSequence = z.infer<typeof ImageSequenceSchema>;

/**
 * Image Sequence Agent
 * Generates visual assets using Nano Banana Pro (mocked with Gemini for testing).
 */
export const createImageSequenceAgent = () => {

    // Tool for image generation
    const generateImage = tool({
        name: 'generate_desi_image',
        description: 'Generates a high-quality 4K image with consistent character rendering.',
        parameters: z.object({
            prompt: z.string(),
            characterTraits: z.array(z.string()),
            culturalContext: z.string(),
        }),
        async execute({ prompt, characterTraits, culturalContext }) {
            console.log(`[NanoBananaPro] Generating image: ${prompt}`);
            // In testing, we use gemini-2.5-flash-image or a placeholder
            // For now, return a placeholder URL
            return `https://images.desitales.ai/generated/${Buffer.from(prompt).toString('base64').slice(0, 10)}.png`;
        }
    });

    return new Agent<StoryContext, ImageSequence>({
        name: 'Visual Director',
        instructions: (runContext: RunContext<StoryContext>) => {
            return `
You are the Visual Director for Desi Tales.
Your goal is to create a consistent, museum-quality visual sequence for the book.

Characters: ${JSON.stringify(runContext.context.characters)}
Style: ${runContext.context.metadata.imageStyle || 'Editorial, Architectural Digest meets AI'}

Task:
1. Examine all [IMAGE_ANCHOR] points in the approved chapters.
2. For each anchor, generate a detailed prompt for the 'generate_desi_image' tool.
3. Ensure character consistency (clothing style, physical traits) across all images.
4. Integrate specific cultural elements relevant to the scene.

Return the sequence of generated image metadata.
      `.trim();
        },
        model: 'gpt-5-nano',
        tools: [generateImage],
        outputType: ImageSequenceSchema
    });
};
