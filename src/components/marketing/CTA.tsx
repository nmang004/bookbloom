'use client'

import { ReactNode } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'

interface CTAProps {
  title: string | ReactNode
  subtitle?: string | ReactNode
  primaryAction: {
    label: string
    href: string
  }
  secondaryAction?: {
    label: string
    href?: string
    onClick?: () => void
  }
  variant?: 'default' | 'sakura' | 'minimal'
  className?: string
}

export function CTA({
  title,
  subtitle,
  primaryAction,
  secondaryAction,
  variant = 'default',
  className
}: CTAProps) {
  const getBackgroundClasses = () => {
    switch (variant) {
      case 'sakura':
        return 'bg-gradient-to-br from-sakura-500 via-sakura-600 to-sakura-700'
      case 'minimal':
        return 'bg-transparent'
      default:
        return 'bg-white dark:bg-charcoal-900'
    }
  }

  const getTextColor = () => {
    return variant === 'sakura' ? 'text-white' : 'text-charcoal-900 dark:text-white'
  }

  const getSubtitleColor = () => {
    return variant === 'sakura' ? 'text-white/90' : 'text-charcoal-600 dark:text-charcoal-300'
  }

  return (
    <section className={cn(
      'relative py-32 overflow-hidden',
      getBackgroundClasses(),
      className
    )}>
      {/* Floating elements for sakura variant */}
      {variant === 'sakura' && (
        <>
          <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute text-white/10 text-6xl animate-float" style={{left: '20%', top: '10%', animationDelay: '0s'}}>🌸</div>
            <div className="absolute text-white/10 text-6xl animate-float" style={{left: '35%', top: '30%', animationDelay: '1.5s'}}>🌸</div>
            <div className="absolute text-white/10 text-6xl animate-float" style={{left: '50%', top: '50%', animationDelay: '3s'}}>🌸</div>
            <div className="absolute text-white/10 text-6xl animate-float" style={{left: '65%', top: '70%', animationDelay: '4.5s'}}>🌸</div>
            <div className="absolute text-white/10 text-6xl animate-float" style={{left: '80%', top: '20%', animationDelay: '6s'}}>🌸</div>
          </div>
        </>
      )}

      <div className="container mx-auto px-6 text-center relative z-10">
        <div className="max-w-4xl mx-auto space-y-12">
          {/* Title */}
          <h2 className={cn(
            'text-fluid-lg font-bold leading-tight',
            getTextColor()
          )}>
            {title}
          </h2>

          {/* Subtitle */}
          {subtitle && (
            <p className={cn(
              'text-xl lg:text-2xl leading-relaxed max-w-3xl mx-auto',
              getSubtitleColor()
            )}>
              {subtitle}
            </p>
          )}

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Button 
              variant={variant === 'sakura' ? 'secondary' : 'sakura'}
              size="lg" 
              className={cn(
                'text-xl px-12 py-6 font-semibold shadow-xl hover:shadow-2xl transition-all duration-200 tech-feedback',
                variant === 'sakura' 
                  ? 'bg-white text-sakura-600 hover:bg-sakura-50 hover:scale-105' 
                  : 'hover:scale-105'
              )}
              asChild
            >
              <Link href={primaryAction.href}>
                {primaryAction.label}
                <ArrowRight className="ml-3 h-6 w-6" />
              </Link>
            </Button>
            
            {secondaryAction && (
              <Button 
                variant={variant === 'sakura' ? 'outline' : 'sakura-outline'}
                size="lg" 
                className={cn(
                  'text-xl px-12 py-6 transition-all duration-200 tech-feedback',
                  variant === 'sakura' 
                    ? 'border-2 border-white text-white bg-white/10 hover:bg-white/30 hover:border-white hover:shadow-lg backdrop-blur-sm'
                    : 'hover:bg-sakura-50 dark:hover:bg-sakura-900/30'
                )}
                onClick={secondaryAction.onClick}
                asChild={!!secondaryAction.href}
              >
                {secondaryAction.href ? (
                  <Link href={secondaryAction.href}>
                    {secondaryAction.label}
                  </Link>
                ) : (
                  secondaryAction.label
                )}
              </Button>
            )}
          </div>

          {/* Trust indicators for sakura variant */}
          {variant === 'sakura' && (
            <div className="flex justify-center items-center space-x-8 text-sm opacity-75">
              <span>✨ No credit card required</span>
              <span>🌱 14-day free trial</span>
              <span>🌸 Cancel anytime</span>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}