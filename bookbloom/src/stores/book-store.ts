import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { Book, Chapter, GenerationStatus, BookStats, BookFormData } from '@/types';
import { db } from '@/lib/db';

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
          set({ isLoading: true, error: null });
          try {
            const books = await db.book.findMany();
            set({ books: books as Book[], isLoading: false });
          } catch (error) {
            set({ 
              error: error instanceof Error ? error.message : 'Failed to fetch books',
              isLoading: false 
            });
          }
        },

        fetchBook: async (id: string) => {
          set({ isLoading: true, error: null });
          try {
            const book = await db.book.findUnique(id);
            if (book) {
              set({ currentBook: book as Book, chapters: (book.chapters as Chapter[]) || [], isLoading: false });
            } else {
              set({ error: 'Book not found', isLoading: false });
            }
          } catch (error) {
            set({ 
              error: error instanceof Error ? error.message : 'Failed to fetch book',
              isLoading: false 
            });
          }
        },

        createBook: async (bookData: BookFormData) => {
          set({ isLoading: true, error: null });
          try {
            const newBook = await db.book.create(bookData);
            const books = await db.book.findMany();
            set({ books: books as Book[], currentBook: newBook as Book, isLoading: false });
            return newBook as Book;
          } catch (error) {
            set({ 
              error: error instanceof Error ? error.message : 'Failed to create book',
              isLoading: false 
            });
            return null;
          }
        },

        updateBook: async (id: string, updates: Partial<Book>) => {
          set({ isLoading: true, error: null });
          try {
            const updatedBook = await db.book.update(id, updates);
            if (updatedBook) {
              const books = await db.book.findMany();
              set({ 
                books: books as Book[],
                currentBook: get().currentBook?.id === id ? (updatedBook as Book) : get().currentBook,
                isLoading: false 
              });
            } else {
              set({ error: 'Book not found', isLoading: false });
            }
          } catch (error) {
            set({ 
              error: error instanceof Error ? error.message : 'Failed to update book',
              isLoading: false 
            });
          }
        },

        deleteBook: async (id: string) => {
          set({ isLoading: true, error: null });
          try {
            await db.book.delete(id); const success = true;
            if (success) {
              const books = await db.book.findMany();
              set({ 
                books: books as Book[],
                currentBook: get().currentBook?.id === id ? null : get().currentBook,
                isLoading: false 
              });
            } else {
              set({ error: 'Book not found', isLoading: false });
            }
          } catch (error) {
            set({ 
              error: error instanceof Error ? error.message : 'Failed to delete book',
              isLoading: false 
            });
          }
        },

        fetchChapters: async (bookId: string) => {
          set({ isLoading: true, error: null });
          try {
            const chapters = await db.chapter.findMany(bookId);
            set({ chapters: chapters as Chapter[], isLoading: false });
          } catch (error) {
            set({ 
              error: error instanceof Error ? error.message : 'Failed to fetch chapters',
              isLoading: false 
            });
          }
        },

        updateChapter: async (id: string, updates: Partial<Chapter>) => {
          set({ isLoading: true, error: null });
          try {
            const updatedChapter = await db.chapter.update(id, updates);
            if (updatedChapter) {
              const chapters = get().chapters.map(chapter =>
                chapter.id === id ? (updatedChapter as Chapter) : chapter
              );
              set({ chapters: chapters as Chapter[], isLoading: false });
              
              // Update current book stats if it's loaded
              const currentBook = get().currentBook;
              if (currentBook && updatedChapter.bookId === currentBook.id) {
                const completedChapters = chapters.filter(c => c.status === 'completed').length;
                const totalWords = chapters.reduce((sum, c) => sum + c.wordCount, 0);
                
                set({
                  currentBook: {
                    ...currentBook,
                    completedChapters,
                    totalWords,
                  }
                });
              }
            } else {
              set({ error: 'Chapter not found', isLoading: false });
            }
          } catch (error) {
            set({ 
              error: error instanceof Error ? error.message : 'Failed to update chapter',
              isLoading: false 
            });
          }
        },

        startGeneration: async (bookId: string) => {
          set({ isLoading: true, error: null });
          try {
            await db.book.update(bookId, { status: 'generating' });
            const chapters = await db.chapter.findMany(bookId);
            const pendingChapters = chapters.filter(c => c.status === 'pending');
            
            if (pendingChapters.length === 0) {
              set({ error: 'No chapters to generate', isLoading: false });
              return;
            }

            const initialStatus: GenerationStatus = {
              isGenerating: true,
              currentChapter: pendingChapters[0].chapterNumber,
              totalChapters: chapters.length,
              completedChapters: chapters.filter(c => c.status === 'completed').length,
              progress: 0,
              wordsGenerated: chapters.reduce((sum, c) => sum + c.wordCount, 0),
              targetWords: chapters.reduce((sum, c) => sum + c.targetWords, 0),
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
          try {
            const stats = await db.stats.getBookStats();
            set({ stats });
          } catch (error) {
            console.error('Failed to fetch stats:', error);
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