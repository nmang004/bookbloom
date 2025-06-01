'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import AnimatedCounter from '@/components/ui/AnimatedCounter';

export default function LandingPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blossom-white via-sakura-light/30 to-sky-blue/20 overflow-hidden">
      {/* Animated Petals Background Layer */}
      <div className="fixed inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute text-sakura-main/20 animate-float-gentle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              fontSize: `${Math.random() * 20 + 15}px`,
              animationDelay: `${Math.random() * 10}s`,
              animationDuration: `${Math.random() * 20 + 20}s`
            }}
          >
            🌸
          </div>
        ))}
      </div>

      {/* Header */}
      <header className="relative z-50 bg-white/60 backdrop-blur-xl border-b border-sakura-soft/20 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-br from-sakura-main to-sakura-deep rounded-2xl flex items-center justify-center shadow-lg transform rotate-3 hover:rotate-6 transition-transform duration-300">
                  <span className="text-white text-2xl">🌸</span>
                </div>
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-leaf-green rounded-full animate-pulse"></div>
              </div>
              <span className="text-2xl font-bold text-gradient-sakura">
                BookBloom
              </span>
            </div>
            
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-text-secondary hover:text-sakura-main transition-colors font-medium">
                Features
              </a>
              <a href="#how-it-works" className="text-text-secondary hover:text-sakura-main transition-colors font-medium">
                How It Works
              </a>
              <a href="#testimonials" className="text-text-secondary hover:text-sakura-main transition-colors font-medium">
                Stories
              </a>
              <Link href="/dashboard" className="btn-sakura shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
                <span className="mr-2">🚀</span>
                Get Started
              </Link>
            </nav>

            {/* Mobile menu button */}
            <Link href="/dashboard" className="md:hidden btn-sakura text-sm">
              Get Started
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="relative">
        <section className="relative min-h-[90vh] flex items-center justify-center px-4 py-20">
          {/* Background decorative elements */}
          <div className="absolute top-20 left-10 w-64 h-64 bg-sakura-main/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-sky-blue/30 rounded-full blur-3xl"></div>
          
          <div className="relative z-10 max-w-7xl mx-auto text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-sakura-light to-sakura-soft/50 px-6 py-2 rounded-full mb-8 animate-bloom-in">
              <span className="text-sakura-deep font-medium">✨ AI-Powered Story Creation</span>
            </div>

            {/* Main Heading */}
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-text-primary mb-8 animate-bloom-in leading-tight">
              Transform Your Ideas Into
              <span className="block text-gradient-sakura mt-2">
                Beautiful Stories 🌸
              </span>
            </h1>
            
            {/* Subtitle */}
            <p className="text-xl md:text-2xl lg:text-3xl text-text-secondary mb-12 max-w-4xl mx-auto leading-relaxed animate-bloom-in" style={{ animationDelay: '0.2s' }}>
              Where creativity blooms and imagination takes flight. Let AI help you cultivate your story garden from seed to magnificent novel.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16 animate-bloom-in" style={{ animationDelay: '0.4s' }}>
              <Link href="/dashboard" className="group relative btn-sakura text-lg px-10 py-5 rounded-2xl font-bold shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300">
                <span className="relative z-10 flex items-center gap-3">
                  <span className="text-2xl group-hover:animate-pulse">🌱</span>
                  Plant Your First Story
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-sakura-deep to-sakura-main rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </Link>
              
              <Link href="#demo" className="btn-sakura-outline text-lg px-10 py-5 rounded-2xl font-bold border-2">
                <span className="mr-2">▶️</span>
                Watch Demo
              </Link>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto animate-bloom-in" style={{ animationDelay: '0.6s' }}>
              <div className="glass-card p-6 rounded-2xl text-center hover:scale-105 transition-transform duration-300">
                <div className="text-3xl md:text-4xl font-bold text-sakura-main mb-2">
                  {mounted ? <AnimatedCounter end={50} suffix="K+" /> : '50K+'}
                </div>
                <div className="text-sm text-text-secondary font-medium">Stories Created</div>
              </div>
              <div className="glass-card p-6 rounded-2xl text-center hover:scale-105 transition-transform duration-300">
                <div className="text-3xl md:text-4xl font-bold text-sakura-main mb-2">
                  {mounted ? <AnimatedCounter end={2.5} decimals={1} suffix="M+" /> : '2.5M+'}
                </div>
                <div className="text-sm text-text-secondary font-medium">Words Written</div>
              </div>
              <div className="glass-card p-6 rounded-2xl text-center hover:scale-105 transition-transform duration-300">
                <div className="text-3xl md:text-4xl font-bold text-sakura-main mb-2">
                  {mounted ? <AnimatedCounter end={15} suffix="+" /> : '15+'}
                </div>
                <div className="text-sm text-text-secondary font-medium">Genres</div>
              </div>
              <div className="glass-card p-6 rounded-2xl text-center hover:scale-105 transition-transform duration-300">
                <div className="text-3xl md:text-4xl font-bold text-sakura-main mb-2">
                  {mounted ? <AnimatedCounter end={98} suffix="%" /> : '98%'}
                </div>
                <div className="text-sm text-text-secondary font-medium">Happy Writers</div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-24 bg-gradient-to-b from-transparent via-white/50 to-white relative">
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-px h-24 bg-gradient-to-b from-transparent to-sakura-soft/50"></div>
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-20">
              <div className="inline-flex items-center gap-2 bg-leaf-green/10 text-leaf-green px-4 py-2 rounded-full mb-6 font-medium">
                <span>🌿</span> Features That Help You Grow
              </div>
              
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-text-primary mb-6">
                Your Complete Writing
                <span className="text-gradient-sakura"> Ecosystem</span>
              </h2>
              <p className="text-xl text-text-secondary max-w-3xl mx-auto">
                Everything you need to transform a simple idea into a fully-realized book, all in one beautiful platform.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  icon: '🎯',
                  title: 'Smart Story Planning',
                  description: 'Our AI-powered wizard helps you create detailed outlines, character profiles, and world-building elements.',
                  gradient: 'from-blue-400 to-blue-600'
                },
                {
                  icon: '✨',
                  title: 'AI Chapter Generation',
                  description: 'Watch your story bloom as our AI writes engaging chapters that maintain consistency and your unique voice.',
                  gradient: 'from-sakura-main to-sakura-deep'
                },
                {
                  icon: '📊',
                  title: 'Real-Time Progress',
                  description: 'Beautiful visualizations show your writing journey with word counts, completion rates, and time estimates.',
                  gradient: 'from-purple-400 to-purple-600'
                },
                {
                  icon: '🎨',
                  title: 'Style Customization',
                  description: 'Choose from multiple writing styles, tones, and perspectives to match your creative vision perfectly.',
                  gradient: 'from-green-400 to-green-600'
                },
                {
                  icon: '📱',
                  title: 'Export Anywhere',
                  description: 'Download your masterpiece as PDF, DOCX, EPUB, or plain text with professional formatting.',
                  gradient: 'from-orange-400 to-orange-600'
                },
                {
                  icon: '🔄',
                  title: 'Iterative Editing',
                  description: 'Edit, regenerate, and refine any chapter until it blooms into exactly what you envisioned.',
                  gradient: 'from-pink-400 to-pink-600'
                }
              ].map((feature, index) => (
                <div
                  key={index}
                  className="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 overflow-hidden"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-sakura-light/50 to-transparent rounded-full transform translate-x-16 -translate-y-16 group-hover:scale-150 transition-transform duration-500"></div>
                  
                  <div className={`relative z-10 w-16 h-16 bg-gradient-to-br ${feature.gradient} rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <span className="text-2xl text-white">{feature.icon}</span>
                  </div>
                  
                  <h3 className="text-2xl font-bold text-text-primary mb-4 group-hover:text-sakura-deep transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-text-secondary leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section id="how-it-works" className="py-24 bg-gradient-to-b from-white to-sakura-light/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-20">
              <div className="inline-flex items-center gap-2 bg-sky-blue/50 text-blue-700 px-4 py-2 rounded-full mb-6 font-medium">
                <span>🌊</span> Simple Process
              </div>
              
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-text-primary mb-6">
                From Seed to Story in
                <span className="text-gradient-sakura"> 3 Steps</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {[
                {
                  step: '1',
                  title: 'Plant Your Idea',
                  description: 'Start with a simple premise. Our AI helps you develop it into a full story outline with chapters.',
                  icon: '🌱'
                },
                {
                  step: '2',
                  title: 'Watch It Grow',
                  description: 'AI generates your chapters one by one, maintaining consistency and your chosen style throughout.',
                  icon: '🌿'
                },
                {
                  step: '3',
                  title: 'Harvest Your Book',
                  description: 'Edit, refine, and export your completed book in multiple formats ready for sharing or publishing.',
                  icon: '🌸'
                }
              ].map((step, index) => (
                <div key={index} className="relative">
                  {index < 2 && (
                    <div className="hidden md:block absolute top-1/2 left-full w-full h-0.5 bg-gradient-to-r from-sakura-soft to-transparent transform -translate-y-1/2"></div>
                  )}
                  
                  <div className="text-center">
                    <div className="relative inline-block mb-8">
                      <div className="w-24 h-24 bg-gradient-to-br from-sakura-main to-sakura-deep rounded-full flex items-center justify-center text-white text-3xl font-bold shadow-xl">
                        {step.step}
                      </div>
                      <div className="absolute -bottom-2 -right-2 text-4xl">
                        {step.icon}
                      </div>
                    </div>
                    
                    <h3 className="text-2xl font-bold text-text-primary mb-4">
                      {step.title}
                    </h3>
                    <p className="text-text-secondary max-w-sm mx-auto">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section id="testimonials" className="py-24 bg-gradient-to-b from-sakura-light/30 to-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-20">
              <div className="inline-flex items-center gap-2 bg-amber-100 text-amber-700 px-4 py-2 rounded-full mb-6 font-medium">
                <span>⭐</span> Success Stories
              </div>
              
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-text-primary mb-6">
                Writers Love
                <span className="text-gradient-sakura"> BookBloom</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  name: 'Sarah Chen',
                  role: 'Fantasy Author',
                  content: 'BookBloom helped me finish my first novel in just 3 weeks! The AI understood my vision perfectly.',
                  avatar: '👩‍💼',
                  rating: 5
                },
                {
                  name: 'Marcus Rodriguez',
                  role: 'Mystery Writer',
                  content: 'The chapter generation is incredible. It maintains plot consistency better than I expected.',
                  avatar: '👨‍💻',
                  rating: 5
                },
                {
                  name: 'Emily Watson',
                  role: 'Romance Novelist',
                  content: 'I\'ve written 5 books with BookBloom. It\'s become an essential part of my creative process.',
                  avatar: '👩‍🎨',
                  rating: 5
                }
              ].map((testimonial, index) => (
                <div
                  key={index}
                  className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
                >
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-sakura-light to-sakura-soft rounded-full flex items-center justify-center text-2xl">
                      {testimonial.avatar}
                    </div>
                    <div>
                      <h4 className="font-bold text-text-primary">{testimonial.name}</h4>
                      <p className="text-sm text-text-secondary">{testimonial.role}</p>
                    </div>
                  </div>
                  
                  <div className="flex gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <span key={i} className="text-yellow-400 text-lg">⭐</span>
                    ))}
                  </div>
                  
                  <p className="text-text-secondary italic">
                    &ldquo;{testimonial.content}&rdquo;
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 bg-gradient-to-b from-white via-sakura-light/50 to-sakura-soft/30 relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-10 left-10 text-8xl text-sakura-main/10 rotate-12">🌸</div>
            <div className="absolute bottom-10 right-10 text-8xl text-sakura-main/10 -rotate-12">🌸</div>
          </div>
          
          <div className="relative z-10 max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-text-primary mb-8">
              Your Story Awaits
              <span className="text-gradient-sakura block mt-2">
                Let It Bloom Today 🌸
              </span>
            </h2>
            <p className="text-xl md:text-2xl text-text-secondary mb-12 max-w-3xl mx-auto">
              Join thousands of writers who&apos;ve discovered the joy of AI-assisted storytelling. 
              Your next bestseller is just a click away.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Link href="/dashboard" className="group relative btn-sakura text-xl px-12 py-6 rounded-2xl font-bold shadow-2xl hover:shadow-3xl transform hover:scale-110 transition-all duration-300">
                <span className="relative z-10 flex items-center gap-3">
                  <span className="text-2xl">🚀</span>
                  Start Writing Free
                </span>
              </Link>
              
              <div className="text-text-secondary">
                <div className="font-medium">No credit card required</div>
                <div className="text-sm">Free trial includes 10,000 words</div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-white/80 backdrop-blur-sm border-t border-sakura-soft/30 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-sakura-main to-sakura-deep rounded-xl flex items-center justify-center shadow-lg">
                  <span className="text-white text-xl">🌸</span>
                </div>
                <span className="text-xl font-bold text-gradient-sakura">
                  BookBloom
                </span>
              </div>
              <p className="text-sm text-text-secondary">
                Where stories bloom and imagination takes flight.
              </p>
            </div>
            
            <div>
              <h4 className="font-bold text-text-primary mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-text-secondary">
                <li><a href="#features" className="hover:text-sakura-main transition-colors">Features</a></li>
                <li><a href="#pricing" className="hover:text-sakura-main transition-colors">Pricing</a></li>
                <li><a href="#demo" className="hover:text-sakura-main transition-colors">Demo</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold text-text-primary mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-text-secondary">
                <li><a href="#about" className="hover:text-sakura-main transition-colors">About</a></li>
                <li><a href="#blog" className="hover:text-sakura-main transition-colors">Blog</a></li>
                <li><a href="#contact" className="hover:text-sakura-main transition-colors">Contact</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold text-text-primary mb-4">Connect</h4>
              <div className="flex gap-4">
                <a href="#" className="w-10 h-10 bg-sakura-light rounded-full flex items-center justify-center hover:bg-sakura-soft transition-colors">
                  <span>📧</span>
                </a>
                <a href="#" className="w-10 h-10 bg-sakura-light rounded-full flex items-center justify-center hover:bg-sakura-soft transition-colors">
                  <span>🐦</span>
                </a>
                <a href="#" className="w-10 h-10 bg-sakura-light rounded-full flex items-center justify-center hover:bg-sakura-soft transition-colors">
                  <span>📘</span>
                </a>
              </div>
            </div>
          </div>
          
          <div className="border-t border-sakura-soft/30 pt-8 text-center">
            <p className="text-sm text-text-secondary">
              © 2024 BookBloom. Crafted with ❤️ and 🌸 for storytellers everywhere.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}