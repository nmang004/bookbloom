'use client'

import { Button } from '@/components/ui/button'
import { Github } from 'lucide-react'
import { cn } from '@/lib/utils'

interface SocialAuthButtonsProps {
  onGoogleAuth: () => Promise<void>
  onGithubAuth: () => Promise<void>
  isLoading?: boolean
  className?: string
}

export function SocialAuthButtons({ 
  onGoogleAuth, 
  onGithubAuth, 
  isLoading = false, 
  className 
}: SocialAuthButtonsProps) {
  return (
    <div className={cn('space-y-3', className)}>
      {/* Divider */}
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-charcoal-200 dark:border-charcoal-700" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-4 bg-white dark:bg-charcoal-800 text-charcoal-500 dark:text-charcoal-400">
            Or continue with
          </span>
        </div>
      </div>

      {/* Social buttons */}
      <div className="space-y-3">
        <Button
          type="button"
          variant="outline"
          className="w-full py-3 font-medium transition-all duration-200 hover:bg-charcoal-50 dark:hover:bg-charcoal-700 tech-feedback"
          onClick={onGoogleAuth}
          disabled={isLoading}
        >
          <svg className="h-5 w-5 mr-3" viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="currentColor"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="currentColor"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            />
            <path
              fill="currentColor"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            />
          </svg>
          Continue with Google
        </Button>

        <Button
          type="button"
          variant="outline"
          className="w-full py-3 font-medium transition-all duration-200 hover:bg-charcoal-50 dark:hover:bg-charcoal-700 tech-feedback"
          onClick={onGithubAuth}
          disabled={isLoading}
        >
          <Github className="h-5 w-5 mr-3" />
          Continue with GitHub
        </Button>
      </div>
    </div>
  )
}