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
  confirmPassword?: string
  firstName?: string
  lastName?: string
}

export default function SignUpPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  const handleSignUp = async (data: AuthFormData) => {
    setIsLoading(true)
    setError('')

    try {
      // TODO: Implement Supabase authentication
      console.log('Sign up with:', data)
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // For now, redirect to verification page
      router.push('/auth/verify?email=' + encodeURIComponent(data.email))
    } catch (_) {
      setError('Failed to create account. Please try again.')
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
      setError('Failed to sign up with Google. Please try again.')
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
      setError('Failed to sign up with GitHub. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <AuthLayout
      title="Create your account"
      subtitle="Start your writing journey with BookBloom"
    >
      <div className="space-y-6">
        <AuthForm
          type="signup"
          onSubmit={handleSignUp}
          isLoading={isLoading}
          error={error}
        />

        <SocialAuthButtons
          onGoogleAuth={handleGoogleAuth}
          onGithubAuth={handleGithubAuth}
          isLoading={isLoading}
        />

        {/* Terms and Privacy */}
        <div className="text-xs text-charcoal-500 dark:text-charcoal-400 text-center leading-relaxed">
          By creating an account, you agree to our{' '}
          <Link href="/terms" className="text-sakura-600 hover:text-sakura-700 dark:text-sakura-400 dark:hover:text-sakura-300">
            Terms of Service
          </Link>{' '}
          and{' '}
          <Link href="/privacy" className="text-sakura-600 hover:text-sakura-700 dark:text-sakura-400 dark:hover:text-sakura-300">
            Privacy Policy
          </Link>
        </div>

        {/* Sign in link */}
        <div className="text-center text-sm text-charcoal-600 dark:text-charcoal-400">
          Already have an account?{' '}
          <Link
            href="/auth/signin"
            className="text-sakura-600 hover:text-sakura-700 dark:text-sakura-400 dark:hover:text-sakura-300 font-medium transition-colors duration-200"
          >
            Sign in
          </Link>
        </div>
      </div>
    </AuthLayout>
  )
}