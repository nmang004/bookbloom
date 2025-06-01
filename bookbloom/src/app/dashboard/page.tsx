'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Layout from '@/components/layout/Layout';
import AnimatedCounter from '@/components/ui/AnimatedCounter';
import BookPreviewCard from '@/components/book/BookPreviewCard';
import { useBookStore } from '@/stores/book-store';
import { formatWordCount, getGenreEmoji } from '@/lib/utils';
import { Book } from '@/types';

// Mock data for demonstration
const mockBooks: Book[] = [
  {
    id: '1',
    title: 'The Crystal Chronicles',
    genre: 'fantasy',
    premise: 'A young mage discovers ancient crystals that hold the power to reshape reality itself.',
    targetWords: 75000,
    chaptersCount: 15,
    writingStyle: 'literary',
    tone: 'dramatic',
    pov: 'third-person-limited',
    status: 'generating',
    createdAt: new Date('2024-01-15'),
    completedChapters: 8,
    totalWords: 42000,
  },
  {
    id: '2',
    title: 'Hearts in Bloom',
    genre: 'romance',
    premise: 'Two rival florists find love during the cherry blossom festival in Tokyo.',
    targetWords: 60000,
    chaptersCount: 12,
    writingStyle: 'conversational',
    tone: 'light',
    pov: 'first-person',
    status: 'completed',
    createdAt: new Date('2024-01-10'),
    completedChapters: 12,
    totalWords: 61500,
  },
  {
    id: '3',
    title: 'The Digital Detective',
    genre: 'mystery',
    premise: 'A cybersecurity expert solves crimes in the virtual world while uncovering a conspiracy.',
    targetWords: 80000,
    chaptersCount: 20,
    writingStyle: 'narrative',
    tone: 'serious',
    pov: 'third-person-omniscient',
    status: 'planning',
    createdAt: new Date('2024-01-20'),
    completedChapters: 0,
    totalWords: 0,
  },
  {
    id: '4',
    title: 'Stellar Horizons',
    genre: 'sci-fi',
    premise: 'Humanity\'s first interstellar voyage reveals they are not alone in the universe.',
    targetWords: 90000,
    chaptersCount: 18,
    writingStyle: 'descriptive',
    tone: 'inspirational',
    pov: 'third-person-limited',
    status: 'generating',
    createdAt: new Date('2024-01-12'),
    completedChapters: 5,
    totalWords: 28000,
  },
];

const mockStats = {
  totalBooks: 4,
  booksInProgress: 2,
  completedBooks: 1,
  totalWordsGenerated: 131500,
};

