'use client';

import { useState } from 'react';
import { BookFormData, Genre, WritingStyle, Tone, POV } from '@/types';

interface BookPlanningFormProps {
  onSubmit: (data: BookFormData) => void;
  initialData?: Partial<BookFormData>;
}

export default function BookPlanningForm({ onSubmit, initialData }: BookPlanningFormProps) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<Partial<BookFormData>>({
    title: '',
    genre: 'fantasy' as Genre,
    premise: '',
    targetWords: 50000,
    chaptersCount: 10,
    writingStyle: 'narrative' as WritingStyle,
    tone: 'light' as Tone,
    pov: 'third-person-limited' as POV,
    chapters: [],
    ...initialData,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.title && formData.premise) {
      onSubmit(formData as BookFormData);
    }
  };

  return (
    <div className="card-sakura p-8 max-w-2xl mx-auto bloom-in">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gradient-sakura mb-2">
          Create Your Book
        </h2>
        <div className="flex items-center gap-2 mb-4">
          {[1, 2, 3].map((stepNumber) => (
            <div
              key={stepNumber}
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all ${
                step >= stepNumber
                  ? 'bg-sakura-main text-white'
                  : 'bg-sakura-light text-sakura-dark'
              }`}
            >
              {stepNumber}
            </div>
          ))}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {step === 1 && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Book Title
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="input-sakura w-full"
                placeholder="Enter your book title..."
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Genre
              </label>
              <select
                value={formData.genre}
                onChange={(e) => setFormData({ ...formData, genre: e.target.value as Genre })}
                className="input-sakura w-full"
              >
                <option value="fantasy">Fantasy</option>
                <option value="romance">Romance</option>
                <option value="mystery">Mystery</option>
                <option value="sci-fi">Science Fiction</option>
                <option value="thriller">Thriller</option>
                <option value="literary">Literary Fiction</option>
                <option value="young-adult">Young Adult</option>
                <option value="horror">Horror</option>
                <option value="historical">Historical Fiction</option>
                <option value="contemporary">Contemporary Fiction</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Premise
              </label>
              <textarea
                value={formData.premise}
                onChange={(e) => setFormData({ ...formData, premise: e.target.value })}
                className="input-sakura w-full h-32 resize-none"
                placeholder="Describe your story idea, main characters, and plot..."
                required
              />
            </div>
          </div>
        )}

        <div className="flex justify-between pt-4">
          {step > 1 && (
            <button
              type="button"
              onClick={() => setStep(step - 1)}
              className="btn-sakura-outline"
            >
              Previous
            </button>
          )}
          
          {step < 3 ? (
            <button
              type="button"
              onClick={() => setStep(step + 1)}
              className="btn-sakura ml-auto"
              disabled={step === 1 && (!formData.title || !formData.premise)}
            >
              Next
            </button>
          ) : (
            <button type="submit" className="btn-sakura ml-auto">
              Create Book
            </button>
          )}
        </div>
      </form>
    </div>
  );
}