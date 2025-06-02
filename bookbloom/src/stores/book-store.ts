import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { Book, Chapter, GenerationStatus, BookStats, BookFormData } from '@/types';

interface BookStore {
  // State
  books: Book[];
  currentBook: Book | null;
  chapters: Chapter[];
  generationStatus: GenerationStatus | null;
  stats: BookStats;
  isLoading: boolean;
  error: string | null;

  // Actions
  fetchBooks: () => Promise<void>;
  fetchBook: (id: string) => Promise<void>;
  createBook: (bookData: BookFormData) => Promise<Book | null>;
  updateBook: (id: string, updates: Partial<Book>) => Promise<void>;
  deleteBook: (id: string) => Promise<void>;
  
  fetchChapters: (bookId: string) => Promise<void>;
  updateChapter: (id: string, updates: Partial<Chapter>) => Promise<void>;
  
  startGeneration: (bookId: string) => Promise<void>;
  updateGenerationStatus: (status: Partial<GenerationStatus>) => void;
  stopGeneration: () => void;
  
  fetchStats: () => Promise<void>;
  
  setCurrentBook: (book: Book | null) => void;
  setError: (error: string | null) => void;
  clearError: () => void;
}

// API helper functions
const api = {
  async get(endpoint: string) {
    const response = await fetch(`/api${endpoint}`);
    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }
    return response.json();
  },

  async post(endpoint: string, data: unknown) {
    const response = await fetch(`/api${endpoint}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }
    return response.json();
  },

  async put(endpoint: string, data: unknown) {
    const response = await fetch(`/api${endpoint}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }
    return response.json();
  },

  async delete(endpoint: string) {
    const response = await fetch(`/api${endpoint}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }
    return response.json();
  },
};

export const useBookStore = create<BookStore>()(
  devtools(
    persist(
      (set, get) => ({
        // Initial state
        books: [],
        currentBook: null,
        chapters: [],
        generationStatus: null,
        stats: {
          totalBooks: 0,
          booksInProgress: 0,
          completedBooks: 0,
          totalWordsGenerated: 0,
        },
        isLoading: false,
        error: null,

        // Actions
        fetchBooks: async () => {
          if (typeof window === 'undefined') return; // Server-side guard
          
          set({ isLoading: true, error: null });
          try {
            const books = await api.get('/books');
            set({ books, isLoading: false });
          } catch (error) {
            set({ 
              error: error instanceof Error ? error.message : 'Failed to fetch books',
              isLoading: false 
            });
          }
        },

        fetchBook: async (id: string) => {
          if (typeof window === 'undefined') return; // Server-side guard
          
          set({ isLoading: true, error: null });
          try {
            const book = await api.get(`/books/${id}`);
            set({ 
              currentBook: book, 
              chapters: book.chapters || [], 
              isLoading: false 
            });
          } catch (error) {
            set({ 
              error: error instanceof Error ? error.message : 'Failed to fetch book',
              isLoading: false 
            });
          }
        },

        createBook: async (bookData: BookFormData) => {
          if (typeof window === 'undefined') return null; // Server-side guard
          
          set({ isLoading: true, error: null });
          try {
            const newBook = await api.post('/books', bookData);
            // Refresh books list
            const books = await api.get('/books');
            set({ books, currentBook: newBook, isLoading: false });
            return newBook;
          } catch (error) {
            set({ 
              error: error instanceof Error ? error.message : 'Failed to create book',
              isLoading: false 
            });
            return null;
          }
        },

        updateBook: async (id: string, updates: Partial<Book>) => {
          if (typeof window === 'undefined') return; // Server-side guard
          
          set({ isLoading: true, error: null });
          try {
            const updatedBook = await api.put(`/books/${id}`, updates);
            // Refresh books list
            const books = await api.get('/books');
            set({ 
              books,
              currentBook: get().currentBook?.id === id ? updatedBook : get().currentBook,
              isLoading: false 
            });
          } catch (error) {
            set({ 
              error: error instanceof Error ? error.message : 'Failed to update book',
              isLoading: false 
            });
          }
        },

        deleteBook: async (id: string) => {
          if (typeof window === 'undefined') return; // Server-side guard
          
          set({ isLoading: true, error: null });
          try {
            await api.delete(`/books/${id}`);
            // Refresh books list
            const books = await api.get('/books');
            set({ 
              books,
              currentBook: get().currentBook?.id === id ? null : get().currentBook,
              isLoading: false 
            });
          } catch (error) {
            set({ 
              error: error instanceof Error ? error.message : 'Failed to delete book',
              isLoading: false 
            });
          }
        },

        fetchChapters: async (bookId: string) => {
          if (typeof window === 'undefined') return; // Server-side guard
          
          set({ isLoading: true, error: null });
          try {
            // For now, chapters are included with book fetch
            const book = await api.get(`/books/${bookId}`);
            set({ chapters: book.chapters || [], isLoading: false });
          } catch (error) {
            set({ 
              error: error instanceof Error ? error.message : 'Failed to fetch chapters',
              isLoading: false 
            });
          }
        },

        updateChapter: async (id: string, updates: Partial<Chapter>) => {
          if (typeof window === 'undefined') return; // Server-side guard
          
          set({ isLoading: true, error: null });
          try {
            // This would need a chapters API endpoint in a real implementation
            // For now, just update locally
            const chapters = get().chapters.map(chapter =>
              chapter.id === id ? { ...chapter, ...updates } : chapter
            );
            set({ chapters, isLoading: false });
          } catch (error) {
            set({ 
              error: error instanceof Error ? error.message : 'Failed to update chapter',
              isLoading: false 
            });
          }
        },

        startGeneration: async (bookId: string) => {
          if (typeof window === 'undefined') return; // Server-side guard
          
          set({ isLoading: true, error: null });
          try {
            await api.put(`/books/${bookId}`, { status: 'generating' });
            const book = await api.get(`/books/${bookId}`);
            const chapters = book.chapters || [];
            const pendingChapters = chapters.filter((c: Chapter) => c.status === 'pending');
            
            if (pendingChapters.length === 0) {
              set({ error: 'No chapters to generate', isLoading: false });
              return;
            }

            const initialStatus: GenerationStatus = {
              isGenerating: true,
              currentChapter: pendingChapters[0].chapterNumber,
              totalChapters: chapters.length,
              completedChapters: chapters.filter((c: Chapter) => c.status === 'completed').length,
              progress: 0,
              wordsGenerated: chapters.reduce((sum: number, c: Chapter) => sum + c.wordCount, 0),
              targetWords: chapters.reduce((sum: number, c: Chapter) => sum + c.targetWords, 0),
            };

            set({ generationStatus: initialStatus, isLoading: false });
          } catch (error) {
            set({ 
              error: error instanceof Error ? error.message : 'Failed to start generation',
              isLoading: false 
            });
          }
        },

        updateGenerationStatus: (status: Partial<GenerationStatus>) => {
          const currentStatus = get().generationStatus;
          if (currentStatus) {
            set({
              generationStatus: {
                ...currentStatus,
                ...status,
              }
            });
          }
        },

        stopGeneration: () => {
          set({ generationStatus: null });
        },

        fetchStats: async () => {
          if (typeof window === 'undefined') return; // Server-side guard
          
          try {
            const stats = await api.get('/stats');
            set({ stats });
          } catch (error) {
            console.error('Failed to fetch stats:', error);
            // Don't set error for stats as it's not critical
          }
        },

        setCurrentBook: (book: Book | null) => {
          set({ currentBook: book });
        },

        setError: (error: string | null) => {
          set({ error });
        },

        clearError: () => {
          set({ error: null });
        },
      }),
      {
        name: 'bookbloom-store',
        partialize: (state) => ({
          // Only persist essential data, not loading states or errors
          books: state.books,
          stats: state.stats,
        }),
      }
    ),
    {
      name: 'BookBloom Store',
    }
  )
);