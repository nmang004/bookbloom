"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { 
  BookOpen, 
  FileText, 
  Users, 
  Globe, 
  PenTool, 
  Settings, 
  ChevronRight,
  Menu,
  X,
  Home,
  Save,
  Sparkles,
  Clock,
  TrendingUp
} from "lucide-react"
import Link from "next/link"
import dynamic from "next/dynamic"
import OutlineGenerator from "@/components/outline/OutlineGenerator"
import { CharacterArchitect } from "@/components/character/CharacterArchitect"
import { WorldBuildingAtlas } from "@/components/worldbuilding/WorldBuildingAtlas"
import { SettingsSection } from "@/components/settings/SettingsSection"

// Dynamically import WritingStudio with SSR disabled
const WritingStudio = dynamic(
  () => import("@/components/writing/WritingStudio"),
  { 
    ssr: false,
    loading: () => (
      <div className="min-h-screen bg-gradient-to-br from-sakura-50/30 to-white dark:from-charcoal-900 dark:to-charcoal-800 flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="text-2xl animate-pulse">🌸</div>
          <h2 className="text-xl font-semibold text-charcoal-900 dark:text-white">
            Loading Writing Studio...
          </h2>
        </div>
      </div>
    )
  }
)

// Mock book data - in real app this would come from database
const mockBookData = {
  "1": {
    id: "1",
    title: "The Mystic Chronicles",
    synopsis: "Elena discovers she has the power to rewrite reality with ancient magic, but each use threatens to unravel the fabric of existence itself.",
    genre: "Fantasy",
    status: "writing" as const,
    wordCount: 45230,
    targetWordCount: 80000,
    chaptersCompleted: 12,
    totalChapters: 16,
    lastModified: "2024-01-15",
    createdAt: "2023-12-01",
    writingSchedule: "daily",
    tags: ["magic", "reality", "ancient powers"],
    description: "A tale of power, responsibility, and the delicate balance between creation and destruction."
  }
}

type BookStatus = "planning" | "writing" | "editing" | "completed"

// Sidebar navigation items
const sidebarItems = [
  { id: "overview", label: "Overview", icon: BookOpen, description: "Book details and progress" },
  { id: "outline", label: "Outline", icon: FileText, description: "Chapter structure and story flow" },
  { id: "characters", label: "Characters", icon: Users, description: "Character profiles and development" },
  { id: "worldbuilding", label: "World Building", icon: Globe, description: "Settings, cultures, and lore" },
  { id: "writing", label: "Writing Studio", icon: PenTool, description: "Write and edit your manuscript" },
  { id: "settings", label: "Settings", icon: Settings, description: "Book preferences and export options" }
]

