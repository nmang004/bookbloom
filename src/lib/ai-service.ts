import Anthropic from '@anthropic-ai/sdk'
import { 
  AIGenerateRequest, 
  AIGenerateResponse, 
  AIGenerationOptions,
  ChapterContext,
  AIGenerationError,
  RateLimitError,
  InvalidRequestError
} from '@/types/ai'

// Initialize Anthropic client
const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY!,
})

// Default generation options
const DEFAULT_OPTIONS: AIGenerationOptions = {
  model: 'claude-3-sonnet',
  maxTokens: 4000,
  temperature: 0.7,
}

// Prompt templates for different generation types
const PROMPTS = {
  synopsis: {
    system: `You are a professional book development assistant specializing in synopsis creation. Your task is to transform basic story ideas into compelling, detailed synopses that capture the essence of the story while maintaining the author's vision.

Guidelines:
- Expand the core idea while staying true to the original concept
- Include key plot points, main conflicts, and character motivations
- Maintain the appropriate tone for the specified genre
- Create intrigue without revealing too much
- Aim for 2-3 paragraphs unless otherwise specified`,
    
    user: `Please create a compelling synopsis for a {genre} book based on this idea:

**Core Idea:** {idea}

**Length Preference:** {length}

Please expand this into a full synopsis that would entice readers while giving a clear sense of the story's direction.`
  },

  outline: {
    system: `You are an expert story structure consultant. You help authors create detailed chapter outlines that follow proven narrative frameworks while maintaining creative flexibility.

Guidelines:
- Follow the specified narrative structure ({structure})
- Create {chapters} chapters with clear progression
- Include major plot points, character development, and pacing
- Ensure each chapter has a clear purpose and hook
- Balance action, character development, and plot advancement`,
    
    user: `Create a {chapters}-chapter outline for this book:

**Title:** {title}
**Genre:** {genre}
**Synopsis:** {synopsis}
**Structure:** {structure}

For each chapter, provide:
1. Chapter title
2. Key events and plot points
3. Character development moments
4. Chapter hook/cliffhanger`
  },

  chapter: {
    system: `You are a professional ghostwriter with expertise in crafting engaging prose. You excel at writing chapters that maintain consistent voice, pacing, and character development while advancing the plot.

Guidelines:
- Write in third person limited perspective unless specified otherwise
- Maintain consistency with established characters and world-building
- Create vivid scenes with strong sensory details
- Balance dialogue, action, and narrative description
- End with appropriate tension or resolution for the chapter's purpose
- Target approximately {targetLength} words`,
    
    user: `Write Chapter {chapterNumber}: "{chapterTitle}" for this book:

**Book Context:**
Title: {title}
Genre: {genre}
Synopsis: {synopsis}

**Chapter Context:**
{outline}

**Characters to include:**
{characters}

**Previous chapter summary:**
{previousChapter}

Please write a complete chapter that advances the story while maintaining the established tone and style.`
  },

  character: {
    system: `You are a character development specialist who creates rich, multi-dimensional characters that feel authentic and serve the story's needs.

Guidelines:
- Create complex personalities with clear motivations
- Include physical appearance, personality traits, and backstory
- Consider the character's role in the overall narrative
- Ensure characters fit naturally within the established world
- Provide character arc suggestions that align with the story`,
    
    user: `Create a detailed character profile for:

**Character Name:** {name}
**Role in Story:** {role}

**Book Context:**
Title: {title}
Genre: {genre}
Synopsis: {synopsis}

**Existing Characters:**
{existingCharacters}

Please provide:
1. Physical appearance
2. Personality traits and quirks
3. Background and history
4. Motivations and goals
5. Potential character arc
6. Relationships with other characters
7. Unique voice/speaking style`
  },

  worldbuilding: {
    system: `You are a world-building expert who creates immersive, internally consistent fictional elements that enhance storytelling.

Guidelines:
- Create detailed, logical world elements that serve the narrative
- Ensure consistency with the established genre and tone
- Consider how this element interacts with existing world components
- Provide both broad concepts and specific details
- Make elements feel lived-in and authentic`,
    
    user: `Create a detailed {elementType} for this book:

**Element Name:** {name}
**Type:** {elementType}

**Book Context:**
Title: {title}
Genre: {genre}
Synopsis: {synopsis}

**Existing World Elements:**
{existingElements}

Please provide comprehensive details including:
1. Overview and purpose
2. Appearance/characteristics
3. History and origins
4. Rules and limitations (if applicable)
5. Cultural/social significance
6. How it impacts the story
7. Specific examples or instances`
  },

  rewrite: {
    system: `You are an expert editor and writing coach. You help authors improve their prose by following specific revision instructions while maintaining the author's voice and intent.

Guidelines:
- Follow the revision instruction precisely
- Maintain the original meaning and key information
- Preserve the author's voice and style unless asked to change it
- Improve clarity, flow, and engagement
- Ensure the revision fits naturally within its context`,
    
    user: `Please revise the following text according to this instruction: "{instruction}"

**Original Text:**
{text}

**Context (if applicable):**
Book: {bookTitle}
Genre: {genre}
Tone: {tone}

Please provide the revised version.`
  },

  continue: {
    system: `You are a skilled creative writer who can seamlessly continue existing narratives. You maintain consistency in voice, style, pacing, and character while advancing the story in engaging ways.

Guidelines:
- Match the existing writing style and tone
- Maintain character consistency and development
- Follow logical story progression
- Create engaging prose with appropriate pacing
- Consider the specified direction while allowing for natural story flow`,
    
    user: `Please continue this text in a natural, engaging way:

**Text to Continue:**
{text}

**Direction:** {direction}

**Context:**
Book: {bookTitle}
Genre: {genre}
Characters: {characters}

Continue the narrative for approximately 200-500 words, maintaining the established style and advancing the story.`
  }
}

