import { Metadata } from 'next'
import Link from 'next/link'
import { 
  BookOpen, 
  FileText,
  Crown,
  ArrowRight
} from 'lucide-react'
import { getIcon, iconRegistry } from '@/lib/icons'
import { Button } from '@/components/ui/button'
import { 
  Hero, 
  FeatureCard, 
  SakuraProgressIndicator, 
  TestimonialSection,
  CTA 
} from '@/components/marketing'
import { StructuredData } from '@/components/seo/StructuredData'

export const metadata: Metadata = {
  title: 'Features - BookBloom 2.0 | AI-Powered Writing Tools',
  description: 'Discover BookBloom\'s complete suite of AI-powered writing tools. From seed to sakura - transform your ideas into captivating manuscripts.',
  keywords: ['AI writing tools', 'book creation', 'manuscript writing', 'character development', 'world building', 'writing assistant'],
  openGraph: {
    title: 'Features - BookBloom 2.0',
    description: 'Discover our complete suite of AI-powered writing tools',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Features - BookBloom 2.0',
    description: 'Discover our complete suite of AI-powered writing tools',
  },
}

// Mock data for testimonials
const testimonials = [
  {
    quote: "BookBloom's AI Muse helped me overcome writer's block and finish my first novel in just 3 months. The character development tools are incredible!",
    author: {
      name: "Sarah Chen",
      title: "Fantasy Author",
      initials: "SC"
    },
    rating: 5
  },
  {
    quote: "The outline generator saved me weeks of planning. It understood my genre perfectly and created a structure that kept me engaged throughout the writing process.",
    author: {
      name: "Marcus Rodriguez",
      title: "Thriller Writer",
      initials: "MR"
    },
    rating: 5
  },
  {
    quote: "As a busy parent, BookBloom's AI assistance helped me write during those precious few hours I had each week. My manuscript is now with an agent!",
    author: {
      name: "Emma Thompson",
      title: "Debut Novelist",
      initials: "ET"
    },
    rating: 5
  }
]

