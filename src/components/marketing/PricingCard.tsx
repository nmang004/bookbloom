'use client'

import { Check, Star } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface PricingTier {
  id: string
  name: string
  emoji: string
  description: string
  monthlyPrice: number
  annualPrice: number
  features: string[]
  highlight?: boolean
  popular?: boolean
  buttonText?: string
  buttonVariant?: 'default' | 'sakura' | 'sakura-outline'
}

interface PricingCardProps {
  tier: PricingTier
  isAnnual: boolean
  className?: string
}

export function PricingCard({ tier, isAnnual, className }: PricingCardProps) {
  const price = isAnnual ? tier.annualPrice : tier.monthlyPrice
  const displayPrice = price === 0 ? 'Free' : `$${price}`
  const billingPeriod = price === 0 ? '' : isAnnual ? '/year' : '/month'
  const savings = isAnnual && tier.monthlyPrice > 0 ? Math.round((1 - tier.annualPrice / (tier.monthlyPrice * 12)) * 100) : 0

  return (
    <div className={cn(
      'relative bg-white dark:bg-charcoal-800 rounded-3xl p-8 shadow-lg border transition-all duration-300 hover:shadow-2xl hover:scale-105',
      tier.popular 
        ? 'border-sakura-400 ring-2 ring-sakura-200 shadow-sakura-200/50' 
        : 'border-sakura-100/50 dark:border-charcoal-700',
      className
    )}>
      {/* Popular Badge */}
      {tier.popular && (
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
          <div className="bg-gradient-to-r from-sakura-500 to-sakura-600 text-white px-6 py-2 rounded-full text-sm font-semibold flex items-center space-x-1 shadow-lg">
            <Star className="h-4 w-4 fill-current" />
            <span>Most Popular</span>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="text-center mb-8">
        <div className="text-6xl mb-4">{tier.emoji}</div>
        <h3 className="text-2xl font-bold text-charcoal-900 dark:text-white mb-2">
          {tier.name}
        </h3>
        <p className="text-charcoal-600 dark:text-charcoal-300 text-sm">
          {tier.description}
        </p>
      </div>

      {/* Pricing */}
      <div className="text-center mb-8">
        <div className="flex items-baseline justify-center space-x-1">
          <span className="text-5xl font-bold text-charcoal-900 dark:text-white">
            {displayPrice}
          </span>
          {billingPeriod && (
            <span className="text-charcoal-600 dark:text-charcoal-400 text-lg">
              {billingPeriod}
            </span>
          )}
        </div>
        
        {savings > 0 && (
          <div className="mt-2">
            <span className="bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400 px-3 py-1 rounded-full text-sm font-medium">
              Save {savings}% with annual billing
            </span>
          </div>
        )}

        {isAnnual && tier.monthlyPrice > 0 && (
          <div className="mt-2 text-sm text-charcoal-500 dark:text-charcoal-400">
            ${(tier.annualPrice / 12).toFixed(0)}/month billed annually
          </div>
        )}
      </div>

      {/* Features */}
      <div className="space-y-4 mb-8">
        {tier.features.map((feature, index) => (
          <div key={index} className="flex items-start space-x-3">
            <div className="w-5 h-5 bg-sakura-100 dark:bg-sakura-900/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
              <Check className="h-3 w-3 text-sakura-600 dark:text-sakura-400" />
            </div>
            <span className="text-charcoal-700 dark:text-charcoal-200 text-sm leading-relaxed">
              {feature}
            </span>
          </div>
        ))}
      </div>

      {/* CTA Button */}
      <Button 
        className={cn(
          'w-full py-3 font-semibold transition-all duration-200 tech-feedback',
          tier.popular && 'hover:scale-105 shadow-lg hover:shadow-xl'
        )}
        variant={tier.buttonVariant || (tier.popular ? 'sakura' : 'sakura-outline')}
      >
        {tier.buttonText || (price === 0 ? 'Start for Free' : 'Get Started')}
      </Button>

      {price === 0 && (
        <p className="text-center text-xs text-charcoal-500 dark:text-charcoal-400 mt-3">
          No credit card required
        </p>
      )}
    </div>
  )
}

interface PricingToggleProps {
  isAnnual: boolean
  onToggle: (isAnnual: boolean) => void
  className?: string
}

export function PricingToggle({ isAnnual, onToggle, className }: PricingToggleProps) {
  return (
    <div className={cn('flex items-center justify-center space-x-4', className)}>
      <button
        onClick={() => onToggle(false)}
        className={cn(
          'px-6 py-3 rounded-lg font-medium transition-all duration-200',
          !isAnnual 
            ? 'bg-sakura-500 text-white shadow-lg' 
            : 'text-charcoal-600 dark:text-charcoal-300 hover:bg-charcoal-100 dark:hover:bg-charcoal-800'
        )}
      >
        Monthly
      </button>
      
      <button
        onClick={() => onToggle(true)}
        className={cn(
          'px-6 py-3 rounded-lg font-medium transition-all duration-200 relative',
          isAnnual 
            ? 'bg-sakura-500 text-white shadow-lg' 
            : 'text-charcoal-600 dark:text-charcoal-300 hover:bg-charcoal-100 dark:hover:bg-charcoal-800'
        )}
      >
        Annual
        {/* Savings badge */}
        <div className="absolute -top-2 -right-2 bg-green-500 text-white text-xs px-2 py-0.5 rounded-full">
          Save 20%
        </div>
      </button>
    </div>
  )
}