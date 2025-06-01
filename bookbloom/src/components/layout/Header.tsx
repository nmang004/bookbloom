'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface HeaderProps {
  onMenuToggle?: () => void;
  isMobileMenuOpen?: boolean;
}

export default function Header({ onMenuToggle, isMobileMenuOpen = false }: HeaderProps) {
  const pathname = usePathname();
  const [showUserMenu, setShowUserMenu] = useState(false);

  return (
    <>
      {/* Floating Petals Animation */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-10">
        {[...Array(8)].map((_, i) => {
          // Use deterministic values based on index
          const positions = [
            { left: '10%', top: '20%' },
            { left: '25%', top: '60%' },
            { left: '40%', top: '30%' },
            { left: '55%', top: '70%' },
            { left: '70%', top: '15%' },
            { left: '85%', top: '50%' },
            { left: '15%', top: '85%' },
            { left: '60%', top: '40%' }
          ];
          
          return (
            <div
              key={i}
              className="absolute text-sakura-main/20 text-lg float-gentle"
              style={{
                left: positions[i].left,
                top: positions[i].top,
                animationDelay: `${i * 0.5}s`,
                animationDuration: `${4 + (i % 3)}s`
              }}
            >
              🌸
            </div>
          );
        })}
      </div>

      <header className="bg-gradient-to-r from-sakura-light via-sakura-soft to-sakura-light backdrop-blur-sm border-b border-sakura-main/20 sticky top-0 z-50 shadow-[var(--shadow-petal)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo and Brand */}
            <div className="flex items-center space-x-4">
              {/* Mobile Menu Button */}
              <button
                onClick={onMenuToggle}
                className="md:hidden p-2 text-sakura-dark hover:text-sakura-main transition-colors"
                aria-label="Toggle menu"
              >
                <div className="w-6 h-6 flex flex-col justify-center space-y-1">
                  <div className={`h-0.5 bg-current transition-all duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`} />
                  <div className={`h-0.5 bg-current transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0' : ''}`} />
                  <div className={`h-0.5 bg-current transition-all duration-300 ${isMobileMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`} />
                </div>
              </button>

              {/* Brand */}
              <Link href="/" className="flex items-center space-x-3 group">
                <div className="w-10 h-10 bg-gradient-to-br from-sakura-main to-sakura-deep rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <span className="text-white font-bold text-xl">🌸</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-xl font-bold text-gradient-sakura group-hover:scale-105 transition-transform duration-300">
                    BookBloom
                  </span>
                  <span className="text-xs text-sakura-dark/70 hidden sm:block">
                    Watch your stories bloom
                  </span>
                </div>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <Link
                href="/dashboard"
                className={`text-sm font-medium px-3 py-2 rounded-lg transition-all duration-200 hover:bg-white/50 ${
                  pathname === '/dashboard'
                    ? 'text-sakura-main bg-white/60 shadow-sm'
                    : 'text-sakura-dark hover:text-sakura-main'
                }`}
              >
                <span className="mr-2">📊</span>
                Dashboard
              </Link>
              <Link
                href="/dashboard/books"
                className={`text-sm font-medium px-3 py-2 rounded-lg transition-all duration-200 hover:bg-white/50 ${
                  pathname === '/dashboard/books'
                    ? 'text-sakura-main bg-white/60 shadow-sm'
                    : 'text-sakura-dark hover:text-sakura-main'
                }`}
              >
                <span className="mr-2">📚</span>
                My Books
              </Link>
              <Link
                href="/dashboard/new"
                className={`text-sm font-medium px-3 py-2 rounded-lg transition-all duration-200 hover:bg-white/50 ${
                  pathname === '/dashboard/new'
                    ? 'text-sakura-main bg-white/60 shadow-sm'
                    : 'text-sakura-dark hover:text-sakura-main'
                }`}
              >
                <span className="mr-2">✨</span>
                New Book
              </Link>
            </nav>

            {/* User Menu */}
            <div className="flex items-center space-x-4">
              {/* Create Book Button - Hidden on mobile */}
              <Link
                href="/dashboard/new"
                className="hidden sm:inline-flex btn-sakura text-sm px-4 py-2"
              >
                <span className="mr-1">✨</span>
                Create
              </Link>

              {/* User Profile Menu */}
              <div className="relative">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center space-x-2 p-2 rounded-lg hover:bg-white/50 transition-all duration-200 group"
                >
                  <div className="w-8 h-8 bg-gradient-to-br from-sakura-main to-sakura-deep rounded-full flex items-center justify-center text-white font-medium text-sm group-hover:scale-110 transition-transform duration-200">
                    U
                  </div>
                  <div className="hidden sm:block">
                    <div className="text-xs text-sakura-dark">User</div>
                  </div>
                  <svg 
                    className={`w-4 h-4 text-sakura-dark transition-transform duration-200 ${showUserMenu ? 'rotate-180' : ''}`}
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {/* Dropdown Menu */}
                {showUserMenu && (
                  <div className="absolute right-0 mt-2 w-48 bg-white/90 backdrop-blur-sm rounded-lg shadow-[var(--shadow-bloom)] border border-sakura-soft/30 py-2 z-50">
                    <Link
                      href="/dashboard/settings"
                      className="flex items-center px-4 py-2 text-sm text-text-secondary hover:text-sakura-main hover:bg-sakura-light/30 transition-colors"
                      onClick={() => setShowUserMenu(false)}
                    >
                      <span className="mr-3">⚙️</span>
                      Settings
                    </Link>
                    <Link
                      href="/dashboard/profile"
                      className="flex items-center px-4 py-2 text-sm text-text-secondary hover:text-sakura-main hover:bg-sakura-light/30 transition-colors"
                      onClick={() => setShowUserMenu(false)}
                    >
                      <span className="mr-3">👤</span>
                      Profile
                    </Link>
                    <div className="border-t border-sakura-soft/30 my-2"></div>
                    <button
                      className="flex items-center w-full px-4 py-2 text-sm text-text-secondary hover:text-red-600 hover:bg-red-50/50 transition-colors"
                      onClick={() => setShowUserMenu(false)}
                    >
                      <span className="mr-3">🚪</span>
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-gradient-to-b from-sakura-light to-white/95 backdrop-blur-sm border-b border-sakura-soft/30 shadow-[var(--shadow-bloom)]">
            <nav className="px-4 py-6 space-y-4">
              <Link
                href="/dashboard"
                className={`flex items-center px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                  pathname === '/dashboard'
                    ? 'text-sakura-main bg-white/60 shadow-sm'
                    : 'text-sakura-dark hover:text-sakura-main hover:bg-white/50'
                }`}
                onClick={onMenuToggle}
              >
                <span className="mr-3 text-lg">📊</span>
                Dashboard
              </Link>
              <Link
                href="/dashboard/books"
                className={`flex items-center px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                  pathname === '/dashboard/books'
                    ? 'text-sakura-main bg-white/60 shadow-sm'
                    : 'text-sakura-dark hover:text-sakura-main hover:bg-white/50'
                }`}
                onClick={onMenuToggle}
              >
                <span className="mr-3 text-lg">📚</span>
                My Books
              </Link>
              <Link
                href="/dashboard/new"
                className={`flex items-center px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                  pathname === '/dashboard/new'
                    ? 'text-sakura-main bg-white/60 shadow-sm'
                    : 'text-sakura-dark hover:text-sakura-main hover:bg-white/50'
                }`}
                onClick={onMenuToggle}
              >
                <span className="mr-3 text-lg">✨</span>
                New Book
              </Link>
              
              <div className="border-t border-sakura-soft/30 pt-4 mt-4">
                <Link
                  href="/dashboard/new"
                  className="btn-sakura w-full justify-center"
                  onClick={onMenuToggle}
                >
                  <span className="mr-2">✨</span>
                  Create New Book
                </Link>
              </div>
            </nav>
          </div>
        )}
      </header>
    </>
  );
}