export default function FeaturesPage() {
  return (
    <>
      <StructuredData type="website" data={null} />
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

        {/* Hero Section */}
        <Hero
          title={
            <>
              From Seed to Sakura
              <span className="block sakura-text-gradient animate-peaceful-bloom" style={{animationDelay: '0.8s'}}>
                Your Complete Writing Journey
              </span>
            </>
          }
          subtitle="Experience the most comprehensive AI-powered writing platform. Every tool you need to transform your ideas into captivating manuscripts."
          backgroundVariant="gradient"
        >
          {/* Progress Visualization */}
          <div className="max-w-md mx-auto mb-12">
            <SakuraProgressIndicator progress={75} size="lg" />
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              variant="sakura" 
              size="lg" 
              className="text-2xl px-12 py-6 font-semibold hover:scale-105 hover:shadow-xl hover:shadow-sakura-300/30 transition-all duration-200 tech-feedback"
              asChild
            >
              <Link href="/auth/signup">
                Start Writing Today
                <ArrowRight className="ml-3 h-6 w-6" />
              </Link>
            </Button>
            
            <Button 
              variant="sakura-outline" 
              size="lg" 
              className="text-2xl px-12 py-6 font-semibold hover:bg-sakura-50 transition-all duration-200 tech-feedback"
              asChild
            >
              <Link href="/how-it-works">
                See How It Works
              </Link>
            </Button>
          </div>
        </Hero>

        {/* Feature Categories */}
        <section className="py-32 bg-white dark:bg-charcoal-900">
          <div className="container mx-auto px-6">
            <div className="text-center mb-24">
              <h2 className="text-6xl lg:text-7xl font-bold mb-8">Sacred Writing Tools</h2>
              <p className="text-2xl lg:text-3xl text-charcoal-600 dark:text-charcoal-300 max-w-4xl mx-auto">
                Experience the future of creative writing with AI-powered assistance
              </p>
            </div>

            <div className="space-y-32">
              {/* The Seed - Book Creation Wizard */}
              <FeatureCard
                iconName="Target"
                title="The Seed"
                description="Transform your raw ideas into compelling book concepts with our intelligent creation wizard. Plant the perfect foundation for your story."
                features={[
                  "Guided book creation process",
                  "AI-powered synopsis generation",
                  "Genre-specific templates",
                  "Smart concept expansion"
                ]}
                action={{
                  label: "Explore Book Creation",
                  href: "/features#seed"
                }}
                mockup={
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">New Book Wizard</span>
                      <div className="flex items-center space-x-2">
                        <div className="text-2xl">🌰</div>
                        <span className="text-sm text-sakura-600">Step 1 of 5</span>
                      </div>
                    </div>
                    
                    <div className="bg-sakura-50 dark:bg-sakura-900/20 p-4 rounded-lg border border-sakura-100 dark:border-sakura-800">
                      <p className="text-sm font-medium mb-2">What's your story about?</p>
                      <div className="bg-white dark:bg-charcoal-800 p-3 rounded border text-sm text-charcoal-600 dark:text-charcoal-300">
                        "A young wizard discovers an ancient prophecy that threatens to unravel the fabric of reality itself..."
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span>AI Enhancement</span>
                        <span className="text-sakura-600">Processing...</span>
                      </div>
                      <div className="h-2 bg-sakura-100 rounded-full overflow-hidden">
                        <div className="h-2 bg-sakura-500 rounded-full w-3/4 animate-pulse" />
                      </div>
                    </div>
                  </div>
                }
              />

              {/* The Garden - Dashboard */}
              <FeatureCard
                iconName="TreePine"
                title="The Garden"
                description="Manage all your book projects in one beautiful dashboard. Watch your stories grow from seeds to full blooms with intelligent progress tracking."
                features={[
                  "Project management dashboard",
                  "Sakura progress visualization",
                  "Smart organization tools",
                  "Real-time collaboration"
                ]}
                action={{
                  label: "View Dashboard Demo",
                  href: "/dashboard"
                }}
                layout="reverse"
                mockup={
                  <div className="space-y-4">
                    <h4 className="font-semibold text-lg">Your Book Garden</h4>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="bg-sakura-50 dark:bg-sakura-900/20 p-3 rounded-lg border border-sakura-200 dark:border-sakura-800">
                        <div className="flex items-center space-x-2 mb-2">
                          <span className="text-lg">🌺</span>
                          <span className="text-sm font-medium">The Mystic Chronicles</span>
                        </div>
                        <div className="text-xs text-charcoal-600 dark:text-charcoal-400">Chapter 8 of 12 • 67%</div>
                        <div className="h-1 bg-sakura-200 rounded mt-1">
                          <div className="h-1 bg-sakura-500 rounded w-2/3" />
                        </div>
                      </div>
                      <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded-lg border border-green-200 dark:border-green-800">
                        <div className="flex items-center space-x-2 mb-2">
                          <span className="text-lg">🌱</span>
                          <span className="text-sm font-medium">Future Dreams</span>
                        </div>
                        <div className="text-xs text-charcoal-600 dark:text-charcoal-400">Outline • 15%</div>
                        <div className="h-1 bg-green-200 rounded mt-1">
                          <div className="h-1 bg-green-500 rounded w-1/6" />
                        </div>
                      </div>
                    </div>
                  </div>
                }
              />

              {/* The Workbench - Outline, Characters, World Building */}
              <FeatureCard
                iconName="PenTool"
                title="The Workbench"
                description="Build rich narratives with our comprehensive suite of development tools. Create compelling characters, intricate worlds, and structured outlines."
                features={[
                  "AI-powered outline generation",
                  "Character architect with relationship mapping",
                  "World-building atlas and consistency checker",
                  "Plot structure templates"
                ]}
                action={{
                  label: "Explore Workbench Tools",
                  href: "/features#workbench"
                }}
                mockup={
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3 border-b border-charcoal-200 dark:border-charcoal-700 pb-3">
                      <button className="px-3 py-1 bg-sakura-100 text-sakura-700 rounded text-sm">Outline</button>
                      <button className="px-3 py-1 text-charcoal-600 hover:bg-charcoal-100 rounded text-sm">Characters</button>
                      <button className="px-3 py-1 text-charcoal-600 hover:bg-charcoal-100 rounded text-sm">World</button>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2 p-2 bg-sakura-50 dark:bg-sakura-900/20 rounded">
                        <span className="text-sm">📖</span>
                        <span className="text-sm font-medium">Chapter 1: The Awakening</span>
                      </div>
                      <div className="flex items-center space-x-2 p-2 hover:bg-charcoal-50 dark:hover:bg-charcoal-800 rounded">
                        <span className="text-sm">📖</span>
                        <span className="text-sm">Chapter 2: First Contact</span>
                      </div>
                      <div className="flex items-center space-x-2 p-2 hover:bg-charcoal-50 dark:hover:bg-charcoal-800 rounded">
                        <span className="text-sm">📖</span>
                        <span className="text-sm">Chapter 3: The Revelation</span>
                      </div>
                    </div>
                  </div>
                }
              />

              {/* The Blossom - AI Writing Studio */}
              <FeatureCard
                iconName="Sparkles"
                title="The Blossom"
                description="Write with the power of AI at your fingertips. Our intelligent Muse provides real-time assistance, suggestions, and creative inspiration."
                features={[
                  "AI-powered writing assistant",
                  "Context-aware suggestions",
                  "Character consistency checking",
                  "Plot hole detection and resolution"
                ]}
                action={{
                  label: "Try Writing Studio",
                  href: "/features#studio"
                }}
                layout="reverse"
                mockup={
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">AI Muse</span>
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                    </div>
                    
                    <div className="bg-sakura-50 dark:bg-sakura-900/20 p-4 rounded-lg border border-sakura-100 dark:border-sakura-800">
                      <p className="text-sm">"The ancient scrolls whispered secrets that Elena had never imagined..."</p>
                    </div>
                    
                    <div className="space-y-2">
                      <button className="text-left w-full p-3 hover:bg-sakura-50 dark:hover:bg-sakura-900/30 rounded-lg text-sm transition-all duration-150 tech-feedback border border-transparent hover:border-sakura-200">
                        💡 Make this more descriptive
                      </button>
                      <button className="text-left w-full p-3 hover:bg-sakura-50 dark:hover:bg-sakura-900/30 rounded-lg text-sm transition-all duration-150 tech-feedback border border-transparent hover:border-sakura-200">
                        ✨ Add dialogue
                      </button>
                      <button className="text-left w-full p-3 hover:bg-sakura-50 dark:hover:bg-sakura-900/30 rounded-lg text-sm transition-all duration-150 tech-feedback border border-transparent hover:border-sakura-200">
                        🔍 Check character consistency
                      </button>
                    </div>
                  </div>
                }
              />

              {/* The Harvest - Export System */}
              <FeatureCard
                iconName="Download"
                title="The Harvest"
                description="Export your completed manuscripts in professional formats. Ready for submission to publishers, self-publishing platforms, or professional formatting."
                features={[
                  "Professional PDF manuscript format",
                  "Word document compatibility",
                  "EPUB for digital publishing",
                  "Print-ready layouts and formatting"
                ]}
                action={{
                  label: "View Export Options",
                  href: "/features#export"
                }}
                mockup={
                  <div className="space-y-4">
                    <h4 className="font-semibold text-lg">Export Your Masterpiece</h4>
                    <div className="space-y-3">
                      <button className="w-full p-4 border border-sakura-200 dark:border-sakura-700 rounded-lg hover:bg-sakura-50 dark:hover:bg-sakura-900/30 flex items-center justify-between transition-all duration-200 tech-feedback">
                        <div className="flex items-center space-x-3">
                          <BookOpen className="h-5 w-5 text-sakura-500" />
                          <span className="font-medium">Manuscript PDF</span>
                        </div>
                        <ArrowRight className="h-4 w-4" />
                      </button>
                      <button className="w-full p-4 border border-sakura-200 dark:border-sakura-700 rounded-lg hover:bg-sakura-50 dark:hover:bg-sakura-900/30 flex items-center justify-between transition-all duration-200 tech-feedback">
                        <div className="flex items-center space-x-3">
                          <FileText className="h-5 w-5 text-sakura-500" />
                          <span className="font-medium">Word Document</span>
                        </div>
                        <ArrowRight className="h-4 w-4" />
                      </button>
                      <button className="w-full p-4 border border-sakura-200 dark:border-sakura-700 rounded-lg hover:bg-sakura-50 dark:hover:bg-sakura-900/30 flex items-center justify-between transition-all duration-200 tech-feedback">
                        <div className="flex items-center space-x-3">
                          <Crown className="h-5 w-5 text-sakura-500" />
                          <span className="font-medium">EPUB E-book</span>
                        </div>
                        <ArrowRight className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                }
              />
            </div>
          </div>
        </section>

        {/* Feature Highlights Grid */}
        <section className="py-24 bg-gradient-to-br from-sakura-50/20 to-white dark:from-charcoal-800/50 dark:to-charcoal-900">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-5xl lg:text-6xl font-bold mb-6">Why Writers Choose BookBloom</h2>
              <p className="text-2xl text-charcoal-600 dark:text-charcoal-300 max-w-3xl mx-auto">
                Every feature designed with one goal: helping you create your best work
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  iconName: "Zap",
                  title: "Lightning Fast AI",
                  description: "Generate chapters, characters, and plot points in seconds with our optimized AI engine."
                },
                {
                  iconName: "Users",
                  title: "Character Relationships",
                  description: "Map complex character interactions and ensure consistent development throughout your story."
                },
                {
                  iconName: "Target",
                  title: "Plot Consistency",
                  description: "AI-powered plot hole detection keeps your narrative tight and engaging."
                },
                {
                  iconName: "BookOpen",
                  title: "Multiple Genres",
                  description: "Specialized templates and AI training for every genre from fantasy to literary fiction."
                },
                {
                  iconName: "Share2",
                  title: "Professional Formatting",
                  description: "Industry-standard manuscript formatting that meets publisher requirements."
                },
                {
                  iconName: "Crown",
                  title: "Premium Quality",
                  description: "Enterprise-grade AI powered by the latest language models for exceptional results."
                }
              ].map((feature, index) => {
                const Icon = getIcon(feature.iconName as keyof typeof iconRegistry)
                return (
                  <div 
                    key={index}
                    className="bg-white dark:bg-charcoal-800 p-8 rounded-2xl shadow-lg border border-sakura-100/50 dark:border-charcoal-700 hover:shadow-xl hover:scale-105 transition-all duration-300 zen-lift"
                  >
                    <div className="w-16 h-16 bg-sakura-100 dark:bg-sakura-900/20 rounded-2xl flex items-center justify-center mb-6">
                      {Icon && <Icon className="h-8 w-8 text-sakura-500" />}
                    </div>
                    <h3 className="text-xl font-semibold text-charcoal-900 dark:text-white mb-3">
                      {feature.title}
                    </h3>
                    <p className="text-charcoal-600 dark:text-charcoal-300 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <TestimonialSection 
          testimonials={testimonials}
          title="Authors Love BookBloom"
          subtitle="Join thousands of writers who've transformed their creative process with AI assistance"
        />

        {/* Final CTA */}
        <CTA
          title={
            <>
              Ready to Transform
              <span className="block opacity-90">Your Writing Journey?</span>
            </>
          }
          subtitle="Join thousands of authors who've discovered the power of AI-assisted writing. Start your free trial today."
          primaryAction={{
            label: "Start Writing for Free",
            href: "/auth/signup"
          }}
          secondaryAction={{
            label: "View Pricing Plans",
            href: "/pricing"
          }}
          variant="sakura"
        />
        
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
    </>
  )
}