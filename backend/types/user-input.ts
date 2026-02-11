import { z } from 'zod';
import { CharacterSchema } from '../context/story-context.js';

export const UserInputSchema = z.object({
    lifeStageSegment: z.enum(['newParent', 'couple', 'founder', 'elder']),
    targetLength: z.enum(['short', 'medium', 'long']), // 40-80, 80-120, 120-200 pages

    // NEW: Occasion & Genre (inspired by GiftMyBook flow)
    occasion: z.enum([
        'birthday', 'anniversary', 'wedding', 'retirement',
        'new_baby', 'graduation', 'farewell', 'just_because',
        'parents_day', 'milestone_birthday', 'housewarming',
        'rakhi', 'diwali', 'eid'
    ]).optional(),

    genre: z.enum([
        'heartfelt', 'comedy', 'adventure', 'memoir', 'legacy'
    ]).optional(),

    // NEW: Free-text personality fields (GiftMyBook-style)
    personalityDescription: z.string().optional(),
    funnyQuirks: z.string().optional(),

    memories: z.array(z.object({
        title: z.string(),
        description: z.string(),
        dateRange: z.string().optional(),
        people: z.array(z.string()).optional(),
        location: z.string().optional(),
    })),

    characters: z.array(CharacterSchema),

    culturalElements: z.object({
        primaryRegion: z.string(),
        festivals: z.array(z.string()),
        foods: z.array(z.string()),
        traditions: z.array(z.string()),
    }),

    tone: z.enum(['whimsical', 'nostalgic', 'inspirational', 'celebratory']),
    imageStyle: z.enum(['realistic', 'illustrated', 'mixed']),
});

export type UserInput = z.infer<typeof UserInputSchema>;
