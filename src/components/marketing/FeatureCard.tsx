'use client'

import { ReactNode } from 'react'
import { LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'

interface FeatureCardProps {
  icon: LucideIcon | string
  title: string
  description: string
  features?: string[]
  mockup?: ReactNode
  action?: {
    label: string
    onClick?: () => void
    href?: string
  }
  layout?: 'default' | 'reverse'
  className?: string
}

export function FeatureCard({
  icon: Icon,
  title,
  description,
  features = [],
  mockup,
  action,
  layout = 'default',
  className
}: FeatureCardProps) {
  const isReverse = layout === 'reverse'

  return (
    <div className={cn(
      'grid lg:grid-cols-12 gap-16 items-center',
      className
    )}>
      {/* Content */}
      <div className={cn(
        'lg:col-span-6 space-y-8',
        isReverse && 'lg:order-2'
      )}>
        {/* Icon and Title */}
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 bg-sakura-100 dark:bg-sakura-900/20 rounded-2xl flex items-center justify-center zen-lift">
            {typeof Icon === 'string' ? (
              <span className="text-2xl">{Icon}</span>
            ) : (
              <Icon className="h-8 w-8 text-sakura-500" />
            )}
          </div>
          <h3 className="text-4xl font-bold text-charcoal-900 dark:text-white">
            {title}
          </h3>
        </div>

        {/* Description */}
        <p className="text-xl text-charcoal-600 dark:text-charcoal-300 leading-relaxed">
          {description}
        </p>

        {/* Feature List */}
        {features.length > 0 && (
          <ul className="space-y-4">
            {features.map((feature, index) => (
              <li 
                key={index}
                className="flex items-center space-x-3 text-lg"
                style={{animationDelay: `${index * 200}ms`}}
              >
                <div className="w-2 h-2 bg-sakura-500 rounded-full animate-pulse" />
                <span className="text-charcoal-700 dark:text-charcoal-200">
                  {feature}
                </span>
              </li>
            ))}
          </ul>
        )}

        {/* Action Button */}
        {action && (
          <Button 
            variant="sakura-outline" 
            className="mt-8 hover:bg-sakura-50 dark:hover:bg-sakura-900/30 transition-all duration-200 tech-feedback"
            onClick={action.onClick}
          >
            {action.label}
            <svg 
              className="ml-2 h-4 w-4" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M9 5l7 7-7 7" 
              />
            </svg>
          </Button>
        )}
      </div>

      {/* Mockup */}
      {mockup && (
        <div className={cn(
          'lg:col-span-6',
          isReverse && 'lg:order-1'
        )}>
          <div className="bg-white dark:bg-charcoal-800 rounded-3xl p-8 shadow-2xl border border-sakura-100/50 dark:border-sakura-800/50 hover:shadow-3xl hover:scale-105 transition-all duration-300 zen-lift">
            {mockup}
          </div>
        </div>
      )}
    </div>
  )
}