'use client'

import { cn } from '@/lib/utils'

interface SakuraProgressIndicatorProps {
  progress: number // 0-100
  showLabel?: boolean
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export function SakuraProgressIndicator({ 
  progress, 
  showLabel = true, 
  size = 'md',
  className 
}: SakuraProgressIndicatorProps) {
  const getStageData = (progress: number) => {
    if (progress === 0) {
      return { emoji: '🌰', stage: 'Seed', description: 'Idea phase', color: 'text-charcoal-400' }
    } else if (progress <= 25) {
      return { emoji: '🌱', stage: 'Sprout', description: 'Initial planning', color: 'text-green-500' }
    } else if (progress <= 50) {
      return { emoji: '🌿', stage: 'Growth', description: 'Structure building', color: 'text-green-600' }
    } else if (progress <= 75) {
      return { emoji: '🌺', stage: 'Bud', description: 'Active writing', color: 'text-sakura-400' }
    } else {
      return { emoji: '🌸', stage: 'Blossom', description: 'Near completion', color: 'text-sakura-500' }
    }
  }

  const stageData = getStageData(progress)
  
  const sizeClasses = {
    sm: 'text-2xl',
    md: 'text-4xl',
    lg: 'text-6xl'
  }

  const getAnimation = () => {
    if (progress === 0) return ''
    if (progress <= 25) return 'animate-gentle-sway'
    if (progress <= 50) return 'animate-leaves-rustle'
    if (progress <= 75) return 'animate-pre-bloom'
    return 'animate-bloom-pulse'
  }

  return (
    <div className={cn('flex flex-col items-center space-y-3', className)}>
      {/* Progress Bar */}
      <div className="w-full max-w-md">
        <div className="h-3 bg-sakura-100 dark:bg-charcoal-700 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-sakura-400 to-sakura-500 rounded-full transition-all duration-500 relative"
            style={{ width: `${progress}%` }}
          >
            {/* Shimmer effect for active progress */}
            {progress > 0 && (
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-shimmer" />
            )}
          </div>
        </div>
      </div>

      {/* Sakura Stage Indicator */}
      <div className="flex flex-col items-center space-y-2">
        <div className={cn(
          sizeClasses[size],
          stageData.color,
          getAnimation(),
          'transition-all duration-300 filter drop-shadow-lg'
        )}>
          {stageData.emoji}
        </div>
        
        {showLabel && (
          <div className="text-center">
            <div className="font-semibold text-charcoal-900 dark:text-white">
              {stageData.stage}
            </div>
            <div className="text-sm text-charcoal-600 dark:text-charcoal-300">
              {stageData.description}
            </div>
            <div className="text-xs text-charcoal-500 dark:text-charcoal-400 mt-1">
              {progress}% complete
            </div>
          </div>
        )}
      </div>
    </div>
  )
}