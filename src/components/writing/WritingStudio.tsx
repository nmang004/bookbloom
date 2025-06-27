"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { 
  PenTool, 
  Clock, 
  Target, 
  Sparkles,
  Eye,
  Moon,
  Type,
  Zap,
  Minimize2,
  ChevronLeft,
  ChevronRight,
  Play,
  BookOpen,
  Plus,
  Search
} from "lucide-react"
import { WritingMode, ChapterNavItem, WritingSettings, WritingStudioState, AutosaveState, WritingStats } from "@/types/writing"
import RichTextEditor from "./RichTextEditor"
import WritingStatsComponent from "./WritingStats"
import { writingService } from "@/lib/writing-service"

interface WritingStudioProps {
  book: {
    id: string
    title: string
    synopsis: string
    genre: string
    chapters?: ChapterNavItem[]
  }
  onNavigateBack?: () => void
}

// Mock data for development - using static dates to prevent hydration issues
const mockChapters: ChapterNavItem[] = [
  {
    id: "ch1",
    number: 1,
    title: "The Awakening",
    wordCount: 2450,
    targetWords: 2500,
    status: "complete",
    progress: 98,
    lastModified: new Date('2024-01-15T10:00:00Z')
  },
  {
    id: "ch2", 
    number: 2,
    title: "First Steps",
    wordCount: 1200,
    targetWords: 2500,
    status: "draft",
    progress: 48,
    lastModified: new Date('2024-01-14T15:30:00Z')
  },
  {
    id: "ch3",
    number: 3,
    title: "The Discovery",
    wordCount: 0,
    targetWords: 2500,
    status: "planned",
    progress: 0,
    lastModified: new Date('2024-01-13T09:00:00Z')
  }
]

// Writing mode configurations - moved outside component
const writingModeConfig = {
  normal: {
    icon: PenTool,
    label: "Normal",
    description: "Standard writing environment"
  },
  focus: {
    icon: Eye,
    label: "Focus",
    description: "Highlights current paragraph only"
  },
  dark: {
    icon: Moon,
    label: "Dark",
    description: "Dark theme for eye strain reduction"
  },
  typewriter: {
    icon: Type,
    label: "Typewriter",
    description: "Current line stays centered"
  },
  hemingway: {
    icon: Zap,
    label: "Hemingway",
    description: "Forward-only writing mode"
  },
  zen: {
    icon: Minimize2,
    label: "Zen",
    description: "Minimal distraction-free interface"
  }
}

const defaultSettings: WritingSettings = {
  mode: 'normal',
  fontSize: 16,
  fontFamily: 'serif',
  lineHeight: 1.6,
  theme: 'light',
  autosaveInterval: 10,
  focusModeOpacity: 0.3,
  typewriterPosition: 'center',
  showWordCount: true,
  showReadingTime: true,
  showProgress: true
}

const defaultStats: WritingStats = {
  totalWords: 3650,
  todayWords: 450,
  sessionWords: 0,
  averageWPM: 0,
  timeWriting: 0,
  chaptersCompleted: 1,
  currentStreak: 3,
  longestStreak: 7
}

