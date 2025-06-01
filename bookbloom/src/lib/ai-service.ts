import { 
  AIGenerationRequest, 
  AIGenerationResponse, 
  WritingStyle, 
  Tone, 
  Genre 
} from '@/types';

class AIService {
  private readonly baseUrl = '/api/ai';
  private readonly maxRetries = 3;
  private readonly retryDelay = 1000;

  async generateChapter(request: AIGenerationRequest): Promise<AIGenerationResponse> {
    try {
      const response = await this.makeRequest('/generate-chapter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(request),
      });

      if (!response.ok) {
        throw new Error(`API request failed: ${response.status}`);
      }

      const result = await response.json();
      return result;
    } catch (error) {
      console.error('Chapter generation failed:', error);
      return {
        content: '',
        wordCount: 0,
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred',
      };
    }
  }

  async generateOutline(
    premise: string,
    genre: Genre,
    chaptersCount: number,
    targetWords: number
  ): Promise<{ chapters: Array<{ title: string; summary: string; targetWords: number }> }> {
    try {
      const response = await this.makeRequest('/generate-outline', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          premise,
          genre,
          chaptersCount,
          targetWords,
        }),
      });

      if (!response.ok) {
        throw new Error(`Outline generation failed: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Outline generation failed:', error);
      
      // Fallback: generate basic outline
      return this.generateFallbackOutline(chaptersCount, targetWords);
    }
  }

  async improveContent(
    content: string,
    instructions: string,
    style: WritingStyle,
    tone: Tone
  ): Promise<AIGenerationResponse> {
    try {
      const response = await this.makeRequest('/improve-content', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content,
          instructions,
          style,
          tone,
        }),
      });

      if (!response.ok) {
        throw new Error(`Content improvement failed: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Content improvement failed:', error);
      return {
        content,
        wordCount: content.split(' ').length,
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred',
      };
    }
  }

  private async makeRequest(endpoint: string, options: RequestInit): Promise<Response> {
    let lastError: Error;

    for (let attempt = 1; attempt <= this.maxRetries; attempt++) {
      try {
        const response = await fetch(`${this.baseUrl}${endpoint}`, options);
        return response;
      } catch (error) {
        lastError = error instanceof Error ? error : new Error('Request failed');
        
        if (attempt < this.maxRetries) {
          await this.delay(this.retryDelay * attempt);
        }
      }
    }

    throw lastError!;
  }

  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  private generateFallbackOutline(
    chaptersCount: number,
    targetWords: number
  ): { chapters: Array<{ title: string; summary: string; targetWords: number }> } {
    const wordsPerChapter = Math.floor(targetWords / chaptersCount);
    
    const chapters = Array.from({ length: chaptersCount }, (_, i) => ({
      title: `Chapter ${i + 1}`,
      summary: `Plot development and character progression for chapter ${i + 1}.`,
      targetWords: wordsPerChapter,
    }));

    return { chapters };
  }

  // Prompt engineering helpers
  createGenerationPrompt(request: AIGenerationRequest): string {
    const {
      prompt,
      previousChapters = [],
      targetWords,
      style,
      tone,
      pov,
      genre,
    } = request;

    let systemPrompt = `You are a professional ${genre} author. Write a compelling chapter with the following specifications:

WRITING STYLE: ${style}
TONE: ${tone}
POINT OF VIEW: ${pov}
TARGET WORD COUNT: ${targetWords} words
GENRE: ${genre}

`;

    if (previousChapters.length > 0) {
      systemPrompt += `PREVIOUS CHAPTERS SUMMARY:
${previousChapters.join('\n\n')}

`;
    }

    systemPrompt += `CHAPTER REQUIREMENTS:
${prompt}

Please write a complete chapter that:
1. Matches the specified tone and style
2. Is approximately ${targetWords} words
3. Maintains consistency with previous chapters
4. Advances the plot meaningfully
5. Includes engaging dialogue and descriptions
6. Ends with appropriate pacing for the story

Begin writing the chapter now:`;

    return systemPrompt;
  }

  createOutlinePrompt(
    premise: string,
    genre: Genre,
    chaptersCount: number,
    targetWords: number
  ): string {
    return `Create a detailed ${chaptersCount}-chapter outline for a ${genre} novel with the following premise:

PREMISE: ${premise}

REQUIREMENTS:
- Total target word count: ${targetWords} words
- Number of chapters: ${chaptersCount}
- Genre: ${genre}

For each chapter, provide:
1. A compelling chapter title
2. A detailed summary (2-3 sentences) describing key events, character development, and plot progression
3. Suggested word count for that chapter

Ensure the outline:
- Has a clear beginning, middle, and end
- Includes character development arcs
- Maintains appropriate pacing for the genre
- Creates engaging conflicts and resolutions
- Builds toward a satisfying conclusion

Return the response in this JSON format:
{
  "chapters": [
    {
      "title": "Chapter Title",
      "summary": "Chapter summary describing key events and progression",
      "targetWords": 5000
    }
  ]
}`;
  }

  createImprovementPrompt(
    content: string,
    instructions: string,
    style: WritingStyle,
    tone: Tone
  ): string {
    return `Please improve the following content based on these instructions:

INSTRUCTIONS: ${instructions}

MAINTAIN:
- Writing style: ${style}
- Tone: ${tone}
- Original story elements and character voices
- Approximate word count

CONTENT TO IMPROVE:
${content}

Please provide the improved version while maintaining the original intent and flow of the story.`;
  }
}

export const aiService = new AIService();