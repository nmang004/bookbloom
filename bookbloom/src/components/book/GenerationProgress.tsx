'use client';

import { GenerationStatus } from '@/types';

interface GenerationProgressProps {
  status: GenerationStatus;
  bookTitle: string;
}

export default function GenerationProgress({ status, bookTitle }: GenerationProgressProps) {
  const {
    isGenerating,
    currentChapter,
    totalChapters,
    completedChapters,
    progress,
    estimatedTimeRemaining,
    error,
    wordsGenerated,
    targetWords,
  } = status;

  const formatTimeRemaining = (minutes: number): string => {
    if (minutes < 60) return `${Math.round(minutes)} min`;
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = Math.round(minutes % 60);
    return `${hours}h ${remainingMinutes}m`;
  };

  const wordProgress = targetWords > 0 ? (wordsGenerated / targetWords) * 100 : 0;

  return (
    <div className="card-sakura p-6 bloom-in">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-text-primary mb-1">
            Generating &ldquo;{bookTitle}&rdquo;
          </h2>
          <p className="text-text-secondary">
            {isGenerating ? 'AI is crafting your story...' : 'Generation paused'}
          </p>
        </div>
        
        {isGenerating && (
          <div className="flex items-center gap-2 text-sakura-main">
            <div className="w-2 h-2 bg-sakura-main rounded-full animate-pulse" />
            <span className="text-sm font-medium">Generating</span>
          </div>
        )}
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
          <div className="flex items-center gap-2 text-red-700">
            <span>❌</span>
            <span className="font-medium">Generation Error</span>
          </div>
          <p className="text-red-600 text-sm mt-1">{error}</p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="glass-card p-4">
          <div className="text-2xl font-bold text-sakura-main mb-1">
            {completedChapters}/{totalChapters}
          </div>
          <div className="text-sm text-text-secondary">Chapters Complete</div>
        </div>
        
        <div className="glass-card p-4">
          <div className="text-2xl font-bold text-sakura-main mb-1">
            {wordsGenerated.toLocaleString()}
          </div>
          <div className="text-sm text-text-secondary">
            Words Generated ({Math.round(wordProgress)}%)
          </div>
        </div>
        
        <div className="glass-card p-4">
          <div className="text-2xl font-bold text-sakura-main mb-1">
            {estimatedTimeRemaining ? formatTimeRemaining(estimatedTimeRemaining) : '--'}
          </div>
          <div className="text-sm text-text-secondary">Est. Time Remaining</div>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-text-primary">
              Overall Progress
            </span>
            <span className="text-sm text-text-secondary">
              {Math.round(progress)}%
            </span>
          </div>
          <div className="progress-sakura h-3">
            <div 
              className="progress-sakura-fill" 
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-text-primary">
              Word Count Progress
            </span>
            <span className="text-sm text-text-secondary">
              {wordsGenerated.toLocaleString()} / {targetWords.toLocaleString()}
            </span>
          </div>
          <div className="progress-sakura h-2">
            <div 
              className="progress-sakura-fill" 
              style={{ width: `${Math.min(wordProgress, 100)}%` }}
            />
          </div>
        </div>
      </div>

      {currentChapter && (
        <div className="mt-6 pt-6 border-t border-sakura-soft/20">
          <div className="flex items-center gap-2 text-sm">
            <span className="text-text-secondary">Currently generating:</span>
            <span className="font-medium text-sakura-main">
              Chapter {currentChapter}
            </span>
            <div className="flex items-center gap-1 ml-auto">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="w-1 h-1 bg-sakura-main rounded-full animate-pulse"
                  style={{ animationDelay: `${i * 0.2}s` }}
                />
              ))}
            </div>
          </div>
        </div>
      )}

      {!isGenerating && completedChapters < totalChapters && !error && (
        <div className="mt-6 pt-6 border-t border-sakura-soft/20">
          <button className="btn-sakura w-full">
            Resume Generation
          </button>
        </div>
      )}
    </div>
  );
}