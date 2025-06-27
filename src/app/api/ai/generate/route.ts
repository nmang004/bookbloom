import { NextRequest, NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'

// Request type interfaces
interface BaseGenerationRequest {
  type: string
}

interface SynopsisRequest extends BaseGenerationRequest {
  type: 'synopsis'
  idea: string
  genre: string
  length?: string
}

interface OutlineRequest extends BaseGenerationRequest {
  type: 'outline'
  bookId: string
  chapters: number
  structure: string
  context: {
    title: string
    synopsis: string
    genre: string
  }
}

interface CharacterRequest extends BaseGenerationRequest {
  type: 'character'
  bookId: string
  name: string
  role: string
  importance?: string
  characterData?: any
  context: any
}

interface CharacterEnhancementRequest extends BaseGenerationRequest {
  type: 'character_enhancement'
  characterId: string
  enhancementType: string
  context: any
}

interface CharacterAnalysisRequest extends BaseGenerationRequest {
  type: 'character_analysis'
  analysisType: string
  characters: any[]
  bookContext?: any
}

interface WorldElementRequest extends BaseGenerationRequest {
  type: 'worldbuilding'
  bookId: string
  elementType: string
  name: string
  elementData?: any
  context: any
}

interface ChapterGenerationRequest extends BaseGenerationRequest {
  type: 'chapter_generation'
  bookId: string
  context: any
}

interface ParagraphContinuationRequest extends BaseGenerationRequest {
  type: 'paragraph_continuation'
  currentText: string
  context?: any
}

interface TextRewriteRequest extends BaseGenerationRequest {
  type: 'text_rewrite'
  text: string
  instruction: string
  context?: any
}

interface DialogueGenerationRequest extends BaseGenerationRequest {
  type: 'dialogue_generation'
  context: any
}

interface DescriptionEnhancementRequest extends BaseGenerationRequest {
  type: 'description_enhancement'
  text: string
  enhancementType: string
  context?: any
}

interface ConsistencyCheckRequest extends BaseGenerationRequest {
  type: 'consistency_check'
  text: string
  context: any
}

interface WritingSuggestionRequest extends BaseGenerationRequest {
  type: 'writing_suggestion'
  text: string
  suggestionType: string
  context?: any
}

type GenerationRequest = 
  | SynopsisRequest 
  | OutlineRequest 
  | CharacterRequest 
  | CharacterEnhancementRequest
  | CharacterAnalysisRequest
  | WorldElementRequest 
  | ChapterGenerationRequest
  | ParagraphContinuationRequest
  | TextRewriteRequest
  | DialogueGenerationRequest
  | DescriptionEnhancementRequest
  | ConsistencyCheckRequest
  | WritingSuggestionRequest

// Initialize Anthropic client
const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY!,
})

// Default generation options
const DEFAULT_OPTIONS = {
  model: 'claude-4-sonnet-20250514',
  maxTokens: 4000,
  temperature: 0.7,
}

// Rate limiting store (in production, use Redis or similar)
const rateLimitStore = new Map<string, { count: number; resetTime: number }>()

// Rate limit configuration
const RATE_LIMIT = {
  requests: 100, // requests per window
  windowMs: 60 * 60 * 1000, // 1 hour
}

function getRateLimitKey(request: NextRequest): string {
  // In production, use user ID from authentication
  // For now, use IP address
  const forwarded = request.headers.get('x-forwarded-for')
  const ip = forwarded ? forwarded.split(',')[0] : request.headers.get('x-real-ip') || 'unknown'
  return `rate_limit:${ip}`
}

function checkRateLimit(key: string): boolean {
  const now = Date.now()
  const record = rateLimitStore.get(key)

  if (!record || now > record.resetTime) {
    // Reset or create new record
    rateLimitStore.set(key, {
      count: 1,
      resetTime: now + RATE_LIMIT.windowMs
    })
    return true
  }

  if (record.count >= RATE_LIMIT.requests) {
    return false
  }

  record.count++
  return true
}

// Helper function to replace variables in prompt templates (currently unused but kept for future use)
// function formatPrompt(template: string, variables: Record<string, string>): string {
//   return template.replace(/\{(\w+)\}/g, (match, key) => {
//     return variables[key] || match
//   })
// }

