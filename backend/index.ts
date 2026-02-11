import { run } from '@openai/agents';
import { UserInput } from './types/user-input.js';
import { StoryContext } from './context/story-context.js';
import { createOrchestratorAgent } from './agents/orchestrator.js';
import { createPlannerAgent } from './agents/planner.js';
import { createChapterGeneratorAgent } from './agents/chapter-generator.js';
import { createCoherenceAgent } from './agents/coherence.js';
import { createImageSequenceAgent } from './agents/image-sequence.js';
import { createCulturalAuthenticityAgent } from './agents/cultural-authenticity.js';
import { createEditorialPolishAgent } from './agents/editorial-polish.js';

export async function generateBook(input: UserInput) {
    // 1. Initialize Context
    const context: StoryContext = {
        lifeStage: input.lifeStageSegment,
        characters: input.characters,
        culturalElements: input.culturalElements.festivals.map(f => ({
            type: 'festival',
            name: f,
            description: `User-provided festival: ${f}`,
            region: input.culturalElements.primaryRegion
        })),
        timeline: input.memories.map(m => ({
            period: m.dateRange || 'Unknown',
            event: m.title
        })),
        approvedChapters: [],
        metadata: {
            tone: input.tone,
            imageStyle: input.imageStyle,
            targetLength: input.targetLength
        }
    };

    // 2. Initialize Agents
    const orchestrator = createOrchestratorAgent(context);
    const planner = createPlannerAgent();
    const generator = createChapterGeneratorAgent();
    const coherence = createCoherenceAgent();
    const visualDirector = createImageSequenceAgent();
    const culturalCustodian = createCulturalAuthenticityAgent();
    const chiefEditor = createEditorialPolishAgent();

    // 3. Assemble Multi-Agent Workflow (Manager Pattern)
    orchestrator.tools.push(
        planner.asTool({ toolName: 'plan_story', toolDescription: 'Creates the narrative arc, character registry, and chapter outline.' }),
        generator.asTool({ toolName: 'generate_chapter', toolDescription: 'Writes a specific chapter based on the plan.' }),
        coherence.asTool({ toolName: 'audit_coherence', toolDescription: 'Fixes continuity issues in a chapter and returns the corrected version.' }),
        culturalCustodian.asTool({ toolName: 'cultural_audit', toolDescription: 'Validates cultural authenticity of the book.' }),
        chiefEditor.asTool({ toolName: 'polish_manuscript', toolDescription: 'Final editorial pass. Reads all chapters from context and returns the print-ready manuscript.' })
    );

    console.log('Starting Desi Tales Book Generation...');

    // 3a. Add progress logging
    orchestrator.on('agent_start', (ctx, agent) => {
        console.log(`[Agent] ${(agent as any).name} is starting...`);
    });
    orchestrator.on('agent_tool_start', (ctx, tool) => {
        console.log(`[Handoff] Calling specialist: ${tool.name}`);
    });
    orchestrator.on('agent_end', (ctx, output) => {
        console.log(`[Agent] ${orchestrator.name} completed.`);
    });

    // 3b. State persistence — handle each tool's output appropriately
    orchestrator.on('agent_tool_end', (ctx, tool, result) => {
        try {
            const parsed = JSON.parse(result);
            if (tool.name === 'plan_story') {
                ctx.context.metadata.plan = parsed;
                // If the planner created a character registry, update context characters
                if (parsed.characterRegistry) {
                    console.log(`[State] Character Registry: ${parsed.characterRegistry.map((c: any) => c.fullName).join(', ')}`);
                }
                console.log(`[State] Story Plan saved. ${parsed.chapters?.length || 0} chapters planned.`);
            } else if (tool.name === 'generate_chapter') {
                ctx.context.approvedChapters.push(parsed);
                console.log(`[State] Chapter ${parsed.chapterNumber}: "${parsed.title}" saved to context.`);
            } else if (tool.name === 'audit_coherence') {
                // CRITICAL: Replace the chapter with the corrected version
                const chapterIdx = ctx.context.approvedChapters.findIndex(
                    c => c.chapterNumber === parsed.chapterNumber
                );
                if (chapterIdx !== -1) {
                    ctx.context.approvedChapters[chapterIdx] = {
                        chapterNumber: parsed.chapterNumber,
                        title: parsed.title,
                        content: parsed.content,
                        summary: parsed.summary,
                        imageAnchors: parsed.imageAnchors || [],
                    };
                    const fixCount = parsed.fixesApplied?.length || 0;
                    console.log(`[State] Chapter ${parsed.chapterNumber} corrected (${fixCount} fixes applied).`);
                } else {
                    console.log(`[State] Coherence: chapter ${parsed.chapterNumber} not found for replacement, adding as new.`);
                    ctx.context.approvedChapters.push(parsed);
                }
            } else if (tool.name === 'cultural_audit') {
                ctx.context.metadata.culturalAudit = parsed;
                console.log(`[State] Cultural audit saved (score: ${parsed.score || 'N/A'}).`);
            }
        } catch (e) {
            // Non-JSON results (e.g., polish_manuscript returns raw markdown)
            if (tool.name === 'polish_manuscript') {
                ctx.context.metadata.finalManuscript = result;
                console.log(`[State] Final manuscript saved (${result.length} chars).`);
            }
        }
    });

    // 4. Run the orchestration with streaming
    const runner = await run(orchestrator, `
Start the book generation process for: ${input.memories[0].title}.
Target Length: ${input.targetLength}
Tone: ${input.tone}
  `, {
        context,
        stream: true,
        maxTurns: 50
    });

    // 4a. Handle streaming output
    const toolResults: Array<{ name: string; output: string }> = [];

    for await (const event of runner) {
        if (event.type === 'run_item_stream_event') {
            if (event.name === 'tool_called' && event.item.type === 'tool_call_item') {
                // @ts-ignore
                const toolName = event.item.rawItem.name;
                console.log(`\n[Workflow] Specialist Called: ${toolName}`);
            } else if (event.name === 'tool_output' && event.item.type === 'tool_call_output_item') {
                // @ts-ignore
                const toolName = event.item.rawItem?.name || 'unknown';
                const outputStr = typeof event.item.output === 'string' ? event.item.output : JSON.stringify(event.item.output);
                toolResults.push({ name: toolName, output: outputStr });
                console.log(`[Workflow] ${toolName} finished (${outputStr.length} chars)`);
            } else if (event.name === 'message_output_created') {
                if (event.item.type === 'message_output_item') {
                    console.log(`\n[Orchestrator Final Message]`);
                    console.log(event.item.content);
                }
            }
        } else if (event.type === 'agent_updated_stream_event') {
            console.log(`[Agent Switch] Now running: ${event.agent.name}`);
        }
    }

    await runner.completed;

    // 5. Return the context + results
    return {
        context,
        toolResults,
        newItems: runner.newItems,
        finalOutput: runner.finalOutput,
    };
}
