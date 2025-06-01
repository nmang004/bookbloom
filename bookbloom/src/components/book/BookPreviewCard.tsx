'use client';

import Link from 'next/link';
import { Book } from '@/types';
import { formatWordCount, getGenreEmoji, formatTimeAgo } from '@/lib/utils';

interface BookPreviewCardProps {
  book: Book;
  onDelete?: (id: string) => void;
  showActions?: boolean;
}

export default function BookPreviewCard({ 
  book, 
  onDelete, 
  showActions = true 
}: BookPreviewCardProps) {
  const progress = book.completedChapters && book.chaptersCount 
    ? (book.completedChapters / book.chaptersCount) * 100 
    : 0;

  const statusConfig = {
    planning: {
      color: 'text-blue-600 bg-blue-100',
      icon: '📝',
      label: 'Planning',
    },
    generating: {
      color: 'text-yellow-600 bg-yellow-100',
      icon: '⚡',
      label: 'Generating',
    },
    completed: {
      color: 'text-green-600 bg-green-100',
      icon: '✅',
      label: 'Completed',
    },
    error: {
      color: 'text-red-600 bg-red-100',
      icon: '❌',
      label: 'Error',
    },
  };

  const status = statusConfig[book.status];

  return (
    <div className="card-sakura p-6 hover:scale-105 hover:shadow-[var(--shadow-bloom)] transition-all duration-300 group relative overflow-hidden">
      {/* Decorative corner element */}
      <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-sakura-main/10 to-transparent rounded-bl-3xl" />
      
      {/* Status and Genre */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className="text-2xl">{getGenreEmoji(book.genre)}</span>
          <span className="badge-sakura text-xs">
            {book.genre.charAt(0).toUpperCase() + book.genre.slice(1)}
          </span>
        </div>
        
        <div className={`text-xs px-2 py-1 rounded-full font-medium flex items-center gap-1 ${status.color}`}>
          <span>{status.icon}</span>
          {status.label}
        </div>
      </div>

      {/* Title */}
      <Link 
        href={`/dashboard/books/${book.id}`}
        className="block group-hover:text-sakura-main transition-colors"
      >
        <h3 className="font-bold text-lg text-text-primary mb-2 line-clamp-2 leading-tight">
          {book.title}
        </h3>
      </Link>

      {/* Premise */}
      <p className="text-text-secondary text-sm mb-4 line-clamp-3 leading-relaxed">
        {book.premise}
      </p>

      {/* Progress Section */}
      {book.status !== 'planning' && (
        <div className="mb-4">
          <div className="flex items-center justify-between text-xs mb-2">
            <span className="text-text-secondary">Progress</span>
            <span className="font-semibold text-text-primary">
              {book.completedChapters}/{book.chaptersCount} chapters
            </span>
          </div>
          
          <div className="progress-sakura h-2 mb-2">
            <div 
              className="progress-sakura-fill transition-all duration-1000 ease-out" 
              style={{ width: `${progress}%` }}
            />
          </div>
          
          <div className="text-xs text-text-muted">
            {Math.round(progress)}% complete • {formatWordCount(book.totalWords || 0)} words
          </div>
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 mb-4 text-center">
        <div className="bg-sakura-light/30 rounded-lg p-3">
          <div className="text-lg font-bold text-sakura-main">
            {book.chaptersCount}
          </div>
          <div className="text-xs text-text-secondary">Chapters</div>
        </div>
        
        <div className="bg-sakura-light/30 rounded-lg p-3">
          <div className="text-lg font-bold text-sakura-main">
            {formatWordCount(book.targetWords)}
          </div>
          <div className="text-xs text-text-secondary">Target Words</div>
        </div>
      </div>

      {/* Actions */}
      {showActions && (
        <div className="flex items-center gap-2">
          <Link
            href={`/dashboard/books/${book.id}`}
            className="flex-1 btn-sakura text-sm py-2 text-center"
          >
            {book.status === 'planning' ? 'Continue Setup' : 'Open Book'}
          </Link>
          
          {onDelete && (
            <button
              onClick={() => onDelete(book.id)}
              className="p-2 text-text-muted hover:text-red-500 transition-colors rounded-lg hover:bg-red-50"
              title="Delete book"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          )}
        </div>
      )}

      {/* Footer Info */}
      <div className="mt-4 pt-4 border-t border-sakura-soft/20 flex items-center justify-between text-xs text-text-muted">
        <span>Created {formatTimeAgo(book.createdAt)}</span>
        
        {book.status === 'generating' && (
          <div className="flex items-center gap-1 text-yellow-600">
            <div className="w-1 h-1 bg-current rounded-full animate-pulse" />
            <div className="w-1 h-1 bg-current rounded-full animate-pulse" style={{ animationDelay: '0.2s' }} />
            <div className="w-1 h-1 bg-current rounded-full animate-pulse" style={{ animationDelay: '0.4s' }} />
            <span className="ml-1">AI Writing...</span>
          </div>
        )}
        
        {book.status === 'completed' && (
          <div className="flex items-center gap-1 text-green-600">
            <span>🌸</span>
            <span>Story Bloomed!</span>
          </div>
        )}
      </div>

      {/* Hover overlay effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-sakura-main/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
    </div>
  );
}