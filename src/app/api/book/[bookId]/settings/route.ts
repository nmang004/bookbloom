import { NextRequest, NextResponse } from 'next/server'
import { BookSettings } from '@/types/export'

// Mock settings storage - in production this would use a database
const settingsStore = new Map<string, BookSettings>()

export async function GET(
  request: NextRequest,
  { params }: { params: { bookId: string } }
) {
  try {
    const { bookId } = params
    
    // Get existing settings or return defaults
    const existingSettings = settingsStore.get(bookId)
    
    if (existingSettings) {
      return NextResponse.json(existingSettings)
    }
    
    // Return default settings if none exist
    const defaultSettings: BookSettings = {
      basicInfo: {
        title: "Untitled Book",
        subtitle: "",
        author: "Your Name",
        genre: "Fiction",
        description: "A new book waiting to be written.",
        isbn: "",
        publisher: "",
        copyright: `© ${new Date().getFullYear()} Author Name`
      },
      goals: {
        targetWordCount: 80000,
        dailyGoal: 500,
        deadline: undefined,
        writingSchedule: "daily"
      },
      display: {
        coverImage: "",
        status: "planning",
        tags: [],
        isPrivate: true
      },
      aiPreferences: {
        defaultModel: "claude-3-sonnet",
        writingStyle: "descriptive",
        tone: "serious",
        generationLength: "medium",
        creativityLevel: 50
      },
      writingEnvironment: {
        autoSaveInterval: 5,
        backupEnabled: true,
        focusMode: false,
        wordCountGoalVisible: true
      },
      exportDefaults: {
        preferredFormat: "PDF",
        standardOptions: {},
        includeMetadata: true
      },
      privacy: {
        allowCollaboration: false,
        shareAnalytics: true,
        publicProfile: false
      }
    }
    
    return NextResponse.json(defaultSettings)
  } catch (error) {
    console.error('Failed to fetch book settings:', error)
    return NextResponse.json(
      { error: 'Failed to fetch book settings' },
      { status: 500 }
    )
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { bookId: string } }
) {
  try {
    const { bookId } = params
    const settings: BookSettings = await request.json()
    
    // Validate required fields
    if (!settings.basicInfo?.title || !settings.basicInfo?.author) {
      return NextResponse.json(
        { error: 'Title and author are required' },
        { status: 400 }
      )
    }
    
    // Save settings (in production, this would save to database)
    settingsStore.set(bookId, settings)
    
    return NextResponse.json(settings)
  } catch (error) {
    console.error('Failed to save book settings:', error)
    return NextResponse.json(
      { error: 'Failed to save book settings' },
      { status: 500 }
    )
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { bookId: string } }
) {
  try {
    const { bookId } = params
    const partialSettings = await request.json()
    
    // Get existing settings
    const existingSettings = settingsStore.get(bookId)
    
    if (!existingSettings) {
      return NextResponse.json(
        { error: 'Book settings not found' },
        { status: 404 }
      )
    }
    
    // Merge with existing settings
    const updatedSettings = {
      ...existingSettings,
      ...partialSettings,
      // Ensure nested objects are properly merged
      basicInfo: {
        ...existingSettings.basicInfo,
        ...partialSettings.basicInfo
      },
      goals: {
        ...existingSettings.goals,
        ...partialSettings.goals
      },
      display: {
        ...existingSettings.display,
        ...partialSettings.display
      },
      aiPreferences: {
        ...existingSettings.aiPreferences,
        ...partialSettings.aiPreferences
      },
      writingEnvironment: {
        ...existingSettings.writingEnvironment,
        ...partialSettings.writingEnvironment
      },
      exportDefaults: {
        ...existingSettings.exportDefaults,
        ...partialSettings.exportDefaults
      },
      privacy: {
        ...existingSettings.privacy,
        ...partialSettings.privacy
      }
    }
    
    // Save updated settings
    settingsStore.set(bookId, updatedSettings)
    
    return NextResponse.json(updatedSettings)
  } catch (error) {
    console.error('Failed to update book settings:', error)
    return NextResponse.json(
      { error: 'Failed to update book settings' },
      { status: 500 }
    )
  }
}