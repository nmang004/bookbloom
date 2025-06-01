import { Book, Chapter, BookFormData } from '@/types';
import { generateId } from './utils';

class LocalStorageDB {
  private readonly BOOKS_KEY = 'bookbloom_books';
  private readonly CHAPTERS_KEY = 'bookbloom_chapters';

  // Books operations
  async getBooks(): Promise<Book[]> {
    try {
      const booksData = localStorage.getItem(this.BOOKS_KEY);
      if (!booksData) return [];
      
      const books = JSON.parse(booksData);
      return books.map((book: any) => ({
        ...book,
        createdAt: new Date(book.createdAt),
        updatedAt: book.updatedAt ? new Date(book.updatedAt) : undefined,
      }));
    } catch (error) {
      console.error('Error fetching books:', error);
      return [];
    }
  }

  async getBook(id: string): Promise<Book | null> {
    try {
      const books = await this.getBooks();
      const book = books.find(b => b.id === id);
      
      if (!book) return null;

      const chapters = await this.getChaptersByBookId(id);
      return {
        ...book,
        chapters,
        completedChapters: chapters.filter(c => c.status === 'completed').length,
        totalWords: chapters.reduce((sum, c) => sum + c.wordCount, 0),
      };
    } catch (error) {
      console.error('Error fetching book:', error);
      return null;
    }
  }

  async createBook(bookData: BookFormData): Promise<Book> {
    try {
      const newBook: Book = {
        id: generateId(),
        title: bookData.title,
        genre: bookData.genre,
        premise: bookData.premise,
        targetWords: bookData.targetWords,
        chaptersCount: bookData.chaptersCount,
        writingStyle: bookData.writingStyle,
        tone: bookData.tone,
        pov: bookData.pov,
        status: 'planning',
        createdAt: new Date(),
        completedChapters: 0,
        totalWords: 0,
      };

      const books = await this.getBooks();
      books.push(newBook);
      localStorage.setItem(this.BOOKS_KEY, JSON.stringify(books));

      // Create chapters
      if (bookData.chapters && bookData.chapters.length > 0) {
        for (let i = 0; i < bookData.chapters.length; i++) {
          const chapterData = bookData.chapters[i];
          await this.createChapter(newBook.id, {
            ...chapterData,
            chapterNumber: i + 1,
          });
        }
      }

      return newBook;
    } catch (error) {
      console.error('Error creating book:', error);
      throw new Error('Failed to create book');
    }
  }

  async updateBook(id: string, updates: Partial<Book>): Promise<Book | null> {
    try {
      const books = await this.getBooks();
      const bookIndex = books.findIndex(b => b.id === id);
      
      if (bookIndex === -1) return null;

      books[bookIndex] = {
        ...books[bookIndex],
        ...updates,
        updatedAt: new Date(),
      };

      localStorage.setItem(this.BOOKS_KEY, JSON.stringify(books));
      return books[bookIndex];
    } catch (error) {
      console.error('Error updating book:', error);
      return null;
    }
  }

  async deleteBook(id: string): Promise<boolean> {
    try {
      const books = await this.getBooks();
      const filteredBooks = books.filter(b => b.id !== id);
      
      if (filteredBooks.length === books.length) return false;

      localStorage.setItem(this.BOOKS_KEY, JSON.stringify(filteredBooks));
      
      // Delete associated chapters
      const chapters = await this.getChapters();
      const filteredChapters = chapters.filter(c => c.bookId !== id);
      localStorage.setItem(this.CHAPTERS_KEY, JSON.stringify(filteredChapters));
      
      return true;
    } catch (error) {
      console.error('Error deleting book:', error);
      return false;
    }
  }

  // Chapters operations
  async getChapters(): Promise<Chapter[]> {
    try {
      const chaptersData = localStorage.getItem(this.CHAPTERS_KEY);
      if (!chaptersData) return [];
      
      const chapters = JSON.parse(chaptersData);
      return chapters.map((chapter: any) => ({
        ...chapter,
        createdAt: new Date(chapter.createdAt),
        updatedAt: chapter.updatedAt ? new Date(chapter.updatedAt) : undefined,
      }));
    } catch (error) {
      console.error('Error fetching chapters:', error);
      return [];
    }
  }

  async getChaptersByBookId(bookId: string): Promise<Chapter[]> {
    try {
      const chapters = await this.getChapters();
      return chapters
        .filter(c => c.bookId === bookId)
        .sort((a, b) => a.chapterNumber - b.chapterNumber);
    } catch (error) {
      console.error('Error fetching chapters by book ID:', error);
      return [];
    }
  }

  async getChapter(id: string): Promise<Chapter | null> {
    try {
      const chapters = await this.getChapters();
      return chapters.find(c => c.id === id) || null;
    } catch (error) {
      console.error('Error fetching chapter:', error);
      return null;
    }
  }

  async createChapter(bookId: string, chapterData: {
    title: string;
    summary: string;
    targetWords: number;
    chapterNumber: number;
  }): Promise<Chapter> {
    try {
      const newChapter: Chapter = {
        id: generateId(),
        bookId,
        chapterNumber: chapterData.chapterNumber,
        title: chapterData.title,
        summary: chapterData.summary,
        targetWords: chapterData.targetWords,
        wordCount: 0,
        status: 'pending',
        createdAt: new Date(),
      };

      const chapters = await this.getChapters();
      chapters.push(newChapter);
      localStorage.setItem(this.CHAPTERS_KEY, JSON.stringify(chapters));

      return newChapter;
    } catch (error) {
      console.error('Error creating chapter:', error);
      throw new Error('Failed to create chapter');
    }
  }

  async updateChapter(id: string, updates: Partial<Chapter>): Promise<Chapter | null> {
    try {
      const chapters = await this.getChapters();
      const chapterIndex = chapters.findIndex(c => c.id === id);
      
      if (chapterIndex === -1) return null;

      chapters[chapterIndex] = {
        ...chapters[chapterIndex],
        ...updates,
        updatedAt: new Date(),
      };

      localStorage.setItem(this.CHAPTERS_KEY, JSON.stringify(chapters));
      return chapters[chapterIndex];
    } catch (error) {
      console.error('Error updating chapter:', error);
      return null;
    }
  }

  async deleteChapter(id: string): Promise<boolean> {
    try {
      const chapters = await this.getChapters();
      const filteredChapters = chapters.filter(c => c.id !== id);
      
      if (filteredChapters.length === chapters.length) return false;

      localStorage.setItem(this.CHAPTERS_KEY, JSON.stringify(filteredChapters));
      return true;
    } catch (error) {
      console.error('Error deleting chapter:', error);
      return false;
    }
  }

  // Stats operations
  async getStats() {
    try {
      const books = await this.getBooks();
      const chapters = await this.getChapters();

      return {
        totalBooks: books.length,
        booksInProgress: books.filter(b => b.status === 'generating').length,
        completedBooks: books.filter(b => b.status === 'completed').length,
        totalWordsGenerated: chapters.reduce((sum, c) => sum + c.wordCount, 0),
      };
    } catch (error) {
      console.error('Error fetching stats:', error);
      return {
        totalBooks: 0,
        booksInProgress: 0,
        completedBooks: 0,
        totalWordsGenerated: 0,
      };
    }
  }
}

export const db = new LocalStorageDB();