import Link from 'next/link';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-pink-100">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-pink-200/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-pink-400 to-rose-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">🌸</span>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-pink-400 via-rose-400 to-pink-500 bg-clip-text text-transparent">
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
        <section className="relative min-h-[70vh] overflow-hidden">
          {/* Floating Petals Background */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="animate-float-1 absolute top-10 left-10 text-pink-300 text-2xl opacity-60">🌸</div>
            <div className="animate-float-2 absolute top-20 right-20 text-pink-200 text-xl opacity-50">🌸</div>
            <div className="animate-float-3 absolute top-40 left-1/3 text-pink-300 text-lg opacity-60">🌸</div>
            <div className="animate-float-4 absolute top-60 right-1/3 text-pink-200 text-2xl opacity-50">🌸</div>
            <div className="animate-float-1 absolute bottom-20 left-1/4 text-pink-300 text-xl opacity-40">🌸</div>
            <div className="animate-float-2 absolute bottom-40 right-1/4 text-pink-200 text-lg opacity-50">🌸</div>
          </div>

          {/* Content Container */}
          <div className="relative z-10 container mx-auto px-6 py-20 text-center">
            {/* Main Heading with Bloom Animation */}
            <h1 className="text-6xl md:text-7xl lg:text-8xl font-light text-gray-800 mb-6 animate-bloom-in">
              Welcome to Your
              <span className="block bg-gradient-to-r from-pink-400 via-rose-400 to-pink-500 bg-clip-text text-transparent font-medium">
                Story Garden
              </span>
            </h1>
            
            {/* Subtitle with Gentle Fade */}
            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-4xl mx-auto leading-relaxed animate-fade-in-up delay-300">
              Where ideas blossom into beautiful stories. Watch your creativity bloom into complete novels with the gentle guidance of AI.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in-up delay-500">
              <Link href="/dashboard" className="btn-sakura text-lg px-8 py-4 rounded-2xl font-medium transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl">
                🌱 Plant Your First Story
              </Link>
              <Link href="#features" className="btn-secondary text-lg px-8 py-4 rounded-2xl font-medium">
                🌸 Explore the Garden
              </Link>
            </div>

            {/* Gentle Stats Preview */}
            <div className="mt-16 flex flex-wrap justify-center gap-8 text-gray-600">
              <div className="text-center animate-fade-in-up delay-700">
                <div className="text-3xl font-light text-pink-500 counter" data-target="50000">50K+</div>
                <div className="text-sm">Words Bloomed</div>
              </div>
              <div className="text-center animate-fade-in-up delay-800">
                <div className="text-3xl font-light text-pink-500">30min</div>
                <div className="text-sm">Average Book Time</div>
              </div>
              <div className="text-center animate-fade-in-up delay-900">
                <div className="text-3xl font-light text-pink-500">10+</div>
                <div className="text-sm">Genres Supported</div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-20 bg-gradient-to-b from-white to-pink-25">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                Everything You Need to Write
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
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
                  <p className="text-gray-600">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-b from-white to-pink-25">
          <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
            <div className="card-sakura p-12 transform hover:scale-105 transition-all duration-300">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
                Ready to Bloom?
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                Join thousands of writers who have discovered the joy of AI-assisted storytelling.
                Your next great book is just a few clicks away.
              </p>
              <Link href="/dashboard" className="btn-sakura text-lg px-8 py-4 rounded-2xl">
                Start Writing Today 🌸
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-white/60 backdrop-blur-sm border-t border-pink-200/30 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-6 h-6 bg-gradient-to-br from-pink-400 to-rose-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">🌸</span>
            </div>
            <span className="text-lg font-bold bg-gradient-to-r from-pink-400 via-rose-400 to-pink-500 bg-clip-text text-transparent">
              BookBloom
            </span>
          </div>
          <p className="text-gray-600 text-sm">
            © 2024 BookBloom. Crafted with ❤️ for storytellers everywhere.
          </p>
        </div>
      </footer>
    </div>
  );
}