// Sakura Progress Indicator Component
const SakuraProgressIndicator = ({ 
  status, 
  progress, 
  wordCount, 
  targetWordCount,
  size = "large" 
}: {
  status: BookStatus
  progress: number
  wordCount: number 
  targetWordCount: number
  size?: "small" | "medium" | "large"
}) => {
  const getProgressStage = () => {
    if (status === "completed") return "blossom"
    if (progress >= 75) return "budding"
    if (progress >= 50) return "growing" 
    if (progress >= 25) return "sprouting"
    if (progress > 0) return "seedling"
    return "seed"
  }
  
  const stage = getProgressStage()
  
  const stageConfig = {
    seed: {
      icon: "🌰",
      color: "text-charcoal-400",
      bgColor: "bg-charcoal-100",
      description: "Idea germinating",
      animation: "animate-pulse"
    },
    seedling: {
      icon: "🌱", 
      color: "text-green-500",
      bgColor: "bg-green-100",
      description: "First words sprouting",
      animation: "animate-gentle-sway"
    },
    sprouting: {
      icon: "🌿",
      color: "text-green-600", 
      bgColor: "bg-green-200",
      description: "Story taking shape",
      animation: "animate-leaves-rustle"
    },
    growing: {
      icon: "🌿",
      color: "text-green-700",
      bgColor: "bg-green-300", 
      description: "Narrative flourishing",
      animation: "animate-growth"
    },
    budding: {
      icon: "🌺",
      color: "text-sakura-500",
      bgColor: "bg-sakura-200",
      description: "Nearly ready to bloom", 
      animation: "animate-pre-bloom"
    },
    blossom: {
      icon: "🌸",
      color: "text-sakura-600",
      bgColor: "bg-sakura-300",
      description: "Story in full bloom",
      animation: "animate-bloom-celebration"
    }
  }
  
  const config = stageConfig[stage]
  const sizeClasses = {
    small: "w-12 h-12 text-lg",
    medium: "w-16 h-16 text-2xl", 
    large: "w-20 h-20 text-3xl"
  }
  
  return (
    <div className="flex items-center space-x-6">
      {/* Sakura Progress Circle */}
      <div className="relative">
        <div className={`
          relative ${sizeClasses[size]} rounded-full flex items-center justify-center
          ${config.bgColor} border-2 border-white shadow-lg
          hover:scale-110 transition-all duration-300 cursor-pointer
          ${config.animation}
        `}>
          <span className={`${config.color}`}>
            {config.icon}
          </span>
          
          {/* Progress ring overlay */}
          <svg className={`absolute inset-0 ${sizeClasses[size]} transform -rotate-90`}>
            <circle
              cx={size === "small" ? "24" : size === "medium" ? "32" : "40"}
              cy={size === "small" ? "24" : size === "medium" ? "32" : "40"}
              r={size === "small" ? "20" : size === "medium" ? "28" : "36"}
              stroke="currentColor"
              strokeWidth="2"
              fill="transparent"
              className="text-charcoal-200 dark:text-charcoal-700"
            />
            <circle
              cx={size === "small" ? "24" : size === "medium" ? "32" : "40"}
              cy={size === "small" ? "24" : size === "medium" ? "32" : "40"}
              r={size === "small" ? "20" : size === "medium" ? "28" : "36"}
              stroke="currentColor"
              strokeWidth="2"
              fill="transparent"
              strokeDasharray={`${2 * Math.PI * (size === "small" ? 20 : size === "medium" ? 28 : 36)}`}
              strokeDashoffset={`${2 * Math.PI * (size === "small" ? 20 : size === "medium" ? 28 : 36) * (1 - progress / 100)}`}
              className={`${config.color} transition-all duration-500`}
              strokeLinecap="round"
            />
          </svg>
        </div>
        
        {/* Floating progress percentage */}
        <div className="absolute -top-2 -right-2 w-6 h-6 bg-white dark:bg-charcoal-800 rounded-full border border-sakura-200 flex items-center justify-center">
          <span className="text-xs font-bold text-charcoal-700 dark:text-charcoal-300">
            {Math.round(progress)}
          </span>
        </div>
      </div>
      
      {/* Progress Details */}
      <div className="space-y-1">
        <p className="text-sm font-medium text-charcoal-600 dark:text-charcoal-400 capitalize">
          {config.description}
        </p>
        <p className="text-xs text-charcoal-500">
          {wordCount.toLocaleString()} / {targetWordCount.toLocaleString()} words
        </p>
      </div>
    </div>
  )
}

// Breadcrumb Component
const Breadcrumb = ({ bookTitle, currentSection }: { bookTitle: string, currentSection: string }) => {
  const sectionLabels: Record<string, string> = {
    overview: "Overview",
    outline: "Outline", 
    characters: "Characters",
    worldbuilding: "World Building",
    writing: "Writing Studio",
    settings: "Settings"
  }
  
  return (
    <nav className="flex items-center space-x-2 text-sm text-charcoal-600 dark:text-charcoal-400 mb-6">
      <Link href="/dashboard" className="hover:text-sakura-600 transition-colors duration-200 flex items-center">
        <Home className="h-4 w-4 mr-1" />
        Dashboard
      </Link>
      <ChevronRight className="h-4 w-4" />
      <span className="font-medium text-charcoal-900 dark:text-white">{bookTitle}</span>
      <ChevronRight className="h-4 w-4" />
      <span className="text-sakura-600">{sectionLabels[currentSection]}</span>
    </nav>
  )
}