// Helper function to replace variables in prompt templates
function formatPrompt(template: string, variables: Record<string, string>): string {
  return template.replace(/\{(\w+)\}/g, (match, key) => {
    return variables[key] || match
  })
}

// Main AI generation function
export async function generateAIContent(
  request: AIGenerateRequest,
  options: Partial<AIGenerationOptions> = {}
): Promise<AIGenerateResponse> {
  try {
    const mergedOptions = { ...DEFAULT_OPTIONS, ...options }
    
    // Validate request
    if (!process.env.ANTHROPIC_API_KEY) {
      throw new AIGenerationError('Anthropic API key not configured', 'AUTH_ERROR')
    }

    // Get appropriate prompt template
    const promptTemplate = getPromptTemplate(request)
    
    // Format prompts with request data
    const systemPrompt = formatPrompt(promptTemplate.system, promptTemplate.variables)
    const userPrompt = formatPrompt(promptTemplate.user, promptTemplate.variables)

    // Make API call to Anthropic
    const response = await anthropic.messages.create({
      model: mergedOptions.model === 'claude-3-opus' ? 'claude-3-opus-20240229' :
             mergedOptions.model === 'claude-3-haiku' ? 'claude-3-haiku-20240307' :
             'claude-3-sonnet-20240229',
      max_tokens: mergedOptions.maxTokens!,
      temperature: mergedOptions.temperature!,
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
      throw new AIGenerationError('Unexpected response format from AI', 'AI_ERROR')
    }

    const generated = content.text
    const tokensUsed = response.usage.input_tokens + response.usage.output_tokens

    // Calculate metadata
    const wordCount = generated.split(/\s+/).length
    const estimatedReadingTime = Math.ceil(wordCount / 200) // 200 words per minute

    return {
      success: true,
      data: {
        generated,
        tokensUsed,
        metadata: {
          wordCount,
          estimatedReadingTime,
        }
      }
    }

  } catch (error) {
    console.error('AI Generation Error:', error)

    // Handle specific error types
    if (error instanceof Anthropic.APIError) {
      if (error.status === 429) {
        throw new RateLimitError('AI service rate limit exceeded. Please try again later.')
      }
      if (error.status === 401) {
        throw new AIGenerationError('Invalid API credentials', 'AUTH_ERROR')
      }
    }

    if (error instanceof AIGenerationError) {
      throw error
    }

    // Generic error
    throw new AIGenerationError(
      'An unexpected error occurred during AI generation',
      'AI_ERROR',
      error
    )
  }
}

// Get the appropriate prompt template for a request
function getPromptTemplate(request: AIGenerateRequest) {
  const variables: Record<string, string> = {}
  
  switch (request.type) {
    case 'synopsis':
      variables.idea = request.idea
      variables.genre = request.genre
      variables.length = request.length || 'medium'
      return {
        system: PROMPTS.synopsis.system,
        user: PROMPTS.synopsis.user,
        variables
      }

    case 'outline':
      variables.chapters = request.chapters.toString()
      variables.structure = request.structure
      variables.title = request.context.title
      variables.genre = request.context.genre
      variables.synopsis = request.context.synopsis
      return {
        system: formatPrompt(PROMPTS.outline.system, variables),
        user: PROMPTS.outline.user,
        variables
      }

    case 'chapter':
      const context = request.context
      variables.chapterNumber = context.chapterNumber.toString()
      variables.chapterTitle = context.chapterTitle
      variables.title = context.title
      variables.genre = context.genre
      variables.synopsis = context.synopsis
      variables.outline = context.outline || 'No specific outline provided'
      variables.targetLength = (context.targetLength || 1500).toString()
      variables.characters = context.characters.map(c => 
        `${c.name}: ${c.description} (Traits: ${c.traits.join(', ')})`
      ).join('\n')
      variables.previousChapter = context.previousChapters?.slice(-1)[0]?.summary || 'This is the first chapter'
      
      return {
        system: formatPrompt(PROMPTS.chapter.system, variables),
        user: PROMPTS.chapter.user,
        variables
      }

    case 'character':
      variables.name = request.name
      variables.role = request.role
      variables.title = request.context.title
      variables.genre = request.context.genre
      variables.synopsis = request.context.synopsis
      variables.existingCharacters = request.context.existingCharacters?.map(c =>
        `${c.name}: ${c.description}`
      ).join('\n') || 'No existing characters'
      
      return {
        system: PROMPTS.character.system,
        user: PROMPTS.character.user,
        variables
      }

    case 'worldbuilding':
      variables.name = request.name
      variables.elementType = request.elementType
      variables.title = request.context.title
      variables.genre = request.context.genre
      variables.synopsis = request.context.synopsis
      variables.existingElements = request.context.existingElements?.map(e =>
        `${e.name} (${e.type}): ${e.description}`
      ).join('\n') || 'No existing world elements'
      
      return {
        system: PROMPTS.worldbuilding.system,
        user: PROMPTS.worldbuilding.user,
        variables
      }

    case 'rewrite':
      variables.text = request.text
      variables.instruction = request.instruction
      variables.bookTitle = request.context?.bookTitle || ''
      variables.genre = request.context?.genre || ''
      variables.tone = request.context?.tone || ''
      
      return {
        system: PROMPTS.rewrite.system,
        user: PROMPTS.rewrite.user,
        variables
      }

    case 'continue':
      variables.text = request.text
      variables.direction = request.direction || 'Continue naturally'
      variables.bookTitle = request.context?.bookTitle || ''
      variables.genre = request.context?.genre || ''
      variables.characters = request.context?.characters?.join(', ') || ''
      
      return {
        system: PROMPTS.continue.system,
        user: PROMPTS.continue.user,
        variables
      }

    default:
      throw new InvalidRequestError('Invalid AI generation request type')
  }
}