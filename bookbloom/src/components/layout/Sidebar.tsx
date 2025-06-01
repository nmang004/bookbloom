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
      h-full
      bg-white/80 backdrop-blur-xl
      border-r border-sakura-soft/20 
      shadow-lg
      transition-all duration-300 ease-out
      ${className}
    `}>
      <div className="h-full overflow-y-auto px-6 py-8 space-y-8">
        {/* Navigation Menu */}
        <div className="space-y-3">
          <h2 className="text-xs font-bold text-sakura-dark/60 uppercase tracking-wider mb-6 flex items-center gap-2">
            <span className="text-base">🧭</span>
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
                  group relative flex items-center px-4 py-3.5 rounded-xl 
                  text-sm font-medium transition-all duration-300 ease-out
                  ${isActive
                    ? 'bg-gradient-to-r from-sakura-main to-sakura-deep text-white shadow-lg scale-105'
                    : 'text-text-secondary hover:text-sakura-dark hover:bg-sakura-light/50 hover:shadow-md hover:scale-102'
                  }
                `}
              >
                {/* Active indicator */}
                {isActive && (
                  <div className="absolute -left-6 top-1/2 -translate-y-1/2 w-1 h-10 bg-gradient-to-b from-sakura-main to-sakura-deep rounded-r-full" />
                )}
                
                {/* Icon */}
                <span className={`text-lg mr-3 ${isActive ? '' : 'opacity-80'}`}>
                  {item.icon}
                </span>
                
                <div className="flex-1 min-w-0">
                  <div className={`font-semibold ${isActive ? 'text-white' : ''}`}>
                    {item.name}
                  </div>
                  <div className={`text-xs mt-0.5 ${isActive ? 'text-white/80' : 'text-text-muted'}`}>
                    {item.description}
                  </div>
                </div>

                {/* Hover/Active effect */}
                {!isActive && (
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-sakura-main/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                )}
              </Link>
            );
          })}
        </div>

        {/* Quick Stats Glass Card */}
        <div className="bg-gradient-to-br from-sakura-light/50 to-sky-blue/30 p-5 rounded-2xl border border-sakura-soft/20 shadow-sm">
          <div className="flex items-center mb-4">
            <span className="text-xl mr-3">📈</span>
            <h3 className="text-sm font-bold text-sakura-dark">
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
        <div className="relative bg-gradient-to-br from-amber-50 via-pink-50 to-sakura-light rounded-2xl p-5 overflow-hidden shadow-sm">
          <div className="absolute top-0 right-0 text-6xl text-sakura-main/10 rotate-12 translate-x-4 -translate-y-4">
            🌸
          </div>
          <div className="relative z-10">
            <div className="flex items-start mb-3">
              <span className="text-xl mr-3">✨</span>
              <div>
                <h4 className="text-sm font-bold text-sakura-dark mb-2">
                  Daily Inspiration
                </h4>
                <p className="text-xs text-text-secondary leading-relaxed italic">
                  &ldquo;Every story you create is a cherry blossom in the garden of imagination. Let them bloom.&rdquo;
                </p>
              </div>
            </div>
            
            <div className="flex items-center justify-between mt-4 pt-3 border-t border-sakura-soft/30">
              <div className="text-xs text-text-muted font-medium">Writing Tip #47</div>
              <Link 
                href="/dashboard/new" 
                className="text-xs text-sakura-main hover:text-sakura-deep font-bold transition-colors"
              >
                Start Writing →
              </Link>
            </div>
          </div>
        </div>

        {/* Quick Action Button */}
        <Link
          href="/dashboard/new"
          className="
            relative w-full flex items-center justify-center gap-2 
            bg-gradient-to-r from-sakura-main to-sakura-deep 
            text-white font-bold py-3.5 px-4 rounded-xl
            shadow-lg hover:shadow-xl
            hover:scale-105 hover:-translate-y-0.5
            transition-all duration-300 ease-out
            group overflow-hidden
          "
          onClick={onClose}
        >
          <span className="text-lg group-hover:scale-110 transition-transform duration-300">🌱</span>
          <span>Create New Book</span>
          <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
        </Link>
      </div>
    </aside>
  );
}