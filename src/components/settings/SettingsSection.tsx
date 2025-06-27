"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ExportSystem } from "@/components/export/ExportSystem"
import { BookSettings } from "@/components/settings/BookSettings"
import { Download, Settings, BookOpen } from "lucide-react"
import { BookSettings as BookSettingsType } from "@/types/export"

interface SettingsSectionProps {
  bookId: string
  bookTitle: string
  bookData: {
    id: string
    title: string
    synopsis: string
    genre: string
    status: "planning" | "writing" | "editing" | "completed"
    wordCount: number
    targetWordCount: number
    author?: string
    description?: string
  }
}

// Mock chapters data - in real app this would come from the database
const mockChapters = [
  { id: "1", title: "Chapter 1: The Beginning", wordCount: 2500 },
  { id: "2", title: "Chapter 2: Discovery", wordCount: 3200 },
  { id: "3", title: "Chapter 3: The Journey", wordCount: 2800 },
  { id: "4", title: "Chapter 4: Challenges", wordCount: 3500 },
  { id: "5", title: "Chapter 5: Revelation", wordCount: 2900 },
  { id: "6", title: "Chapter 6: Confrontation", wordCount: 3800 },
  { id: "7", title: "Chapter 7: Resolution", wordCount: 3100 },
  { id: "8", title: "Chapter 8: New Beginnings", wordCount: 2600 },
]

export function SettingsSection({ bookId, bookTitle, bookData }: SettingsSectionProps) {
  // Initialize book settings with current book data and sensible defaults
  const [bookSettings, setBookSettings] = useState<BookSettingsType>({
    basicInfo: {
      title: bookData.title,
      subtitle: "",
      author: bookData.author || "Your Name",
      genre: bookData.genre,
      description: bookData.description || bookData.synopsis,
      isbn: "",
      publisher: "",
      copyright: `© ${new Date().getFullYear()} ${bookData.author || "Author Name"}`
    },
    goals: {
      targetWordCount: bookData.targetWordCount,
      dailyGoal: 500,
      deadline: undefined,
      writingSchedule: "daily"
    },
    display: {
      coverImage: "",
      status: bookData.status,
      tags: [bookData.genre.toLowerCase()],
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
  })

  const handleSettingsChange = (newSettings: BookSettingsType) => {
    setBookSettings(newSettings)
    // In real app, this would save to database
    console.log('Settings updated:', newSettings)
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-charcoal-900 dark:text-white">
            Book Settings & Export
          </h1>
          <p className="text-charcoal-600 dark:text-charcoal-400 mt-1">
            Manage your book preferences and export professional manuscripts
          </p>
        </div>
      </div>

      {/* Main Content */}
      <Tabs defaultValue="export" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-8">
          <TabsTrigger value="export" className="flex items-center space-x-2">
            <Download className="h-4 w-4" />
            <span>Export System</span>
          </TabsTrigger>
          <TabsTrigger value="settings" className="flex items-center space-x-2">
            <Settings className="h-4 w-4" />
            <span>Book Settings</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="export" className="space-y-6">
          <ExportSystem
            bookId={bookId}
            bookTitle={bookTitle}
            chapters={mockChapters}
          />
        </TabsContent>

        <TabsContent value="settings" className="space-y-6">
          <BookSettings
            bookId={bookId}
            initialSettings={bookSettings}
            onSettingsChange={handleSettingsChange}
          />
        </TabsContent>
      </Tabs>
    </div>
  )
}