export async function POST(request: NextRequest) {
  try {
    // Parse request body
    let requestData: unknown
    try {
      requestData = await request.json()
    } catch {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Invalid JSON in request body',
          errorCode: 'INVALID_REQUEST'
        },
        { status: 400 }
      )
    }

    // Validate request structure
    if (!requestData || typeof requestData !== 'object' || !('type' in requestData)) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Missing required field: type',
          errorCode: 'INVALID_REQUEST'
        },
        { status: 400 }
      )
    }

    // Type assertion after validation
    const data = requestData as GenerationRequest

    // Check rate limiting
    const rateLimitKey = getRateLimitKey(request)
    if (!checkRateLimit(rateLimitKey)) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Rate limit exceeded. Please try again later.',
          errorCode: 'RATE_LIMIT'
        },
        { status: 429 }
      )
    }

    // Validate specific request types
    if (data.type === 'synopsis') {
      if (!data.idea?.toString().trim()) {
        return NextResponse.json(
          { 
            success: false, 
            error: 'Synopsis generation requires a story idea',
            errorCode: 'INVALID_REQUEST'
          },
          { status: 400 }
        )
      }
      if (!data.genre?.trim()) {
        return NextResponse.json(
          { 
            success: false, 
            error: 'Synopsis generation requires a genre',
            errorCode: 'INVALID_REQUEST'
          },
          { status: 400 }
        )
      }
    } else if (data.type === 'outline') {
      if (!data.bookId?.trim()) {
        return NextResponse.json(
          { 
            success: false, 
            error: 'Outline generation requires a book ID',
            errorCode: 'INVALID_REQUEST'
          },
          { status: 400 }
        )
      }
      if (!data.chapters || data.chapters < 5 || data.chapters > 50) {
        return NextResponse.json(
          { 
            success: false, 
            error: 'Chapter count must be between 5 and 50',
            errorCode: 'INVALID_REQUEST'
          },
          { status: 400 }
        )
      }
      if (!data.structure || !['three-act', 'heros-journey', 'custom'].includes(data.structure)) {
        return NextResponse.json(
          { 
            success: false, 
            error: 'Valid structure required (three-act, heros-journey, or custom)',
            errorCode: 'INVALID_REQUEST'
          },
          { status: 400 }
        )
      }
      if (!data.context?.title?.trim() || !data.context?.synopsis?.trim() || !data.context?.genre?.trim()) {
        return NextResponse.json(
          { 
            success: false, 
            error: 'Outline generation requires book context (title, synopsis, genre)',
            errorCode: 'INVALID_REQUEST'
          },
          { status: 400 }
        )
      }
    } else if (data.type === 'character') {
      if (!data.bookId?.trim()) {
        return NextResponse.json(
          { 
            success: false, 
            error: 'Character generation requires a book ID',
            errorCode: 'INVALID_REQUEST'
          },
          { status: 400 }
        )
      }
      if (!data.name?.trim()) {
        return NextResponse.json(
          { 
            success: false, 
            error: 'Character generation requires a character name',
            errorCode: 'INVALID_REQUEST'
          },
          { status: 400 }
        )
      }
      if (!data.role?.trim()) {
        return NextResponse.json(
          { 
            success: false, 
            error: 'Character generation requires a character role',
            errorCode: 'INVALID_REQUEST'
          },
          { status: 400 }
        )
      }
      if (!data.context?.title?.trim() || !data.context?.synopsis?.trim() || !data.context?.genre?.trim()) {
        return NextResponse.json(
          { 
            success: false, 
            error: 'Character generation requires book context (title, synopsis, genre)',
            errorCode: 'INVALID_REQUEST'
          },
          { status: 400 }
        )
      }
    } else if (data.type === 'character_enhancement') {
      if (!data.characterId?.trim()) {
        return NextResponse.json(
          { 
            success: false, 
            error: 'Character enhancement requires a character ID',
            errorCode: 'INVALID_REQUEST'
          },
          { status: 400 }
        )
      }
      if (!data.enhancementType?.trim()) {
        return NextResponse.json(
          { 
            success: false, 
            error: 'Character enhancement requires an enhancement type',
            errorCode: 'INVALID_REQUEST'
          },
          { status: 400 }
        )
      }
      const validEnhancements = ['physical_description', 'personality', 'backstory', 'goals', 'voice', 'relationships', 'arc', 'comprehensive']
      if (!validEnhancements.includes(data.enhancementType)) {
        return NextResponse.json(
          { 
            success: false, 
            error: `Invalid enhancement type. Valid types: ${validEnhancements.join(', ')}`,
            errorCode: 'INVALID_REQUEST'
          },
          { status: 400 }
        )
      }
      if (!data.context?.character?.name?.trim()) {
        return NextResponse.json(
          { 
            success: false, 
            error: 'Character enhancement requires existing character data',
            errorCode: 'INVALID_REQUEST'
          },
          { status: 400 }
        )
      }
    } else if (data.type === 'character_analysis') {
      if (!data.analysisType?.trim()) {
        return NextResponse.json(
          { 
            success: false, 
            error: 'Character analysis requires an analysis type',
            errorCode: 'INVALID_REQUEST'
          },
          { status: 400 }
        )
      }
      const validAnalysis = ['consistency', 'relationships', 'development', 'voice_comparison']
      if (!validAnalysis.includes(data.analysisType)) {
        return NextResponse.json(
          { 
            success: false, 
            error: `Invalid analysis type. Valid types: ${validAnalysis.join(', ')}`,
            errorCode: 'INVALID_REQUEST'
          },
          { status: 400 }
        )
      }
      if (!data.characters || !Array.isArray(data.characters) || data.characters.length === 0) {
        return NextResponse.json(
          { 
            success: false, 
            error: 'Character analysis requires at least one character',
            errorCode: 'INVALID_REQUEST'
          },
          { status: 400 }
        )
      }
    } else if (data.type === 'worldbuilding') {
      if (!data.bookId?.trim()) {
        return NextResponse.json(
          { 
            success: false, 
            error: 'World-building generation requires a book ID',
            errorCode: 'INVALID_REQUEST'
          },
          { status: 400 }
        )
      }
      if (!data.elementType?.trim()) {
        return NextResponse.json(
          { 
            success: false, 
            error: 'World-building generation requires an element type',
            errorCode: 'INVALID_REQUEST'
          },
          { status: 400 }
        )
      }
      const validElementTypes = ['location', 'magic-system', 'technology', 'culture', 'history', 'organization', 'item', 'other']
      if (!validElementTypes.includes(data.elementType)) {
        return NextResponse.json(
          { 
            success: false, 
            error: `Invalid element type. Valid types: ${validElementTypes.join(', ')}`,
            errorCode: 'INVALID_REQUEST'
          },
          { status: 400 }
        )
      }
      if (!data.name?.trim()) {
        return NextResponse.json(
          { 
            success: false, 
            error: 'World-building generation requires an element name',
            errorCode: 'INVALID_REQUEST'
          },
          { status: 400 }
        )
      }
      if (!data.context?.title?.trim() || !data.context?.synopsis?.trim() || !data.context?.genre?.trim()) {
        return NextResponse.json(
          { 
            success: false, 
            error: 'World-building generation requires book context (title, synopsis, genre)',
            errorCode: 'INVALID_REQUEST'
          },
          { status: 400 }
        )
      }
    } else if (data.type === 'chapter_generation') {
      if (!data.bookId?.trim()) {
        return NextResponse.json(
          { 
            success: false, 
            error: 'Chapter generation requires a book ID',
            errorCode: 'INVALID_REQUEST'
          },
          { status: 400 }
        )
      }
      if (!data.context?.title?.trim() || !data.context?.synopsis?.trim() || !data.context?.genre?.trim()) {
        return NextResponse.json(
          { 
            success: false, 
            error: 'Chapter generation requires book context (title, synopsis, genre)',
            errorCode: 'INVALID_REQUEST'
          },
          { status: 400 }
        )
      }
    } else if (data.type === 'paragraph_continuation') {
      if (!data.currentText?.trim()) {
        return NextResponse.json(
          { 
            success: false, 
            error: 'Paragraph continuation requires current text',
            errorCode: 'INVALID_REQUEST'
          },
          { status: 400 }
        )
      }
    } else if (data.type === 'text_rewrite') {
      if (!data.text?.trim() || !data.instruction?.trim()) {
        return NextResponse.json(
          { 
            success: false, 
            error: 'Text rewrite requires text and instruction',
            errorCode: 'INVALID_REQUEST'
          },
          { status: 400 }
        )
      }
    } else if (data.type === 'dialogue_generation') {
      if (!data.context?.situation?.trim()) {
        return NextResponse.json(
          { 
            success: false, 
            error: 'Dialogue generation requires a situation context',
            errorCode: 'INVALID_REQUEST'
          },
          { status: 400 }
        )
      }
    } else if (data.type === 'description_enhancement') {
      if (!data.text?.trim()) {
        return NextResponse.json(
          { 
            success: false, 
            error: 'Description enhancement requires text to enhance',
            errorCode: 'INVALID_REQUEST'
          },
          { status: 400 }
        )
      }
    } else if (data.type === 'consistency_check') {
      if (!data.text?.trim()) {
        return NextResponse.json(
          { 
            success: false, 
            error: 'Consistency check requires text to analyze',
            errorCode: 'INVALID_REQUEST'
          },
          { status: 400 }
        )
      }
    } else if (data.type === 'writing_suggestion') {
      if (!data.text?.trim()) {
        return NextResponse.json(
          { 
            success: false, 
            error: 'Writing suggestion requires text to analyze',
            errorCode: 'INVALID_REQUEST'
          },
          { status: 400 }
        )
      }
    } else {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Unsupported generation type. Supported types: synopsis, outline, character, character_enhancement, character_analysis, worldbuilding, chapter_generation, paragraph_continuation, text_rewrite, dialogue_generation, description_enhancement, consistency_check, writing_suggestion',
          errorCode: 'INVALID_REQUEST'
        },
        { status: 400 }
      )
    }

    // Validate API key
    if (!process.env.ANTHROPIC_API_KEY) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Anthropic API key not configured',
          errorCode: 'AUTH_ERROR'
        },
        { status: 500 }
      )
    }

    let systemPrompt: string = ''
    let userPrompt: string = ''

    // Generate content based on type
    if (data.type === 'synopsis') {
      const { idea, genre, length = 'medium' } = data
      
      systemPrompt = `You are a professional book development assistant specializing in synopsis creation. Your task is to transform basic story ideas into compelling, detailed synopses that capture the essence of the story while maintaining the author's vision.

Guidelines:
- Expand the core idea while staying true to the original concept
- Include key plot points, main conflicts, and character motivations
- Maintain the appropriate tone for the specified genre
- Create intrigue without revealing too much
- Aim for 2-3 paragraphs unless otherwise specified`

      userPrompt = `Please create a compelling synopsis for a ${genre} book based on this idea:

**Core Idea:** ${idea}

**Length Preference:** ${length}

Please expand this into a full synopsis that would entice readers while giving a clear sense of the story's direction.`
    
    } else if (data.type === 'outline') {
      const { chapters, structure, context } = data
      
      systemPrompt = `You are an expert story structure consultant. You help authors create detailed chapter outlines that follow proven narrative frameworks while maintaining creative flexibility.

Guidelines:
- Follow the specified narrative structure (${structure})
- Create ${chapters} chapters with clear progression
- Include major plot points, character development, and pacing
- Ensure each chapter has a clear purpose and hook
- Balance action, character development, and plot advancement
- Return response as valid JSON with chapter objects containing: number, title, summary, plotPoints (array), characterArcs (array), conflicts (array)`

      userPrompt = `Create a ${chapters}-chapter outline for this book:

**Title:** ${context.title}
**Genre:** ${context.genre}
**Synopsis:** ${context.synopsis}
**Structure:** ${structure}

Return the response as a JSON object with this structure:
{
  "chapters": [
    {
      "number": 1,
      "title": "Chapter Title",
      "summary": "Brief chapter summary",
      "plotPoints": ["Major plot point 1", "Major plot point 2"],
      "characterArcs": ["Character development note"],
      "conflicts": ["Main conflict in this chapter"]
    }
  ]
}

For each chapter, provide:
1. Clear, engaging chapter title
2. Concise summary (2-3 sentences)
3. Key plot points that advance the story
4. Character development moments
5. Primary conflicts or tensions`
    
    } else if (data.type === 'character') {
      const { name, role, context, importance = 'supporting' } = data
      const existingCharacters = context.existingCharacters || []
      
      systemPrompt = `You are a professional character development specialist. Create compelling, three-dimensional characters that feel authentic and serve the story. Your characters should be memorable, with clear motivations, flaws, and growth potential.

Guidelines:
- Create characters that fit naturally within the story world
- Ensure character voice and personality are distinct from existing characters
- Include physical description, personality traits, backstory, and goals
- Consider how this character will interact with and complement existing characters
- Return response as valid JSON with detailed character information`

      userPrompt = `Create a ${role} character for this ${context.genre} book:

**Book Title:** ${context.title}
**Genre:** ${context.genre}
**Synopsis:** ${context.synopsis}
**Character Name:** ${name}
**Character Role:** ${role}
**Character Importance:** ${importance}

**Existing Characters:**
${existingCharacters.map((char: any) => `- ${char.name} (${char.role})`).join('\n') || 'None'}

Return the character as a JSON object with this structure:
{
  "name": "${name}",
  "role": "${role}",
  "importance": "${importance}",
  "basicInfo": {
    "fullName": "Character's full name",
    "age": 25,
    "occupation": "Character's job/role"
  },
  "physical": {
    "age": "Age range description",
    "height": "Height description",
    "build": "Body type description",
    "hairColor": "Hair color and style",
    "eyeColor": "Eye color",
    "distinctiveFeatures": "Notable features",
    "overall": "Overall appearance summary"
  },
  "personality": {
    "strengths": ["strength1", "strength2"],
    "weaknesses": ["weakness1", "weakness2"],
    "fears": ["fear1", "fear2"],
    "desires": ["desire1", "desire2"],
    "quirks": ["quirk1", "quirk2"],
    "speechPattern": "How they speak",
    "mannerisms": "Physical habits or gestures"
  },
  "backstory": {
    "childhood": "Childhood summary",
    "formativeEvents": ["event1", "event2"],
    "education": "Educational background",
    "secrets": ["secret1"],
    "relationships": ["relationship1", "relationship2"]
  },
  "goals": {
    "primary": "Main goal",
    "secondary": ["secondary goal1", "secondary goal2"],
    "internal": "Internal/emotional goal",
    "external": "External/physical goal",
    "obstacles": ["obstacle1", "obstacle2"],
    "motivation": "What drives them"
  },
  "voice": {
    "speakingStyle": "How they communicate",
    "vocabulary": "Type of words they use",
    "commonPhrases": ["phrase1", "phrase2"],
    "formality": "Formal/casual speaking style"
  }
}

Make sure this character:
1. Fits naturally into the story world
2. Has clear motivations that can drive plot
3. Complements existing characters without being redundant
4. Has potential for growth and development
5. Is memorable and distinctive`

    } else if (data.type === 'character_enhancement') {
      const { characterId, enhancementType, context } = data
      const character = context.character
      const existingCharacters = context.existingCharacters || []
      
      systemPrompt = `You are a character development specialist. Enhance existing characters with deeper, more detailed information while maintaining consistency with their established traits and the story world.

Guidelines:
- Build upon existing character information without contradicting it
- Create enhancement that feels organic and authentic
- Consider how enhancements affect character relationships and story dynamics
- Return response as valid JSON with the enhanced information`

      let enhancementFocus = ''
      let responseStructure = ''

      switch (enhancementType) {
        case 'physical_description':
          enhancementFocus = 'Create a detailed physical description that brings the character to life visually'
          responseStructure = `{
  "physical": {
    "age": "Specific age range",
    "height": "Specific height",
    "build": "Detailed body type",
    "hairColor": "Hair color, style, texture",
    "eyeColor": "Eye color and expression",
    "distinctiveFeatures": "Scars, tattoos, unique features",
    "clothing": "Typical clothing style",
    "overall": "Complete physical impression"
  }
}`
          break
        case 'personality':
          enhancementFocus = 'Develop a rich personality profile with traits, quirks, and behavioral patterns'
          responseStructure = `{
  "personality": {
    "strengths": ["detailed strength1", "detailed strength2"],
    "weaknesses": ["detailed weakness1", "detailed weakness2"],
    "fears": ["deep fear1", "deep fear2"],
    "desires": ["core desire1", "core desire2"],
    "quirks": ["unique quirk1", "unique quirk2"],
    "speechPattern": "Detailed speaking style",
    "mannerisms": "Specific physical habits"
  }
}`
          break
        case 'backstory':
          enhancementFocus = 'Create a comprehensive backstory that explains who they are and why'
          responseStructure = `{
  "backstory": {
    "childhood": "Detailed childhood experience",
    "formativeEvents": ["specific event1", "specific event2"],
    "education": "Educational background and experiences",
    "occupation": "Career history and experiences",
    "secrets": ["important secret1", "important secret2"],
    "trauma": ["traumatic experience1"],
    "achievements": ["notable achievement1", "notable achievement2"],
    "relationships": ["important relationship1", "important relationship2"]
  }
}`
          break
        case 'goals':
          enhancementFocus = 'Define clear, compelling goals that drive character actions and create story tension'
          responseStructure = `{
  "goals": {
    "primary": "Main overarching goal",
    "secondary": ["important secondary goal1", "important secondary goal2"],
    "internal": "Deep emotional/psychological goal",
    "external": "Concrete physical goal",
    "obstacles": ["major obstacle1", "major obstacle2"],
    "stakes": "What they stand to lose/gain",
    "motivation": "Deep psychological motivation"
  }
}`
          break
        case 'voice':
          enhancementFocus = 'Develop a unique voice and speaking style that makes dialogue distinctive'
          responseStructure = `{
  "voice": {
    "speakingStyle": "Detailed communication style",
    "vocabulary": "Specific word choices and language level",
    "cadence": "Rhythm and pace of speech",
    "commonPhrases": ["signature phrase1", "signature phrase2"],
    "dialectOrAccent": "Regional or cultural speech patterns",
    "formality": "Level of formality in different situations",
    "emotionalExpression": "How they express emotions verbally"
  }
}`
          break
        case 'relationships':
          enhancementFocus = 'Develop meaningful relationships with existing characters'
          responseStructure = `{
  "relationships": [
    {
      "characterName": "existing character name",
      "relationshipType": "friend/enemy/family/etc",
      "description": "relationship description",
      "history": "how they met/relationship history",
      "dynamics": "how they interact",
      "conflictPotential": "potential for drama/conflict"
    }
  ]
}`
          break
        case 'arc':
          enhancementFocus = 'Create a character development arc that shows growth throughout the story'
          responseStructure = `{
  "arc": {
    "startingPoint": "Where character begins emotionally/psychologically",
    "catalyst": "What triggers their change",
    "midpointCrisis": "Major challenge that tests them",
    "transformation": "How they change and grow",
    "endingPoint": "Where they end up",
    "milestones": [
      {
        "point": "early story",
        "description": "specific development moment"
      }
    ]
  }
}`
          break
        default:
          enhancementFocus = 'Provide comprehensive character enhancement across all areas'
          responseStructure = `{
  "physical": { ... },
  "personality": { ... },
  "backstory": { ... },
  "goals": { ... },
  "voice": { ... },
  "relationships": [ ... ],
  "arc": { ... }
}`
      }

      userPrompt = `Enhance the ${enhancementType} for this character:

**Book Context:**
Title: ${context.title}
Genre: ${context.genre}
Synopsis: ${context.synopsis}

**Character to Enhance:**
Name: ${character.name}
Role: ${character.role}
Current Info: ${JSON.stringify(character, null, 2)}

**Existing Characters:**
${existingCharacters.map((char: any) => `- ${char.name} (${char.role})`).join('\n') || 'None'}

**Enhancement Focus:** ${enhancementFocus}

Return the enhanced information as JSON using this structure:
${responseStructure}

Ensure the enhancement:
1. Builds upon existing character information
2. Remains consistent with established traits
3. Fits the story world and genre
4. Creates opportunities for character development
5. Enhances story potential and relationships`

    } else if (data.type === 'character_analysis') {
      const { analysisType, characters, bookContext } = data
      
      systemPrompt = `You are a character analysis expert. Provide insightful analysis of characters to help authors improve their character development and story consistency.

Guidelines:
- Analyze characters objectively and constructively
- Identify strengths and areas for improvement
- Provide specific, actionable feedback
- Consider story context and genre requirements
- Return response as valid JSON with structured analysis`

      let analysisFocus = ''
      let responseStructure = ''

      switch (analysisType) {
        case 'consistency':
          analysisFocus = 'Check for character consistency and flag potential contradictions'
          responseStructure = `{
  "analysis": {
    "overallConsistency": "high/medium/low",
    "issues": [
      {
        "characterName": "character name",
        "type": "contradiction/missing/inconsistent",
        "description": "specific issue description",
        "severity": "high/medium/low",
        "suggestion": "how to fix it"
      }
    ],
    "strengths": ["consistency strength1", "consistency strength2"],
    "recommendations": ["specific recommendation1", "specific recommendation2"]
  }
}`
          break
        case 'relationships':
          analysisFocus = 'Analyze character relationships and suggest improvements'
          responseStructure = `{
  "analysis": {
    "relationshipStrength": "strong/moderate/weak",
    "suggestions": [
      {
        "character1": "character name",
        "character2": "character name",
        "suggestedRelationship": "relationship type",
        "rationale": "why this relationship works",
        "storyPotential": "how it enhances the story"
      }
    ],
    "missingRelationships": ["what's missing"],
    "conflictOpportunities": ["potential conflict1", "potential conflict2"]
  }
}`
          break
        case 'development':
          analysisFocus = 'Analyze character development arcs and growth potential'
          responseStructure = `{
  "analysis": {
    "developmentStrength": "strong/moderate/weak",
    "characterAssessment": [
      {
        "name": "character name",
        "currentArc": "description of current arc",
        "strengths": ["arc strength1", "arc strength2"],
        "weaknesses": ["arc weakness1", "arc weakness2"],
        "suggestions": ["improvement suggestion1", "improvement suggestion2"]
      }
    ],
    "overallRecommendations": ["overall recommendation1", "overall recommendation2"]
  }
}`
          break
        case 'voice_comparison':
          analysisFocus = 'Compare character voices to ensure distinctiveness'
          responseStructure = `{
  "analysis": {
    "voiceDistinctiveness": "high/medium/low",
    "characterVoices": [
      {
        "name": "character name",
        "voiceStrength": "strong/moderate/weak",
        "distinctiveElements": ["element1", "element2"],
        "improvements": ["improvement1", "improvement2"]
      }
    ],
    "similarities": [
      {
        "characters": ["character1", "character2"],
        "similarity": "what's similar",
        "suggestion": "how to differentiate"
      }
    ],
    "recommendations": ["voice recommendation1", "voice recommendation2"]
  }
}`
      }

      userPrompt = `Analyze these characters for ${analysisType}:

**Book Context:**
Title: ${bookContext.title}
Genre: ${bookContext.genre}
Synopsis: ${bookContext.synopsis}

**Characters to Analyze:**
${characters.map((char: any) => `
**${char.name}** (${char.role})
${JSON.stringify(char, null, 2)}
`).join('\n')}

**Analysis Focus:** ${analysisFocus}

Return the analysis as JSON using this structure:
${responseStructure}

Provide specific, actionable insights that will help improve character development and story quality.`

    } else if (data.type === 'worldbuilding') {
      const { elementType, name, context } = data
      const existingElements = context.existingElements || []
      const enhancementType = context.enhancementType || 'create_new'
      const currentElement = context.currentElement || null
      
      systemPrompt = `You are a world-building specialist for authors. Create rich, immersive world elements that enhance storytelling and feel authentic within the story universe. Your creations should inspire writers and provide depth to their fictional worlds.

Guidelines:
- Create world elements that fit naturally within the story's genre and tone
- Ensure consistency with existing world elements and story context
- Provide detailed information that sparks imagination and storytelling possibilities
- Consider how elements interact with characters and plot development
- Return response as valid JSON with comprehensive world element information`

      let enhancementFocus = ''
      let responseStructure = ''

      // Define element-specific prompts and structures
      const elementConfig = {
        'location': {
          focus: 'Create a vivid, memorable location that feels lived-in and significant to the story',
          structure: `{
  "briefDescription": "Concise location description",
  "detailedDescription": "Rich, immersive description",
  "overview": {
    "keyFeatures": ["notable feature1", "notable feature2", "notable feature3"],
    "significance": "Why this location matters to the story",
    "firstAppearance": "Suggested chapter or story moment"
  },
  "details": {
    "specifications": "Size, layout, architectural details",
    "appearance": "Visual description and atmosphere",
    "function": "Purpose and how it's used",
    "geography": "Geographical features and setting",
    "climate": "Weather patterns and seasonal variations",
    "population": "Who lives or works there",
    "notableFeatures": ["unique feature1", "unique feature2"]
  },
  "history": {
    "origin": "How this location came to be",
    "significantEvents": ["historical event1", "historical event2"],
    "timeline": [
      {
        "name": "Important event",
        "date": "When it happened",
        "description": "What happened and why it matters"
      }
    ]
  },
  "usage": {
    "storyRole": "How this location serves the narrative",
    "plotRelevance": "Connection to main plot",
    "characterConnections": ["which characters use this location"]
  },
  "tags": ["descriptive tag1", "descriptive tag2", "descriptive tag3"]
}`
        },
        'magic-system': {
          focus: 'Design a logical, balanced magical system with clear rules and limitations',
          structure: `{
  "briefDescription": "Concise magic system description",
  "detailedDescription": "Comprehensive explanation of how magic works",
  "overview": {
    "keyFeatures": ["magic feature1", "magic feature2", "magic feature3"],
    "significance": "Role in the story and world",
    "firstAppearance": "When readers first encounter this magic"
  },
  "details": {
    "powerSource": "Where magical energy comes from",
    "castingMethods": ["method1", "method2"],
    "costs": ["what practitioners sacrifice", "physical/mental costs"],
    "restrictions": ["limitation1", "limitation2"],
    "hierarchy": "Levels of magical ability or ranks",
    "practitioners": ["who can use this magic"],
    "artifacts": ["magical items or focuses"]
  },
  "history": {
    "origin": "How this magic system developed",
    "significantEvents": ["magical event1", "magical event2"]
  },
  "usage": {
    "storyRole": "How magic drives plot and conflict",
    "plotRelevance": "Connection to main story"
  },
  "tags": ["magic", "power", "system"]
}`
        },
        'technology': {
          focus: 'Create technology that fits the world\'s advancement level and enhances the story',
          structure: `{
  "briefDescription": "Clear technology description",
  "detailedDescription": "How it works and what it does",
  "overview": {
    "keyFeatures": ["tech feature1", "tech feature2"],
    "significance": "Impact on world and story"
  },
  "details": {
    "complexity": "primitive/medieval/renaissance/industrial/modern/futuristic",
    "materials": ["component1", "component2"],
    "capabilities": ["what it can do"],
    "limitations": ["what it cannot do"],
    "creators": ["who invented or built it"],
    "users": ["who can operate it"]
  },
  "history": {
    "origin": "How it was invented",
    "significantEvents": ["tech milestone1", "tech milestone2"]
  },
  "usage": {
    "storyRole": "How technology affects the plot",
    "plotRelevance": "Story significance"
  },
  "tags": ["technology", "invention", "tool"]
}`
        },
        'culture': {
          focus: 'Develop a rich culture with unique traditions, values, and social structures',
          structure: `{
  "briefDescription": "Culture overview",
  "detailedDescription": "Deep dive into cultural practices and beliefs",
  "overview": {
    "keyFeatures": ["cultural trait1", "cultural trait2"],
    "significance": "Role in the story world"
  },
  "details": {
    "values": ["core value1", "core value2"],
    "traditions": ["tradition1", "tradition2"],
    "socialStructure": "How society is organized",
    "beliefs": ["belief1", "belief2"],
    "customs": ["custom1", "custom2"],
    "language": "Language characteristics",
    "conflicts": ["internal conflict1", "external conflict2"],
    "allies": ["allied group1", "allied group2"]
  },
  "history": {
    "origin": "How this culture developed",
    "significantEvents": ["cultural event1", "cultural event2"]
  },
  "usage": {
    "storyRole": "How culture creates conflict or harmony",
    "plotRelevance": "Story connections"
  },
  "tags": ["culture", "society", "tradition"]
}`
        },
        'history': {
          focus: 'Create significant historical events that shaped the world and inform the current story',
          structure: `{
  "briefDescription": "Historical event summary",
  "detailedDescription": "Comprehensive event description",
  "overview": {
    "keyFeatures": ["event aspect1", "event aspect2"],
    "significance": "How this event shaped the world"
  },
  "details": {
    "date": "When it occurred",
    "participants": ["key figure1", "key figure2"],
    "causes": ["what led to this event"],
    "consequences": ["long-term effects"],
    "duration": "How long it lasted",
    "locations": ["where it happened"]
  },
  "history": {
    "origin": "What triggered this event",
    "significantEvents": ["related event1", "related event2"]
  },
  "usage": {
    "storyRole": "How this history affects current events",
    "plotRelevance": "Connection to main plot"
  },
  "tags": ["history", "event", "past"]
}`
        },
        'organization': {
          focus: 'Design a compelling organization with clear goals, structure, and influence',
          structure: `{
  "briefDescription": "Organization overview",
  "detailedDescription": "Detailed structure and operations",
  "overview": {
    "keyFeatures": ["org feature1", "org feature2"],
    "significance": "Power and influence in the world"
  },
  "details": {
    "structure": "How the organization is organized",
    "leadership": ["leader1", "leader2"],
    "goals": ["primary goal", "secondary goal"],
    "methods": ["how they operate"],
    "resources": ["what they control"],
    "members": ["member type1", "member type2"],
    "territories": ["area of influence"],
    "rivals": ["enemy organization"],
    "allies": ["allied group"]
  },
  "history": {
    "origin": "How the organization formed",
    "significantEvents": ["org event1", "org event2"]
  },
  "usage": {
    "storyRole": "How organization drives conflict",
    "plotRelevance": "Story connections"
  },
  "tags": ["organization", "group", "power"]
}`
        },
        'item': {
          focus: 'Create a meaningful item with unique properties and story significance',
          structure: `{
  "briefDescription": "Item overview",
  "detailedDescription": "Detailed item description",
  "overview": {
    "keyFeatures": ["item feature1", "item feature2"],
    "significance": "Why this item matters"
  },
  "details": {
    "properties": ["special property1", "special property2"],
    "materials": ["material1", "material2"],
    "appearance": "What it looks like",
    "function": "What it does",
    "creator": "Who made it",
    "currentOwner": "Who has it now",
    "previousOwners": ["former owner1", "former owner2"],
    "powers": ["magical ability1", "magical ability2"],
    "weaknesses": ["limitation1", "limitation2"],
    "rarity": "common/uncommon/rare/legendary/unique"
  },
  "history": {
    "origin": "How it was created",
    "significantEvents": ["item event1", "item event2"]
  },
  "usage": {
    "storyRole": "How item affects the plot",
    "plotRelevance": "Story significance"
  },
  "tags": ["item", "artifact", "object"]
}`
        },
        'other': {
          focus: 'Create a unique world element that doesn\'t fit standard categories but enriches the story',
          structure: `{
  "briefDescription": "Element overview",
  "detailedDescription": "Comprehensive description",
  "overview": {
    "keyFeatures": ["unique feature1", "unique feature2"],
    "significance": "What makes this element special"
  },
  "details": {
    "specifications": "Technical or specific details",
    "appearance": "How it appears or manifests",
    "function": "What role it serves",
    "rules": ["governing rule1", "governing rule2"],
    "limitations": ["constraint1", "constraint2"]
  },
  "history": {
    "origin": "How this element came to exist",
    "significantEvents": ["related event1", "related event2"]
  },
  "usage": {
    "storyRole": "How it serves the narrative",
    "plotRelevance": "Story connections"
  },
  "tags": ["unique", "element", "special"]
}`
        }
      }

      const config = elementConfig[elementType as keyof typeof elementConfig]
      enhancementFocus = config.focus
      responseStructure = config.structure

      if (enhancementType === 'create_new') {
        userPrompt = `Create a ${elementType} world element for this ${context.genre} book:

**Book Context:**
Title: ${context.title}
Genre: ${context.genre}
Synopsis: ${context.synopsis}

**Element to Create:**
Name: ${name}
Type: ${elementType}

**Existing World Elements:**
${existingElements.map((element: any) => `- ${element.name} (${element.type}): ${element.description}`).join('\n') || 'None yet'}

**Creation Focus:** ${enhancementFocus}

Return the world element as JSON using this structure:
${responseStructure}

Ensure the element:
1. Fits naturally within the ${context.genre} genre
2. Complements existing world elements without contradiction
3. Provides rich detail that inspires storytelling
4. Has clear story potential and character interaction opportunities
5. Maintains internal logic and consistency`

      } else {
        // Enhancement mode
        userPrompt = `Enhance this ${elementType} world element:

**Book Context:**
Title: ${context.title}
Genre: ${context.genre}
Synopsis: ${context.synopsis}

**Element to Enhance:**
${JSON.stringify(currentElement, null, 2)}

**Existing World Elements:**
${existingElements.map((element: any) => `- ${element.name} (${element.type}): ${element.description}`).join('\n') || 'None'}

**Enhancement Type:** ${enhancementType}

Return the enhanced element as JSON using this structure:
${responseStructure}

Enhance the element by:
1. Expanding existing details with richer information
2. Adding new aspects that deepen the world-building
3. Ensuring consistency with established information
4. Creating new story and character interaction possibilities
5. Maintaining the ${context.genre} genre tone and style`
      }

    } else if (data.type === 'chapter_generation') {
      const { context } = data
      
      systemPrompt = `You are a professional novelist and ghostwriter specializing in ${context.genre} fiction. Your task is to write a complete, engaging chapter that seamlessly fits within the established story world and maintains consistency with existing characters and plot.

Guidelines:
- Write in third person limited perspective unless otherwise specified
- Maintain consistency with established characters, world-building, and tone
- Create vivid scenes with strong sensory details and emotional depth
- Balance dialogue, action, and narrative description naturally
- Advance the plot meaningfully while developing characters
- End with appropriate tension, resolution, or transition for the chapter's purpose
- Target approximately ${context.targetLength || 2500} words
- Use proper chapter formatting with scene breaks where appropriate`

      userPrompt = `Write a complete chapter for this ${context.genre} book:

**Book Context:**
Title: ${context.title}
Genre: ${context.genre}
Synopsis: ${context.synopsis}

**Chapter Details:**
Chapter ${context.chapterNumber}: "${context.chapterTitle}"
${context.outline ? `Outline: ${context.outline}` : ''}
${context.tone ? `Tone: ${context.tone}` : ''}
${context.style ? `Style: ${context.style}` : ''}

**Characters:**
${context.characters.map((char: any) => `${char.name}: ${char.description} (Traits: ${char.traits.join(', ')})`).join('\n')}

**World Elements:**
${context.worldElements?.map((elem: any) => `${elem.name} (${elem.type}): ${elem.description}`).join('\n') || 'None specified'}

**Previous Chapter Summary:**
${context.previousChapters?.slice(-1)[0]?.summary || 'This is the first chapter of the book.'}

Please write a compelling, well-structured chapter that advances the story while maintaining the established tone and character voices. Include scene descriptions, character interactions, and plot development as appropriate for this point in the story.`

    } else if (data.type === 'paragraph_continuation') {
      const { currentText, context } = data
      
      systemPrompt = `You are an expert writing assistant that helps authors continue their prose naturally. Your task is to write the next 1-3 paragraphs that flow seamlessly from the existing text while maintaining consistency in voice, tone, and style.

Guidelines:
- Match the existing writing style, tone, and pacing exactly
- Maintain character consistency and development
- Advance the story or scene naturally
- Create engaging prose with appropriate sensory details
- Ensure smooth transitions and logical progression
- Write 1-3 paragraphs (approximately 100-300 words)`

      userPrompt = `Continue this ${context.genre} story naturally:

**Current Text:**
${currentText}

**Context:**
Genre: ${context.genre}
Characters involved: ${context.characters?.join(', ') || 'Unknown'}
${context.tone ? `Tone: ${context.tone}` : ''}

Please continue the narrative in a way that feels like a natural extension of the existing text, maintaining the same voice and style while moving the story forward.`

    } else if (data.type === 'text_rewrite') {
      const { text, instruction, context } = data
      
      systemPrompt = `You are an expert editor and writing coach. Your task is to rewrite the provided text according to the specific instruction while maintaining the core meaning and improving the overall quality.

Guidelines:
- Follow the revision instruction precisely
- Maintain the original meaning and key information unless asked to change it
- Preserve the author's voice and style unless instructed otherwise
- Improve clarity, flow, and engagement
- Ensure the revision fits naturally within its context
- Make the text more compelling and readable`

      userPrompt = `Please rewrite the following text according to this instruction: "${instruction}"

**Original Text:**
${text}

**Context:**
${context?.genre ? `Genre: ${context.genre}` : ''}
${context?.scene ? `Scene: ${context.scene}` : ''}
${context?.mood ? `Mood: ${context.mood}` : ''}

Provide only the rewritten version, maintaining the essence while following the instruction.`

    } else if (data.type === 'dialogue_generation') {
      const { context } = data
      
      systemPrompt = `You are a dialogue specialist who creates authentic, character-driven conversations. Your task is to write natural dialogue that reveals character, advances plot, and fits seamlessly within the story context.

Guidelines:
- Write dialogue that sounds natural and authentic to each character
- Ensure each character has a distinct voice and speaking style
- Include appropriate dialogue tags and action beats
- Advance the plot or reveal character through conversation
- Maintain consistency with established character personalities
- Include subtext and emotional undercurrents where appropriate`

      userPrompt = `Write dialogue for this situation:

**Situation:** ${context.situation}
**Characters:**
${context.characters.map((char: any) => `${char.name}: ${char.personality} (Voice: ${char.voice})`).join('\n')}

${context.tone ? `**Tone:** ${context.tone}` : ''}

Create a natural conversation between these characters that fits the situation and reveals their personalities while advancing the scene.`

    } else if (data.type === 'description_enhancement') {
      const { text, enhancementType, context } = data
      
      systemPrompt = `You are a descriptive writing specialist who enhances prose with rich, immersive details. Your task is to take existing text and enhance it with ${enhancementType} details that bring the scene to life.

Guidelines:
- Add ${enhancementType} details that enhance immersion
- Maintain the original structure and meaning
- Use vivid, specific language that engages the senses
- Ensure additions feel natural and not overwrought
- Match the genre and tone of the original text
- Create emotional resonance through detailed description`

      userPrompt = `Enhance this text with ${enhancementType} details:

**Original Text:**
${text}

**Enhancement Type:** ${enhancementType}
**Genre:** ${context.genre}
${context.scene ? `**Scene:** ${context.scene}` : ''}
${context.mood ? `**Mood:** ${context.mood}` : ''}

Add rich ${enhancementType} details that bring this scene to life while maintaining the original flow and meaning.`

    } else if (data.type === 'consistency_check') {
      const { text, context } = data
      
      systemPrompt = `You are a consistency expert who analyzes text for character and world-building consistency. Your task is to identify any inconsistencies and provide specific feedback and suggestions.

Guidelines:
- Check character behavior against established traits
- Verify world-building elements follow established rules
- Identify contradictions or inconsistencies
- Provide specific, actionable feedback
- Suggest corrections that maintain story flow
- Rate overall consistency and highlight strengths`

      userPrompt = `Check this text for consistency issues:

**Text to Analyze:**
${text}

**Character Profiles:**
${context.characters.map((char: any) => `${char.name}: Traits: ${char.traits.join(', ')} | Background: ${char.background}`).join('\n')}

**World Rules:**
${context.worldElements.map((elem: any) => `${elem.name}: ${elem.rules.join(', ')}`).join('\n')}

Analyze the text for any character or world-building inconsistencies and provide specific feedback with suggestions for improvement.`

    } else if (data.type === 'writing_suggestion') {
      const { text, suggestionType, context } = data
      
      systemPrompt = `You are a writing coach specializing in ${suggestionType} analysis. Your task is to analyze the provided text and offer specific, actionable suggestions for improvement in this area.

Guidelines:
- Focus specifically on ${suggestionType} aspects
- Provide concrete, actionable suggestions
- Explain why changes would improve the text
- Maintain the author's voice and style
- Consider the genre and target audience
- Offer both macro and micro-level suggestions`

      userPrompt = `Analyze this text for ${suggestionType} and provide suggestions:

**Text to Analyze:**
${text}

**Analysis Focus:** ${suggestionType}
**Genre:** ${context.genre}
${context.targetAudience ? `**Target Audience:** ${context.targetAudience}` : ''}

Provide specific suggestions for improving the ${suggestionType} of this text, with explanations for why each suggestion would be beneficial.`
    }

    // Make API call to Anthropic
    const response = await anthropic.messages.create({
      model: DEFAULT_OPTIONS.model,
      max_tokens: DEFAULT_OPTIONS.maxTokens,
      temperature: DEFAULT_OPTIONS.temperature,
      system: systemPrompt,
      messages: [
        {
          role: 'user',
          content: userPrompt
        }
      ]
    })

    // Extract generated content
    const content = response.content[0]
    if (content.type !== 'text') {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Unexpected response format from AI',
          errorCode: 'AI_ERROR'
        },
        { status: 500 }
      )
    }

    const generated = content.text
    const tokensUsed = response.usage.input_tokens + response.usage.output_tokens

    // Calculate metadata
    const wordCount = generated.split(/\s+/).length
    const estimatedReadingTime = Math.ceil(wordCount / 200) // 200 words per minute

    return NextResponse.json({
      success: true,
      data: {
        generated,
        tokensUsed,
        metadata: {
          wordCount,
          estimatedReadingTime,
        }
      }
    })

  } catch (error) {
    console.error('API Error:', error)
    console.error('Error details:', {
      message: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined,
      type: typeof error
    })

    // Handle specific error types
    if (error instanceof Anthropic.APIError) {
      if (error.status === 429) {
        return NextResponse.json(
          { 
            success: false, 
            error: 'AI service rate limit exceeded. Please try again later.',
            errorCode: 'RATE_LIMIT'
          },
          { status: 429 }
        )
      }
      if (error.status === 401) {
        return NextResponse.json(
          { 
            success: false, 
            error: 'Invalid API credentials',
            errorCode: 'AUTH_ERROR'
          },
          { status: 401 }
        )
      }
    }

    // Generic error
    return NextResponse.json(
      { 
        success: false, 
        error: 'An unexpected error occurred during AI generation',
        errorCode: 'AI_ERROR'
      },
      { status: 500 }
    )
  }
}

// Health check endpoint
export async function GET() {
  return NextResponse.json({
    status: 'healthy',
    service: 'AI Generation API',
    timestamp: new Date().toISOString(),
    version: '1.0.0'
  })
}