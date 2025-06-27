"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { 
  Target, 
  Clock, 
  TrendingUp, 
  Award,
  Zap,
  Calendar
} from "lucide-react"

interface WritingStatsProps {
  stats: {
    totalWords: number
    todayWords: number
    sessionWords: number
    averageWPM: number
    timeWriting: number
    chaptersCompleted: number
    currentStreak: number
    longestStreak: number
  }
  goals?: {
    dailyWords?: number
    weeklyWords?: number
    monthlyWords?: number
  }
}

const WritingStats = ({ stats, goals = {} }: WritingStatsProps) => {
  const { dailyWords = 500, weeklyWords = 3500, monthlyWords = 15000 } = goals
  
  const formatTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60
    if (hours > 0) {
      return `${hours}h ${mins}m`
    }
    return `${mins}m`
  }

  const getStreakEmoji = (streak: number) => {
    if (streak >= 30) return "🔥"
    if (streak >= 14) return "⚡"
    if (streak >= 7) return "✨"
    if (streak >= 3) return "🌟"
    return "📝"
  }

  const dailyProgress = Math.min((stats.todayWords / dailyWords) * 100, 100)
  const weeklyProgress = Math.min((stats.todayWords * 7 / weeklyWords) * 100, 100) // Simplified calculation
  
  return (
    <div className="space-y-4">
      {/* Daily Goal Progress */}
      <Card className="border-sakura-200/50">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium flex items-center">
            <Target className="h-4 w-4 mr-2 text-sakura-500" />
            Daily Goal
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-charcoal-600 dark:text-charcoal-400">
              {stats.todayWords} / {dailyWords} words
            </span>
            <span className="font-medium text-charcoal-900 dark:text-white">
              {Math.round(dailyProgress)}%
            </span>
          </div>
          <Progress value={dailyProgress} className="h-2" />
          {dailyProgress >= 100 && (
            <div className="text-xs text-green-600 dark:text-green-400 font-medium">
              🎉 Daily goal achieved!
            </div>
          )}
        </CardContent>
      </Card>

      {/* Session Stats */}
      <Card className="border-sakura-200/50">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium flex items-center">
            <Clock className="h-4 w-4 mr-2 text-sakura-500" />
            Session Stats
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div>
              <div className="text-charcoal-600 dark:text-charcoal-400">Words</div>
              <div className="font-semibold text-charcoal-900 dark:text-white">
                {stats.sessionWords}
              </div>
            </div>
            <div>
              <div className="text-charcoal-600 dark:text-charcoal-400">Time</div>
              <div className="font-semibold text-charcoal-900 dark:text-white">
                {formatTime(stats.timeWriting)}
              </div>
            </div>
            <div>
              <div className="text-charcoal-600 dark:text-charcoal-400">WPM</div>
              <div className="font-semibold text-charcoal-900 dark:text-white">
                {stats.averageWPM}
              </div>
            </div>
            <div>
              <div className="text-charcoal-600 dark:text-charcoal-400">Pace</div>
              <div className="font-semibold text-charcoal-900 dark:text-white">
                {stats.timeWriting > 0 ? Math.round(stats.sessionWords / (stats.timeWriting / 60)) : 0}/hr
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Writing Streak */}
      <Card className="border-sakura-200/50">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium flex items-center">
            <Award className="h-4 w-4 mr-2 text-sakura-500" />
            Writing Streak
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center space-y-2">
            <div className="text-2xl">
              {getStreakEmoji(stats.currentStreak)}
            </div>
            <div className="text-lg font-bold text-charcoal-900 dark:text-white">
              {stats.currentStreak} days
            </div>
            <div className="text-xs text-charcoal-600 dark:text-charcoal-400">
              Best: {stats.longestStreak} days
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Overall Progress */}
      <Card className="border-sakura-200/50">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium flex items-center">
            <TrendingUp className="h-4 w-4 mr-2 text-sakura-500" />
            Overall Progress
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-charcoal-600 dark:text-charcoal-400">Total Words:</span>
              <span className="font-medium text-charcoal-900 dark:text-white">
                {stats.totalWords.toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-charcoal-600 dark:text-charcoal-400">Chapters Done:</span>
              <span className="font-medium text-charcoal-900 dark:text-white">
                {stats.chaptersCompleted}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-charcoal-600 dark:text-charcoal-400">Today's Words:</span>
              <span className="font-medium text-charcoal-900 dark:text-white">
                {stats.todayWords}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Motivational Message */}
      <Card className="border-sakura-200/50 bg-gradient-to-br from-sakura-50/50 to-white dark:from-charcoal-800/50 dark:to-charcoal-700/50">
        <CardContent className="p-4 text-center">
          <div className="text-sm text-charcoal-700 dark:text-charcoal-300">
            {dailyProgress >= 100 ? (
              <>🎉 Excellent work today! You've reached your daily goal.</>
            ) : dailyProgress >= 75 ? (
              <>🌟 Almost there! Just {dailyWords - stats.todayWords} more words to go.</>
            ) : dailyProgress >= 50 ? (
              <>✨ Great progress! You're halfway to your daily goal.</>
            ) : dailyProgress >= 25 ? (
              <>📝 Good start! Keep the momentum going.</>
            ) : (
              <>🌱 Every word counts. Start small, dream big.</>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default WritingStats