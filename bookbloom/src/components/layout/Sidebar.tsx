'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useBookStore } from '@/stores/book-store';
import { formatWordCount } from '@/lib/utils';

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
  className?: string;
}

export default function Sidebar({ isOpen = true, onClose, className = '' }: SidebarProps) {
  const pathname = usePathname();
  const { stats, fetchStats } = useBookStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    fetchStats();
  }, [fetchStats]);

  const navigation = [
    {
      name: 'Dashboard',
      href: '/dashboard',
      icon: '📊',
      description: 'Overview & Stats',
      gradient: 'from-blue-400 to-blue-600',
    },
    {
      name: 'My Books',
      href: '/dashboard/books',
      icon: '📚',
      description: 'Library & Collection',
      gradient: 'from-green-400 to-green-600',
    },
    {
      name: 'New Book',
      href: '/dashboard/new',
      icon: '✨',
      description: 'Create & Plan',
      gradient: 'from-sakura-main to-sakura-deep',
    },
    {
      name: 'Settings',
      href: '/dashboard/settings',
      icon: '⚙️',
      description: 'Preferences',
      gradient: 'from-gray-400 to-gray-600',
    },
  ];

  if (!isOpen) return null;

  return (
    <aside className={`
      w-64 lg:w-72 
      bg-white/40 backdrop-blur-md 
      border-r border-sakura-soft/30 
      min-h-screen 
      shadow-[var(--shadow-petal)]
      transition-all duration-300 ease-out
      ${className}
    `}>
      <div className="p-6 space-y-6">
        {/* Navigation Menu */}
        <div className="space-y-2">
          <h2 className="text-xs font-semibold text-sakura-dark/70 uppercase tracking-wider mb-4">
            Navigation
          </h2>
          
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            
            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={onClose}
                className={`
                  group relative flex items-center px-4 py-3 rounded-xl 
                  text-sm font-medium transition-all duration-300 ease-out
                  hover:scale-105 hover:shadow-lg
                  ${isActive
                    ? 'bg-gradient-to-r from-sakura-main/20 to-sakura-soft/30 text-sakura-dark shadow-lg border border-sakura-main/30'
                    : 'text-text-secondary hover:text-sakura-main hover:bg-white/60'
                  }
                `}
              >
                {/* Active indicator */}
                {isActive && (
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-gradient-to-b from-sakura-main to-sakura-deep rounded-r-full" />
                )}
                
                {/* Icon with gradient background */}
                <div className={`
                  flex items-center justify-center w-8 h-8 rounded-lg mr-3
                  bg-gradient-to-br ${item.gradient}
                  shadow-sm group-hover:scale-110 transition-transform duration-300
                `}>
                  <span className="text-white text-sm">{item.icon}</span>
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="font-medium">{item.name}</div>
                  <div className="text-xs text-text-muted group-hover:text-sakura-dark/70 transition-colors">
                    {item.description}
                  </div>
                </div>

                {/* Hover effect */}
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-sakura-main/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </Link>
            );
          })}
        </div>

        {/* Quick Stats Glass Card */}
        <div className="glass-card p-5 rounded-xl border border-sakura-soft/20">
          <div className="flex items-center mb-4">
            <div className="w-8 h-8 bg-gradient-to-br from-sakura-main to-sakura-deep rounded-lg flex items-center justify-center mr-3">
              <span className="text-white text-sm">📈</span>
            </div>
            <h3 className="text-sm font-semibold text-text-primary">
              Quick Stats
            </h3>
          </div>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs text-text-secondary">Total Books</span>
              <div className="flex items-center gap-1">
                <span className="text-sm font-bold text-sakura-main">
                  {mounted ? stats.totalBooks : '...'}
                </span>
                <span className="text-xs">📚</span>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-xs text-text-secondary">Words Written</span>
              <div className="flex items-center gap-1">
                <span className="text-sm font-bold text-sakura-main">
                  {mounted ? formatWordCount(stats.totalWordsGenerated) : '...'}
                </span>
                <span className="text-xs">✍️</span>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-xs text-text-secondary">Completed</span>
              <div className="flex items-center gap-1">
                <span className="text-sm font-bold text-green-600">
                  {mounted ? stats.completedBooks : '...'}
                </span>
                <span className="text-xs">✅</span>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-xs text-text-secondary">In Progress</span>
              <div className="flex items-center gap-1">
                <span className="text-sm font-bold text-yellow-600">
                  {mounted ? stats.booksInProgress : '...'}
                </span>
                <span className="text-xs">⚡</span>
              </div>
            </div>
          </div>

          {/* Progress visualization */}
          {mounted && stats.totalBooks > 0 && (
            <div className="mt-4 pt-3 border-t border-sakura-soft/20">
              <div className="text-xs text-text-secondary mb-2">Completion Rate</div>
              <div className="progress-sakura h-2">
                <div 
                  className="progress-sakura-fill" 
                  style={{ 
                    width: `${Math.round((stats.completedBooks / stats.totalBooks) * 100)}%` 
                  }}
                />
              </div>
              <div className="text-xs text-text-muted mt-1 text-center">
                {Math.round((stats.completedBooks / stats.totalBooks) * 100)}% complete
              </div>
            </div>
          )}
        </div>

        {/* Inspiration Tip Card */}
        <div className="bg-gradient-to-br from-sakura-light via-sky-blue/30 to-sakura-soft/50 rounded-xl p-5 border border-sakura-soft/30">
          <div className="flex items-start mb-3">
            <div className="w-8 h-8 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-lg flex items-center justify-center mr-3 flex-shrink-0">
              <span className="text-white text-sm">💡</span>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-sakura-dark mb-1">
                Daily Inspiration
              </h4>
              <p className="text-xs text-text-secondary leading-relaxed">
                &ldquo;Every story you create is a cherry blossom in the garden of imagination. Let them bloom.&rdquo;
              </p>
            </div>
          </div>
          
          <div className="flex items-center justify-between mt-4 pt-3 border-t border-sakura-soft/30">
            <div className="text-xs text-text-muted">Writing Tip #47</div>
            <Link 
              href="/dashboard/new" 
              className="text-xs text-sakura-main hover:text-sakura-deep font-medium transition-colors"
            >
              Start Writing →
            </Link>
          </div>
        </div>

        {/* Quick Action Button */}
        <Link
          href="/dashboard/new"
          className="
            w-full flex items-center justify-center gap-2 
            bg-gradient-to-r from-sakura-main to-sakura-deep 
            text-white font-medium py-3 px-4 rounded-xl
            shadow-lg hover:shadow-xl
            hover:scale-105 hover:-translate-y-0.5
            transition-all duration-300 ease-out
            group
          "
          onClick={onClose}
        >
          <span className="group-hover:scale-110 transition-transform duration-300">✨</span>
          <span>Create New Book</span>
          <div className="absolute inset-0 rounded-xl bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </Link>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-10 right-4 text-sakura-main/10 text-2xl animate-pulse">
        🌸
      </div>
      <div className="absolute bottom-20 left-4 text-sakura-soft/20 text-lg animate-pulse" style={{ animationDelay: '1s' }}>
        🌸
      </div>
    </aside>
  );
}