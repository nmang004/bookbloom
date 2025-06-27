// AI Generation Request Types
export type AIGenerateRequest = 
  | { 
      type: 'synopsis'
      bookId?: string
      idea: string
      genre: string
      length?: 'short' | 'medium' | 'long'
    }
  | { 
      type: 'outline'
      bookId: string
      chapters: number
      structure: 'three-act' | 'heros-journey' | 'custom'
      context: {
        title: string
        synopsis: string
        genre: string
      }
    }
  | { 
      type: 'chapter'
      bookId: string
      chapterId: string
      context: ChapterContext
    }
  | { 
      type: 'character'
      bookId: string
      name: string
      role: string
      context: {
        title: string
        synopsis: string
        genre: string
        existingCharacters?: Array<{
          name: string
          description: string
        }>
      }
    }
  | { 
      type: 'worldbuilding'
      bookId: string
      elementType: 'location' | 'magic-system' | 'technology' | 'culture' | 'history' | 'organization' | 'item' | 'other'
      name: string
      context: {
        title: string
        synopsis: string
        genre: string
        existingElements?: Array<{
          name: string
          type: string
          description: string
        }>
      }
    }
  | { 
      type: 'rewrite'
      text: string
      instruction: string
      context?: {
        bookTitle?: string
        genre?: string
        tone?: string
      }
    }
  | { 
      type: 'continue'
      text: string
      direction?: string
      context?: {
        bookTitle?: string
        genre?: string
        characters?: string[]
      }
    }
  | {
      type: 'chapter_generation'
      bookId: string
      chapterId: string
      context: {
        title: string
        synopsis: string
        genre: string
        chapterNumber: number
        chapterTitle: string
        outline?: string
        targetLength?: number
        tone?: string
        style?: string
        characters: Array<{
          name: string
          description: string
          traits: string[]
        }>
        worldElements?: Array<{
          name: string
          type: string
          description: string
        }>
        previousChapters?: Array<{
          number: number
          title: string
          summary: string
        }>
      }
    }
  | {
      type: 'paragraph_continuation'
      currentText: string
      cursorPosition: number
      context: {
        bookId: string
        chapterId: string
        genre: string
        characters: string[]
        tone?: string
      }
    }
  | {
      type: 'dialogue_generation'
      context: {
        bookId: string
        chapterId: string
        situation: string
        characters: Array<{
          name: string
          personality: string
          voice: string
        }>
        tone?: string
      }
    }
  | {
      type: 'description_enhancement'
      text: string
      enhancementType: 'sensory' | 'emotional' | 'atmospheric' | 'action'
      context: {
        genre: string
        scene?: string
        mood?: string
      }
    }
  | {
      type: 'consistency_check'
      text: string
      context: {
        bookId: string
        characters: Array<{
          name: string
          traits: string[]
          background: string
        }>
        worldElements: Array<{
          name: string
          rules: string[]
        }>
      }
    }
  | {
      type: 'writing_suggestion'
      text: string
      suggestionType: 'pacing' | 'tone' | 'clarity' | 'engagement' | 'flow'
      context: {
        genre: string
        targetAudience?: string
      }
    }

// Chapter Context for AI Generation
export interface ChapterContext {
  title: string
  synopsis: string
  genre: string
  chapterNumber: number
  chapterTitle: string
  outline?: string
  previousChapters?: Array<{
    number: number
    title: string
    summary: string
  }>
  characters: Array<{
    name: string
    description: string
    traits: string[]
  }>
  worldElements?: Array<{
    name: string
    type: string
    description: string
  }>
  targetLength?: number // word count
  tone?: string
  style?: string
}

// AI Response Types
export interface AIGenerateResponse {
  success: boolean
  data?: {
    generated: string
    tokensUsed: number
    suggestions?: string[]
    metadata?: {
      wordCount?: number
      estimatedReadingTime?: number
      tone?: string
      style?: string
    }
  }
  error?: string
  errorCode?: 'RATE_LIMIT' | 'INVALID_REQUEST' | 'AI_ERROR' | 'AUTH_ERROR'
}

// AI Generation Options
export interface AIGenerationOptions {
  model?: 'claude-3-sonnet' | 'claude-3-haiku' | 'claude-3-opus'
  maxTokens?: number
  temperature?: number
  systemPrompt?: string
}

// Prompt Templates
export interface PromptTemplate {
  system: string
  user: string
  variables: Record<string, string>
}

// AI Usage Tracking
export interface AIUsageMetrics {
  tokensUsed: number
  requestType: string
  timestamp: Date
  userId: string
  bookId?: string
  success: boolean
  model: string
}

// Custom error types
export class AIGenerationError extends Error {
  constructor(
    message: string,
    public errorCode: AIGenerateResponse['errorCode'],
    public details?: unknown
  ) {
    super(message)
    this.name = 'AIGenerationError'
  }
}

export class RateLimitError extends AIGenerationError {
  constructor(message: string = 'Rate limit exceeded') {
    super(message, 'RATE_LIMIT')
  }
}

export class InvalidRequestError extends AIGenerationError {
  constructor(message: string) {
    super(message, 'INVALID_REQUEST')
  }
}

// Outline and Chapter Types
export type ChapterStatus = 'planned' | 'writing' | 'draft' | 'review' | 'final'

export interface Chapter {
  id: string
  number: number
  title: string
  summary: string
  plotPoints: string[]
  characterArcs: string[]
  conflicts: string[]
  wordCountTarget: number
  wordCountActual: number
  status: ChapterStatus
  createdAt: Date
  updatedAt: Date
}

export interface Outline {
  id: string
  bookId: string
  structure: 'three-act' | 'heros-journey' | 'custom'
  totalChapters: number
  chapters: Chapter[]
  createdAt: Date
  updatedAt: Date
}

export type OutlineStructure = 'three-act' | 'heros-journey' | 'custom'
export type PacingPreference = 'fast' | 'moderate' | 'slow'

export interface OutlineGenerationConfig {
  chapters: number
  structure: OutlineStructure
  pacing: PacingPreference
}