// Overview Section Component
const OverviewSection = ({ book }: { book: typeof mockBookData["1"] }) => {
  const [isEditing, setIsEditing] = useState(false)
  const [editedBook, setEditedBook] = useState(book)
  
  const progress = Math.min((book.wordCount / book.targetWordCount) * 100, 100)
  
  const handleSave = () => {
    // In real app, this would save to database
    console.log("Saving book data:", editedBook)
    setIsEditing(false)
  }
  
  const handleCancel = () => {
    setEditedBook(book)
    setIsEditing(false)
  }
  
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-charcoal-900 dark:text-white">
          Story Overview
        </h1>
        <div className="flex items-center space-x-3">
          {isEditing ? (
            <>
              <Button variant="outline" onClick={handleCancel}>
                Cancel
              </Button>
              <Button onClick={handleSave} className="bg-sakura-500 hover:bg-sakura-600">
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </Button>
            </>
          ) : (
            <Button onClick={() => setIsEditing(true)} variant="sakura">
              Edit Details
            </Button>
          )}
        </div>
      </div>
      
      {/* Progress Overview */}
      <Card className="border-sakura-200/50 dark:border-charcoal-700/50">
        <CardHeader>
          <CardTitle className="flex items-center">
            <TrendingUp className="h-5 w-5 mr-2 text-sakura-500" />
            Writing Progress
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <SakuraProgressIndicator 
            status={book.status}
            progress={progress}
            wordCount={book.wordCount}
            targetWordCount={book.targetWordCount}
            size="large"
          />
          
          {/* Progress Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center space-y-2">
              <div className="text-2xl font-bold text-sakura-600">
                {Math.round(progress)}%
              </div>
              <div className="text-sm text-charcoal-600 dark:text-charcoal-400">
                Complete
              </div>
            </div>
            <div className="text-center space-y-2">
              <div className="text-2xl font-bold text-charcoal-900 dark:text-white">
                {book.chaptersCompleted}
              </div>
              <div className="text-sm text-charcoal-600 dark:text-charcoal-400">
                Chapters Done
              </div>
            </div>
            <div className="text-center space-y-2">
              <div className="text-2xl font-bold text-charcoal-900 dark:text-white">
                {book.wordCount.toLocaleString()}
              </div>
              <div className="text-sm text-charcoal-600 dark:text-charcoal-400">
                Words Written
              </div>
            </div>
            <div className="text-center space-y-2">
              <div className="text-2xl font-bold text-charcoal-900 dark:text-white">
                {Math.ceil((book.targetWordCount - book.wordCount) / 500)}
              </div>
              <div className="text-sm text-charcoal-600 dark:text-charcoal-400">
                Days Remaining
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Book Details */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Basic Information */}
        <Card className="border-sakura-200/50 dark:border-charcoal-700/50">
          <CardHeader>
            <CardTitle>Book Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-charcoal-600 dark:text-charcoal-400 mb-2 block">
                  Title
                </label>
                {isEditing ? (
                  <Input
                    value={editedBook.title}
                    onChange={(e) => setEditedBook({...editedBook, title: e.target.value})}
                    className="border-sakura-200 focus:border-sakura-400"
                  />
                ) : (
                  <p className="text-lg font-semibold text-charcoal-900 dark:text-white">
                    {book.title}
                  </p>
                )}
              </div>
              
              <div>
                <label className="text-sm font-medium text-charcoal-600 dark:text-charcoal-400 mb-2 block">
                  Genre
                </label>
                {isEditing ? (
                  <Input
                    value={editedBook.genre}
                    onChange={(e) => setEditedBook({...editedBook, genre: e.target.value})}
                    className="border-sakura-200 focus:border-sakura-400"
                  />
                ) : (
                  <p className="text-charcoal-900 dark:text-white">{book.genre}</p>
                )}
              </div>
              
              <div>
                <label className="text-sm font-medium text-charcoal-600 dark:text-charcoal-400 mb-2 block">
                  Target Word Count
                </label>
                {isEditing ? (
                  <Input
                    type="number"
                    value={editedBook.targetWordCount}
                    onChange={(e) => setEditedBook({...editedBook, targetWordCount: parseInt(e.target.value)})}
                    className="border-sakura-200 focus:border-sakura-400"
                  />
                ) : (
                  <p className="text-charcoal-900 dark:text-white">
                    {book.targetWordCount.toLocaleString()} words
                  </p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Synopsis */}
        <Card className="border-sakura-200/50 dark:border-charcoal-700/50">
          <CardHeader>
            <CardTitle>Synopsis</CardTitle>
          </CardHeader>
          <CardContent>
            {isEditing ? (
              <Textarea
                value={editedBook.synopsis}
                onChange={(e) => setEditedBook({...editedBook, synopsis: e.target.value})}
                className="min-h-[150px] border-sakura-200 focus:border-sakura-400 resize-none"
                placeholder="Enter your book synopsis..."
              />
            ) : (
              <p className="text-charcoal-700 dark:text-charcoal-300 leading-relaxed">
                {book.synopsis}
              </p>
            )}
          </CardContent>
        </Card>
      </div>
      
      {/* AI Suggestions Panel */}
      <Card className="border-sakura-200/50 dark:border-charcoal-700/50 bg-gradient-to-br from-sakura-50/50 to-white dark:from-charcoal-800/50 dark:to-charcoal-700/50">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Sparkles className="h-5 w-5 mr-2 text-sakura-500" />
            AI Writing Insights
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-charcoal-600 dark:text-charcoal-400 mb-4">
            Based on your story&apos;s progress, here are some suggestions to help you continue:
          </p>
          <div className="space-y-3">
            <div className="p-3 bg-white/50 dark:bg-charcoal-700/50 rounded-lg">
              <p className="text-sm text-charcoal-700 dark:text-charcoal-300">
                Consider exploring Elena&apos;s internal conflict about using her powers in the next chapter.
              </p>
            </div>
            <div className="p-3 bg-white/50 dark:bg-charcoal-700/50 rounded-lg">
              <p className="text-sm text-charcoal-700 dark:text-charcoal-300">
                The pacing suggests introducing a new challenge or ally around chapter 14.
              </p>
            </div>
          </div>
          <Button variant="outline" className="mt-4 border-sakura-300 text-sakura-600 hover:bg-sakura-50">
            Generate More Insights
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}

export default function BookWorkbench() {
  const params = useParams()
  const router = useRouter()
  const bookId = params.id as string
  
  const [activeSection, setActiveSection] = useState("overview")
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [book] = useState(mockBookData[bookId as keyof typeof mockBookData])
  
  useEffect(() => {
    // In real app, fetch book data from API
    if (!book) {
      router.push("/dashboard")
    }
  }, [book, router])
  
  if (!book) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-sakura-50/30 to-white dark:from-charcoal-900 dark:to-charcoal-800 flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="text-4xl">📚</div>
          <h1 className="text-2xl font-bold text-charcoal-900 dark:text-white">Book not found</h1>
          <p className="text-charcoal-600 dark:text-charcoal-400">
            The book you&apos;re looking for doesn&apos;t exist or has been moved.
          </p>
          <Button asChild variant="sakura">
            <Link href="/dashboard">Return to Dashboard</Link>
          </Button>
        </div>
      </div>
    )
  }
  
  const renderSection = () => {
    switch (activeSection) {
      case "overview":
        return <OverviewSection book={book} />
      case "outline":
        return <OutlineGenerator 
          bookId={bookId} 
          bookTitle={book.title}
          bookSynopsis={book.synopsis}
          bookGenre={book.genre}
        />
      case "characters":
        return <CharacterArchitect 
          bookId={bookId}
          bookTitle={book.title}
          bookSynopsis={book.synopsis}
          bookGenre={book.genre}
        />
      case "worldbuilding":
        return <WorldBuildingAtlas 
          bookId={bookId}
          bookTitle={book.title}
          bookSynopsis={book.synopsis}
          bookGenre={book.genre}
        />
      case "writing":
        // This case is now handled above with full layout control
        return null
      case "settings":
        return <SettingsSection 
          bookId={bookId}
          bookTitle={book.title}
          bookData={{
            id: bookId,
            title: book.title,
            synopsis: book.synopsis,
            genre: book.genre,
            status: book.status,
            wordCount: book.wordCount,
            targetWordCount: book.targetWordCount,
            author: "Your Name", // In real app, this would come from user data
            description: book.description || book.synopsis
          }}
        />
      default:
        return <OverviewSection book={book} />
    }
  }
  
  // If writing studio is active, render it with full control
  if (activeSection === "writing") {
    return (
      <WritingStudio
        book={{
          id: bookId,
          title: book.title,
          synopsis: book.synopsis,
          genre: book.genre,
          chapters: []
        }}
        onNavigateBack={() => setActiveSection("overview")}
      />
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-sakura-50/30 to-white dark:from-charcoal-900 dark:to-charcoal-800">
      {/* Header */}
      <header className="border-b border-sakura-100/30 dark:border-charcoal-700/50 backdrop-blur-xl bg-white/90 dark:bg-charcoal-900/90 sticky top-0 z-40">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Left side */}
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="lg:hidden"
              >
                <Menu className="h-5 w-5" />
              </Button>
              
              <Link href="/dashboard" className="flex items-center space-x-3 group">
                <div className="text-2xl transition-transform duration-200 group-hover:scale-110">🌸</div>
                <span className="text-xl font-semibold text-sakura-600">BookBloom</span>
              </Link>
            </div>
            
            {/* Right side */}
            <div className="flex items-center space-x-4">
              <div className="hidden md:flex items-center space-x-2 text-sm text-charcoal-600 dark:text-charcoal-400">
                <Clock className="h-4 w-4" />
                <span>Last saved: just now</span>
              </div>
              <Button variant="sakura" size="sm">
                <Save className="h-4 w-4 mr-2" />
                Save All
              </Button>
            </div>
          </div>
        </div>
      </header>
      
      <div className="flex">
        {/* Sidebar */}
        <aside className={`
          fixed lg:static inset-y-0 left-0 z-30 w-80 bg-white dark:bg-charcoal-800 border-r border-sakura-100/50 dark:border-charcoal-700/50 transform transition-transform duration-300 lg:transform-none
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}>
          <div className="flex flex-col h-full">
            {/* Sidebar Header */}
            <div className="p-6 border-b border-sakura-100/50 dark:border-charcoal-700/50">
              <div className="flex items-center justify-between">
                <h2 className="font-semibold text-charcoal-900 dark:text-white truncate">
                  {book.title}
                </h2>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSidebarOpen(false)}
                  className="lg:hidden"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
              <p className="text-sm text-charcoal-600 dark:text-charcoal-400 mt-1">
                {book.genre} • {book.status}
              </p>
            </div>
            
            {/* Navigation */}
            <nav className="flex-1 px-4 py-6 space-y-2">
              {sidebarItems.map((item) => {
                const Icon = item.icon
                const isActive = activeSection === item.id
                
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveSection(item.id)
                      setSidebarOpen(false)
                    }}
                    className={`
                      w-full flex items-center space-x-3 px-4 py-3 rounded-2xl text-left transition-all duration-200 group
                      ${isActive 
                        ? 'bg-sakura-100 dark:bg-sakura-900/20 text-sakura-700 dark:text-sakura-400 shadow-sm' 
                        : 'text-charcoal-600 dark:text-charcoal-400 hover:bg-sakura-50 dark:hover:bg-charcoal-700/50 hover:text-charcoal-900 dark:hover:text-white'
                      }
                    `}
                  >
                    <Icon className={`h-5 w-5 ${isActive ? 'text-sakura-600' : 'group-hover:text-sakura-500'}`} />
                    <div className="flex-1">
                      <div className="font-medium">{item.label}</div>
                      <div className="text-xs opacity-75">{item.description}</div>
                    </div>
                    {isActive && (
                      <div className="w-2 h-2 bg-sakura-500 rounded-full"></div>
                    )}
                  </button>
                )
              })}
            </nav>
          </div>
        </aside>
        
        {/* Overlay for mobile */}
        {sidebarOpen && (
          <div 
            className="fixed inset-0 bg-black/50 z-20 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}
        
        {/* Main Content */}
        <main className="flex-1 min-h-screen">
          <div className="p-6 lg:p-8 max-w-6xl mx-auto">
            <Breadcrumb bookTitle={book.title} currentSection={activeSection} />
            {renderSection()}
          </div>
        </main>
      </div>
    </div>
  )
}