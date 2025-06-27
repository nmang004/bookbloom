import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/theme-provider'
import { Toaster } from '@/components/ui/toaster'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'BookBloom 2.0 - AI-Powered Book Generation',
  description: 'Transform your ideas into beautifully written books with AI assistance. From seed to sakura, watch your story bloom.',
  keywords: ['AI writing', 'book generation', 'creative writing', 'AI assistant', 'manuscript writing'],
  authors: [{ name: 'BookBloom Team' }],
  openGraph: {
    title: 'BookBloom 2.0 - AI-Powered Book Generation',
    description: 'Transform your ideas into beautifully written books with AI assistance.',
    type: 'website',
    locale: 'en_US',
    siteName: 'BookBloom',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BookBloom 2.0',
    description: 'Transform your ideas into beautifully written books with AI assistance.',
  },
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png' },
    ],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}