'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'

interface TimelineStep {
  id: string
  emoji: string
  stage: string
  title: string
  description: string
  details: string[]
  color: string
  animation: string
}

const journeySteps: TimelineStep[] = [
  {
    id: 'seed',
    emoji: '🌰',
    stage: 'The Seed',
    title: 'Plant Your Idea',
    description: 'Share your story concept and watch our AI transform it into a compelling foundation.',
    details: [
      'Input your core story idea',
      'Choose your genre and style',
      'AI expands your concept into a detailed synopsis',
      'Get character and setting suggestions'
    ],
    color: 'from-charcoal-400 to-charcoal-600',
    animation: ''
  },
  {
    id: 'sprout',
    emoji: '🌱',
    stage: 'The Sprout',
    title: 'AI Enhancement',
    description: 'Our intelligent system enriches your idea with plot structures and narrative frameworks.',
    details: [
      'AI analyzes your genre and themes',
      'Generates detailed plot outlines',
      'Suggests narrative structures',
      'Creates chapter frameworks'
    ],
    color: 'from-green-400 to-green-600',
    animation: 'animate-gentle-sway'
  },
  {
    id: 'growth',
    emoji: '🌿',
    stage: 'The Growth',
    title: 'Build Your World',
    description: 'Develop rich characters, immersive settings, and intricate world-building elements.',
    details: [
      'Create detailed character profiles',
      'Design compelling backstories',
      'Build immersive settings and locations',
      'Establish rules and systems'
    ],
    color: 'from-green-500 to-green-700',
    animation: 'animate-leaves-rustle'
  },
  {
    id: 'bud',
    emoji: '🌺',
    stage: 'The Bud',
    title: 'Write Together',
    description: 'Collaborate with AI to write compelling chapters and refine your manuscript.',
    details: [
      'AI-assisted chapter writing',
      'Real-time suggestions and improvements',
      'Consistency checking across chapters',
      'Style and tone refinement'
    ],
    color: 'from-sakura-400 to-sakura-600',
    animation: 'animate-pre-bloom'
  },
  {
    id: 'blossom',
    emoji: '🌸',
    stage: 'The Blossom',
    title: 'Harvest Your Book',
    description: 'Export your completed manuscript in professional formats ready for publishing.',
    details: [
      'Professional PDF formatting',
      'Word document compatibility',
      'EPUB for digital publishing',
      'Print-ready layouts'
    ],
    color: 'from-sakura-500 to-sakura-700',
    animation: 'animate-bloom-pulse'
  }
]

interface JourneyTimelineProps {
  className?: string
}

export function JourneyTimeline({ className }: JourneyTimelineProps) {
  const [activeStep, setActiveStep] = useState<string>('seed')
  const activeStepData = journeySteps.find(step => step.id === activeStep) || journeySteps[0]

  return (
    <div className={cn('space-y-16', className)}>
      {/* Timeline Navigation */}
      <div className="relative">
        {/* Connection Line */}
        <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-charcoal-300 via-green-400 via-sakura-400 to-sakura-500 transform -translate-y-1/2 hidden lg:block" />
        
        {/* Timeline Steps */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-4 relative z-10">
          {journeySteps.map((step, index) => (
            <button
              key={step.id}
              onClick={() => setActiveStep(step.id)}
              className="text-center space-y-4 group hover:scale-105 transition-all duration-300 p-4 rounded-2xl hover:bg-white/50 dark:hover:bg-charcoal-800/50"
              style={{animationDelay: `${index * 150}ms`}}
            >
              {/* Stage Icon */}
              <div className={cn(
                'w-20 h-20 mx-auto rounded-full flex items-center justify-center text-4xl shadow-lg transition-all duration-300 relative overflow-hidden',
                `bg-gradient-to-br ${step.color}`,
                step.animation,
                activeStep === step.id 
                  ? 'ring-4 ring-sakura-300 scale-110 shadow-xl' 
                  : 'group-hover:shadow-xl group-hover:scale-105'
              )}>
                <span className="relative z-10 filter drop-shadow-sm">
                  {step.emoji}
                </span>
                
                {/* Shimmer effect for active step */}
                {activeStep === step.id && (
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
                )}
              </div>

              {/* Stage Info */}
              <div>
                <h3 className={cn(
                  'text-xl font-semibold transition-colors duration-200',
                  activeStep === step.id 
                    ? 'text-sakura-600 dark:text-sakura-400' 
                    : 'text-charcoal-900 dark:text-white group-hover:text-sakura-500'
                )}>
                  {step.stage}
                </h3>
                <p className="text-sm text-charcoal-600 dark:text-charcoal-400 mt-1 hidden lg:block">
                  {step.title}
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Active Step Details */}
      <div className="bg-white dark:bg-charcoal-800 rounded-3xl p-8 lg:p-12 shadow-2xl border border-sakura-100/50 dark:border-charcoal-700 animate-fade-in">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div>
              <div className="flex items-center space-x-4 mb-4">
                <div className={cn(
                  'w-16 h-16 rounded-2xl flex items-center justify-center text-3xl',
                  `bg-gradient-to-br ${activeStepData.color}`,
                  activeStepData.animation
                )}>
                  {activeStepData.emoji}
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-charcoal-900 dark:text-white">
                    {activeStepData.stage}
                  </h2>
                  <p className="text-sakura-600 dark:text-sakura-400 font-medium">
                    {activeStepData.title}
                  </p>
                </div>
              </div>
              
              <p className="text-xl text-charcoal-600 dark:text-charcoal-300 leading-relaxed">
                {activeStepData.description}
              </p>
            </div>

            {/* Feature List */}
            <ul className="space-y-4">
              {activeStepData.details.map((detail, index) => (
                <li 
                  key={index}
                  className="flex items-start space-x-3"
                  style={{animationDelay: `${index * 100}ms`}}
                >
                  <div className="w-2 h-2 bg-sakura-500 rounded-full mt-2 animate-pulse" />
                  <span className="text-charcoal-700 dark:text-charcoal-200">
                    {detail}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Visual Mockup */}
          <div className="bg-sakura-50 dark:bg-sakura-900/10 rounded-2xl p-8 border border-sakura-200/50 dark:border-sakura-800/50">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-charcoal-600 dark:text-charcoal-400">
                  {activeStepData.stage}
                </span>
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              </div>
              
              <div className="space-y-3">
                <div className="h-4 bg-charcoal-200 dark:bg-charcoal-700 rounded-md animate-pulse" />
                <div className="h-4 bg-charcoal-200 dark:bg-charcoal-700 rounded-md w-3/4 animate-pulse" />
                <div className="h-4 bg-charcoal-200 dark:bg-charcoal-700 rounded-md w-1/2 animate-pulse" />
              </div>
              
              <div className="mt-6 p-4 bg-sakura-100 dark:bg-sakura-900/20 rounded-lg border border-sakura-200 dark:border-sakura-800">
                <div className="flex items-center space-x-2 mb-2">
                  <span className="text-lg">{activeStepData.emoji}</span>
                  <span className="text-sm font-medium text-sakura-700 dark:text-sakura-300">
                    {activeStepData.title}
                  </span>
                </div>
                <p className="text-xs text-charcoal-600 dark:text-charcoal-400">
                  Step {journeySteps.findIndex(s => s.id === activeStep) + 1} of {journeySteps.length}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}