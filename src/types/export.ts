export interface ExportRequest {
  bookId: string
  format: 'PDF' | 'DOCX' | 'TXT'
  chapters: string[] // chapter IDs to include
  options: {
    includeTitle?: boolean
    includeTOC?: boolean
    includeCharacters?: boolean
    includeWorldBuilding?: boolean
    font?: string
    margins?: { top: number, bottom: number, left: number, right: number }
    pageNumbers?: boolean
    chapterBreaks?: boolean
    lineSpacing?: number
    encoding?: string
  }
}

export interface ExportJob {
  id: string
  bookId: string
  format: 'PDF' | 'DOCX' | 'TXT'
  status: 'pending' | 'processing' | 'completed' | 'failed'
  progress: number
  downloadUrl?: string
  expiresAt?: Date
  createdAt: Date
  error?: string
}

export interface BookSettings {
  basicInfo: {
    title: string
    subtitle?: string
    author: string
    genre: string
    description: string
    isbn?: string
    publisher?: string
    copyright?: string
  }
  goals: {
    targetWordCount: number
    dailyGoal: number
    deadline?: Date
    writingSchedule: 'daily' | 'weekly' | 'custom'
  }
  display: {
    coverImage?: string
    status: 'planning' | 'writing' | 'editing' | 'completed'
    tags: string[]
    isPrivate: boolean
  }
  aiPreferences: {
    defaultModel: string
    writingStyle: string
    tone: string
    generationLength: 'short' | 'medium' | 'long'
    creativityLevel: number // 0-100
  }
  writingEnvironment: {
    autoSaveInterval: number // minutes
    backupEnabled: boolean
    focusMode: boolean
    wordCountGoalVisible: boolean
  }
  exportDefaults: {
    preferredFormat: 'PDF' | 'DOCX' | 'TXT'
    standardOptions: Record<string, any>
    includeMetadata: boolean
  }
  privacy: {
    allowCollaboration: boolean
    shareAnalytics: boolean
    publicProfile: boolean
  }
}

export interface ExportFormat {
  id: 'PDF' | 'DOCX' | 'TXT'
  name: string
  description: string
  icon: string
  fileExtension: string
  features: string[]
  recommended: boolean
}