export default function DashboardPage() {
  const { 
    books, 
    stats, 
    isLoading, 
    error, 
    fetchBooks, 
    fetchStats, 
    deleteBook,
    clearError 
  } = useBookStore();

  const [mounted, setMounted] = useState(false);
  const [showMockData, setShowMockData] = useState(true);

  useEffect(() => {
    setMounted(true);
    fetchBooks();
    fetchStats();
    
    // Use real data if available, otherwise show mock data
    setTimeout(() => {
      if (books.length === 0) {
        setShowMockData(true);
      } else {
        setShowMockData(false);
      }
    }, 1000);
  }, [fetchBooks, fetchStats, books.length]);

  const displayBooks = showMockData ? mockBooks : books;
  const displayStats = showMockData ? mockStats : stats;
  const recentBooks = displayBooks.slice(0, 8);

  const handleDeleteBook = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this book? This action cannot be undone.')) {
      await deleteBook(id);
      fetchStats();
    }
  };

  return (
    <Layout>
      <div className="space-y-8 lg:space-y-12">
        {/* Floating Petals Background */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className="absolute text-sakura-main/10 text-2xl petal-fall"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 8}s`,
                animationDuration: `${8 + Math.random() * 4}s`,
              }}
            >
              🌸
            </div>
          ))}
        </div>

        {/* Hero Section */}
        <section className="relative text-center py-8 lg:py-16 bloom-in">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold text-text-primary mb-4 lg:mb-6">
              Welcome to Your
              <span className="text-gradient-sakura block mt-2">
                Story Garden 🌸
              </span>
            </h1>
            
            <p className="text-lg lg:text-xl text-text-secondary mb-8 lg:mb-12 max-w-2xl mx-auto leading-relaxed">
              Your ideas are ready to bloom into beautiful stories. 
              Let AI help you nurture them from simple seeds into magnificent literary gardens.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
              <Link 
                href="/dashboard/new" 
                className="btn-sakura text-lg px-8 py-4 shadow-[var(--shadow-bloom)] hover:scale-105 transition-all duration-300"
              >
                <span className="mr-2">🌱</span>
                Plant a New Story
              </Link>
              
              {displayBooks.length > 0 && (
                <Link 
                  href="/dashboard/books" 
                  className="btn-sakura-outline text-lg px-8 py-4"
                >
                  <span className="mr-2">📚</span>
                  View Garden
                </Link>
              )}
            </div>

            {/* Achievement Badge */}
            {displayStats.totalWords > 50000 && (
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-yellow-100 to-orange-100 text-orange-800 px-4 py-2 rounded-full text-sm font-medium">
                <span>🏆</span>
                Prolific Writer - {formatWordCount(displayStats.totalWordsGenerated)} words cultivated!
              </div>
            )}
          </div>
        </section>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center justify-between bloom-in">
            <div className="flex items-center gap-2 text-red-700">
              <span>❌</span>
              <span>{error}</span>
            </div>
            <button
              onClick={clearError}
              className="text-red-500 hover:text-red-700 transition-colors"
            >
              ×
            </button>
          </div>
        )}

        {/* Stats Overview */}
        <section className="bloom-in" style={{ animationDelay: '0.2s' }}>
          <h2 className="text-2xl font-bold text-text-primary mb-6 text-center">
            Your Writing Journey
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {/* Books Created */}
            <div className="card-sakura p-6 lg:p-8 text-center hover:scale-105 hover:shadow-[var(--shadow-bloom)] transition-all duration-300 group">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <span className="text-white text-2xl">📚</span>
              </div>
              <div className="text-3xl lg:text-4xl font-bold text-sakura-main mb-2">
                {mounted ? <AnimatedCounter end={displayStats.totalBooks} /> : '...'}
              </div>
              <div className="text-text-secondary font-medium">Books Created</div>
              <div className="text-xs text-text-muted mt-1">
                Stories in your garden
              </div>
            </div>
            
            {/* Total Words */}
            <div className="card-sakura p-6 lg:p-8 text-center hover:scale-105 hover:shadow-[var(--shadow-bloom)] transition-all duration-300 group">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <span className="text-white text-2xl">✍️</span>
              </div>
              <div className="text-3xl lg:text-4xl font-bold text-sakura-main mb-2">
                {mounted ? formatWordCount(displayStats.totalWordsGenerated) : '...'}
              </div>
              <div className="text-text-secondary font-medium">Total Words</div>
              <div className="text-xs text-text-muted mt-1">
                Ideas transformed into prose
              </div>
            </div>
            
            {/* Chapters Bloomed */}
            <div className="card-sakura p-6 lg:p-8 text-center hover:scale-105 hover:shadow-[var(--shadow-bloom)] transition-all duration-300 group">
              <div className="w-16 h-16 bg-gradient-to-br from-sakura-main to-sakura-deep rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <span className="text-white text-2xl">🌸</span>
              </div>
              <div className="text-3xl lg:text-4xl font-bold text-sakura-main mb-2">
                {mounted ? <AnimatedCounter end={displayBooks.reduce((sum, book) => sum + (book.completedChapters || 0), 0)} /> : '...'}
              </div>
              <div className="text-text-secondary font-medium">Chapters Bloomed</div>
              <div className="text-xs text-text-muted mt-1">
                Completed story segments
              </div>
            </div>
          </div>
        </section>

        {/* Recent Books Section */}
        <section className="bloom-in" style={{ animationDelay: '0.4s' }}>
          <div className="flex items-center justify-between mb-6 lg:mb-8">
            <h2 className="text-2xl lg:text-3xl font-bold text-text-primary flex items-center gap-3">
              <span>🌸</span>
              Your Story Garden
            </h2>
            
            {displayBooks.length > 4 && (
              <Link 
                href="/dashboard/books" 
                className="text-sakura-main hover:text-sakura-deep transition-colors text-sm lg:text-base font-medium flex items-center gap-1 group"
              >
                View All Books
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            )}
          </div>

          {isLoading && !mounted ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="card-sakura p-6 animate-pulse">
                  <div className="h-4 bg-sakura-light rounded mb-4"></div>
                  <div className="h-3 bg-sakura-light rounded mb-2"></div>
                  <div className="h-3 bg-sakura-light rounded w-2/3 mb-4"></div>
                  <div className="h-2 bg-sakura-light rounded mb-2"></div>
                  <div className="h-8 bg-sakura-light rounded"></div>
                </div>
              ))}
            </div>
          ) : displayBooks.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {recentBooks.map((book, index) => (
                <div
                  key={book.id}
                  className="bloom-in"
                  style={{ animationDelay: `${0.1 * index}s` }}
                >
                  <BookPreviewCard
                    book={book}
                    onDelete={showMockData ? undefined : handleDeleteBook}
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 lg:py-24">
              <div className="text-8xl lg:text-9xl mb-6">🌱</div>
              <h3 className="text-2xl lg:text-3xl font-bold text-text-primary mb-4">
                Plant Your First Story Seed
              </h3>
              <p className="text-lg text-text-secondary mb-8 max-w-md mx-auto">
                Your story garden awaits! Create your first book and watch your imagination bloom into beautiful narratives.
              </p>
              <Link href="/dashboard/new" className="btn-sakura text-lg px-8 py-4">
                <span className="mr-2">🌱</span>
                Start Your First Story
              </Link>
            </div>
          )}
        </section>

        {/* Inspiration Quote */}
        <section className="bloom-in" style={{ animationDelay: '0.6s' }}>
          <div className="bg-gradient-to-r from-sakura-light via-sky-blue/30 to-sakura-soft rounded-2xl p-8 lg:p-12 text-center border border-sakura-soft/30">
            <div className="text-4xl lg:text-5xl mb-4">🌸</div>
            <blockquote className="text-lg lg:text-xl text-text-primary font-medium mb-4 italic">
              "Every story is a garden. Every word is a seed. Every chapter is a season of growth."
            </blockquote>
            <div className="text-text-secondary text-sm">
              - BookBloom Philosophy
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}