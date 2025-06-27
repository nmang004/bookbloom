'use client'

import { ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface HeroProps {
  title: string | ReactNode
  subtitle?: string | ReactNode
  children?: ReactNode
  backgroundVariant?: 'default' | 'gradient' | 'sakura'
  className?: string
  centerAlign?: boolean
}

export function Hero({ 
  title, 
  subtitle, 
  children, 
  backgroundVariant = 'default',
  className,
  centerAlign = true
}: HeroProps) {
  const getBackgroundClasses = () => {
    switch (backgroundVariant) {
      case 'gradient':
        return 'bg-gradient-to-br from-sakura-50/30 via-white to-sakura-50/20 dark:from-charcoal-900 dark:via-charcoal-850 dark:to-charcoal-800'
      case 'sakura':
        return 'bg-gradient-to-br from-sakura-500 via-sakura-600 to-sakura-700'
      default:
        return 'bg-white dark:bg-charcoal-900'
    }
  }

  const getTextColor = () => {
    return backgroundVariant === 'sakura' ? 'text-white' : 'text-charcoal-900 dark:text-white'
  }

  return (
    <section className={cn(
      'relative py-24 lg:py-32 overflow-hidden',
      getBackgroundClasses(),
      className
    )}>
      {/* Floating sakura petals for gradient/sakura variants */}
      {(backgroundVariant === 'gradient' || backgroundVariant === 'sakura') && (
        <div className="absolute inset-0 pointer-events-none">
          <div className="sakura-petal animate-sakura-fall" style={{left: '15%', animationDelay: '0s'}} />
          <div className="sakura-petal animate-sakura-fall" style={{left: '35%', animationDelay: '2s'}} />
          <div className="sakura-petal animate-sakura-fall" style={{left: '55%', animationDelay: '4s'}} />
          <div className="sakura-petal animate-sakura-fall" style={{left: '75%', animationDelay: '6s'}} />
          <div className="sakura-petal animate-sakura-fall" style={{left: '85%', animationDelay: '8s'}} />
        </div>
      )}

      {/* Content overlay for sakura background */}
      {backgroundVariant === 'sakura' && (
        <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
      )}

      <div className="container mx-auto px-6 relative z-10">
        <div className={cn(
          'max-w-5xl mx-auto',
          centerAlign && 'text-center'
        )}>
          {/* Title */}
          <h1 className={cn(
            'text-fluid-xl font-bold leading-[1.1] tracking-tight mb-8',
            getTextColor()
          )}>
            {title}
          </h1>

          {/* Subtitle */}
          {subtitle && (
            <div className={cn(
              'text-xl lg:text-2xl leading-relaxed mb-12 max-w-4xl',
              centerAlign && 'mx-auto',
              backgroundVariant === 'sakura' 
                ? 'text-white/90' 
                : 'text-charcoal-600 dark:text-charcoal-300'
            )}>
              {subtitle}
            </div>
          )}

          {/* Children (CTAs, additional content) */}
          {children && (
            <div className="space-y-8">
              {children}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}