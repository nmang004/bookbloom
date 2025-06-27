"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Sparkles,
  Edit3,
  MessageSquare,
  Eye,
  CheckCircle,
  ArrowRight,
  Palette,
  Volume2,
  BarChart3,
  RefreshCw,
  Zap,
  X
} from "lucide-react"
import { writingService } from "@/lib/writing-service"
import { AIWritingResponse } from "@/types/writing"

interface AIContextMenuProps {
  selectedText: string
  position: { x: number; y: number }
  onClose: () => void
  onApplyResult: (newText: string) => void
  bookContext: {
    id: string
    title: string
    genre: string
    chapterId: string
  }
}

interface ContextMenuAction {
  id: string
  label: string
  icon: any
  description: string
  category: 'rewrite' | 'enhance' | 'generate' | 'analyze'
  action: () => Promise<void>
}

const AIContextMenu = ({
  selectedText,
  position,
  onClose,
  onApplyResult,
  bookContext
}: AIContextMenuProps) => {
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loadingAction, setLoadingAction] = useState<string | null>(null)
  const menuRef = useRef<HTMLDivElement>(null)

  // Handle click outside to close
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        onClose()
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [onClose])

  // Handle escape key
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [onClose])

  const executeAction = async (actionId: string, actionFn: () => Promise<AIWritingResponse>) => {
    setIsLoading(true)
    setLoadingAction(actionId)
    setError(null)
    setResult(null)

    try {
      const response = await actionFn()
      
      if (response.success && response.data?.generated) {
        setResult(response.data.generated)
      } else {
        setError(response.error || 'AI generation failed')
      }
    } catch (err) {
      setError('An unexpected error occurred')
    } finally {
      setIsLoading(false)
      setLoadingAction(null)
    }
  }

  const contextMenuActions: ContextMenuAction[] = [
    {
      id: 'rewrite_improve',
      label: 'Rewrite & Improve',
      icon: Edit3,
      description: 'Improve clarity and flow',
      category: 'rewrite',
      action: async () => {
        await executeAction('rewrite_improve', () =>
          writingService.rewriteText({
            text: selectedText,
            instruction: 'Rewrite this text to improve clarity, flow, and engagement while maintaining the original meaning',
            genre: bookContext.genre
          })
        )
      }
    },
    {
      id: 'make_descriptive',
      label: 'Make More Descriptive',
      icon: Palette,
      description: 'Add sensory details and atmosphere',
      category: 'enhance',
      action: async () => {
        await executeAction('make_descriptive', () =>
          writingService.enhanceDescription({
            text: selectedText,
            enhancementType: 'sensory',
            genre: bookContext.genre
          })
        )
      }
    },
    {
      id: 'add_dialogue',
      label: 'Convert to Dialogue',
      icon: MessageSquare,
      description: 'Transform narrative into conversation',
      category: 'rewrite',
      action: async () => {
        await executeAction('add_dialogue', () =>
          writingService.rewriteText({
            text: selectedText,
            instruction: 'Convert this narrative text into natural dialogue between characters, including appropriate dialogue tags and action beats',
            genre: bookContext.genre
          })
        )
      }
    },
    {
      id: 'show_dont_tell',
      label: 'Show, Don\'t Tell',
      icon: Eye,
      description: 'Convert telling to showing',
      category: 'rewrite',
      action: async () => {
        await executeAction('show_dont_tell', () =>
          writingService.rewriteText({
            text: selectedText,
            instruction: 'Rewrite this text to show rather than tell, using specific actions, dialogue, and sensory details instead of direct statements',
            genre: bookContext.genre
          })
        )
      }
    },
    {
      id: 'continue_from_here',
      label: 'Continue From Here',
      icon: ArrowRight,
      description: 'Generate next paragraphs',
      category: 'generate',
      action: async () => {
        await executeAction('continue_from_here', () =>
          writingService.continueText({
            currentText: selectedText,
            cursorPosition: selectedText.length,
            bookId: bookContext.id,
            chapterId: bookContext.chapterId,
            genre: bookContext.genre,
            characters: [] // Would need to pass actual characters
          })
        )
      }
    },
    {
      id: 'add_emotion',
      label: 'Add Emotional Depth',
      icon: Volume2,
      description: 'Enhance emotional resonance',
      category: 'enhance',
      action: async () => {
        await executeAction('add_emotion', () =>
          writingService.enhanceDescription({
            text: selectedText,
            enhancementType: 'emotional',
            genre: bookContext.genre
          })
        )
      }
    },
    {
      id: 'improve_pacing',
      label: 'Improve Pacing',
      icon: Zap,
      description: 'Adjust rhythm and flow',
      category: 'analyze',
      action: async () => {
        await executeAction('improve_pacing', () =>
          writingService.getWritingSuggestion({
            text: selectedText,
            suggestionType: 'pacing',
            genre: bookContext.genre
          })
        )
      }
    },
    {
      id: 'check_consistency',
      label: 'Check Consistency',
      icon: CheckCircle,
      description: 'Validate against characters & world',
      category: 'analyze',
      action: async () => {
        await executeAction('check_consistency', () =>
          writingService.checkConsistency({
            text: selectedText,
            bookId: bookContext.id,
            characters: [], // Would need actual character data
            worldElements: [] // Would need actual world data
          })
        )
      }
    }
  ]

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'rewrite': return 'text-blue-600 bg-blue-50 border-blue-200'
      case 'enhance': return 'text-green-600 bg-green-50 border-green-200'
      case 'generate': return 'text-purple-600 bg-purple-50 border-purple-200'
      case 'analyze': return 'text-orange-600 bg-orange-50 border-orange-200'
      default: return 'text-charcoal-600 bg-charcoal-50 border-charcoal-200'
    }
  }

  return (
    <div
      ref={menuRef}
      className="fixed z-50 w-80 bg-white dark:bg-charcoal-800 rounded-2xl shadow-2xl border border-sakura-200/50 dark:border-charcoal-700/50 overflow-hidden"
      style={{
        left: position.x,
        top: position.y,
        maxHeight: '80vh',
        transform: position.y > window.innerHeight / 2 ? 'translateY(-100%)' : 'translateY(0)'
      }}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 bg-gradient-to-r from-sakura-50 to-white dark:from-charcoal-800 dark:to-charcoal-700 border-b border-sakura-100/50 dark:border-charcoal-700/50">
        <div className="flex items-center space-x-2">
          <Sparkles className="h-5 w-5 text-sakura-500" />
          <h3 className="font-semibold text-charcoal-900 dark:text-white">AI Assistance</h3>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={onClose}
          className="h-6 w-6 p-0 text-charcoal-400 hover:text-charcoal-600"
        >
          <X className="h-4 w-4" />
        </Button>
      </div>

      {/* Selected text preview */}
      <div className="p-3 bg-charcoal-50 dark:bg-charcoal-900/50 border-b border-charcoal-100 dark:border-charcoal-700">
        <p className="text-xs text-charcoal-600 dark:text-charcoal-400 mb-1">Selected text:</p>
        <p className="text-sm text-charcoal-800 dark:text-charcoal-200 line-clamp-3 italic">
          "{selectedText.length > 100 ? selectedText.substring(0, 100) + '...' : selectedText}"
        </p>
      </div>

      {/* Actions */}
      {!result && !error && (
        <div className="max-h-96 overflow-y-auto">
          <div className="p-2 space-y-1">
            {contextMenuActions.map((action) => {
              const Icon = action.icon
              const isLoadingThis = loadingAction === action.id
              
              return (
                <Button
                  key={action.id}
                  variant="ghost"
                  className={`
                    w-full justify-start h-auto p-3 text-left
                    ${getCategoryColor(action.category)}
                    hover:shadow-sm transition-all duration-200
                    ${isLoadingThis ? 'opacity-50 cursor-not-allowed' : ''}
                  `}
                  onClick={action.action}
                  disabled={isLoading}
                >
                  <div className="flex items-start space-x-3 w-full">
                    <Icon className={`h-5 w-5 mt-0.5 ${isLoadingThis ? 'animate-spin' : ''}`} />
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-sm">{action.label}</div>
                      <div className="text-xs opacity-75 mt-0.5">{action.description}</div>
                    </div>
                  </div>
                </Button>
              )
            })}
          </div>
        </div>
      )}

      {/* Loading state */}
      {isLoading && !result && !error && (
        <div className="p-6 text-center">
          <div className="inline-flex items-center space-x-2 text-sakura-600">
            <RefreshCw className="h-5 w-5 animate-spin" />
            <span>AI is working...</span>
          </div>
        </div>
      )}

      {/* Result */}
      {result && (
        <div className="p-4 space-y-4">
          <div>
            <h4 className="font-medium text-charcoal-900 dark:text-white mb-2">AI Suggestion:</h4>
            <div className="bg-charcoal-50 dark:bg-charcoal-900/50 rounded-lg p-3 text-sm text-charcoal-700 dark:text-charcoal-300 max-h-48 overflow-y-auto">
              {result}
            </div>
          </div>
          
          <div className="flex space-x-2">
            <Button
              size="sm"
              className="flex-1 bg-sakura-500 hover:bg-sakura-600 text-white"
              onClick={() => {
                onApplyResult(result)
                onClose()
              }}
            >
              Apply Changes
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setResult(null)
                setError(null)
              }}
            >
              Try Different
            </Button>
          </div>
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="p-4 space-y-4">
          <div className="text-center">
            <p className="text-red-600 dark:text-red-400 text-sm">{error}</p>
          </div>
          
          <Button
            variant="outline"
            size="sm"
            className="w-full"
            onClick={() => {
              setResult(null)
              setError(null)
            }}
          >
            Try Again
          </Button>
        </div>
      )}
    </div>
  )
}

export default AIContextMenu