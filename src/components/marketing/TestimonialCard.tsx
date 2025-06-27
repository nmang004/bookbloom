'use client'

import { cn } from '@/lib/utils'
import { Star } from 'lucide-react'
import Image from 'next/image'

interface TestimonialCardProps {
  quote: string
  author: {
    name: string
    title: string
    avatar?: string
    initials?: string
  }
  rating?: number
  className?: string
}

export function TestimonialCard({
  quote,
  author,
  rating = 5,
  className
}: TestimonialCardProps) {
  return (
    <div className={cn(
      'bg-white dark:bg-charcoal-800 rounded-2xl p-8 shadow-lg border border-sakura-100/50 dark:border-charcoal-700 hover:shadow-xl hover:scale-105 transition-all duration-300 zen-lift',
      className
    )}>
      {/* Rating */}
      <div className="flex items-center space-x-1 mb-6">
        {[...Array(5)].map((_, index) => (
          <Star
            key={index}
            className={cn(
              'h-5 w-5',
              index < rating 
                ? 'text-amber-400 fill-current' 
                : 'text-charcoal-300 dark:text-charcoal-600'
            )}
          />
        ))}
      </div>

      {/* Quote */}
      <blockquote className="text-charcoal-700 dark:text-charcoal-200 text-lg leading-relaxed mb-6 italic">
        &quot;{quote}&quot;
      </blockquote>

      {/* Author */}
      <div className="flex items-center space-x-4">
        {/* Avatar */}
        <div className="w-12 h-12 bg-sakura-100 dark:bg-sakura-900/20 rounded-full flex items-center justify-center overflow-hidden">
          {author.avatar ? (
            <Image 
              src={author.avatar} 
              alt={author.name}
              width={48}
              height={48}
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="text-sakura-600 dark:text-sakura-400 font-semibold text-sm">
              {author.initials || author.name.split(' ').map(n => n[0]).join('')}
            </span>
          )}
        </div>

        {/* Author Info */}
        <div>
          <div className="font-semibold text-charcoal-900 dark:text-white">
            {author.name}
          </div>
          <div className="text-sm text-charcoal-600 dark:text-charcoal-400">
            {author.title}
          </div>
        </div>
      </div>
    </div>
  )
}

interface TestimonialSectionProps {
  testimonials: Array<{
    quote: string
    author: {
      name: string
      title: string
      avatar?: string
      initials?: string
    }
    rating?: number
  }>
  title?: string
  subtitle?: string
  className?: string
}

export function TestimonialSection({
  testimonials,
  title = "What Authors Are Saying",
  subtitle = "Join thousands of writers who've discovered the joy of AI-assisted writing",
  className
}: TestimonialSectionProps) {
  return (
    <section className={cn('py-24 bg-sakura-50/30 dark:bg-charcoal-850', className)}>
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-20">
          <h2 className="text-fluid-lg font-bold mb-8 text-charcoal-900 dark:text-white">
            {title}
          </h2>
          <p className="text-xl lg:text-2xl text-charcoal-600 dark:text-charcoal-300 max-w-4xl mx-auto leading-relaxed">
            {subtitle}
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard
              key={index}
              quote={testimonial.quote}
              author={testimonial.author}
              rating={testimonial.rating}
              className="animate-fade-in"
              style={{animationDelay: `${index * 150}ms`} as any}
            />
          ))}
        </div>
      </div>
    </section>
  )
}