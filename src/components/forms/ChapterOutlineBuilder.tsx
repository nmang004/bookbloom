'use client';

import { useState } from 'react';
import { ChapterFormData } from '@/types';

interface ChapterOutlineBuilderProps {
  chapters: ChapterFormData[];
  onChange: (chapters: ChapterFormData[]) => void;
  targetWords: number;
}

export default function ChapterOutlineBuilder({ 
  chapters, 
  onChange, 
  targetWords 
}: ChapterOutlineBuilderProps) {
  const [expandedChapter, setExpandedChapter] = useState<number | null>(null);

  const addChapter = () => {
    const newChapter: ChapterFormData = {
      title: `Chapter ${chapters.length + 1}`,
      summary: '',
      targetWords: Math.floor(targetWords / (chapters.length + 1)),
    };
    
    const updatedChapters = [...chapters, newChapter];
    redistributeWords(updatedChapters);
  };

  const removeChapter = (index: number) => {
    const updatedChapters = chapters.filter((_, i) => i !== index);
    redistributeWords(updatedChapters);
  };

  const redistributeWords = (updatedChapters: ChapterFormData[]) => {
    const wordsPerChapter = Math.floor(targetWords / updatedChapters.length);
    const redistributed = updatedChapters.map((chapter, index) => ({
      ...chapter,
      title: chapter.title || `Chapter ${index + 1}`,
      targetWords: wordsPerChapter,
    }));
    onChange(redistributed);
  };

  const updateChapter = (index: number, updates: Partial<ChapterFormData>) => {
    const updatedChapters = chapters.map((chapter, i) =>
      i === index ? { ...chapter, ...updates } : chapter
    );
    onChange(updatedChapters);
  };

  const totalWords = chapters.reduce((sum, chapter) => sum + chapter.targetWords, 0);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-text-primary">
          Chapter Outline
        </h3>
        <div className="text-sm text-text-secondary">
          {totalWords.toLocaleString()} / {targetWords.toLocaleString()} words
        </div>
      </div>

      <div className="space-y-3">
        {chapters.map((chapter, index) => (
          <div key={index} className="card-sakura p-4">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <input
                  type="text"
                  value={chapter.title}
                  onChange={(e) => updateChapter(index, { title: e.target.value })}
                  className="input-sakura w-full mb-2"
                  placeholder={`Chapter ${index + 1} title...`}
                />
                
                {expandedChapter === index && (
                  <div className="space-y-3 mt-3">
                    <textarea
                      value={chapter.summary}
                      onChange={(e) => updateChapter(index, { summary: e.target.value })}
                      className="input-sakura w-full h-24 resize-none"
                      placeholder="Chapter summary and key events..."
                    />
                    
                    <div className="flex items-center gap-4">
                      <div className="flex-1">
                        <label className="block text-sm text-text-secondary mb-1">
                          Target Words
                        </label>
                        <input
                          type="number"
                          value={chapter.targetWords}
                          onChange={(e) => updateChapter(index, { 
                            targetWords: parseInt(e.target.value) || 0 
                          })}
                          className="input-sakura w-full"
                          min="500"
                          max="10000"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
              
              <div className="flex items-center gap-2 ml-4">
                <button
                  type="button"
                  onClick={() => setExpandedChapter(
                    expandedChapter === index ? null : index
                  )}
                  className="text-sakura-main hover:text-sakura-deep transition-colors"
                >
                  {expandedChapter === index ? '−' : '+'}
                </button>
                
                {chapters.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeChapter(index)}
                    className="text-red-500 hover:text-red-700 transition-colors"
                  >
                    ×
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={addChapter}
        className="btn-sakura-outline w-full"
      >
        + Add Chapter
      </button>
    </div>
  );
}