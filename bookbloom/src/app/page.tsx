import Link from 'next/link';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blossom-white via-sakura-light to-sky-blue">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-sakura-soft/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-sakura-main to-sakura-deep rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">🌸</span>
              </div>
              <span className="text-xl font-bold text-gradient-sakura">
                BookBloom
              </span>
            </div>
            
            <Link href="/dashboard" className="btn-sakura">
              Get Started
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="relative">
        {/* Floating petals animation */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="absolute text-sakura-main opacity-30 text-2xl petal-fall"
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${3 + Math.random() * 2}s`,
              }}
            >
              🌸
            </div>
          ))}
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
          <div className="text-center bloom-in">
            <h1 className="text-4xl md:text-6xl font-bold text-text-primary mb-6">
              Transform Ideas into
              <span className="text-gradient-sakura block">
                Beautiful Books
              </span>
            </h1>
            
            <p className="text-xl text-text-secondary max-w-3xl mx-auto mb-8 leading-relaxed">
              BookBloom harnesses the power of AI to help you craft complete novels from simple story ideas. 
              Watch your creativity blossom into fully-formed books with our intelligent writing assistant.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
              <Link href="/dashboard" className="btn-sakura text-lg px-8 py-4">
                Start Creating ✨
              </Link>
              <Link href="#features" className="btn-sakura-outline text-lg px-8 py-4">
                Learn More
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="glass-card p-6 text-center">
                <div className="text-3xl font-bold text-sakura-main mb-2">50K+</div>
                <div className="text-text-secondary">Words Generated</div>
              </div>
              <div className="glass-card p-6 text-center">
                <div className="text-3xl font-bold text-sakura-main mb-2">30min</div>
                <div className="text-text-secondary">Average Book Time</div>
              </div>
              <div className="glass-card p-6 text-center">
                <div className="text-3xl font-bold text-sakura-main mb-2">10+</div>
                <div className="text-text-secondary">Genres Supported</div>
              </div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <section id="features" className="py-20 bg-white/40 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
                Everything You Need to Write
              </h2>
              <p className="text-xl text-text-secondary max-w-2xl mx-auto">
                From initial concept to published book, BookBloom guides you through every step of the writing process.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  icon: '📝',
                  title: 'Smart Planning',
                  description: 'Create detailed outlines with our intuitive planning wizard that helps structure your story.',
                },
                {
                  icon: '🤖',
                  title: 'AI Generation',
                  description: 'Powerful AI writes engaging chapters while maintaining your unique voice and style.',
                },
                {
                  icon: '📊',
                  title: 'Progress Tracking',
                  description: 'Monitor word counts, chapter completion, and estimated time to finish your book.',
                },
                {
                  icon: '🎨',
                  title: 'Multiple Formats',
                  description: 'Export your finished book as PDF, DOCX, or plain text with professional formatting.',
                },
                {
                  icon: '✏️',
                  title: 'Easy Editing',
                  description: 'Edit and refine generated content with our built-in editor and regeneration tools.',
                },
                {
                  icon: '📚',
                  title: 'Genre Variety',
                  description: 'Support for fantasy, romance, mystery, sci-fi, and many other popular genres.',
                },
              ].map((feature, index) => (
                <div
                  key={index}
                  className="card-sakura p-6 text-center hover:scale-105 transition-all duration-300"
                >
                  <div className="text-4xl mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-semibold text-text-primary mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-text-secondary">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20">
          <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
            <div className="card-sakura p-12">
              <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-6">
                Ready to Bloom?
              </h2>
              <p className="text-xl text-text-secondary mb-8">
                Join thousands of writers who have discovered the joy of AI-assisted storytelling.
                Your next great book is just a few clicks away.
              </p>
              <Link href="/dashboard" className="btn-sakura text-lg px-8 py-4">
                Start Writing Today 🌸
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-white/60 backdrop-blur-sm border-t border-sakura-soft/30 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-6 h-6 bg-gradient-to-br from-sakura-main to-sakura-deep rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">🌸</span>
            </div>
            <span className="text-lg font-bold text-gradient-sakura">
              BookBloom
            </span>
          </div>
          <p className="text-text-secondary text-sm">
            © 2024 BookBloom. Crafted with ❤️ for storytellers everywhere.
          </p>
        </div>
      </footer>
    </div>
  );
}