import { z } from 'zod';

export const CharacterSchema = z.object({
    name: z.string(),
    relationship: z.string(),
    culturalBackground: z.string().optional(),
    keyTraits: z.array(z.string()).optional(),
    visualDescription: z.string().optional(),
});

export const CulturalElementSchema = z.object({
    type: z.enum(['festival', 'food', 'tradition', 'language', 'other']),
    name: z.string(),
    description: z.string(),
    region: z.string().optional(),
});

export const StoryContextSchema = z.object({
    lifeStage: z.enum(['newParent', 'couple', 'founder', 'elder']),
    characters: z.array(CharacterSchema),
    culturalElements: z.array(CulturalElementSchema),
    timeline: z.array(z.object({
        period: z.string(),
        event: z.string(),
        chapterNumber: z.number().optional()
    })),
    approvedChapters: z.array(z.object({
        chapterNumber: z.number(),
        title: z.string(),
        summary: z.string(),
        content: z.string(),
        imageAnchors: z.array(z.object({
            id: z.string(),
            prompt: z.string(),
            position: z.string()
        }))
    })),
    metadata: z.record(z.any())
});

export type StoryContext = z.infer<typeof StoryContextSchema>;
