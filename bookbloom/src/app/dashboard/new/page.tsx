'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Layout from '@/components/layout/Layout';
import BookPlanningForm from '@/components/forms/BookPlanningForm';
import ChapterOutlineBuilder from '@/components/forms/ChapterOutlineBuilder';
import { useBookStore } from '@/stores/book-store';
import { BookFormData, ChapterFormData } from '@/types';

export default function NewBookPage() {
  const router = useRouter();
  const { createBook, isLoading, error, clearError } = useBookStore();
  
  const [step, setStep] = useState<'planning' | 'outline' | 'review'>('planning');
  const [bookData, setBookData] = useState<Partial<BookFormData>>({
    title: '',
    genre: 'fantasy',
    premise: '',
    targetWords: 50000,
    chaptersCount: 10,
    writingStyle: 'narrative',
    tone: 'light',
    pov: 'third-person-limited',
    chapters: [],
  });

  const handlePlanningSubmit = (formData: BookFormData) => {
    setBookData(formData);
    
    // Generate initial chapter outline
    const wordsPerChapter = Math.floor(formData.targetWords / formData.chaptersCount);
    const initialChapters: ChapterFormData[] = Array.from(
      { length: formData.chaptersCount },
      (_, i) => ({
        title: `Chapter ${i + 1}`,
        summary: '',
        targetWords: wordsPerChapter,
      })
    );
    
    setBookData(prev => ({ ...prev, chapters: initialChapters }));
    setStep('outline');
  };

  const handleChapterChange = (chapters: ChapterFormData[]) => {
    setBookData(prev => ({ ...prev, chapters }));
  };

  const handleCreateBook = async () => {
    if (!bookData.title || !bookData.premise || !bookData.chapters) {
      return;
    }

    const book = await createBook(bookData as BookFormData);
    if (book) {
      router.push(`/dashboard/books/${book.id}`);
    }
  };

  const canProceedToReview = bookData.chapters && bookData.chapters.length > 0 && 
    bookData.chapters.every(chapter => chapter.title && chapter.summary);

  return (
    <Layout>
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-3xl font-bold text-text-primary mb-2">
            Create New Book ✨
          </h1>
          <p className="text-text-secondary">
            Let's bring your story idea to life, one step at a time.
          </p>
        </div>

        {/* Progress Indicator */}
        <div className="flex items-center justify-center mb-8">
          <div className="flex items-center gap-4">
            {[
              { key: 'planning', label: 'Planning', icon: '📝' },
              { key: 'outline', label: 'Outline', icon: '📋' },
              { key: 'review', label: 'Review', icon: '👀' },
            ].map((stepItem, index) => (
              <div key={stepItem.key} className="flex items-center">
                <div
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                    step === stepItem.key
                      ? 'bg-sakura-main text-white'
                      : index < ['planning', 'outline', 'review'].indexOf(step)
                      ? 'bg-green-100 text-green-700'
                      : 'bg-sakura-light text-sakura-dark'
                  }`}
                >
                  <span>{stepItem.icon}</span>
                  <span className="font-medium">{stepItem.label}</span>
                </div>
                
                {index < 2 && (
                  <div className="w-8 h-px bg-sakura-soft mx-2"></div>
                )}
              </div>
            ))}
          </div>
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

        {/* Step Content */}
        {step === 'planning' && (
          <BookPlanningForm
            onSubmit={handlePlanningSubmit}
            initialData={bookData}
          />
        )}

        {step === 'outline' && bookData.chapters && (
          <div className="card-sakura p-8">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gradient-sakura mb-2">
                Chapter Outline
              </h2>
              <p className="text-text-secondary">
                Define your chapters and their content. You can adjust these later.
              </p>
            </div>

            <div className="mb-6 p-4 bg-sakura-light/30 rounded-lg">
              <h3 className="font-semibold text-text-primary mb-2">📖 {bookData.title}</h3>
              <p className="text-sm text-text-secondary mb-2">{bookData.premise}</p>
              <div className="flex items-center gap-4 text-xs text-text-muted">
                <span>Genre: {bookData.genre}</span>
                <span>Target: {bookData.targetWords?.toLocaleString()} words</span>
                <span>Style: {bookData.writingStyle}</span>
                <span>Tone: {bookData.tone}</span>
              </div>
            </div>

            <ChapterOutlineBuilder
              chapters={bookData.chapters}
              onChange={handleChapterChange}
              targetWords={bookData.targetWords || 50000}
            />

            <div className="flex justify-between mt-8">
              <button
                onClick={() => setStep('planning')}
                className="btn-sakura-outline"
              >
                ← Back to Planning
              </button>
              
              <button
                onClick={() => setStep('review')}
                disabled={!canProceedToReview}
                className="btn-sakura disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Review & Create →
              </button>
            </div>
          </div>
        )}

        {step === 'review' && (
          <div className="card-sakura p-8">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gradient-sakura mb-2">
                Review Your Book
              </h2>
              <p className="text-text-secondary">
                Everything looks good? Let's create your book and start the magic!
              </p>
            </div>

            {/* Book Summary */}
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-text-primary mb-3">Book Details</h3>
                  <div className="space-y-2 text-sm">
                    <div>
                      <span className="text-text-secondary">Title:</span>
                      <span className="ml-2 font-medium">{bookData.title}</span>
                    </div>
                    <div>
                      <span className="text-text-secondary">Genre:</span>
                      <span className="ml-2 badge-sakura">{bookData.genre}</span>
                    </div>
                    <div>
                      <span className="text-text-secondary">Target Words:</span>
                      <span className="ml-2 font-medium">{bookData.targetWords?.toLocaleString()}</span>
                    </div>
                    <div>
                      <span className="text-text-secondary">Chapters:</span>
                      <span className="ml-2 font-medium">{bookData.chapters?.length}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-text-primary mb-3">Writing Style</h3>
                  <div className="space-y-2 text-sm">
                    <div>
                      <span className="text-text-secondary">Style:</span>
                      <span className="ml-2 font-medium">{bookData.writingStyle}</span>
                    </div>
                    <div>
                      <span className="text-text-secondary">Tone:</span>
                      <span className="ml-2 font-medium">{bookData.tone}</span>
                    </div>
                    <div>
                      <span className="text-text-secondary">POV:</span>
                      <span className="ml-2 font-medium">{bookData.pov}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-text-primary mb-3">Premise</h3>
                <p className="text-text-secondary text-sm bg-sakura-light/30 p-4 rounded-lg">
                  {bookData.premise}
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-text-primary mb-3">
                  Chapter Outline ({bookData.chapters?.length} chapters)
                </h3>
                <div className="space-y-2 max-h-60 overflow-y-auto">
                  {bookData.chapters?.map((chapter, index) => (
                    <div key={index} className="p-3 bg-sakura-light/30 rounded-lg">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-medium text-text-primary">{chapter.title}</span>
                        <span className="text-xs text-text-secondary">
                          {chapter.targetWords.toLocaleString()} words
                        </span>
                      </div>
                      <p className="text-sm text-text-secondary">{chapter.summary}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex justify-between mt-8">
              <button
                onClick={() => setStep('outline')}
                className="btn-sakura-outline"
              >
                ← Back to Outline
              </button>
              
              <button
                onClick={handleCreateBook}
                disabled={isLoading}
                className="btn-sakura disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {isLoading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Creating...
                  </>
                ) : (
                  <>
                    🌸 Create Book
                  </>
                )}
              </button>
            </div>
          </div>
        )}

        {/* Tips */}
        <div className="bg-gradient-to-r from-sky-blue to-sakura-light rounded-lg p-6">
          <h3 className="font-semibold text-text-primary mb-3 flex items-center gap-2">
            <span>💡</span>
            Writing Tips
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-text-secondary">
            <div>
              <strong>Detailed premises work better:</strong> Include character names, conflicts, and setting details.
            </div>
            <div>
              <strong>Chapter summaries guide AI:</strong> The more specific you are, the better the generated content.
            </div>
            <div>
              <strong>Word counts are flexible:</strong> AI will aim for your targets but prioritize story quality.
            </div>
            <div>
              <strong>You can always edit:</strong> Generated content can be refined and regenerated as needed.
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}