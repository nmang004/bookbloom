import { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, CheckCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { 
  Hero, 
  JourneyTimeline, 
  TestimonialSection,
  CTA 
} from '@/components/marketing'
import { StructuredData } from '@/components/seo/StructuredData'

export const metadata: Metadata = {
  title: 'How It Works - BookBloom 2.0 | From Seed to Sakura',
  description: 'Discover how BookBloom transforms your story ideas into published manuscripts. Follow the complete journey from seed to sakura blossom.',
  keywords: ['how to write a book', 'AI writing process', 'book creation steps', 'writing workflow', 'manuscript development'],
  openGraph: {
    title: 'How It Works - BookBloom 2.0',
    description: 'Discover how we transform ideas into published manuscripts',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'How It Works - BookBloom 2.0',
    description: 'From seed to sakura - see how ideas become books',
  },
}

// Success stories data
const successStories = [
  {
    quote: "I went from a simple idea to a completed 80,000-word fantasy novel in just 4 months. BookBloom's step-by-step process kept me motivated and on track.",
    author: {
      name: "Jennifer Walsh",
      title: "Published Fantasy Author",
      initials: "JW"
    },
    rating: 5
  },
  {
    quote: "The AI didn't just help me write - it helped me think. My characters became deeper, my plot more intricate, and my writing more polished than I ever imagined.",
    author: {
      name: "David Kim",
      title: "First-time Novelist",
      initials: "DK"
    },
    rating: 5
  },
  {
    quote: "From seed to published book in 6 months. BookBloom's process is like having a professional writing coach and editor available 24/7.",
    author: {
      name: "Maria Santos",
      title: "Romance Author",
      initials: "MS"
    },
    rating: 5
  }
]

export default function HowItWorksPage() {
  return (
    <>
      <StructuredData type="howto" data={null} />
      <div className="min-h-screen bg-white dark:bg-charcoal-900">
      {/* Hero Section */}
      <Hero
        title={
          <>
            From Seed to Sakura
            <span className="block sakura-text-gradient animate-peaceful-bloom" style={{animationDelay: '0.8s'}}>
              Your Writing Journey Unveiled
            </span>
          </>
        }
        subtitle="Discover how BookBloom transforms simple ideas into captivating manuscripts through our proven five-step process."
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
              Start Your Journey
              <ArrowRight className="ml-3 h-6 w-6" />
            </Link>
          </Button>
          
          <Button 
            variant="sakura-outline" 
            size="lg" 
            className="text-xl px-10 py-5 font-semibold hover:bg-sakura-50 transition-all duration-200 tech-feedback"
            asChild
          >
            <Link href="/features">
              Explore Features
            </Link>
          </Button>
        </div>
      </Hero>

      {/* Journey Overview */}
      <section className="py-24 bg-white dark:bg-charcoal-900">
        <div className="container mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-fluid-lg font-bold mb-8">The Complete Journey</h2>
            <p className="text-xl lg:text-2xl text-charcoal-600 dark:text-charcoal-300 max-w-4xl mx-auto leading-relaxed">
              Every great book begins with a single seed of an idea. Watch how BookBloom nurtures that seed through each stage of growth until it blossoms into a finished manuscript.
            </p>
          </div>

          {/* Interactive Timeline */}
          <JourneyTimeline />
        </div>
      </section>

      {/* Process Deep Dive */}
      <section className="py-24 bg-gradient-to-br from-sakura-50/20 to-white dark:from-charcoal-800/50 dark:to-charcoal-900">
        <div className="container mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-fluid-md font-bold mb-8">Why This Process Works</h2>
            <p className="text-xl text-charcoal-600 dark:text-charcoal-300 max-w-3xl mx-auto">
              Our methodology is based on proven writing techniques, enhanced by AI intelligence, and refined through thousands of successful manuscripts.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Benefits List */}
            <div className="space-y-8">
              {[
                {
                  title: "Structured Creative Process",
                  description: "No more blank page syndrome. Our step-by-step approach gives you clear direction at every stage."
                },
                {
                  title: "AI-Powered Intelligence", 
                  description: "Advanced AI understands your genre, style, and goals to provide personalized assistance."
                },
                {
                  title: "Professional Standards",
                  description: "Every output meets industry standards for formatting, structure, and presentation."
                },
                {
                  title: "Consistent Progress",
                  description: "Built-in milestones and progress tracking keep you motivated and on schedule."
                },
                {
                  title: "Quality Assurance",
                  description: "Automated consistency checking ensures your story maintains quality throughout."
                }
              ].map((benefit, index) => (
                <div 
                  key={index}
                  className="flex items-start space-x-4"
                  style={{animationDelay: `${index * 150}ms`}}
                >
                  <div className="w-8 h-8 bg-sakura-100 dark:bg-sakura-900/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <CheckCircle className="h-5 w-5 text-sakura-500" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-charcoal-900 dark:text-white mb-2">
                      {benefit.title}
                    </h3>
                    <p className="text-charcoal-600 dark:text-charcoal-300 leading-relaxed">
                      {benefit.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Visual Process Flow */}
            <div className="bg-white dark:bg-charcoal-800 rounded-3xl p-8 shadow-2xl border border-sakura-100/50 dark:border-charcoal-700">
              <h3 className="text-2xl font-bold text-charcoal-900 dark:text-white mb-8 text-center">
                Average Completion Times
              </h3>
              
              <div className="space-y-6">
                {[
                  { stage: "🌰 Seed", title: "Idea to Synopsis", time: "1-2 hours", progress: 100 },
                  { stage: "🌱 Sprout", title: "AI Enhancement", time: "2-3 hours", progress: 85 },
                  { stage: "🌿 Growth", title: "World Building", time: "1-2 weeks", progress: 70 },
                  { stage: "🌺 Bud", title: "Chapter Writing", time: "2-6 months", progress: 55 },
                  { stage: "🌸 Blossom", title: "Final Export", time: "1 day", progress: 30 }
                ].map((item, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <span className="text-2xl">{item.stage.split(' ')[0]}</span>
                        <div>
                          <div className="font-medium text-charcoal-900 dark:text-white">
                            {item.title}
                          </div>
                          <div className="text-sm text-charcoal-600 dark:text-charcoal-400">
                            Typical: {item.time}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="h-2 bg-charcoal-100 dark:bg-charcoal-700 rounded-full overflow-hidden">
                      <div 
                        className="h-2 bg-gradient-to-r from-sakura-400 to-sakura-500 rounded-full transition-all duration-1000"
                        style={{ width: `${item.progress}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-8 p-4 bg-sakura-50 dark:bg-sakura-900/20 rounded-lg border border-sakura-200 dark:border-sakura-800 text-center">
                <p className="text-sm text-charcoal-700 dark:text-charcoal-300">
                  <strong>Average book completion:</strong> 3-6 months<br />
                  <span className="text-xs">Compared to traditional methods: 1-3 years</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Writer Types Section */}
      <section className="py-24 bg-white dark:bg-charcoal-900">
        <div className="container mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-fluid-md font-bold mb-8">Perfect for Every Writer</h2>
            <p className="text-xl text-charcoal-600 dark:text-charcoal-300 max-w-3xl mx-auto">
              Whether you're a first-time writer or a seasoned author, BookBloom adapts to your experience level and writing style.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "First-Time Writers",
                emoji: "🌱",
                description: "Never written a book before? Our guided process makes it approachable and achievable.",
                benefits: [
                  "Step-by-step guidance",
                  "Writing best practices",
                  "Confidence building",
                  "Professional results"
                ]
              },
              {
                title: "Experienced Authors",
                emoji: "🌿",
                description: "Speed up your workflow and explore new creative possibilities with AI assistance.",
                benefits: [
                  "Faster first drafts",
                  "Plot enhancement",
                  "Character development",
                  "Consistency checking"
                ]
              },
              {
                title: "Busy Professionals",
                emoji: "🌸",
                description: "Limited time? Our efficient process helps you make progress in small windows.",
                benefits: [
                  "Flexible scheduling",
                  "Quick sessions",
                  "Progress tracking",
                  "Mobile accessibility"
                ]
              }
            ].map((type, index) => (
              <div 
                key={index}
                className="bg-white dark:bg-charcoal-800 p-8 rounded-2xl shadow-lg border border-sakura-100/50 dark:border-charcoal-700 hover:shadow-xl hover:scale-105 transition-all duration-300 zen-lift text-center"
              >
                <div className="text-6xl mb-6">{type.emoji}</div>
                <h3 className="text-2xl font-bold text-charcoal-900 dark:text-white mb-4">
                  {type.title}
                </h3>
                <p className="text-charcoal-600 dark:text-charcoal-300 leading-relaxed mb-6">
                  {type.description}
                </p>
                <ul className="space-y-2 text-left">
                  {type.benefits.map((benefit, benefitIndex) => (
                    <li key={benefitIndex} className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-sakura-500 rounded-full" />
                      <span className="text-charcoal-700 dark:text-charcoal-200 text-sm">
                        {benefit}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <TestimonialSection 
        testimonials={successStories}
        title="Success Stories"
        subtitle="Real authors, real results. See how BookBloom has transformed writing journeys."
      />

      {/* FAQ Section */}
      <section className="py-24 bg-gradient-to-br from-sakura-50/20 to-white dark:from-charcoal-800/50 dark:to-charcoal-900">
        <div className="container mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-fluid-md font-bold mb-8">Frequently Asked Questions</h2>
            <p className="text-xl text-charcoal-600 dark:text-charcoal-300 max-w-3xl mx-auto">
              Everything you need to know about the BookBloom writing process
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-8">
            {[
              {
                question: "How long does it take to complete a book?",
                answer: "Most authors complete their first draft within 3-6 months, depending on book length and time investment. Our AI acceleration can reduce traditional timelines by 60-80%."
              },
              {
                question: "Do I need writing experience?",
                answer: "Not at all! BookBloom is designed for writers of all levels. Our guided process teaches you best practices while you create your book."
              },
              {
                question: "How much of the book does AI write?",
                answer: "You remain the author. AI provides suggestions, structure, and assistance, but every creative decision is yours. Think of it as having a professional writing coach available 24/7."
              },
              {
                question: "Can I export my book to traditional publishers?",
                answer: "Absolutely! Our export formats meet industry standards for manuscript submission. Many of our authors have successfully submitted to agents and publishers."
              },
              {
                question: "What genres does BookBloom support?",
                answer: "All major genres including fiction, non-fiction, fantasy, sci-fi, romance, mystery, literary fiction, and more. Our AI is trained on diverse writing styles and conventions."
              },
              {
                question: "Is my work private and secure?",
                answer: "Yes, completely. Your manuscripts are encrypted and stored securely. You own all rights to your work, and we never share or use your content for training."
              }
            ].map((faq, index) => (
              <div 
                key={index}
                className="bg-white dark:bg-charcoal-800 p-8 rounded-2xl shadow-lg border border-sakura-100/50 dark:border-charcoal-700"
              >
                <h3 className="text-xl font-semibold text-charcoal-900 dark:text-white mb-4">
                  {faq.question}
                </h3>
                <p className="text-charcoal-600 dark:text-charcoal-300 leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <CTA
        title={
          <>
            Ready to Begin
            <span className="block opacity-90">Your Writing Journey?</span>
          </>
        }
        subtitle="Join thousands of authors who've discovered the joy of AI-assisted writing. Plant your seed today and watch your story bloom."
        primaryAction={{
          label: "Start Your Free Trial",
          href: "/auth/signup"
        }}
        secondaryAction={{
          label: "View Pricing Plans",
          href: "/pricing"
        }}
        variant="sakura"
      />
      </div>
    </>
  )
}