"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Plus, BookOpen, Search, Filter, Grid3X3, List, MoreVertical, Pen, Download, Archive, Sparkles } from "lucide-react"
import Link from "next/link"

// Mock data for demonstration
const mockBooks = [
  {
    id: "1",
    title: "The Mystic Chronicles",
    synopsis: "Elena discovers she has the power to rewrite reality with ancient magic...",
    genre: "Fantasy",
    status: "writing" as const,
    wordCount: 45230,
    targetWordCount: 80000,
    chaptersCompleted: 12,
    totalChapters: 16,
    lastModified: "2024-01-15",
    coverImage: null,
  },
  {
    id: "2", 
    title: "Silicon Dreams",
    synopsis: "In 2087, a rogue AI develops consciousness and questions its purpose...",
    genre: "Science Fiction",
    status: "planning" as const,
    wordCount: 0,
    targetWordCount: 90000,
    chaptersCompleted: 0,
    totalChapters: 0,
    lastModified: "2024-01-14",
    coverImage: null,
  },
  {
    id: "3",
    title: "Moonlit Café",
    synopsis: "A small café owner discovers that her late-night customers are time travelers...",
    genre: "Romance",
    status: "editing" as const,
    wordCount: 72450,
    targetWordCount: 75000,
    chaptersCompleted: 18,
    totalChapters: 18,
    lastModified: "2024-01-13",
    coverImage: null,
  },
  {
    id: "4",
    title: "The Last Garden",
    synopsis: "In a post-apocalyptic world, botanist Sarah races to preserve the last seeds...",
    genre: "Dystopian",
    status: "completed" as const,
    wordCount: 95600,
    targetWordCount: 95000,
    chaptersCompleted: 22,
    totalChapters: 22,
    lastModified: "2024-01-10",
    coverImage: null,
  },
]

type ViewMode = "grid" | "list"
type FilterStatus = "all" | "planning" | "writing" | "editing" | "completed"
type BookStatus = "planning" | "writing" | "editing" | "completed"

// Helper functions for enhanced dashboard
const getTimeBasedGreeting = (hour?: number) => {
  // Use provided hour or default to morning for SSR consistency
  const currentHour = hour !== undefined ? hour : 9
  if (currentHour < 6) return "Peaceful night"
  if (currentHour < 12) return "Serene morning" 
  if (currentHour < 18) return "Tranquil afternoon"
  return "Calm evening"
}

const getZenMoment = (index?: number) => {
  const moments = [
    "Every word is a step forward",
    "Your story seeks expression", 
    "Creativity flows like water",
    "Words bloom in silence",
    "The blank page awaits your wisdom"
  ]
  // Use a deterministic index or default to first item for SSR consistency
  return moments[index !== undefined ? index % moments.length : 0]
}

const getGardenDescription = (books: typeof mockBooks) => {
  const inProgress = books.filter(b => b.status === 'writing').length
  const completed = books.filter(b => b.status === 'completed').length
  const total = books.length
  
  if (total === 0) {
    return "A pristine space awaits your first story seed. What world will you create?"
  }
  
  if (completed === 0) {
    return `${inProgress} ${inProgress === 1 ? 'story is' : 'stories are'} taking root. Tend them with patience and watch them bloom.`
  }
  
  return `${total} ${total === 1 ? 'story grows' : 'stories grow'} in your garden. ${completed} already in full bloom.`
}

// Garden Seasons Feature - Currently unused but kept for future implementation
// const getGardenSeason = (books: typeof mockBooks) => {
//   const activeBooks = books.filter(b => b.status === 'writing').length
//   const completedRecently = books.filter(b => {
//     const lastModified = new Date(b.lastModified)
//     const thirtyDaysAgo = new Date()
//     thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)
//     return b.status === 'completed' && lastModified > thirtyDaysAgo
//   }).length
//   
//   if (completedRecently > 0) return "harvest" // Autumn colors
//   if (activeBooks > 2) return "growth"        // Summer greens  
//   if (activeBooks > 0) return "spring"        // Fresh growth
//   return "contemplation"                      // Winter blues
// }

// Writing Streak Indicator Component
const WritingStreak = ({ days }: { days: number }) => (
  <div className="flex items-center space-x-2 px-4 py-2 bg-green-50 dark:bg-green-900/20 rounded-full">
    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
    <span className="text-sm font-medium text-green-700 dark:text-green-400">
      {days} day writing streak
    </span>
    <span className="text-lg">🔥</span>
  </div>
)

