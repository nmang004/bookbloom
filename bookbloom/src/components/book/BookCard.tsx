'use client';

import Link from 'next/link';
import { Book } from '@/types';

interface BookCardProps {
  book: Book;
  onDelete?: (id: string) => void;
  onEdit?: (id: string) => void;
}

export default function BookCard({ book, onDelete, onEdit }: BookCardProps) {
  const progress = book.completedChapters && book.chaptersCount 
    ? (book.completedChapters / book.chaptersCount) * 100 
    : 0;

  const statusColor = {
    planning: 'text-blue-600 bg-blue-100',
    generating: 'text-yellow-600 bg-yellow-100',
    completed: 'text-green-600 bg-green-100',
    error: 'text-red-600 bg-red-100',
  }[book.status];

  const statusIcon = {
    planning: '📝',
    generating: '⚡',
    completed: '✅',
    error: '❌',
  }[book.status];

  return (
    <div className="card-sakura p-6 hover:scale-105 transition-all duration-300 group">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-lg">{statusIcon}</span>
            <span className={`text-xs px-2 py-1 rounded-full font-medium ${statusColor}`}>
              {book.status.charAt(0).toUpperCase() + book.status.slice(1)}
            </span>
          </div>
          
          <h3 className="font-semibold text-text-primary text-lg mb-1 group-hover:text-sakura-main transition-colors">
            {book.title}
          </h3>
          
          <div className="flex items-center gap-4 text-sm text-text-secondary mb-3">
            <span className="badge-sakura">{book.genre}</span>
            <span>{book.chaptersCount} chapters</span>
            <span>{book.targetWords.toLocaleString()} words</span>
          </div>
        </div>
      </div>

      <p className="text-text-secondary text-sm mb-4 line-clamp-3">
        {book.premise}
      </p>

      {book.status !== 'planning' && (
        <div className="mb-4">
          <div className="flex items-center justify-between text-sm mb-2">
            <span className="text-text-secondary">Progress</span>
            <span className="font-medium text-text-primary">{Math.round(progress)}%</span>
          </div>
          <div className="progress-sakura h-2">
            <div 
              className="progress-sakura-fill" 
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      )}

      <div className="flex items-center gap-2">
        <Link
          href={`/dashboard/books/${book.id}`}
          className="btn-sakura text-sm px-4 py-2 flex-1 text-center"
        >
          {book.status === 'planning' ? 'Continue Setup' : 'View Book'}
        </Link>
        
        <div className="flex gap-1">
          {onEdit && (
            <button
              onClick={() => onEdit(book.id)}
              className="p-2 text-text-secondary hover:text-sakura-main transition-colors"
              title="Edit book"
            >
              ✏️
            </button>
          )}
          
          {onDelete && (
            <button
              onClick={() => onDelete(book.id)}
              className="p-2 text-text-secondary hover:text-red-500 transition-colors"
              title="Delete book"
            >
              🗑️
            </button>
          )}
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-sakura-soft/20 text-xs text-text-muted">
        Created {new Date(book.createdAt).toLocaleDateString()}
      </div>
    </div>
  );
}