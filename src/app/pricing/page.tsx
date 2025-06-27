'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowRight, Check, X, HelpCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { 
  Hero, 
  TestimonialSection,
  CTA 
} from '@/components/marketing'
import { PricingCard, PricingToggle } from '@/components/marketing/PricingCard'
import { StructuredData } from '@/components/seo/StructuredData'

// Pricing tiers data based on PLANS.md
const pricingTiers = [
  {
    id: 'free',
    name: 'The Seedling',
    emoji: '🌰',
    description: 'Perfect for exploring your first story idea',
    monthlyPrice: 0,
    annualPrice: 0,
    features: [
      '1 book project',
      'Basic AI assistance (50 requests/month)',
      'Standard export formats (PDF, DOCX)',
      'Community support',
      'Basic templates',
      'Character creation tools'
    ],
    buttonText: 'Start for Free',
    buttonVariant: 'sakura-outline' as const
  },
  {
    id: 'starter',
    name: 'The Garden',
    emoji: '🌱',
    description: 'Ideal for dedicated writers ready to bloom',
    monthlyPrice: 12,
    annualPrice: 120,
    popular: true,
    features: [
      '5 book projects',
      'Enhanced AI assistance (500 requests/month)',
      'All export formats (PDF, DOCX, EPUB)',
      'Priority support',
      'Advanced templates',
      'Character relationship mapping',
      'World-building atlas',
      'Plot consistency checking'
    ],
    buttonText: 'Start Growing',
    buttonVariant: 'sakura' as const
  },
  {
    id: 'professional',
    name: 'The Orchard',
    emoji: '🌸',
    description: 'For prolific authors and serious professionals',
    monthlyPrice: 29,
    annualPrice: 290,
    features: [
      'Unlimited book projects',
      'Unlimited AI assistance',
      'Advanced AI features',
      'Priority support',
      'Collaboration tools',
      'Advanced analytics',
      'Custom export templates',
      'API access',
      'White-label options'
    ],
    buttonText: 'Go Professional',
    buttonVariant: 'sakura-outline' as const
  },
  {
    id: 'enterprise',
    name: 'The Forest',
    emoji: '🌳',
    description: 'Custom solutions for teams and organizations',
    monthlyPrice: 0, // Custom pricing
    annualPrice: 0,
    features: [
      'Everything in Professional',
      'Team collaboration',
      'Custom AI training',
      'Dedicated support',
      'Custom integrations',
      'Advanced security',
      'SLA guarantees',
      'Training and onboarding'
    ],
    buttonText: 'Contact Sales',
    buttonVariant: 'sakura-outline' as const
  }
]

// Feature comparison data
const featureComparison = [
  {
    category: 'Projects & Usage',
    features: [
      { name: 'Book Projects', free: '1', starter: '5', professional: 'Unlimited', enterprise: 'Unlimited' },
      { name: 'AI Requests/Month', free: '50', starter: '500', professional: 'Unlimited', enterprise: 'Unlimited' },
      { name: 'Export Formats', free: 'PDF, DOCX', starter: 'All formats', professional: 'All formats', enterprise: 'All formats' }
    ]
  },
  {
    category: 'Writing Tools',
    features: [
      { name: 'AI Writing Assistant', free: 'Basic', starter: 'Enhanced', professional: 'Advanced', enterprise: 'Custom' },
      { name: 'Character Development', free: true, starter: true, professional: true, enterprise: true },
      { name: 'World Building', free: false, starter: true, professional: true, enterprise: true },
      { name: 'Plot Consistency Check', free: false, starter: true, professional: true, enterprise: true }
    ]
  },
  {
    category: 'Support & Collaboration',
    features: [
      { name: 'Support Level', free: 'Community', starter: 'Priority', professional: 'Priority', enterprise: 'Dedicated' },
      { name: 'Team Collaboration', free: false, starter: false, professional: true, enterprise: true },
      { name: 'API Access', free: false, starter: false, professional: true, enterprise: true }
    ]
  }
]