const WritingStudio = ({ book, onNavigateBack }: WritingStudioProps) => {
  // State management
  const [state, setState] = useState<WritingStudioState>({
    currentChapterId: 'ch2',
    writingMode: 'normal',
    settings: defaultSettings,
    panelState: {
      left: true,
      right: true,
      leftWidth: 250,
      rightWidth: 300
    },
    currentSession: null,
    analytics: {
      sessionTime: 0,
      wordsWritten: 0,
      wordsPerMinute: 0,
      charactersTyped: 0,
      deletions: 0,
      pauses: 0,
      focusTime: 0,
      distractionEvents: 0,
      aiAssistanceUsed: 0
    },
    goals: [],
    lastSaved: null,
    isDirty: false,
    isGenerating: false
  })

  const [chapters] = useState<ChapterNavItem[]>(mockChapters)
  const [stats, setStats] = useState<WritingStats>(defaultStats)
  const [autosave, setAutosave] = useState<AutosaveState>({
    isEnabled: true,
    interval: 10,
    lastSave: null,
    isSaving: false,
    hasUnsavedChanges: false,
    nextSaveIn: 10
  })

  const [isClient, setIsClient] = useState(false)

  const [editorContent, setEditorContent] = useState("")
  const [searchQuery, setSearchQuery] = useState("")

  // Set client flag after hydration
  useEffect(() => {
    setIsClient(true)
  }, [])

  // Current chapter data
  const currentChapter = chapters.find(ch => ch.id === state.currentChapterId)


  // Toggle panels
  const togglePanel = (panel: 'left' | 'right') => {
    setState(prev => ({
      ...prev,
      panelState: {
        ...prev.panelState,
        [panel]: !prev.panelState[panel]
      }
    }))
  }

  // Change writing mode
  const setWritingMode = (mode: WritingMode) => {
    setState(prev => ({
      ...prev,
      writingMode: mode,
      settings: {
        ...prev.settings,
        mode
      }
    }))
  }

  // Select chapter
  const selectChapter = (chapterId: string) => {
    setState(prev => ({
      ...prev,
      currentChapterId: chapterId
    }))
  }

  // Generate chapter with AI
  const generateChapter = async () => {
    if (!currentChapter) return

    setState(prev => ({ ...prev, isGenerating: true }))

    try {
      const response = await writingService.generateChapter({
        bookId: book.id,
        chapterId: currentChapter.id,
        title: book.title,
        synopsis: book.synopsis,
        genre: book.genre,
        chapterNumber: currentChapter.number,
        chapterTitle: currentChapter.title,
        targetLength: currentChapter.targetWords,
        characters: [
          {
            name: "Elena",
            description: "The protagonist with reality-altering powers",
            traits: ["determined", "conflicted", "powerful"]
          }
        ],
        worldElements: [
          {
            name: "Ancient Magic",
            type: "magic-system",
            description: "Reality-bending magic that threatens existence"
          }
        ]
      })

      if (response.success && response.data?.generated) {
        setEditorContent(response.data.generated)
        setAutosave(prev => ({ ...prev, hasUnsavedChanges: true }))
      } else {
        console.error('Chapter generation failed:', response.error)
      }
    } catch (error) {
      console.error('Error generating chapter:', error)
    } finally {
      setState(prev => ({ ...prev, isGenerating: false }))
    }
  }

  // Get progress emoji for chapter status
  const getProgressEmoji = (status: string, progress: number) => {
    if (status === 'complete') return '🌸'
    if (progress >= 75) return '🌺'
    if (progress >= 50) return '🌿'
    if (progress >= 25) return '🌱'
    if (progress > 0) return '🌱'
    return '🌰'
  }

  // Auto-save functionality
  useEffect(() => {
    if (!autosave.isEnabled || !autosave.hasUnsavedChanges || autosave.isSaving) return

    const timeoutId = setTimeout(() => {
      // Trigger auto-save
      setAutosave(prev => ({ ...prev, isSaving: true }))
      
      // Simulate save
      setTimeout(() => {
        const now = new Date()
        setAutosave(prev => ({
          ...prev,
          isSaving: false,
          hasUnsavedChanges: false,
          lastSave: now
        }))
        setState(prev => ({ ...prev, lastSaved: now, isDirty: false }))
      }, 500)
    }, autosave.interval * 1000)

    return () => clearTimeout(timeoutId)
  }, [autosave.isEnabled, autosave.hasUnsavedChanges, autosave.isSaving, autosave.interval])

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey) {
        switch (e.key) {
          case 's':
            e.preventDefault()
            // Manual save
            break
          case 'b':
            e.preventDefault()
            // Bold
            break
          case 'i':
            e.preventDefault()
            // Italic
            break
          case '1':
            e.preventDefault()
            setWritingMode('focus')
            break
          case '2':
            e.preventDefault()
            setWritingMode('dark')
            break
          case '3':
            e.preventDefault()
            setWritingMode('typewriter')
            break
        }
      }
      
      if (e.key === 'F11') {
        e.preventDefault()
        setWritingMode('zen')
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  return (
    <div className={`
      flex flex-col h-screen bg-gradient-to-br from-sakura-50/30 to-white dark:from-charcoal-900 dark:to-charcoal-800
      ${state.writingMode === 'dark' ? 'dark' : ''}
      ${state.writingMode === 'zen' ? 'zen-mode' : ''}
    `}>
      
      {/* Top Navigation Bar */}
      <div className={`
        flex items-center justify-between px-6 py-3 bg-white/90 dark:bg-charcoal-800/90 backdrop-blur-sm border-b border-sakura-100/50 dark:border-charcoal-700/50
        ${state.writingMode === 'zen' ? 'hidden' : ''}
      `}>
        <div className="flex items-center space-x-4">
          {onNavigateBack && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onNavigateBack}
              className="text-charcoal-600 dark:text-charcoal-400"
            >
              <BookOpen className="h-4 w-4 mr-2" />
              Back to Workbench
            </Button>
          )}
          
          <div className="text-2xl">🌸</div>
          <div>
            <h1 className="font-semibold text-charcoal-900 dark:text-white">Writing Studio</h1>
            <p className="text-sm text-charcoal-600 dark:text-charcoal-400">{book.title}</p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          {autosave.isSaving && (
            <div className="flex items-center space-x-2 text-sm text-sakura-600">
              <div className="w-2 h-2 bg-sakura-500 rounded-full animate-pulse" />
              <span>Auto-saving...</span>
            </div>
          )}
          {autosave.lastSave && isClient && (
            <span className="text-sm text-charcoal-500">
              Saved {new Date(autosave.lastSave).toLocaleTimeString()}
            </span>
          )}
        </div>
      </div>

      {/* Main Writing Studio Layout */}
      <div className="flex flex-1 overflow-hidden">
      
      {/* Left Panel - Chapter Navigation */}
      <div className={`
        transition-all duration-300 border-r border-sakura-100/50 dark:border-charcoal-700/50 bg-white/90 dark:bg-charcoal-800/90 backdrop-blur-sm
        ${state.panelState.left ? 'w-64' : 'w-0 overflow-hidden'}
        ${state.writingMode === 'zen' ? 'hidden' : ''}
      `}>
        <div className="flex flex-col h-full">
          {/* Chapter Panel Header */}
          <div className="p-4 border-b border-sakura-100/50 dark:border-charcoal-700/50">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-charcoal-900 dark:text-white">Chapters</h3>
              <Button variant="ghost" size="sm" onClick={() => {}}>
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-charcoal-400" />
              <input
                type="text"
                placeholder="Search chapters..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-8 pr-3 py-2 text-sm bg-charcoal-50 dark:bg-charcoal-700 border border-charcoal-200 dark:border-charcoal-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-sakura-500"
              />
            </div>
          </div>

          {/* Chapter List */}
          <div className="flex-1 overflow-y-auto p-2 space-y-1">
            {chapters
              .filter(ch => ch.title.toLowerCase().includes(searchQuery.toLowerCase()))
              .map((chapter) => (
                <button
                  key={chapter.id}
                  onClick={() => selectChapter(chapter.id)}
                  className={`
                    w-full p-3 rounded-xl text-left transition-all duration-200 group
                    ${state.currentChapterId === chapter.id 
                      ? 'bg-sakura-100 dark:bg-sakura-900/20 text-sakura-700 dark:text-sakura-400 shadow-sm' 
                      : 'text-charcoal-600 dark:text-charcoal-400 hover:bg-sakura-50 dark:hover:bg-charcoal-700/50'
                    }
                  `}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <span className="text-lg">{getProgressEmoji(chapter.status, chapter.progress)}</span>
                      <span className="font-medium text-sm">Chapter {chapter.number}</span>
                    </div>
                    <div className="text-xs text-charcoal-400">
                      {chapter.progress}%
                    </div>
                  </div>
                  
                  <h4 className="font-medium text-sm mb-1 truncate">{chapter.title}</h4>
                  
                  <div className="flex items-center justify-between text-xs text-charcoal-500">
                    <span>{chapter.wordCount.toLocaleString()} words</span>
                    <span>of {chapter.targetWords.toLocaleString()}</span>
                  </div>
                  
                  {/* Progress bar */}
                  <div className="w-full bg-charcoal-200 dark:bg-charcoal-600 rounded-full h-1 mt-2">
                    <div 
                      className="bg-sakura-500 h-1 rounded-full transition-all duration-300"
                      style={{ width: `${chapter.progress}%` }}
                    />
                  </div>
                </button>
              ))}
          </div>

          {/* Chapter Panel Stats */}
          <div className="p-4 border-t border-sakura-100/50 dark:border-charcoal-700/50 bg-gradient-to-r from-sakura-50/50 to-white dark:from-charcoal-800/50 dark:to-charcoal-700/50">
            <div className="text-xs text-charcoal-600 dark:text-charcoal-400 space-y-1">
              <div className="flex justify-between">
                <span>Total Words:</span>
                <span className="font-medium">{stats.totalWords.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>Chapters Done:</span>
                <span className="font-medium">{stats.chaptersCompleted}</span>
              </div>
              <div className="flex justify-between">
                <span>Current Streak:</span>
                <span className="font-medium">{stats.currentStreak} days</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Center Panel - Writing Area */}
      <div className="flex-1 flex flex-col">
        {/* Writing Toolbar */}
        <div className={`
          flex items-center justify-between p-4 bg-white/90 dark:bg-charcoal-800/90 backdrop-blur-sm border-b border-sakura-100/50 dark:border-charcoal-700/50
          ${state.writingMode === 'zen' ? 'hidden' : ''}
        `}>
          {/* Left side - Chapter info */}
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => togglePanel('left')}
              className="text-charcoal-600 dark:text-charcoal-400"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            
            {currentChapter && (
              <div>
                <h2 className="font-semibold text-charcoal-900 dark:text-white">
                  Chapter {currentChapter.number}: {currentChapter.title}
                </h2>
                <p className="text-sm text-charcoal-600 dark:text-charcoal-400">
                  {currentChapter.wordCount} / {currentChapter.targetWords} words
                </p>
              </div>
            )}
          </div>

          {/* Center - Writing modes */}
          <div className="flex items-center space-x-1 bg-charcoal-100 dark:bg-charcoal-700 rounded-lg p-1">
            {Object.entries(writingModeConfig).map(([mode, config]) => {
              const Icon = config.icon
              return (
                <Button
                  key={mode}
                  variant={state.writingMode === mode ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setWritingMode(mode as WritingMode)}
                  className={`
                    h-8 px-3
                    ${state.writingMode === mode 
                      ? 'bg-white dark:bg-charcoal-600 shadow-sm' 
                      : 'hover:bg-white/50 dark:hover:bg-charcoal-600/50'
                    }
                  `}
                  title={`${config.label} - ${config.description}`}
                >
                  <Icon className="h-4 w-4" />
                </Button>
              )
            })}
          </div>

          {/* Right side - Stats and actions */}
          <div className="flex items-center space-x-4">
            {/* Live stats */}
            <div className="flex items-center space-x-4 text-sm text-charcoal-600 dark:text-charcoal-400">
              <div className="flex items-center space-x-1">
                <Target className="h-4 w-4" />
                <span>{stats.sessionWords} words</span>
              </div>
              <div className="flex items-center space-x-1">
                <Clock className="h-4 w-4" />
                <span>{Math.floor(stats.timeWriting / 60)}m</span>
              </div>
              {autosave.isSaving && (
                <div className="flex items-center space-x-1 text-sakura-600">
                  <div className="w-2 h-2 bg-sakura-500 rounded-full animate-pulse" />
                  <span>Saving...</span>
                </div>
              )}
            </div>

            <Button
              variant="ghost"
              size="sm"
              onClick={() => togglePanel('right')}
              className="text-charcoal-600 dark:text-charcoal-400"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Writing Area */}
        <div className="flex-1 overflow-hidden">
          <div className="h-full p-6">
            <div className={`
              h-full max-w-4xl mx-auto
              ${state.writingMode === 'typewriter' ? 'flex flex-col justify-center' : ''}
            `}>
              {/* Rich Text Editor */}
              <RichTextEditor
                content={editorContent}
                onChange={setEditorContent}
                onWordCountChange={(count) => {
                  setStats(prev => ({ ...prev, sessionWords: count }))
                  setAutosave(prev => ({ ...prev, hasUnsavedChanges: true }))
                }}
                settings={state.settings}
                writingMode={state.writingMode}
                className="h-full"
                bookContext={{
                  id: book.id,
                  title: book.title,
                  genre: book.genre,
                  chapterId: state.currentChapterId || 'default'
                }}
              />

              {/* AI Chapter Generation Button */}
              {currentChapter && currentChapter.wordCount === 0 && !editorContent.trim() && (
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <div className="text-center bg-white dark:bg-charcoal-800 p-8 rounded-2xl shadow-lg border border-sakura-200/50">
                    <h3 className="text-lg font-semibold text-charcoal-900 dark:text-white mb-2">
                      Ready to write Chapter {currentChapter.number}?
                    </h3>
                    <p className="text-charcoal-600 dark:text-charcoal-400 mb-6">
                      Start typing or let AI help you begin this chapter
                    </p>
                    <Button
                      size="lg"
                      className="bg-gradient-to-r from-sakura-500 to-sakura-600 hover:from-sakura-600 hover:to-sakura-700 text-white shadow-lg"
                      onClick={generateChapter}
                      disabled={state.isGenerating}
                    >
                      <Sparkles className="h-5 w-5 mr-2" />
                      {state.isGenerating ? 'Generating Chapter...' : 'Write This Chapter with AI'}
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel - AI Muse Assistant */}
      <div className={`
        transition-all duration-300 border-l border-sakura-100/50 dark:border-charcoal-700/50 bg-white/90 dark:bg-charcoal-800/90 backdrop-blur-sm
        ${state.panelState.right ? 'w-80' : 'w-0 overflow-hidden'}
        ${state.writingMode === 'zen' ? 'hidden' : ''}
      `}>
        <div className="flex flex-col h-full">
          {/* AI Panel Header */}
          <div className="p-4 border-b border-sakura-100/50 dark:border-charcoal-700/50">
            <div className="flex items-center space-x-2">
              <Sparkles className="h-5 w-5 text-sakura-500" />
              <h3 className="font-semibold text-charcoal-900 dark:text-white">AI Muse</h3>
            </div>
            <p className="text-xs text-charcoal-600 dark:text-charcoal-400 mt-1">
              Your intelligent writing companion
            </p>
          </div>

          {/* AI Assistance Sections */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {/* Active Assistance */}
            <Card className="border-sakura-200/50">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium">Real-time Suggestions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="p-2 bg-sakura-50 dark:bg-sakura-900/20 rounded-lg text-xs">
                  Consider adding more sensory details to this scene
                </div>
                <div className="p-2 bg-sakura-50 dark:bg-sakura-900/20 rounded-lg text-xs">
                  The dialogue feels natural here
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="border-sakura-200/50">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="outline" size="sm" className="w-full justify-start text-xs">
                  <Play className="h-3 w-3 mr-2" />
                  Generate Next Paragraph
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start text-xs">
                  <Sparkles className="h-3 w-3 mr-2" />
                  Suggest Dialogue
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start text-xs">
                  <Eye className="h-3 w-3 mr-2" />
                  Add Scene Description
                </Button>
              </CardContent>
            </Card>

            {/* Writing Analytics */}
            <WritingStatsComponent 
              stats={stats}
              goals={{ dailyWords: 500, weeklyWords: 3500, monthlyWords: 15000 }}
            />
          </div>
        </div>
      </div>
      
      </div>
    </div>
  )
}

export default WritingStudio