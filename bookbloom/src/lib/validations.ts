import { z } from 'zod';

export const bookFormSchema = z.object({
  title: z
    .string()
    .min(1, 'Title is required')
    .max(200, 'Title must be less than 200 characters'),
  
  genre: z.enum([
    'fantasy',
    'romance',
    'mystery',
    'sci-fi',
    'thriller',
    'literary',
    'young-adult',
    'horror',
    'historical',
    'contemporary',
  ]),
  
  premise: z
    .string()
    .min(50, 'Premise must be at least 50 characters')
    .max(2000, 'Premise must be less than 2000 characters'),
  
  targetWords: z
    .number()
    .min(5000, 'Target words must be at least 5,000')
    .max(200000, 'Target words must be less than 200,000'),
  
  chaptersCount: z
    .number()
    .min(3, 'Must have at least 3 chapters')
    .max(50, 'Cannot have more than 50 chapters'),
  
  writingStyle: z.enum([
    'narrative',
    'descriptive',
    'conversational',
    'literary',
    'commercial',
  ]),
  
  tone: z.enum([
    'light',
    'serious',
    'humorous',
    'dark',
    'inspirational',
    'dramatic',
  ]),
  
  pov: z.enum([
    'first-person',
    'second-person',
    'third-person-limited',
    'third-person-omniscient',
  ]),
});

export const chapterFormSchema = z.object({
  title: z
    .string()
    .min(1, 'Chapter title is required')
    .max(100, 'Chapter title must be less than 100 characters'),
  
  summary: z
    .string()
    .min(20, 'Chapter summary must be at least 20 characters')
    .max(1000, 'Chapter summary must be less than 1000 characters'),
  
  targetWords: z
    .number()
    .min(500, 'Target words must be at least 500')
    .max(10000, 'Target words must be less than 10,000'),
});

export const chapterUpdateSchema = z.object({
  title: z.string().min(1).max(100).optional(),
  summary: z.string().min(20).max(1000).optional(),
  targetWords: z.number().min(500).max(10000).optional(),
  generatedContent: z.string().optional(),
  wordCount: z.number().min(0).optional(),
  status: z.enum(['pending', 'generating', 'completed', 'error']).optional(),
});

export const bookUpdateSchema = z.object({
  title: z.string().min(1).max(200).optional(),
  genre: z.enum([
    'fantasy',
    'romance',
    'mystery',
    'sci-fi',
    'thriller',
    'literary',
    'young-adult',
    'horror',
    'historical',
    'contemporary',
  ]).optional(),
  premise: z.string().min(50).max(2000).optional(),
  targetWords: z.number().min(5000).max(200000).optional(),
  chaptersCount: z.number().min(3).max(50).optional(),
  writingStyle: z.enum([
    'narrative',
    'descriptive',
    'conversational',
    'literary',
    'commercial',
  ]).optional(),
  tone: z.enum([
    'light',
    'serious',
    'humorous',
    'dark',
    'inspirational',
    'dramatic',
  ]).optional(),
  pov: z.enum([
    'first-person',
    'second-person',
    'third-person-limited',
    'third-person-omniscient',
  ]).optional(),
  status: z.enum(['planning', 'generating', 'completed', 'error']).optional(),
});

export const aiGenerationRequestSchema = z.object({
  bookId: z.string().min(1),
  chapterId: z.string().min(1),
  prompt: z.string().min(1),
  previousChapters: z.array(z.string()).optional(),
  targetWords: z.number().min(500).max(10000),
  style: z.enum([
    'narrative',
    'descriptive',
    'conversational',
    'literary',
    'commercial',
  ]),
  tone: z.enum([
    'light',
    'serious',
    'humorous',
    'dark',
    'inspirational',
    'dramatic',
  ]),
  pov: z.enum([
    'first-person',
    'second-person',
    'third-person-limited',
    'third-person-omniscient',
  ]),
  genre: z.enum([
    'fantasy',
    'romance',
    'mystery',
    'sci-fi',
    'thriller',
    'literary',
    'young-adult',
    'horror',
    'historical',
    'contemporary',
  ]),
});

export const exportOptionsSchema = z.object({
  format: z.enum(['pdf', 'docx', 'txt']),
  includeChapterNumbers: z.boolean().default(true),
  includeMetadata: z.boolean().default(true),
  fontSize: z.number().min(8).max(24).optional(),
  fontFamily: z.string().optional(),
});

// Validation helpers
export function validateBookForm(data: unknown) {
  return bookFormSchema.safeParse(data);
}

export function validateChapterForm(data: unknown) {
  return chapterFormSchema.safeParse(data);
}

export function validateChapterUpdate(data: unknown) {
  return chapterUpdateSchema.safeParse(data);
}

export function validateBookUpdate(data: unknown) {
  return bookUpdateSchema.safeParse(data);
}

export function validateAIGenerationRequest(data: unknown) {
  return aiGenerationRequestSchema.safeParse(data);
}

export function validateExportOptions(data: unknown) {
  return exportOptionsSchema.safeParse(data);
}

// Custom validation functions
export function validateWordCount(wordCount: number, min = 0, max = Infinity): boolean {
  return wordCount >= min && wordCount <= max;
}

export function validateChapterOrder(chapters: { chapterNumber: number }[]): boolean {
  const numbers = chapters.map(c => c.chapterNumber).sort((a, b) => a - b);
  
  for (let i = 0; i < numbers.length; i++) {
    if (numbers[i] !== i + 1) return false;
  }
  
  return true;
}

export function validateTargetWordsDistribution(
  chapters: { targetWords: number }[],
  totalTargetWords: number
): boolean {
  const totalChapterWords = chapters.reduce((sum, c) => sum + c.targetWords, 0);
  const tolerance = totalTargetWords * 0.1; // 10% tolerance
  
  return Math.abs(totalChapterWords - totalTargetWords) <= tolerance;
}

// Error message helpers
export function getValidationErrors(result: { success: boolean; error?: { issues?: { path: string[]; message: string }[] } }) {
  if (result.success) return [];
  
  return result.error?.issues?.map((issue: { path: string[]; message: string }) => ({
    field: issue.path.join('.'),
    message: issue.message,
  })) || [];
}

export function formatValidationError(field: string, message: string): string {
  return `${field}: ${message}`;
}