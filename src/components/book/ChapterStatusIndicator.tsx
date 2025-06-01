'use client';

import { Chapter } from '@/types';

interface ChapterStatusIndicatorProps {
  chapter: Chapter;
  isActive?: boolean;
  onClick?: () => void;
}

export default function ChapterStatusIndicator({ 
  chapter, 
  isActive = false, 
  onClick 
}: ChapterStatusIndicatorProps) {
  const statusConfig = {
    pending: {
      icon: '⭕',
      color: 'text-gray-400',
      bg: 'bg-gray-100',
      label: 'Pending',
    },
    generating: {
      icon: '⚡',
      color: 'text-yellow-600',
      bg: 'bg-yellow-100',
      label: 'Generating',
    },
    completed: {
      icon: '🌸',
      color: 'text-green-600',
      bg: 'bg-green-100',
      label: 'Completed',
    },
    error: {
      icon: '❌',
      color: 'text-red-600',
      bg: 'bg-red-100',
      label: 'Error',
    },
  };

  const config = statusConfig[chapter.status];
  const progressPercentage = chapter.targetWords > 0 
    ? Math.min((chapter.wordCount / chapter.targetWords) * 100, 100)
    : 0;

  return (
    <div
      className={`card-sakura p-4 cursor-pointer transition-all duration-200 ${
        isActive 
          ? 'ring-2 ring-sakura-main ring-opacity-50 bg-sakura-light/50' 
          : 'hover:shadow-[var(--shadow-bloom)]'
      } ${onClick ? 'hover:scale-105' : ''}`}
      onClick={onClick}
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="text-lg">{config.icon}</span>
          <span className="font-medium text-text-primary">
            {chapter.title}
          </span>
        </div>
        
        <span className={`text-xs px-2 py-1 rounded-full font-medium ${config.color} ${config.bg}`}>
          {config.label}
        </span>
      </div>

      {chapter.summary && (
        <p className="text-sm text-text-secondary mb-3 line-clamp-2">
          {chapter.summary}
        </p>
      )}

      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs text-text-secondary">
          <span>Progress</span>
          <span>
            {chapter.wordCount.toLocaleString()} / {chapter.targetWords.toLocaleString()} words
          </span>
        </div>
        
        <div className="progress-sakura h-1.5">
          <div 
            className="progress-sakura-fill transition-all duration-500" 
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
      </div>

      {chapter.status === 'generating' && (
        <div className="mt-3 flex items-center gap-2 text-xs text-sakura-main">
          <div className="flex items-center gap-1">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="w-1 h-1 bg-sakura-main rounded-full animate-pulse"
                style={{ animationDelay: `${i * 0.2}s` }}
              />
            ))}
          </div>
          <span>AI is writing...</span>
        </div>
      )}

      {chapter.status === 'completed' && chapter.wordCount > 0 && (
        <div className="mt-3 text-xs text-green-600 flex items-center gap-1">
          <span>✨</span>
          <span>Chapter complete!</span>
        </div>
      )}

      {chapter.status === 'error' && (
        <div className="mt-3 text-xs text-red-600 flex items-center gap-1">
          <span>⚠️</span>
          <span>Generation failed - click to retry</span>
        </div>
      )}
    </div>
  );
}