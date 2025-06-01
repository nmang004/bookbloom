'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Layout from '@/components/layout/Layout';
import BookCard from '@/components/book/BookCard';
import { useBookStore } from '@/stores/book-store';
import { Genre, BookStatus } from '@/types';

export default function BooksPage() {
  const { 
    books, 
    isLoading, 
    error, 
    fetchBooks, 
    deleteBook,
    clearError 
  } = useBookStore();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGenre, setSelectedGenre] = useState<Genre | 'all'>('all');
  const [selectedStatus, setSelectedStatus] = useState<BookStatus | 'all'>('all');
  const [sortBy, setSortBy] = useState<'newest' | 'oldest' | 'title' | 'progress'>('newest');

  useEffect(() => {
    fetchBooks();
  }, [fetchBooks]);

  const handleDeleteBook = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this book? This action cannot be undone.')) {
      await deleteBook(id);
    }
  };

  // Filter and sort books
  const filteredBooks = books
    .filter(book => {
      const matchesSearch = book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          book.premise.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesGenre = selectedGenre === 'all' || book.genre === selectedGenre;
      const matchesStatus = selectedStatus === 'all' || book.status === selectedStatus;
      
      return matchesSearch && matchesGenre && matchesStatus;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        case 'oldest':
          return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
        case 'title':
          return a.title.localeCompare(b.title);
        case 'progress':
          const aProgress = a.completedChapters && a.chaptersCount 
            ? (a.completedChapters / a.chaptersCount) * 100 
            : 0;
          const bProgress = b.completedChapters && b.chaptersCount 
            ? (b.completedChapters / b.chaptersCount) * 100 
            : 0;
          return bProgress - aProgress;
        default:
          return 0;
      }
    });

  const genres: (Genre | 'all')[] = ['all', 'fantasy', 'romance', 'mystery', 'sci-fi', 'thriller', 'literary', 'young-adult', 'horror', 'historical', 'contemporary'];
  const statuses: (BookStatus | 'all')[] = ['all', 'planning', 'generating', 'completed', 'error'];

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-text-primary mb-2">
              My Books 📚
            </h1>
            <p className="text-text-secondary">
              Manage and organize your book collection
            </p>
          </div>
          
          <Link href="/dashboard/new" className="btn-sakura">
            ✨ New Book
          </Link>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center justify-between">
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

        {/* Filters and Search */}
        <div className="card-sakura p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Search */}
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Search Books
              </label>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by title or premise..."
                className="input-sakura w-full"
              />
            </div>

            {/* Genre Filter */}
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Genre
              </label>
              <select
                value={selectedGenre}
                onChange={(e) => setSelectedGenre(e.target.value as Genre | 'all')}
                className="input-sakura w-full"
              >
                {genres.map(genre => (
                  <option key={genre} value={genre}>
                    {genre === 'all' ? 'All Genres' : genre.charAt(0).toUpperCase() + genre.slice(1)}
                  </option>
                ))}
              </select>
            </div>

            {/* Status Filter */}
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Status
              </label>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value as BookStatus | 'all')}
                className="input-sakura w-full"
              >
                {statuses.map(status => (
                  <option key={status} value={status}>
                    {status === 'all' ? 'All Statuses' : status.charAt(0).toUpperCase() + status.slice(1)}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort */}
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Sort By
              </label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as 'newest' | 'oldest' | 'title' | 'progress')}
                className="input-sakura w-full"
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="title">Title A-Z</option>
                <option value="progress">Most Progress</option>
              </select>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="mt-6 pt-6 border-t border-sakura-soft/20">
            <div className="flex items-center justify-between text-sm text-text-secondary">
              <span>
                Showing {filteredBooks.length} of {books.length} books
              </span>
              {filteredBooks.length !== books.length && (
                <button
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedGenre('all');
                    setSelectedStatus('all');
                  }}
                  className="text-sakura-main hover:text-sakura-deep transition-colors"
                >
                  Clear filters
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Books Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="card-sakura p-6 animate-pulse">
                <div className="h-4 bg-sakura-light rounded mb-4"></div>
                <div className="h-3 bg-sakura-light rounded mb-2"></div>
                <div className="h-3 bg-sakura-light rounded w-2/3 mb-4"></div>
                <div className="h-2 bg-sakura-light rounded mb-2"></div>
                <div className="h-8 bg-sakura-light rounded"></div>
              </div>
            ))}
          </div>
        ) : filteredBooks.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredBooks.map((book) => (
              <BookCard
                key={book.id}
                book={book}
                onDelete={handleDeleteBook}
              />
            ))}
          </div>
        ) : books.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📚</div>
            <h3 className="text-xl font-semibold text-text-primary mb-2">
              No books yet
            </h3>
            <p className="text-text-secondary mb-6">
              Start your writing journey by creating your first book.
            </p>
            <Link href="/dashboard/new" className="btn-sakura">
              Create Your First Book 🌸
            </Link>
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-text-primary mb-2">
              No books match your filters
            </h3>
            <p className="text-text-secondary mb-6">
              Try adjusting your search criteria or clearing the filters.
            </p>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedGenre('all');
                setSelectedStatus('all');
              }}
              className="btn-sakura-outline"
            >
              Clear Filters
            </button>
          </div>
        )}

        {/* Bulk Actions (if books are selected) */}
        {filteredBooks.length > 0 && (
          <div className="card-sakura p-4 bg-gradient-to-r from-sakura-light to-sky-blue">
            <div className="flex items-center justify-between">
              <div className="text-sm text-text-secondary">
                📊 Total: {books.length} books • 
                ⚡ In Progress: {books.filter(b => b.status === 'generating').length} • 
                ✅ Completed: {books.filter(b => b.status === 'completed').length}
              </div>
              
              <div className="flex items-center gap-2">
                <span className="text-sm text-text-secondary">Quick actions:</span>
                <Link 
                  href="/dashboard/new"
                  className="text-sakura-main hover:text-sakura-deep text-sm font-medium transition-colors"
                >
                  New Book
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}