import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Sign In - BookBloom 2.0',
  description: 'Sign in to your BookBloom account and continue your writing journey.',
}

export default function SignInLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}