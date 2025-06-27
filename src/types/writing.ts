// Writing Studio Types
export type WritingMode = 'normal' | 'focus' | 'dark' | 'typewriter' | 'hemingway' | 'zen'

export type ChapterStatus = 'planned' | 'started' | 'draft' | 'review' | 'complete'

export interface WritingSession {
  id: string
  bookId: string
  chapterId: string
  startTime: Date
  endTime?: Date
  wordsWritten: number
  timeSpent: number
  targetWords?: number
}

export interface ChapterContent {
  id: string
  chapterId: string
  content: string // Rich text JSON
  wordCount: number
  lastSaved: Date
  version: number
  autosaveId?: string
}

export interface ChapterSummary {
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

export interface WritingSettings {
  mode: WritingMode
  fontSize: number
  fontFamily: string
  lineHeight: number
  theme: 'light' | 'dark' | 'sepia'
  autosaveInterval: number // seconds
  focusModeOpacity: number // 0-1
  typewriterPosition: 'center' | 'top' | 'bottom'
  showWordCount: boolean
  showReadingTime: boolean
  showProgress: boolean
}

export interface AIWritingRequest {
  type: 'chapter_generation' | 'paragraph_continuation' | 'text_rewrite' | 
        'dialogue_generation' | 'description_enhancement' | 'consistency_check' |
        'writing_suggestion' | 'plot_development'
  context: {
    bookId: string
    chapterId: string
    currentText: string
    cursorPosition: number
    selectedText?: string
    instruction?: string
    targetLength?: number
    tone?: string
    characters: Array<{
      name: string
      description: string
      traits: string[]
    }>
    worldElements: Array<{
      name: string
      type: string
      description: string
    }>
    outline: ChapterSummary[]
    previousChapters?: Array<{
      number: number
      title: string
      summary: string
    }>
  }
}

export interface AIWritingResponse {
  success: boolean
  data?: {
    generated: string
    suggestions?: string[]
    metadata?: {
      wordCount?: number
      estimatedReadingTime?: number
      tone?: string
      style?: string
      consistency?: 'high' | 'medium' | 'low'
    }
  }
  error?: string
}

export interface WritingAnalytics {
  sessionTime: number // minutes
  wordsWritten: number
  wordsPerMinute: number
  charactersTyped: number
  deletions: number
  pauses: number
  focusTime: number
  distractionEvents: number
  aiAssistanceUsed: number
}

export interface WritingGoal {
  type: 'daily' | 'session' | 'chapter' | 'weekly'
  target: number // words
  current: number
  deadline?: Date
  achieved: boolean
}

export interface PanelState {
  left: boolean
  right: boolean
  leftWidth: number
  rightWidth: number
}

export interface WritingStudioState {
  currentChapterId: string | null
  writingMode: WritingMode
  settings: WritingSettings
  panelState: PanelState
  currentSession: WritingSession | null
  analytics: WritingAnalytics
  goals: WritingGoal[]
  lastSaved: Date | null
  isDirty: boolean
  isGenerating: boolean
}

// AI Context Menu Actions
export interface ContextMenuAction {
  id: string
  label: string
  icon: string
  shortcut?: string
  action: (selectedText: string, context: AIWritingRequest['context']) => Promise<void>
}

// Writing Events
export type WritingEvent = 
  | { type: 'WORD_MILESTONE'; milestone: number }
  | { type: 'CHAPTER_COMPLETE'; chapterId: string }
  | { type: 'DAILY_GOAL_ACHIEVED'; words: number }
  | { type: 'WRITING_STREAK'; days: number }
  | { type: 'AI_SUGGESTION_ACCEPTED'; suggestionType: string }

// Chapter Navigation
export interface ChapterNavItem {
  id: string
  number: number
  title: string
  wordCount: number
  targetWords: number
  status: ChapterStatus
  progress: number
  lastModified: Date
}

// Auto-save
export interface AutosaveState {
  isEnabled: boolean
  interval: number
  lastSave: Date | null
  isSaving: boolean
  hasUnsavedChanges: boolean
  nextSaveIn: number
}

// Writing Statistics
export interface WritingStats {
  totalWords: number
  todayWords: number
  sessionWords: number
  averageWPM: number
  timeWriting: number
  chaptersCompleted: number
  currentStreak: number
  longestStreak: number
}