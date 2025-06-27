import { AIWritingRequest, AIWritingResponse } from "@/types/writing"

// Writing service for AI-powered writing assistance
export class WritingService {
  private baseUrl = '/api/ai/generate'

  async generateChapter(request: {
    bookId: string
    chapterId: string
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
  }): Promise<AIWritingResponse> {
    try {
      const response = await fetch(this.baseUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: 'chapter_generation',
          bookId: request.bookId,
          chapterId: request.chapterId,
          context: {
            title: request.title,
            synopsis: request.synopsis,
            genre: request.genre,
            chapterNumber: request.chapterNumber,
            chapterTitle: request.chapterTitle,
            outline: request.outline,
            targetLength: request.targetLength,
            tone: request.tone,
            style: request.style,
            characters: request.characters,
            worldElements: request.worldElements,
            previousChapters: request.previousChapters
          }
        })
      })

      const data = await response.json()
      
      if (!data.success) {
        return {
          success: false,
          error: data.error || 'Chapter generation failed'
        }
      }

      return {
        success: true,
        data: {
          generated: data.data.generated,
          suggestions: [],
          metadata: data.data.metadata
        }
      }
    } catch (error) {
      return {
        success: false,
        error: 'Network error during chapter generation'
      }
    }
  }

  async continueText(request: {
    currentText: string
    cursorPosition: number
    bookId: string
    chapterId: string
    genre: string
    characters: string[]
    tone?: string
  }): Promise<AIWritingResponse> {
    try {
      const response = await fetch(this.baseUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: 'paragraph_continuation',
          currentText: request.currentText,
          cursorPosition: request.cursorPosition,
          context: {
            bookId: request.bookId,
            chapterId: request.chapterId,
            genre: request.genre,
            characters: request.characters,
            tone: request.tone
          }
        })
      })

      const data = await response.json()
      
      if (!data.success) {
        return {
          success: false,
          error: data.error || 'Text continuation failed'
        }
      }

      return {
        success: true,
        data: {
          generated: data.data.generated,
          metadata: data.data.metadata
        }
      }
    } catch (error) {
      return {
        success: false,
        error: 'Network error during text continuation'
      }
    }
  }

  async rewriteText(request: {
    text: string
    instruction: string
    genre?: string
    scene?: string
    mood?: string
  }): Promise<AIWritingResponse> {
    try {
      const response = await fetch(this.baseUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: 'text_rewrite',
          text: request.text,
          instruction: request.instruction,
          context: {
            genre: request.genre,
            scene: request.scene,
            mood: request.mood
          }
        })
      })

      const data = await response.json()
      
      if (!data.success) {
        return {
          success: false,
          error: data.error || 'Text rewrite failed'
        }
      }

      return {
        success: true,
        data: {
          generated: data.data.generated,
          metadata: data.data.metadata
        }
      }
    } catch (error) {
      return {
        success: false,
        error: 'Network error during text rewrite'
      }
    }
  }

  async generateDialogue(request: {
    situation: string
    characters: Array<{
      name: string
      personality: string
      voice: string
    }>
    tone?: string
    bookId: string
    chapterId: string
  }): Promise<AIWritingResponse> {
    try {
      const response = await fetch(this.baseUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: 'dialogue_generation',
          context: {
            bookId: request.bookId,
            chapterId: request.chapterId,
            situation: request.situation,
            characters: request.characters,
            tone: request.tone
          }
        })
      })

      const data = await response.json()
      
      if (!data.success) {
        return {
          success: false,
          error: data.error || 'Dialogue generation failed'
        }
      }

      return {
        success: true,
        data: {
          generated: data.data.generated,
          metadata: data.data.metadata
        }
      }
    } catch (error) {
      return {
        success: false,
        error: 'Network error during dialogue generation'
      }
    }
  }

  async enhanceDescription(request: {
    text: string
    enhancementType: 'sensory' | 'emotional' | 'atmospheric' | 'action'
    genre: string
    scene?: string
    mood?: string
  }): Promise<AIWritingResponse> {
    try {
      const response = await fetch(this.baseUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: 'description_enhancement',
          text: request.text,
          enhancementType: request.enhancementType,
          context: {
            genre: request.genre,
            scene: request.scene,
            mood: request.mood
          }
        })
      })

      const data = await response.json()
      
      if (!data.success) {
        return {
          success: false,
          error: data.error || 'Description enhancement failed'
        }
      }

      return {
        success: true,
        data: {
          generated: data.data.generated,
          metadata: data.data.metadata
        }
      }
    } catch (error) {
      return {
        success: false,
        error: 'Network error during description enhancement'
      }
    }
  }

  async checkConsistency(request: {
    text: string
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
  }): Promise<AIWritingResponse> {
    try {
      const response = await fetch(this.baseUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: 'consistency_check',
          text: request.text,
          context: {
            bookId: request.bookId,
            characters: request.characters,
            worldElements: request.worldElements
          }
        })
      })

      const data = await response.json()
      
      if (!data.success) {
        return {
          success: false,
          error: data.error || 'Consistency check failed'
        }
      }

      return {
        success: true,
        data: {
          generated: data.data.generated,
          metadata: data.data.metadata
        }
      }
    } catch (error) {
      return {
        success: false,
        error: 'Network error during consistency check'
      }
    }
  }

  async getWritingSuggestion(request: {
    text: string
    suggestionType: 'pacing' | 'tone' | 'clarity' | 'engagement' | 'flow'
    genre: string
    targetAudience?: string
  }): Promise<AIWritingResponse> {
    try {
      const response = await fetch(this.baseUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: 'writing_suggestion',
          text: request.text,
          suggestionType: request.suggestionType,
          context: {
            genre: request.genre,
            targetAudience: request.targetAudience
          }
        })
      })

      const data = await response.json()
      
      if (!data.success) {
        return {
          success: false,
          error: data.error || 'Writing suggestion failed'
        }
      }

      return {
        success: true,
        data: {
          generated: data.data.generated,
          metadata: data.data.metadata
        }
      }
    } catch (error) {
      return {
        success: false,
        error: 'Network error during writing suggestion'
      }
    }
  }
}

// Export singleton instance
export const writingService = new WritingService()