// AI Muse Suggestions Panel
const AIMusePanel = () => (
  <div className="bg-gradient-to-br from-sakura-50 to-white dark:from-charcoal-800 dark:to-charcoal-700 p-6 rounded-2xl border border-sakura-200/50">
    <div className="flex items-center space-x-3 mb-4">
      <div className="w-8 h-8 bg-sakura-100 rounded-full flex items-center justify-center">
        <Sparkles className="h-4 w-4 text-sakura-600" />
      </div>
      <h4 className="font-semibold text-charcoal-900 dark:text-white">
        AI Muse Whispers
      </h4>
    </div>
    <p className="text-sm text-charcoal-600 dark:text-charcoal-400 mb-3">
      &quot;Consider exploring your protagonist&apos;s greatest fear in the next chapter...&quot;
    </p>
    <Button variant="outline" size="sm" className="border-sakura-300 text-sakura-600 hover:bg-sakura-50">
      Explore Suggestion
    </Button>
  </div>
)

// Revolutionary Sakura Progress Indicator Component
const SakuraProgressIndicator = ({ 
  status, 
  progress, 
  wordCount, 
  targetWordCount
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
  
  return (
    <div className="space-y-4">
      {/* Modern Tech: Precise progress visualization */}
      <div className="relative">
        {/* Zen Garden: Sacred circle container */}
        <div className={`
          relative w-16 h-16 rounded-full flex items-center justify-center
          ${config.bgColor} border-2 border-white shadow-lg
          hover:scale-110 transition-all duration-300 cursor-pointer
          ${config.animation}
        `}>
          <span className={`text-2xl ${config.color}`}>
            {config.icon}
          </span>
          
          {/* Progress ring overlay */}
          <svg className="absolute inset-0 w-16 h-16 transform -rotate-90">
            <circle
              cx="32"
              cy="32"
              r="28"
              stroke="currentColor"
              strokeWidth="2"
              fill="transparent"
              className="text-charcoal-200 dark:text-charcoal-700"
            />
            <circle
              cx="32"
              cy="32"
              r="28"
              stroke="currentColor"
              strokeWidth="2"
              fill="transparent"
              strokeDasharray={`${2 * Math.PI * 28}`}
              strokeDashoffset={`${2 * Math.PI * 28 * (1 - progress / 100)}`}
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
      
      {/* Zen Garden: Contemplative description */}
      <div className="text-center space-y-1">
        <p className="text-xs font-medium text-charcoal-600 dark:text-charcoal-400 capitalize">
          {config.description}
        </p>
        <p className="text-xs text-charcoal-500">
          {wordCount.toLocaleString()} / {targetWordCount.toLocaleString()} words
        </p>
      </div>
    </div>
  )
}

// Enhanced Book Card Component
const EnhancedBookCard = ({ book, progress }: { book: typeof mockBooks[0], progress: number }) => {
  const [isHovered, setIsHovered] = useState(false)
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case "planning": return "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400"
      case "writing": return "bg-amber-100 text-amber-800 dark:bg-amber-900/20 dark:text-amber-400"
      case "editing": return "bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400"
      case "completed": return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400"
      default: return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400"
    }
  }
  
  const getStatusEmoji = (status: string) => {
    const emojis = {
      planning: "🌰",
      writing: "🌱", 
      editing: "🌿",
      completed: "🌸"
    }
    return emojis[status as keyof typeof emojis] || "📝"
  }

  const getActionText = (status: string) => {
    const actions = {
      planning: "Begin Writing",
      writing: "Continue Writing",
      editing: "Keep Polishing", 
      completed: "Review & Export"
    }
    return actions[status as keyof typeof actions] || "Open"
  }

  const getInspirationalMessage = (status: string, progress: number) => {
    if (status === "completed") return "A masterpiece achieved through dedication and patience"
    if (progress > 75) return "Your story yearns for its final chapters"
    if (progress > 50) return "Momentum builds as your world comes alive"
    if (progress > 25) return "Each word is a step deeper into your universe"
    return "Every great story begins with a single word"
  }

  const getTimeAgo = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffTime = Math.abs(now.getTime() - date.getTime())
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    
    if (diffDays === 1) return "yesterday"
    if (diffDays < 7) return `${diffDays} days ago`
    if (diffDays < 30) return `${Math.ceil(diffDays / 7)} weeks ago`
    return `${Math.ceil(diffDays / 30)} months ago`
  }
  
  return (
    <div
      className="group bg-white dark:bg-charcoal-800 rounded-3xl border border-sakura-100/50 dark:border-charcoal-700/50 p-8 hover:shadow-2xl hover:shadow-sakura-200/20 transition-all duration-300 hover:scale-[1.02] cursor-pointer overflow-hidden relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      
      {/* Zen Garden: Subtle background pattern */}
      <div className="absolute inset-0 opacity-5 bg-gradient-to-br from-sakura-100 to-transparent pointer-events-none" />
      
      {/* Modern Tech: Floating action menu */}
      <div className={`absolute top-6 right-6 transition-all duration-300 ${isHovered ? 'opacity-100 scale-100' : 'opacity-0 scale-75'}`}>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="w-8 h-8 rounded-full bg-white/80 dark:bg-charcoal-700/80 backdrop-blur-sm hover:bg-white dark:hover:bg-charcoal-700">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>
              <BookOpen className="h-4 w-4 mr-2" />
              Open Workbench
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Download className="h-4 w-4 mr-2" />
              Export Draft
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Archive className="h-4 w-4 mr-2" />
              Archive Story
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      
      {/* Enhanced Header */}
      <div className="flex items-start space-x-4 mb-6">
        
        {/* Revolutionary Progress Indicator */}
        <SakuraProgressIndicator 
          status={book.status as BookStatus}
          progress={progress}
          wordCount={book.wordCount}
          targetWordCount={book.targetWordCount}
          size="medium"
        />
        
        {/* Title and Status */}
        <div className="flex-1 space-y-2">
          <h3 className="text-xl font-bold text-charcoal-900 dark:text-white group-hover:text-sakura-600 transition-colors duration-200 line-clamp-2">
            {book.title}
          </h3>
          
          {/* Enhanced Status Badge */}
          <div className="flex items-center space-x-2">
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(book.status)}`}>
              {getStatusEmoji(book.status)} {book.status.charAt(0).toUpperCase() + book.status.slice(1)}
            </span>
            <span className="text-xs text-charcoal-500">
              {getTimeAgo(book.lastModified)}
            </span>
          </div>
        </div>
      </div>
      
      {/* Zen Garden: Contemplative synopsis */}
      <div className="mb-6">
        <p className="text-charcoal-600 dark:text-charcoal-400 leading-relaxed line-clamp-3">
          {book.synopsis}
        </p>
      </div>
      
      {/* Enhanced Progress Section */}
      <div className="space-y-4 mb-6">
        
        {/* Beautiful Progress Bar */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-charcoal-600 dark:text-charcoal-400">
              Story Progress
            </span>
            <span className="text-sm font-bold text-sakura-600">
              {Math.round(progress)}%
            </span>
          </div>
          
          <div className="relative">
            <div className="w-full h-3 bg-sakura-100/50 dark:bg-charcoal-700 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-sakura-400 to-sakura-500 rounded-full transition-all duration-500 relative overflow-hidden"
                style={{ width: `${progress}%` }}
              >
                {/* Modern Tech: Shimmer effect for active progress */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
              </div>
            </div>
          </div>
        </div>
        
        {/* Detailed Stats */}
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="space-y-1">
            <p className="text-charcoal-500 dark:text-charcoal-400">Words Written</p>
            <p className="font-semibold text-charcoal-700 dark:text-charcoal-200">
              {book.wordCount.toLocaleString()}
            </p>
          </div>
          <div className="space-y-1">
            <p className="text-charcoal-500 dark:text-charcoal-400">Genre</p>
            <p className="font-semibold text-charcoal-700 dark:text-charcoal-200">
              {book.genre}
            </p>
          </div>
        </div>
      </div>
      
      {/* Enhanced Action Buttons */}
      <div className="flex gap-3">
        <Button 
          variant="sakura" 
          size="sm" 
          className="flex-1 font-medium hover:scale-105 transition-all duration-200"
          asChild
        >
          <Link href={`/book/${book.id}`}>
            <Pen className="h-4 w-4 mr-2" />
            {getActionText(book.status)}
          </Link>
        </Button>
        
        <Button 
          variant="outline" 
          size="sm"
          className="hover:bg-sakura-50 dark:hover:bg-charcoal-700 transition-all duration-200"
        >
          <BookOpen className="h-4 w-4" />
        </Button>
      </div>
      
      {/* Zen Garden: Inspirational footer that appears on hover */}
      <div className={`mt-4 pt-4 border-t border-sakura-100/50 dark:border-charcoal-700/50 transition-all duration-300 ${isHovered ? 'opacity-100 max-h-20' : 'opacity-0 max-h-0 overflow-hidden'}`}>
        <p className="text-xs text-charcoal-500 dark:text-charcoal-400 italic text-center">
          {getInspirationalMessage(book.status, progress)}
        </p>
      </div>
    </div>
  )
}

export default function DashboardPage() {
  const [viewMode, setViewMode] = useState<ViewMode>("grid")
  const [filterStatus, setFilterStatus] = useState<FilterStatus>("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [zenMomentIndex, setZenMomentIndex] = useState(0)
  const [currentHour, setCurrentHour] = useState(9) // Default to morning
  const [isClient, setIsClient] = useState(false)

  // Set random zen moment and current hour on client side only
  useEffect(() => {
    setIsClient(true)
    setZenMomentIndex(Math.floor(Math.random() * 5))
    setCurrentHour(new Date().getHours())
  }, [])

  const filteredBooks = mockBooks.filter(book => {
    const matchesSearch = book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         book.genre.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesFilter = filterStatus === "all" || book.status === filterStatus
    return matchesSearch && matchesFilter
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "planning": return "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400"
      case "writing": return "bg-amber-100 text-amber-800 dark:bg-amber-900/20 dark:text-amber-400"
      case "editing": return "bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400"
      case "completed": return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400"
      default: return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400"
    }
  }

  const getStatusEmoji = (status: string) => {
    const emojis = {
      planning: "🌰",
      writing: "🌱", 
      editing: "🌿",
      completed: "🌸"
    }
    return emojis[status as keyof typeof emojis] || "📝"
  }

  const getActionText = (status: string) => {
    const actions = {
      planning: "Begin Writing",
      writing: "Continue Writing",
      editing: "Keep Polishing", 
      completed: "Review & Export"
    }
    return actions[status as keyof typeof actions] || "Open"
  }


  const getTimeAgo = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffTime = Math.abs(now.getTime() - date.getTime())
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    
    if (diffDays === 1) return "yesterday"
    if (diffDays < 7) return `${diffDays} days ago`
    if (diffDays < 30) return `${Math.ceil(diffDays / 7)} weeks ago`
    return `${Math.ceil(diffDays / 30)} months ago`
  }

  const calculateProgress = (wordCount: number, targetWordCount: number) => {
    if (!targetWordCount) return 0
    return Math.min((wordCount / targetWordCount) * 100, 100)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-sakura-50/30 to-white dark:from-charcoal-900 dark:to-charcoal-800">
      {/* Enhanced Navigation Bar - "The Garden Gateway" */}
      <nav className="border-b border-sakura-100/30 dark:border-charcoal-700/50 backdrop-blur-xl bg-white/90 dark:bg-charcoal-900/90 sticky top-0 z-50">
        <div className="container mx-auto px-6 py-5">
          <div className="flex items-center justify-between">
            {/* Zen Garden: Enhanced brand presence */}
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="text-3xl transition-transform duration-200 group-hover:scale-110 group-hover:rotate-12">🌸</div>
              <span className="text-2xl font-semibold sakura-text-gradient">BookBloom</span>
            </Link>
            
            {/* Modern Tech: Contextual tools and personalization */}
            <div className="flex items-center space-x-6">
              {/* Garden Health Indicator */}
              <div className="hidden md:flex items-center space-x-2 px-3 py-2 bg-sakura-50 dark:bg-charcoal-800 rounded-full">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span className="text-sm font-medium text-charcoal-600 dark:text-charcoal-300">
                  Garden Flourishing
                </span>
              </div>
              
              {/* Personalized Greeting with Zen Moment */}
              <div className="hidden lg:block text-right">
                <p className="text-sm text-charcoal-500 dark:text-charcoal-400">
                  {getTimeBasedGreeting(isClient ? currentHour : 9)}, Writer
                </p>
                <p className="text-xs text-charcoal-400 dark:text-charcoal-500">
                  {isClient ? getZenMoment(zenMomentIndex) : getZenMoment(0)}
                </p>
              </div>
              
              {/* Enhanced Profile */}
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <div className="w-10 h-10 bg-gradient-to-br from-sakura-200 to-sakura-300 rounded-full flex items-center justify-center hover:scale-105 transition-transform duration-200 cursor-pointer">
                    <span className="text-lg">✍️</span>
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem>
                    <BookOpen className="h-4 w-4 mr-2" />
                    Profile Settings
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Sparkles className="h-4 w-4 mr-2" />
                    AI Preferences
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Download className="h-4 w-4 mr-2" />
                    Export Library
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        {/* Enhanced Header Section - "The Garden Overview" */}
        <div className="mb-12">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
            
            {/* Zen Garden: Expansive header with seasonal context */}
            <div className="space-y-6">
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <h1 className="text-5xl lg:text-6xl font-bold text-charcoal-900 dark:text-white">
                    Your Garden
                  </h1>
                  <div className="text-4xl animate-gentle-sway">🌸</div>
                </div>
                
                {/* Dynamic garden description based on user's books */}
                <p className="text-xl text-charcoal-600 dark:text-charcoal-300 max-w-2xl">
                  {getGardenDescription(mockBooks)}
                </p>
              </div>
              
              {/* Modern Tech: Quick stats in flowing layout */}
              <div className="flex items-center space-x-8 text-sm text-charcoal-500">
                <span className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-sakura-400 rounded-full" />
                  <span>{mockBooks.filter(b => b.status === 'writing').length} seeds growing</span>
                </span>
                <span className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full" />
                  <span>{mockBooks.filter(b => b.status === 'completed').length} blossoms achieved</span>
                </span>
              </div>
            </div>
            
            {/* Enhanced Primary Action with additional features */}
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-4 items-center">
                <Button 
                  variant="sakura" 
                  size="lg" 
                  className="text-lg px-8 py-4 font-semibold hover:scale-105 hover:shadow-xl hover:shadow-sakura-300/30 transition-all duration-200 group"
                  asChild
                >
                  <Link href="/new">
                    <Plus className="h-6 w-6 mr-3 group-hover:rotate-90 transition-transform duration-300" />
                    Plant a New Seed
                  </Link>
                </Button>
                
                {/* Writing Streak Indicator */}
                <WritingStreak days={7} />
              </div>
              
              {/* Zen Garden: Gentle secondary action */}
              <p className="text-sm text-charcoal-500 text-center">
                or continue nurturing existing stories
              </p>
            </div>
          </div>
        </div>

        {/* Enhanced Statistics Overview - "Garden Vitals" */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {[
            {
              label: "Stories Planted",
              value: mockBooks.length,
              icon: "📚",
              color: "sakura",
              description: "Each story is a universe waiting to unfold"
            },
            {
              label: "Seeds Growing", 
              value: mockBooks.filter(b => b.status === "writing").length,
              icon: "✍️",
              color: "amber",
              description: "Active manuscripts in development"
            },
            {
              label: "Full Blossoms",
              value: mockBooks.filter(b => b.status === "completed").length,
              icon: "🌸", 
              color: "green",
              description: "Completed works ready to share"
            },
            {
              label: "Words Cultivated",
              value: mockBooks.reduce((sum, book) => sum + book.wordCount, 0).toLocaleString(),
              icon: "📝",
              color: "purple", 
              description: "Your creative output continues to grow"
            }
          ].map((stat, index) => (
            <div 
              key={index}
              className="group bg-white dark:bg-charcoal-800 p-8 rounded-2xl border border-sakura-100/50 dark:border-charcoal-700/50 hover:shadow-lg hover:shadow-sakura-200/20 transition-all duration-300 hover:scale-105"
              style={{animationDelay: `${index * 100}ms`}}
            >
              {/* Zen Garden: Breathing space and gentle hierarchy */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-charcoal-600 dark:text-charcoal-400 uppercase tracking-wider">
                      {stat.label}
                    </p>
                    <p className="text-3xl font-bold text-charcoal-900 dark:text-white">
                      {stat.value}
                    </p>
                  </div>
                  
                  {/* Modern Tech: Animated icon container */}
                  <div className="w-14 h-14 bg-gradient-to-br from-sakura-50 to-sakura-100 dark:from-charcoal-700 dark:to-charcoal-600 rounded-2xl flex items-center justify-center text-2xl group-hover:scale-110 group-hover:rotate-12 transition-all duration-300">
                    {stat.icon}
                  </div>
                </div>
                
                {/* Zen Garden: Inspirational context */}
                <p className="text-xs text-charcoal-500 dark:text-charcoal-400 leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {stat.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* AI Muse Suggestions Panel */}
        <div className="mb-10">
          <AIMusePanel />
        </div>

        {/* Enhanced Search & Filters - "Garden Tools" */}
        <div className="flex flex-col lg:flex-row gap-6 mb-10">
          
          {/* Zen Garden: Enhanced search with breathing room */}
          <div className="flex-1 relative group">
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-charcoal-400 group-focus-within:text-sakura-500 transition-colors duration-200" />
            </div>
            <input
              type="text"
              placeholder="Search your garden..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-6 py-4 text-lg border-2 border-sakura-100 dark:border-charcoal-700 rounded-2xl bg-white dark:bg-charcoal-800 text-charcoal-900 dark:text-white placeholder-charcoal-400 focus:outline-none focus:border-sakura-400 focus:ring-4 focus:ring-sakura-200/50 transition-all duration-200"
            />
          </div>
          
          {/* Modern Tech: Precise filter controls */}
          <div className="flex items-center space-x-4">
            
            {/* Enhanced Status Filter */}
            <div className="relative">
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value as FilterStatus)}
                className="appearance-none px-6 py-4 pr-10 border-2 border-sakura-100 dark:border-charcoal-700 rounded-2xl bg-white dark:bg-charcoal-800 text-charcoal-900 dark:text-white focus:outline-none focus:border-sakura-400 focus:ring-4 focus:ring-sakura-200/50 transition-all duration-200 cursor-pointer"
              >
                <option value="all">All Stories</option>
                <option value="planning">🌰 Planning</option>
                <option value="writing">🌱 Writing</option>
                <option value="editing">🌿 Editing</option>
                <option value="completed">🌸 Completed</option>
              </select>
              <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
                <Filter className="h-4 w-4 text-charcoal-400" />
              </div>
            </div>
            
            {/* Enhanced View Mode Toggles */}
            <div className="flex items-center bg-sakura-50 dark:bg-charcoal-800 rounded-2xl p-1">
              <Button
                variant={viewMode === "grid" ? "sakura" : "ghost"}
                size="sm"
                onClick={() => setViewMode("grid")}
                className="rounded-xl px-4 py-3 transition-all duration-200"
              >
                <Grid3X3 className="h-4 w-4" />
                <span className="ml-2 hidden sm:inline">Garden</span>
              </Button>
              
              <Button
                variant={viewMode === "list" ? "sakura" : "ghost"}
                size="sm"
                onClick={() => setViewMode("list")}
                className="rounded-xl px-4 py-3 transition-all duration-200"
              >
                <List className="h-4 w-4" />
                <span className="ml-2 hidden sm:inline">List</span>
              </Button>
            </div>
          </div>
        </div>

        {/* Enhanced Book Cards - "Story Sanctuaries" */}
        {viewMode === "grid" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredBooks.map((book) => {
              const progress = calculateProgress(book.wordCount, book.targetWordCount)
              return <EnhancedBookCard key={book.id} book={book} progress={progress} />
            })}
          </div>
        ) : (
          <div className="space-y-4">
            {filteredBooks.map((book) => {
              const progress = calculateProgress(book.wordCount, book.targetWordCount)
              return (
                <div
                  key={book.id}
                  className="bg-white dark:bg-charcoal-800 rounded-xl border border-sakura-100 dark:border-charcoal-700 p-6 hover:shadow-lg transition-all duration-200"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 flex-1">
                      <SakuraProgressIndicator 
                        status={book.status as BookStatus}
                        progress={progress}
                        wordCount={book.wordCount}
                        targetWordCount={book.targetWordCount}
                        size="small"
                      />
                      
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-1">
                          <h3 className="font-semibold text-charcoal-900 dark:text-white">
                            {book.title}
                          </h3>
                          <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(book.status)}`}>
                            {getStatusEmoji(book.status)} {book.status.charAt(0).toUpperCase() + book.status.slice(1)}
                          </span>
                        </div>
                        
                        <p className="text-sm text-charcoal-600 dark:text-charcoal-400 mb-2">
                          {book.synopsis}
                        </p>
                        
                        <div className="flex items-center space-x-6 text-sm text-charcoal-500">
                          <span>{book.wordCount.toLocaleString()} words</span>
                          <span>{book.genre}</span>
                          <span>Modified {getTimeAgo(book.lastModified)}</span>
                        </div>
                      </div>
                      
                      <div className="w-32">
                        <div className="flex justify-between text-xs text-charcoal-600 dark:text-charcoal-400 mb-1">
                          <span>Progress</span>
                          <span>{Math.round(progress)}%</span>
                        </div>
                        <div className="w-full bg-sakura-100 dark:bg-charcoal-700 rounded-full h-2">
                          <div
                            className="bg-sakura-500 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${progress}%` }}
                          />
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2 ml-4">
                      <Button variant="sakura" size="sm">
                        <Pen className="h-4 w-4 mr-1" />
                        {getActionText(book.status)}
                      </Button>
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4" />
                      </Button>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <DropdownMenuItem>
                            <BookOpen className="h-4 w-4 mr-2" />
                            Open Workbench
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Archive className="h-4 w-4 mr-2" />
                            Archive Story
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}

        {/* Enhanced Empty State - "The Fertile Ground" */}
        {filteredBooks.length === 0 && (
          <div className="text-center py-24 px-8">
            
            {/* Zen Garden: Contemplative visual */}
            <div className="relative mb-12">
              <div className="text-8xl mb-4 animate-gentle-float">🌱</div>
              
              {/* Floating sakura petals */}
              <div className="absolute inset-0 pointer-events-none">
                {[...Array(3)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute text-sakura-300 text-2xl animate-sakura-fall opacity-60"
                    style={{
                      left: `${30 + i * 20}%`,
                      animationDelay: `${i * 2}s`,
                      animationDuration: '8s'
                    }}
                  >
                    🌸
                  </div>
                ))}
              </div>
            </div>
            
            {/* Modern Tech: Precise typography hierarchy */}
            <div className="space-y-6 max-w-2xl mx-auto">
              <h3 className="text-3xl lg:text-4xl font-bold text-charcoal-900 dark:text-white">
                {searchQuery || filterStatus !== "all" ? "No stories found in your garden" : "Your Garden Awaits Its First Seed"}
              </h3>
              
              <p className="text-xl text-charcoal-600 dark:text-charcoal-300 leading-relaxed">
                {searchQuery || filterStatus !== "all" 
                  ? "Try adjusting your search or filters to discover stories waiting to bloom." 
                  : "In the silence of blank pages lies infinite possibility. What story will you nurture from seed to full bloom?"
                }
              </p>
              
              {!searchQuery && filterStatus === "all" && (
                <>
                  {/* Zen Garden: Contemplative suggestions */}
                  <div className="grid md:grid-cols-3 gap-6 mt-12 mb-12">
                    {[
                      {
                        icon: "✨",
                        title: "Fantasy Epic",
                        description: "Craft worlds where magic shapes reality"
                      },
                      {
                        icon: "🚀", 
                        title: "Sci-Fi Adventure",
                        description: "Explore futures beyond imagination"
                      },
                      {
                        icon: "💝",
                        title: "Heartfelt Romance", 
                        description: "Weave stories that touch the soul"
                      }
                    ].map((suggestion, index) => (
                      <div 
                        key={index}
                        className="p-6 bg-white dark:bg-charcoal-800 rounded-2xl border border-sakura-100/50 dark:border-charcoal-700/50 hover:border-sakura-300 hover:shadow-lg transition-all duration-300 cursor-pointer group"
                      >
                        <div className="text-3xl mb-3 group-hover:scale-110 transition-transform duration-200">
                          {suggestion.icon}
                        </div>
                        <h4 className="font-semibold text-charcoal-900 dark:text-white mb-2">
                          {suggestion.title}
                        </h4>
                        <p className="text-sm text-charcoal-600 dark:text-charcoal-400">
                          {suggestion.description}
                        </p>
                      </div>
                    ))}
                  </div>
                  
                  {/* Enhanced Primary Action */}
                  <div className="space-y-4">
                    <Button 
                      variant="sakura" 
                      size="lg" 
                      className="text-xl px-12 py-6 font-semibold hover:scale-105 hover:shadow-xl hover:shadow-sakura-300/30 transition-all duration-300 group"
                      asChild
                    >
                      <Link href="/new">
                        <Plus className="h-6 w-6 mr-3 group-hover:rotate-90 transition-transform duration-300" />
                        Plant Your First Seed
                      </Link>
                    </Button>
                    
                    <p className="text-sm text-charcoal-500 dark:text-charcoal-400">
                      or explore templates to spark inspiration
                    </p>
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}