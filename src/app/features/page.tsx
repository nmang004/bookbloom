import { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function FeaturesPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-charcoal-900">
      {/* Enhanced Navigation - Zen Garden Precision */}
      <nav className="border-b border-sakura-100/50 dark:border-charcoal-700 backdrop-blur-sm bg-white/80 dark:bg-charcoal-900/80 sticky top-0 z-50">
        <div className="container mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="text-3xl transition-transform duration-200 hover:scale-110 tech-feedback">🌸</div>
              <span className="text-2xl font-semibold sakura-text-gradient">BookBloom</span>
            </div>
            
            <div className="hidden lg:flex items-center space-x-12">
              <Link 
                href="/features" 
                className="text-charcoal-600 hover:text-sakura-600 transition-all duration-150 hover:scale-105 font-medium tech-feedback"
              >
                Features
              </Link>
              <Link 
                href="/how-it-works" 
                className="text-charcoal-600 hover:text-sakura-600 transition-all duration-150 hover:scale-105 font-medium tech-feedback"
              >
                How It Works
              </Link>
              <Link 
                href="/pricing" 
                className="text-charcoal-600 hover:text-sakura-600 transition-all duration-150 hover:scale-105 font-medium tech-feedback"
              >
                Pricing
              </Link>
              <Link 
                href="/auth/signin" 
                className="text-charcoal-600 hover:text-sakura-600 transition-all duration-150 hover:scale-105 font-medium tech-feedback"
              >
                Sign In
              </Link>
              
              <Button 
                variant="sakura" 
                size="sm" 
                className="px-6 py-2 font-medium hover:shadow-lg hover:shadow-sakura-200/50 transition-all duration-150 tech-feedback"
                asChild
              >
                <Link href="/auth/signup">Get Started</Link>
              </Button>
            </div>
            
            <button 
              className="lg:hidden p-2 rounded-lg hover:bg-sakura-50 transition-colors tech-feedback"
              aria-label="Open navigation menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="py-16">
        <div className="container mx-auto px-6">
          <h1 className="text-4xl font-bold text-center mb-8">Features</h1>
          <p className="text-xl text-center text-charcoal-600 dark:text-charcoal-300">
            Discover the powerful AI-driven tools that make BookBloom the ultimate writing companion.
          </p>
        </div>
      </main>

      {/* Enhanced Footer */}
      <footer className="py-16 bg-charcoal-900 text-white" role="contentinfo">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <div className="text-2xl">🌸</div>
                <span className="text-xl font-bold">BookBloom</span>
              </div>
              <p className="text-charcoal-300 leading-relaxed">
                Where great books are born. Transform your ideas into captivating manuscripts with AI assistance.
              </p>
            </div>
            <div className="space-y-4">
              <h4 className="font-semibold text-lg">Product</h4>
              <nav className="space-y-3 text-charcoal-300">
                <Link href="/features" className="block hover:text-white transition-colors duration-150 tech-feedback">Features</Link>
                <Link href="/pricing" className="block hover:text-white transition-colors duration-150 tech-feedback">Pricing</Link>
                <Link href="/templates" className="block hover:text-white transition-colors duration-150 tech-feedback">Templates</Link>
              </nav>
            </div>
            <div className="space-y-4">
              <h4 className="font-semibold text-lg">Resources</h4>
              <nav className="space-y-3 text-charcoal-300">
                <Link href="/help" className="block hover:text-white transition-colors duration-150 tech-feedback">Help Center</Link>
                <Link href="/blog" className="block hover:text-white transition-colors duration-150 tech-feedback">Blog</Link>
                <Link href="/community" className="block hover:text-white transition-colors duration-150 tech-feedback">Community</Link>
              </nav>
            </div>
            <div className="space-y-4">
              <h4 className="font-semibold text-lg">Company</h4>
              <nav className="space-y-3 text-charcoal-300">
                <Link href="/about" className="block hover:text-white transition-colors duration-150 tech-feedback">About</Link>
                <Link href="/privacy" className="block hover:text-white transition-colors duration-150 tech-feedback">Privacy</Link>
                <Link href="/terms" className="block hover:text-white transition-colors duration-150 tech-feedback">Terms</Link>
              </nav>
            </div>
          </div>
          <div className="pt-8 border-t border-charcoal-800 text-center text-charcoal-400">
            <p>&copy; 2024 BookBloom. All rights reserved. Built with 🌸 for writers.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}