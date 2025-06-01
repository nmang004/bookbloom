export type BookStatus = 'planning' | 'generating' | 'completed' | 'paused' | 'error';
export type ChapterStatus = 'pending' | 'generating' | 'completed' | 'error';
export type WritingStyle = 'narrative' | 'descriptive' | 'conversational' | 'literary' | 'commercial';
export type Genre = 'fantasy' | 'romance' | 'mystery' | 'sci-fi' | 'thriller' | 'literary' | 'young-adult' | 'horror' | 'historical' | 'contemporary';
export type Tone = 'light' | 'serious' | 'humorous' | 'dark' | 'inspirational' | 'dramatic';
export type POV = 'first-person' | 'second-person' | 'third-person-limited' | 'third-person-omniscient';

export interface Book {
  id: string;
  title: string;
  genre: Genre | string;
  premise: string;
  targetWords: number;
  chaptersCount: number;
  writingStyle: WritingStyle | string;
  tone: Tone | string | null;
  pov: POV | string | null;
  status: BookStatus;
  createdAt: Date;
  updatedAt?: Date;
  chapters?: Chapter[];
  totalWords?: number;
  completedChapters?: number;
  progress?: number;
  coverGradient?: string;
}

export interface Chapter {
  id: string;
  bookId: string;
  chapterNumber: number;
  title: string;
  summary: string;
  targetWords: number;
  generatedContent?: string;
  wordCount: number;
  status: ChapterStatus;
  createdAt: Date;
  updatedAt?: Date;
  book?: Book;
}

export interface BookFormData {
  title: string;
  genre: Genre;
  premise: string;
  targetWords: number;
  chaptersCount: number;
  writingStyle: WritingStyle;
  tone: Tone;
  pov: POV;
  chapters: ChapterFormData[];
}

export interface ChapterFormData {
  title: string;
  summary: string;
  targetWords: number;
}

export interface GenerationStatus {
  isGenerating: boolean;
  currentChapter?: number;
  totalChapters: number;
  completedChapters: number;
  progress: number;
  estimatedTimeRemaining?: number;
  error?: string;
  wordsGenerated: number;
  targetWords: number;
}

export interface GenerationProgress {
  bookId: string;
  chapterId?: string;
  status: 'queued' | 'generating' | 'completed' | 'error';
  progress: number;
  message?: string;
  wordsGenerated?: number;
  estimatedCompletion?: Date;
}

export interface ExportOptions {
  format: 'pdf' | 'docx' | 'txt';
  includeChapterNumbers: boolean;
  includeMetadata: boolean;
  fontSize?: number;
  fontFamily?: string;
}

export interface AIGenerationRequest {
  bookId: string;
  chapterId: string;
  prompt: string;
  previousChapters?: string[];
  targetWords: number;
  style: WritingStyle;
  tone: Tone;
  pov: POV;
  genre: Genre;
}

export interface AIGenerationResponse {
  content: string;
  wordCount: number;
  success: boolean;
  error?: string;
}

export interface BookStats {
  totalBooks: number;
  booksInProgress: number;
  completedBooks: number;
  totalWordsGenerated: number;
  averageCompletionTime?: number;
}

export interface DashboardStats {
  totalBooks: number;
  booksInProgress: number;
  completedBooks: number;
  totalWordsGenerated: number;
  booksCreated?: number;
  totalWords?: number;
  chaptersCompleted?: number;
}

export interface UserPreferences {
  defaultGenre: Genre;
  defaultWritingStyle: WritingStyle;
  defaultTone: Tone;
  defaultPOV: POV;
  defaultTargetWords: number;
  defaultChaptersCount: number;
  autoSave: boolean;
  showProgressNotifications: boolean;
}