'use client'

import { useState } from 'react'
import Link from 'next/link'
import { CheckCircle } from 'lucide-react'
import { AuthLayout } from '@/components/auth/AuthLayout'
import { AuthForm } from '@/components/auth/AuthForm'

interface AuthFormData {
  email: string
}

export default function ResetPasswordPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [emailSent, setEmailSent] = useState(false)
  const [sentEmail, setSentEmail] = useState('')

  const handleReset = async (data: AuthFormData) => {
    setIsLoading(true)
    setError('')

    try {
      // TODO: Implement Supabase password reset
      console.log('Reset password for:', data.email)
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      setSentEmail(data.email)
      setEmailSent(true)
    } catch (_) {
      setError('Failed to send reset email. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  if (emailSent) {
    return (
      <AuthLayout
        title="Check your email"
        subtitle="We've sent password reset instructions"
      >
        <div className="text-center space-y-6">
          <div className="w-16 h-16 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mx-auto">
            <CheckCircle className="h-8 w-8 text-green-600 dark:text-green-400" />
          </div>
          
          <div className="space-y-2">
            <p className="text-charcoal-600 dark:text-charcoal-300">
              We've sent password reset instructions to:
            </p>
            <p className="font-medium text-charcoal-900 dark:text-white">
              {sentEmail}
            </p>
          </div>

          <div className="bg-sakura-50 dark:bg-sakura-900/20 border border-sakura-200 dark:border-sakura-800 rounded-lg p-4">
            <p className="text-sm text-charcoal-700 dark:text-charcoal-300">
              Didn't receive the email? Check your spam folder or{' '}
              <button
                onClick={() => setEmailSent(false)}
                className="text-sakura-600 hover:text-sakura-700 dark:text-sakura-400 dark:hover:text-sakura-300 font-medium"
              >
                try again
              </button>
            </p>
          </div>

          <Link
            href="/auth/signin"
            className="inline-block text-sakura-600 hover:text-sakura-700 dark:text-sakura-400 dark:hover:text-sakura-300 font-medium transition-colors duration-200"
          >
            ← Back to sign in
          </Link>
        </div>
      </AuthLayout>
    )
  }

  return (
    <AuthLayout
      title="Reset your password"
      subtitle="Enter your email to receive reset instructions"
    >
      <div className="space-y-6">
        <AuthForm
          type="reset"
          onSubmit={handleReset}
          isLoading={isLoading}
          error={error}
        />

        <div className="text-center">
          <Link
            href="/auth/signin"
            className="text-sakura-600 hover:text-sakura-700 dark:text-sakura-400 dark:hover:text-sakura-300 font-medium transition-colors duration-200 text-sm"
          >
            ← Back to sign in
          </Link>
        </div>
      </div>
    </AuthLayout>
  )
}