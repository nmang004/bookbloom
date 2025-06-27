'use client'

import { useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Mail, CheckCircle, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { AuthLayout } from '@/components/auth/AuthLayout'

function EmailVerificationContent() {
  const searchParams = useSearchParams()
  const email = searchParams.get('email') || ''
  const [isResending, setIsResending] = useState(false)
  const [resendSuccess, setResendSuccess] = useState(false)
  const [resendError, setResendError] = useState('')

  const handleResendEmail = async () => {
    if (!email) return

    setIsResending(true)
    setResendError('')
    setResendSuccess(false)

    try {
      // TODO: Implement Supabase email resend
      console.log('Resending verification email to:', email)
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      setResendSuccess(true)
    } catch {
      setResendError('Failed to resend email. Please try again.')
    } finally {
      setIsResending(false)
    }
  }

  return (
    <AuthLayout
      title="Verify your email"
      subtitle="We've sent you a verification link"
    >
      <div className="text-center space-y-6">
        <div className="w-16 h-16 bg-sakura-100 dark:bg-sakura-900/20 rounded-full flex items-center justify-center mx-auto">
          <Mail className="h-8 w-8 text-sakura-600 dark:text-sakura-400" />
        </div>
        
        <div className="space-y-2">
          <p className="text-charcoal-600 dark:text-charcoal-300">
            We&apos;ve sent a verification link to:
          </p>
          {email && (
            <p className="font-medium text-charcoal-900 dark:text-white">
              {email}
            </p>
          )}
        </div>

        <div className="bg-sakura-50 dark:bg-sakura-900/20 border border-sakura-200 dark:border-sakura-800 rounded-lg p-4 space-y-3">
          <p className="text-sm text-charcoal-700 dark:text-charcoal-300">
            Click the link in your email to verify your account and start writing.
          </p>
          
          {resendSuccess && (
            <div className="flex items-center justify-center space-x-2 text-green-600 dark:text-green-400">
              <CheckCircle className="h-4 w-4" />
              <span className="text-sm">Verification email sent!</span>
            </div>
          )}

          {resendError && (
            <p className="text-sm text-red-600 dark:text-red-400">
              {resendError}
            </p>
          )}
        </div>

        <div className="space-y-4">
          <p className="text-sm text-charcoal-600 dark:text-charcoal-400">
            Didn&apos;t receive the email? Check your spam folder.
          </p>
          
          <Button
            variant="sakura-outline"
            onClick={handleResendEmail}
            disabled={isResending || !email}
            className="w-full hover:bg-sakura-50 dark:hover:bg-sakura-900/30 transition-all duration-200"
          >
            {isResending ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Sending...
              </>
            ) : (
              'Resend verification email'
            )}
          </Button>
        </div>

        <div className="space-y-3 text-center text-sm">
          <Link
            href="/auth/signin"
            className="block text-sakura-600 hover:text-sakura-700 dark:text-sakura-400 dark:hover:text-sakura-300 font-medium transition-colors duration-200"
          >
            ← Back to sign in
          </Link>
          
          <div className="text-charcoal-500 dark:text-charcoal-400">
            Need help?{' '}
            <Link
              href="/support"
              className="text-sakura-600 hover:text-sakura-700 dark:text-sakura-400 dark:hover:text-sakura-300"
            >
              Contact support
            </Link>
          </div>
        </div>
      </div>
    </AuthLayout>
  )
}

export default function EmailVerificationPage() {
  return (
    <Suspense fallback={
      <AuthLayout
        title="Verify your email"
        subtitle="We've sent you a verification link"
      >
        <div className="text-center space-y-6">
          <div className="w-16 h-16 bg-sakura-100 dark:bg-sakura-900/20 rounded-full flex items-center justify-center mx-auto">
            <Loader2 className="h-8 w-8 text-sakura-600 dark:text-sakura-400 animate-spin" />
          </div>
          <p className="text-charcoal-600 dark:text-charcoal-300">Loading...</p>
        </div>
      </AuthLayout>
    }>
      <EmailVerificationContent />
    </Suspense>
  )
}