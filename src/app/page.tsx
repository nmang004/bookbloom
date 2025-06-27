import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight, BookOpen, PenTool, Sparkles, Users, Download, Shield } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white dark:bg-charcoal-900">
      {/* Skip to content link for accessibility */}
      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-sakura-500 text-white px-4 py-2 rounded-lg z-50">
        Skip to main content
      </a>
      
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
                href="#features" 
                className="text-charcoal-600 hover:text-sakura-600 transition-all duration-150 hover:scale-105 font-medium tech-feedback"
              >
                Features
              </Link>
              <Link 
                href="#how-it-works" 
                className="text-charcoal-600 hover:text-sakura-600 transition-all duration-150 hover:scale-105 font-medium tech-feedback"
              >
                How It Works
              </Link>
              <Link 
                href="#pricing" 
                className="text-charcoal-600 hover:text-sakura-600 transition-all duration-150 hover:scale-105 font-medium tech-feedback"
              >
                Pricing
              </Link>
              <Link 
                href="/login" 
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
                <Link href="/dashboard">Dashboard</Link>
              </Button>
            </div>
            
            {/* Mobile menu button - enhanced for better accessibility */}
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

      {/* Enhanced Hero Section - Emotional Gateway */}
      <section id="main-content" className="relative py-32 lg:py-40 overflow-hidden">
        {/* Zen Garden: Subtle animated background */}
        <div className="absolute inset-0 bg-gradient-to-br from-sakura-50/30 via-white to-sakura-50/20 dark:from-charcoal-900 dark:via-charcoal-850 dark:to-charcoal-800" />
        
        {/* Modern Tech: Floating sakura petals animation */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="sakura-petal animate-sakura-fall" style={{left: '20%', animationDelay: '0s'}} />
          <div className="sakura-petal animate-sakura-fall" style={{left: '80%', animationDelay: '3s'}} />
          <div className="sakura-petal animate-sakura-fall" style={{left: '60%', animationDelay: '6s'}} />
        </div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-12 gap-16 lg:gap-20 items-center">
            <div className="lg:col-span-7 space-y-12">
              
              {/* Zen Garden: Breathing room around headline */}
              <div className="space-y-8">
                <h1 className="text-fluid-xl font-bold leading-[1.1] tracking-tight">
                  Your Story is 
                  <span className="block sakura-text-gradient animate-peaceful-bloom" style={{animationDelay: '0.8s'}}>
                    Waiting to Bloom
                  </span>
                </h1>
                
                {/* Modern Tech: Precise typography with optimal line length */}
                <p className="text-xl lg:text-2xl text-charcoal-600 dark:text-charcoal-300 leading-relaxed max-w-2xl">
                  Transform raw ideas into captivating manuscripts with AI-powered assistance. 
                  Experience the journey from seed to sakura.
                </p>
              </div>
              
              {/* Enhanced CTA section */}
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button 
                    variant="sakura" 
                    size="lg" 
                    className="text-xl px-10 py-5 font-semibold hover:scale-105 hover:shadow-xl hover:shadow-sakura-300/30 transition-all duration-200 tech-feedback"
                    asChild
                  >
                    <Link href="/dashboard">
                      Start Your First Chapter
                      <ArrowRight className="ml-3 h-6 w-6" />
                    </Link>
                  </Button>
                  
                  <Button 
                    variant="sakura-outline" 
                    size="lg" 
                    className="text-xl px-10 py-5 font-semibold hover:bg-sakura-50 transition-all duration-200 tech-feedback"
                  >
                    Watch the Magic
                  </Button>
                </div>
                
                {/* Zen Garden: Subtle trust indicators */}
                <div className="flex items-center space-x-8 text-sm text-charcoal-500 opacity-75">
                  <span className="flex items-center">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-2" />
                    No credit card required
                  </span>
                  <span className="flex items-center">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-2" />
                    14-day free trial
                  </span>
                </div>
              </div>
            </div>
            
            {/* Enhanced visual mockup */}
            <div className="lg:col-span-5">
              <div className="relative">
                {/* Modern Tech: Precise shadow and hover state */}
                <div className="bg-white dark:bg-charcoal-800 rounded-3xl shadow-2xl border border-sakura-100/50 p-8 hover:scale-105 transition-all duration-300 hover:shadow-3xl hover:shadow-sakura-200/20 zen-lift">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-lg">The Mystic Chronicles</h3>
                      <div className="text-sm text-sakura-600 bg-sakura-100 px-3 py-1 rounded-full font-medium">Writing</div>
                    </div>
                    <div className="h-3 bg-sakura-100 rounded-full overflow-hidden">
                      <div className="h-3 bg-gradient-to-r from-sakura-400 to-sakura-500 rounded-full w-3/4 transition-all duration-500 relative">
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-[shimmer_2s_infinite]" />
                      </div>
                    </div>
                    <p className="text-sm text-charcoal-600 dark:text-charcoal-400">Chapter 12 of 16 • 45,230 words</p>
                    <div className="bg-sakura-50 dark:bg-sakura-900/20 p-4 rounded-lg border border-sakura-100 dark:border-sakura-800">
                      <p className="text-sm italic text-charcoal-700 dark:text-charcoal-300">"The ancient scrolls whispered secrets that Elena had never imagined..."</p>
                    </div>
                  </div>
                </div>
                
                {/* Zen Garden: Floating sakura accent */}
                <div className="absolute -top-6 -right-6 text-5xl animate-bloom opacity-80">🌸</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Journey Section - Sacred Process */}
      <section id="how-it-works" className="py-32 bg-white dark:bg-charcoal-900 relative overflow-hidden">
        {/* Zen Garden: Subtle section divider */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-1 h-24 bg-gradient-to-b from-sakura-300 to-transparent" />
        
        <div className="container mx-auto px-6">
          {/* Modern Tech: Precise centered content */}
          <div className="text-center mb-20">
            <h2 className="text-fluid-lg font-bold mb-8 text-charcoal-900 dark:text-white">
              From Seed to Sakura
            </h2>
            <p className="text-xl lg:text-2xl text-charcoal-600 dark:text-charcoal-300 max-w-4xl mx-auto leading-relaxed">
              Follow our proven process that guides you from a simple idea to a published manuscript
            </p>
          </div>
          
          {/* Zen Garden: Flowing step progression */}
          <div className="relative">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
              <div className="text-center space-y-6 relative z-10 group hover:scale-105 transition-all duration-300" style={{animationDelay: '0ms'}}>
                {/* Modern Tech: Precise icon container with hover state */}
                <div className="w-20 h-20 bg-gradient-to-br from-charcoal-400 to-charcoal-600 rounded-full flex items-center justify-center mx-auto text-3xl shadow-lg group-hover:shadow-xl transition-all duration-200 group-hover:rotate-12 zen-lift">
                  🌰
                </div>
                
                {/* Zen Garden: Generous spacing and typography */}
                <h3 className="text-2xl font-semibold text-charcoal-900 dark:text-white">
                  The Seed
                </h3>
                
                <p className="text-charcoal-600 dark:text-charcoal-300 leading-relaxed max-w-xs mx-auto">
                  Plant your story idea with our guided wizard. AI helps expand your concept into a compelling synopsis.
                </p>
              </div>
              
              <div className="text-center space-y-6 relative z-10 group hover:scale-105 transition-all duration-300" style={{animationDelay: '150ms'}}>
                <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto text-3xl shadow-lg group-hover:shadow-xl transition-all duration-200 group-hover:rotate-6 zen-lift animate-gentle-sway">
                  🌱
                </div>
                
                <h3 className="text-2xl font-semibold text-charcoal-900 dark:text-white">
                  The Sprout
                </h3>
                
                <p className="text-charcoal-600 dark:text-charcoal-300 leading-relaxed max-w-xs mx-auto">
                  Develop your plot structure with AI-assisted outline generation and chapter planning.
                </p>
              </div>
              
              <div className="text-center space-y-6 relative z-10 group hover:scale-105 transition-all duration-300" style={{animationDelay: '300ms'}}>
                <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-green-700 rounded-full flex items-center justify-center mx-auto text-3xl shadow-lg group-hover:shadow-xl transition-all duration-200 group-hover:rotate-6 zen-lift animate-gentle-sway">
                  🌿
                </div>
                
                <h3 className="text-2xl font-semibold text-charcoal-900 dark:text-white">
                  The Growth
                </h3>
                
                <p className="text-charcoal-600 dark:text-charcoal-300 leading-relaxed max-w-xs mx-auto">
                  Build rich characters and immersive worlds with our specialized AI tools and templates.
                </p>
              </div>
              
              <div className="text-center space-y-6 relative z-10 group hover:scale-105 transition-all duration-300" style={{animationDelay: '450ms'}}>
                <div className="w-20 h-20 bg-gradient-to-br from-sakura-400 to-sakura-600 rounded-full flex items-center justify-center mx-auto text-3xl shadow-lg group-hover:shadow-xl transition-all duration-200 group-hover:rotate-6 zen-lift animate-gentle-bloom">
                  🌸
                </div>
                
                <h3 className="text-2xl font-semibold text-charcoal-900 dark:text-white">
                  The Blossom
                </h3>
                
                <p className="text-charcoal-600 dark:text-charcoal-300 leading-relaxed max-w-xs mx-auto">
                  Write and refine your manuscript with AI assistance and export to professional formats.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Features Section - Sacred Tools */}
      <section id="features" className="py-32 bg-gradient-to-br from-sakura-50/20 to-white dark:from-charcoal-800/50 dark:to-charcoal-900">
        <div className="container mx-auto px-6">
          {/* Modern Tech: Precise section header */}
          <div className="text-center mb-24">
            <h2 className="text-fluid-lg font-bold mb-8">Sacred Writing Tools</h2>
            <p className="text-xl lg:text-2xl text-charcoal-600 dark:text-charcoal-300 max-w-3xl mx-auto">
              Experience the future of creative writing with AI-powered assistance
            </p>
          </div>
          
          <div className="space-y-32">
            {/* AI Writing Assistant */}
            <div className="grid lg:grid-cols-12 gap-16 items-center">
              <div className="lg:col-span-6 space-y-8">
                {/* Modern Tech: Icon + heading combo */}
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-sakura-100 rounded-2xl flex items-center justify-center zen-lift">
                    <Sparkles className="h-8 w-8 text-sakura-500" />
                  </div>
                  <h3 className="text-4xl font-bold text-charcoal-900 dark:text-white">AI Writing Muse</h3>
                </div>
                
                {/* Zen Garden: Breathing room in content */}
                <p className="text-xl text-charcoal-600 dark:text-charcoal-300 leading-relaxed">
                  Your personal AI writing assistant helps you overcome writer's block, suggests improvements, 
                  and maintains consistency throughout your manuscript.
                </p>
                
                {/* Modern Tech: Clean feature list */}
                <ul className="space-y-4">
                  <li className="flex items-center space-x-3 text-lg" style={{animationDelay: '0ms'}}>
                    <div className="w-2 h-2 bg-sakura-500 rounded-full animate-pulse" />
                    <span className="text-charcoal-700 dark:text-charcoal-200">Context-aware suggestions</span>
                  </li>
                  <li className="flex items-center space-x-3 text-lg" style={{animationDelay: '200ms'}}>
                    <div className="w-2 h-2 bg-sakura-500 rounded-full animate-pulse" />
                    <span className="text-charcoal-700 dark:text-charcoal-200">Character consistency checking</span>
                  </li>
                  <li className="flex items-center space-x-3 text-lg" style={{animationDelay: '400ms'}}>
                    <div className="w-2 h-2 bg-sakura-500 rounded-full animate-pulse" />
                    <span className="text-charcoal-700 dark:text-charcoal-200">Plot hole detection</span>
                  </li>
                </ul>
                
                {/* Progressive disclosure CTA */}
                <Button variant="sakura-outline" className="mt-8 hover:bg-sakura-50 transition-all duration-200 tech-feedback">
                  Explore AI Muse
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
              
              {/* Enhanced mockup with better interactivity */}
              <div className="lg:col-span-6">
                <div className="bg-white dark:bg-charcoal-800 rounded-3xl p-8 shadow-2xl border border-sakura-100/50 hover:shadow-3xl hover:scale-105 transition-all duration-300 zen-lift">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">AI Muse</span>
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    </div>
                    <div className="bg-sakura-50 dark:bg-sakura-900/20 p-4 rounded-lg border border-sakura-100 dark:border-sakura-800">
                      <p className="text-sm">"The wizard's eyes gleamed with ancient knowledge..."</p>
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
                </div>
              </div>
            </div>

            {/* Character Builder - Reversed layout */}
            <div className="grid lg:grid-cols-12 gap-16 items-center">
              <div className="lg:col-span-6 lg:order-2 space-y-8">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-sakura-100 rounded-2xl flex items-center justify-center zen-lift">
                    <Users className="h-8 w-8 text-sakura-500" />
                  </div>
                  <h3 className="text-4xl font-bold text-charcoal-900 dark:text-white">Character Architect</h3>
                </div>
                
                <p className="text-xl text-charcoal-600 dark:text-charcoal-300 leading-relaxed">
                  Build complex, believable characters with AI assistance. Generate backstories, personality traits, 
                  and character arcs that serve your story's needs.
                </p>
                
                <ul className="space-y-4">
                  <li className="flex items-center space-x-3 text-lg" style={{animationDelay: '0ms'}}>
                    <div className="w-2 h-2 bg-sakura-500 rounded-full animate-pulse" />
                    <span className="text-charcoal-700 dark:text-charcoal-200">AI-generated character profiles</span>
                  </li>
                  <li className="flex items-center space-x-3 text-lg" style={{animationDelay: '200ms'}}>
                    <div className="w-2 h-2 bg-sakura-500 rounded-full animate-pulse" />
                    <span className="text-charcoal-700 dark:text-charcoal-200">Relationship mapping</span>
                  </li>
                  <li className="flex items-center space-x-3 text-lg" style={{animationDelay: '400ms'}}>
                    <div className="w-2 h-2 bg-sakura-500 rounded-full animate-pulse" />
                    <span className="text-charcoal-700 dark:text-charcoal-200">Character arc development</span>
                  </li>
                </ul>
                
                <Button variant="sakura-outline" className="mt-8 hover:bg-sakura-50 transition-all duration-200 tech-feedback">
                  Explore Character Tools
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
              
              <div className="lg:col-span-6 lg:order-1">
                <div className="bg-white dark:bg-charcoal-800 rounded-3xl p-8 shadow-2xl border border-sakura-100/50 hover:shadow-3xl hover:scale-105 transition-all duration-300 zen-lift">
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-sakura-100 rounded-full flex items-center justify-center">
                        <span className="text-lg">🧙‍♂️</span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-lg">Elias Shadowmere</h4>
                        <p className="text-sm text-charcoal-600 dark:text-charcoal-400">Protagonist • Wizard</p>
                      </div>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div><strong>Age:</strong> 127 (appears 45)</div>
                      <div><strong>Motivation:</strong> Protect the ancient knowledge</div>
                      <div><strong>Flaw:</strong> Struggles with trust</div>
                    </div>
                    <div className="bg-sakura-50 dark:bg-sakura-900/20 p-4 rounded-lg border border-sakura-100 dark:border-sakura-800">
                      <p className="text-xs text-charcoal-700 dark:text-charcoal-300">
                        "A powerful wizard haunted by past failures, Elias must learn to trust others to save his world..."
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Export & Publishing */}
            <div className="grid lg:grid-cols-12 gap-16 items-center">
              <div className="lg:col-span-6 space-y-8">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-sakura-100 rounded-2xl flex items-center justify-center zen-lift">
                    <Download className="h-8 w-8 text-sakura-500" />
                  </div>
                  <h3 className="text-4xl font-bold text-charcoal-900 dark:text-white">Professional Export</h3>
                </div>
                
                <p className="text-xl text-charcoal-600 dark:text-charcoal-300 leading-relaxed">
                  Export your finished manuscript in industry-standard formats. Ready for submission to publishers, 
                  self-publishing platforms, or professional formatting.
                </p>
                
                <ul className="space-y-4">
                  <li className="flex items-center space-x-3 text-lg" style={{animationDelay: '0ms'}}>
                    <div className="w-2 h-2 bg-sakura-500 rounded-full animate-pulse" />
                    <span className="text-charcoal-700 dark:text-charcoal-200">PDF manuscript format</span>
                  </li>
                  <li className="flex items-center space-x-3 text-lg" style={{animationDelay: '200ms'}}>
                    <div className="w-2 h-2 bg-sakura-500 rounded-full animate-pulse" />
                    <span className="text-charcoal-700 dark:text-charcoal-200">Word (.docx) compatibility</span>
                  </li>
                  <li className="flex items-center space-x-3 text-lg" style={{animationDelay: '400ms'}}>
                    <div className="w-2 h-2 bg-sakura-500 rounded-full animate-pulse" />
                    <span className="text-charcoal-700 dark:text-charcoal-200">EPUB for e-publishing</span>
                  </li>
                </ul>
                
                <Button variant="sakura-outline" className="mt-8 hover:bg-sakura-50 transition-all duration-200 tech-feedback">
                  View Export Options
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
              
              <div className="lg:col-span-6">
                <div className="bg-white dark:bg-charcoal-800 rounded-3xl p-8 shadow-2xl border border-sakura-100/50 hover:shadow-3xl hover:scale-105 transition-all duration-300 zen-lift">
                  <div className="space-y-4">
                    <h4 className="font-semibold text-lg">Export Options</h4>
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
                          <PenTool className="h-5 w-5 text-sakura-500" />
                          <span className="font-medium">Word Document</span>
                        </div>
                        <ArrowRight className="h-4 w-4" />
                      </button>
                      <button className="w-full p-4 border border-sakura-200 dark:border-sakura-700 rounded-lg hover:bg-sakura-50 dark:hover:bg-sakura-900/30 flex items-center justify-between transition-all duration-200 tech-feedback">
                        <div className="flex items-center space-x-3">
                          <Shield className="h-5 w-5 text-sakura-500" />
                          <span className="font-medium">EPUB E-book</span>
                        </div>
                        <ArrowRight className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Final CTA - Sacred Invitation */}
      <section className="relative py-32 overflow-hidden">
        {/* Zen Garden: Layered background for depth */}
        <div className="absolute inset-0 bg-gradient-to-br from-sakura-500 via-sakura-600 to-sakura-700" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
        
        {/* Modern Tech: Floating elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute text-white/10 text-6xl animate-float" style={{left: '20%', top: '10%', animationDelay: '0s'}}>🌸</div>
          <div className="absolute text-white/10 text-6xl animate-float" style={{left: '35%', top: '30%', animationDelay: '1.5s'}}>🌸</div>
          <div className="absolute text-white/10 text-6xl animate-float" style={{left: '50%', top: '50%', animationDelay: '3s'}}>🌸</div>
          <div className="absolute text-white/10 text-6xl animate-float" style={{left: '65%', top: '70%', animationDelay: '4.5s'}}>🌸</div>
          <div className="absolute text-white/10 text-6xl animate-float" style={{left: '80%', top: '20%', animationDelay: '6s'}}>🌸</div>
        </div>
        
        <div className="container mx-auto px-6 text-center relative z-10">
          <div className="max-w-4xl mx-auto space-y-12 text-white">
            
            {/* Zen Garden: Powerful, contemplative headline */}
            <h2 className="text-fluid-lg font-bold leading-tight">
              Your Story
              <span className="block opacity-90">Awaits Your Touch</span>
            </h2>
            
            <p className="text-xl lg:text-2xl opacity-90 leading-relaxed max-w-3xl mx-auto">
              Join thousands of authors who've discovered the joy of AI-assisted writing. 
              Begin your journey from seed to sakura today.
            </p>
            
            {/* Modern Tech: Precise CTA layout */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Button 
                variant="secondary" 
                size="lg" 
                className="text-xl px-12 py-6 bg-white text-sakura-600 hover:bg-sakura-50 hover:scale-105 font-semibold shadow-xl hover:shadow-2xl transition-all duration-200 tech-feedback"
                asChild
              >
                <Link href="/dashboard">
                  Begin Your Journey
                  <ArrowRight className="ml-3 h-6 w-6" />
                </Link>
              </Button>
              
              <Button 
                variant="outline" 
                size="lg" 
                className="text-xl px-12 py-6 border-2 border-white text-white bg-white/10 hover:bg-white/30 hover:border-white hover:shadow-lg transition-all duration-200 tech-feedback backdrop-blur-sm"
              >
                Watch Demo
              </Button>
            </div>
            
            {/* Zen Garden: Minimal trust indicators */}
            <div className="flex justify-center items-center space-x-8 text-sm opacity-75">
              <span>✨ No credit card required</span>
              <span>🌱 14-day free trial</span>
              <span>🌸 Cancel anytime</span>
            </div>
          </div>
        </div>
      </section>

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
                <Link href="#features" className="block hover:text-white transition-colors duration-150 tech-feedback">Features</Link>
                <Link href="#pricing" className="block hover:text-white transition-colors duration-150 tech-feedback">Pricing</Link>
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