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
      color: 'text-yellow-800 bg-yellow-100',
      icon: '✏️',
      label: 'Planning',
    },
    generating: {
      color: 'text-green-800 bg-green-100',
      icon: '🌱',
      label: 'Generating',
    },
    completed: {
      color: 'text-green-800 bg-green-100',
      icon: '✓',
      label: 'Complete',
    },
    error: {
      color: 'text-red-800 bg-red-100',
      icon: '❌',
      label: 'Error',
    },
  };

  // Generate gradient colors based on genre
  const genreGradients = {
    fantasy: 'from-purple-200 to-indigo-300',
    romance: 'from-pink-200 to-rose-300',
    mystery: 'from-amber-200 to-orange-300',
    'sci-fi': 'from-blue-200 to-indigo-300',
    thriller: 'from-gray-200 to-slate-300',
    'non-fiction': 'from-green-200 to-emerald-300',
    default: 'from-pink-200 to-rose-300',
  };

  const coverGradient = genreGradients[book.genre] || genreGradients.default;

  const status = statusConfig[book.status];

  return (
    <div className="card-sakura group cursor-pointer transform hover:scale-105 transition-all duration-300">
      {/* Book Cover Area */}
      <div className={`relative h-48 bg-gradient-to-br ${coverGradient} rounded-xl mb-4 overflow-hidden`}>
        <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center">
          <div className="text-white text-6xl font-light">{book.status === 'completed' ? '📚' : '📖'}</div>
        </div>
        <div className="absolute top-3 right-3">
          <span className={`text-xs px-2 py-1 rounded-full ${status.color}`}>
            {status.icon} {status.label}
          </span>
        </div>
      </div>
      
      {/* Book Info */}
      <div className="space-y-3">
        <h3 className="text-xl font-medium text-gray-800 group-hover:text-pink-600 transition-colors">
          {book.title}
        </h3>
        <div className="flex items-center gap-2">
          <span className="bg-pink-100 text-pink-800 text-xs px-2 py-1 rounded-full">
            {getGenreEmoji(book.genre)} {book.genre.charAt(0).toUpperCase() + book.genre.slice(1)}
          </span>
          <span className="text-gray-500 text-sm">{formatWordCount(book.totalWords || 0)} words</span>
        </div>

        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm text-gray-600">
            <span>{book.status === 'completed' ? 'Complete 🌸' : book.status === 'planning' ? 'Outline' : 'Progress'}</span>
            <span>{book.completedChapters || 0}/{book.chaptersCount} chapters</span>
          </div>
          <div className="w-full bg-pink-100 rounded-full h-2">
            <div 
              className={`h-2 rounded-full transition-all duration-500 ${
                book.status === 'completed' 
                  ? 'bg-gradient-to-r from-green-400 to-emerald-500' 
                  : book.status === 'planning'
                  ? 'bg-gradient-to-r from-gray-300 to-gray-400'
                  : 'bg-gradient-to-r from-pink-400 to-rose-500'
              }`}
              style={{ width: `${book.status === 'planning' ? 15 : progress}%` }}
            />
          </div>
        </div>
      </div>

    </div>
  );
}