// FAQ data
const faqs = [
  {
    question: "Can I change plans anytime?",
    answer: "Yes! You can upgrade or downgrade your plan at any time. Changes take effect immediately, and we'll prorate any billing adjustments."
  },
  {
    question: "What happens to my books if I downgrade?",
    answer: "Your books and data remain safe. If you exceed limits (like number of projects), you'll simply need to archive some projects or upgrade again to access them."
  },
  {
    question: "Is there a free trial for paid plans?",
    answer: "Yes! All paid plans include a 14-day free trial. No credit card required to start, and you can cancel anytime during the trial."
  },
  {
    question: "How does AI request counting work?",
    answer: "Each AI interaction (generation, suggestion, or edit) counts as one request. Most users find the limits generous for their writing needs."
  },
  {
    question: "Can I use BookBloom offline?",
    answer: "While BookBloom is primarily cloud-based for AI features, you can write and edit your content offline. AI features require an internet connection."
  },
  {
    question: "Do you offer student or educator discounts?",
    answer: "Yes! We offer 50% discounts for students and educators. Contact support with your educational email for verification."
  }
]

// Testimonials specific to pricing
const pricingTestimonials = [
  {
    quote: "The Professional plan paid for itself with my first book sale. The unlimited AI assistance helped me write faster and better than ever before.",
    author: {
      name: "Alex Morrison",
      title: "Published Author",
      initials: "AM"
    },
    rating: 5
  },
  {
    quote: "Started with the free plan and upgraded to The Garden after one week. The value is incredible - it's like having a personal writing coach.",
    author: {
      name: "Rachel Green",
      title: "First-time Novelist",
      initials: "RG"
    },
    rating: 5
  },
  {
    question: "As a busy professional, The Garden plan is perfect. I can work on multiple book ideas without breaking the bank.",
    author: {
      name: "Michael Chen",
      title: "Part-time Author",
      initials: "MC"
    },
    rating: 5
  }
]

