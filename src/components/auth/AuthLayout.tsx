import { ReactNode } from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'

interface AuthLayoutProps {
  children: ReactNode
  title: string
  subtitle?: string
  className?: string
}

export function AuthLayout({ children, title, subtitle, className }: AuthLayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-sakura-50/30 via-white to-sakura-50/20 dark:from-charcoal-900 dark:via-charcoal-850 dark:to-charcoal-800 flex">
      {/* Floating sakura petals */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="sakura-petal animate-sakura-fall" style={{left: '10%', animationDelay: '0s'}} />
        <div className="sakura-petal animate-sakura-fall" style={{left: '20%', animationDelay: '3s'}} />
        <div className="sakura-petal animate-sakura-fall" style={{left: '80%', animationDelay: '6s'}} />
        <div className="sakura-petal animate-sakura-fall" style={{left: '90%', animationDelay: '9s'}} />
      </div>

      {/* Left side - Branding */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-sakura-500 via-sakura-600 to-sakura-700" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
        
        {/* Floating sakura elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute text-white/20 text-8xl animate-float" style={{left: '15%', top: '15%', animationDelay: '0s'}}>🌸</div>
          <div className="absolute text-white/15 text-6xl animate-float" style={{left: '70%', top: '25%', animationDelay: '2s'}}>🌸</div>
          <div className="absolute text-white/10 text-5xl animate-float" style={{left: '25%', top: '60%', animationDelay: '4s'}}>🌸</div>
          <div className="absolute text-white/15 text-7xl animate-float" style={{left: '60%', top: '70%', animationDelay: '6s'}}>🌸</div>
        </div>

        <div className="relative z-10 flex flex-col justify-center px-12 text-white">
          <div className="mb-8">
            <div className="flex items-center space-x-3 mb-6">
              <div className="text-4xl">🌸</div>
              <span className="text-3xl font-bold">BookBloom</span>
            </div>
            <h1 className="text-4xl font-bold leading-tight mb-4">
              Your Story is
              <span className="block">Waiting to Bloom</span>
            </h1>
            <p className="text-xl opacity-90 leading-relaxed">
              Transform your ideas into captivating manuscripts with AI-powered assistance. 
              Experience the journey from seed to sakura.
            </p>
          </div>

          {/* Success indicators */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                <span className="text-lg">🌱</span>
              </div>
              <span className="opacity-90">10,000+ books created</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                <span className="text-lg">📚</span>
              </div>
              <span className="opacity-90">500+ published authors</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                <span className="text-lg">⭐</span>
              </div>
              <span className="opacity-90">4.9/5 author satisfaction</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right side - Auth form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 relative z-10">
        <div className="w-full max-w-md">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="lg:hidden flex items-center justify-center space-x-3 mb-6">
              <div className="text-3xl">🌸</div>
              <span className="text-2xl font-bold sakura-text-gradient">BookBloom</span>
            </div>
            
            <h2 className="text-3xl font-bold text-charcoal-900 dark:text-white mb-2">
              {title}
            </h2>
            {subtitle && (
              <p className="text-charcoal-600 dark:text-charcoal-300">
                {subtitle}
              </p>
            )}
          </div>

          {/* Form container */}
          <div className={cn(
            'bg-white dark:bg-charcoal-800 rounded-2xl shadow-2xl border border-sakura-100/50 dark:border-charcoal-700 p-8',
            className
          )}>
            {children}
          </div>

          {/* Back to homepage */}
          <div className="text-center mt-8">
            <Link 
              href="/" 
              className="text-charcoal-600 dark:text-charcoal-400 hover:text-sakura-600 dark:hover:text-sakura-400 transition-colors duration-200 text-sm"
            >
              ← Back to homepage
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}