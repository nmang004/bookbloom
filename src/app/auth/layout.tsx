import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Authentication - BookBloom 2.0',
  description: 'Sign in or create your BookBloom account to start your AI-powered writing journey.',
  robots: 'noindex, nofollow', // Don't index auth pages
}

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}