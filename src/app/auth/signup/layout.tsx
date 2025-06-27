import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Sign Up - BookBloom 2.0',
  description: 'Create your free BookBloom account and start writing your first book with AI assistance.',
}

export default function SignUpLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}