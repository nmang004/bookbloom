'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { AuthLayout } from '@/components/auth/AuthLayout'
import { AuthForm } from '@/components/auth/AuthForm'
import { SocialAuthButtons } from '@/components/auth/SocialAuthButtons'

interface AuthFormData {
  email: string
  password?: string
  rememberMe?: boolean
}

export default function SignInPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  const handleSignIn = async (data: AuthFormData) => {
    setIsLoading(true)
    setError('')

    try {
      // TODO: Implement Supabase authentication
      console.log('Sign in with:', data)
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // For now, just redirect to dashboard
      router.push('/dashboard')
    } catch (_) {
      setError('Invalid email or password. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleGoogleAuth = async () => {
    setIsLoading(true)
    setError('')

    try {
      // TODO: Implement Google OAuth with Supabase
      console.log('Google auth')
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      router.push('/dashboard')
    } catch (_) {
      setError('Failed to sign in with Google. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleGithubAuth = async () => {
    setIsLoading(true)
    setError('')

    try {
      // TODO: Implement GitHub OAuth with Supabase
      console.log('GitHub auth')
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      router.push('/dashboard')
    } catch (_) {
      setError('Failed to sign in with GitHub. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <AuthLayout
      title="Welcome back"
      subtitle="Sign in to continue your writing journey"
    >
      <div className="space-y-6">
        <AuthForm
          type="signin"
          onSubmit={handleSignIn}
          isLoading={isLoading}
          error={error}
        />

        <SocialAuthButtons
          onGoogleAuth={handleGoogleAuth}
          onGithubAuth={handleGithubAuth}
          isLoading={isLoading}
        />

        {/* Additional links */}
        <div className="space-y-4 text-center text-sm">
          <Link
            href="/auth/reset"
            className="text-sakura-600 hover:text-sakura-700 dark:text-sakura-400 dark:hover:text-sakura-300 transition-colors duration-200"
          >
            Forgot your password?
          </Link>
          
          <div className="text-charcoal-600 dark:text-charcoal-400">
            Don't have an account?{' '}
            <Link
              href="/auth/signup"
              className="text-sakura-600 hover:text-sakura-700 dark:text-sakura-400 dark:hover:text-sakura-300 font-medium transition-colors duration-200"
            >
              Sign up for free
            </Link>
          </div>
        </div>
      </div>
    </AuthLayout>
  )
}