export default function PricingPage() {
  const [isAnnual, setIsAnnual] = useState(true)

  return (
    <>
      <StructuredData type="product" data={null} />
      <StructuredData type="faq" data={faqs} />
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
            Choose Your Writing
            <span className="block sakura-text-gradient animate-peaceful-bloom" style={{animationDelay: '0.8s'}}>
              Growth Plan
            </span>
          </>
        }
        subtitle="From seedling to forest - find the perfect plan to nurture your writing journey. Start free and grow as your ambitions bloom."
        backgroundVariant="gradient"
      >
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            variant="sakura" 
            size="lg" 
            className="text-xl px-10 py-5 font-semibold hover:scale-105 hover:shadow-xl hover:shadow-sakura-300/30 transition-all duration-200 tech-feedback"
            asChild
          >
            <Link href="/auth/signup">
              Start Free Trial
              <ArrowRight className="ml-3 h-6 w-6" />
            </Link>
          </Button>
          
          <Button 
            variant="sakura-outline" 
            size="lg" 
            className="text-xl px-10 py-5 font-semibold hover:bg-sakura-50 transition-all duration-200 tech-feedback"
            asChild
          >
            <Link href="/how-it-works">
              See How It Works
            </Link>
          </Button>
        </div>
      </Hero>

      {/* Pricing Toggle */}
      <section className="py-16 bg-white dark:bg-charcoal-900">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <PricingToggle 
              isAnnual={isAnnual} 
              onToggle={setIsAnnual}
            />
          </div>

          {/* Pricing Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
            {pricingTiers.map((tier) => (
              <PricingCard
                key={tier.id}
                tier={tier}
                isAnnual={isAnnual}
              />
            ))}
          </div>

          {/* Trust Indicators */}
          <div className="flex justify-center items-center space-x-12 mt-16 text-sm text-charcoal-500 dark:text-charcoal-400">
            <span className="flex items-center">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-2" />
              No setup fees
            </span>
            <span className="flex items-center">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-2" />
              Cancel anytime
            </span>
            <span className="flex items-center">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-2" />
              14-day free trial
            </span>
          </div>
        </div>
      </section>

      {/* Feature Comparison Table */}
      <section className="py-24 bg-gradient-to-br from-sakura-50/20 to-white dark:from-charcoal-800/50 dark:to-charcoal-900">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-fluid-md font-bold mb-6">Compare All Features</h2>
            <p className="text-xl text-charcoal-600 dark:text-charcoal-300 max-w-3xl mx-auto">
              See exactly what&apos;s included in each plan to make the best choice for your writing journey
            </p>
          </div>

          <div className="max-w-6xl mx-auto bg-white dark:bg-charcoal-800 rounded-2xl shadow-2xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-sakura-50 dark:bg-charcoal-700">
                    <th className="text-left p-6 font-semibold text-charcoal-900 dark:text-white">
                      Features
                    </th>
                    <th className="text-center p-6 font-semibold text-charcoal-900 dark:text-white">
                      Seedling
                    </th>
                    <th className="text-center p-6 font-semibold text-charcoal-900 dark:text-white relative">
                      Garden
                      <div className="absolute -top-2 left-1/2 transform -translate-x-1/2">
                        <span className="bg-sakura-500 text-white text-xs px-2 py-1 rounded-full">Popular</span>
                      </div>
                    </th>
                    <th className="text-center p-6 font-semibold text-charcoal-900 dark:text-white">
                      Orchard
                    </th>
                    <th className="text-center p-6 font-semibold text-charcoal-900 dark:text-white">
                      Forest
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {featureComparison.map((category, categoryIndex) => (
                    <>
                      <tr key={`category-${categoryIndex}`} className="bg-charcoal-50 dark:bg-charcoal-750">
                        <td colSpan={5} className="p-4 font-semibold text-charcoal-800 dark:text-charcoal-200 border-t border-charcoal-200 dark:border-charcoal-600">
                          {category.category}
                        </td>
                      </tr>
                      {category.features.map((feature, featureIndex) => (
                        <tr key={`feature-${categoryIndex}-${featureIndex}`} className="border-b border-charcoal-100 dark:border-charcoal-700">
                          <td className="p-4 text-charcoal-700 dark:text-charcoal-300">
                            {feature.name}
                          </td>
                          <td className="p-4 text-center">
                            {typeof feature.free === 'boolean' ? (
                              feature.free ? (
                                <Check className="h-5 w-5 text-green-500 mx-auto" />
                              ) : (
                                <X className="h-5 w-5 text-charcoal-400 mx-auto" />
                              )
                            ) : (
                              <span className="text-charcoal-700 dark:text-charcoal-300 text-sm">
                                {feature.free}
                              </span>
                            )}
                          </td>
                          <td className="p-4 text-center">
                            {typeof feature.starter === 'boolean' ? (
                              feature.starter ? (
                                <Check className="h-5 w-5 text-green-500 mx-auto" />
                              ) : (
                                <X className="h-5 w-5 text-charcoal-400 mx-auto" />
                              )
                            ) : (
                              <span className="text-charcoal-700 dark:text-charcoal-300 text-sm">
                                {feature.starter}
                              </span>
                            )}
                          </td>
                          <td className="p-4 text-center">
                            {typeof feature.professional === 'boolean' ? (
                              feature.professional ? (
                                <Check className="h-5 w-5 text-green-500 mx-auto" />
                              ) : (
                                <X className="h-5 w-5 text-charcoal-400 mx-auto" />
                              )
                            ) : (
                              <span className="text-charcoal-700 dark:text-charcoal-300 text-sm">
                                {feature.professional}
                              </span>
                            )}
                          </td>
                          <td className="p-4 text-center">
                            {typeof feature.enterprise === 'boolean' ? (
                              feature.enterprise ? (
                                <Check className="h-5 w-5 text-green-500 mx-auto" />
                              ) : (
                                <X className="h-5 w-5 text-charcoal-400 mx-auto" />
                              )
                            ) : (
                              <span className="text-charcoal-700 dark:text-charcoal-300 text-sm">
                                {feature.enterprise}
                              </span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-white dark:bg-charcoal-900">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-fluid-md font-bold mb-6">Frequently Asked Questions</h2>
            <p className="text-xl text-charcoal-600 dark:text-charcoal-300 max-w-3xl mx-auto">
              Everything you need to know about BookBloom pricing and plans
            </p>
          </div>

          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
            {faqs.map((faq, index) => (
              <div 
                key={index}
                className="bg-white dark:bg-charcoal-800 p-6 rounded-2xl shadow-lg border border-sakura-100/50 dark:border-charcoal-700"
              >
                <div className="flex items-start space-x-3">
                  <HelpCircle className="h-6 w-6 text-sakura-500 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-charcoal-900 dark:text-white mb-3">
                      {faq.question}
                    </h3>
                    <p className="text-charcoal-600 dark:text-charcoal-300 leading-relaxed text-sm">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <TestimonialSection 
        testimonials={pricingTestimonials}
        title="Authors Love Our Value"
        subtitle="See why thousands of writers choose BookBloom for their creative journey"
      />

      {/* Final CTA */}
      <CTA
        title={
          <>
            Ready to Start
            <span className="block opacity-90">Your Writing Journey?</span>
          </>
        }
        subtitle="Choose your plan and join thousands of authors who've discovered the power of AI-assisted writing. Start free and upgrade anytime."
        primaryAction={{
          label: "Start Free Trial",
          href: "/auth/signup"
        }}
        secondaryAction={{
          label: "Contact Sales",
          href: "/contact"
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