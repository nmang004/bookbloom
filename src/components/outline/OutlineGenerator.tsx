"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { 
  FileText, 
  Plus, 
  Settings, 
  Download,
  Sparkles,
  GripVertical,
  Edit3,
  Save,
  X,
  Check,
  AlertCircle,
  Loader2,
  ChevronDown,
  ChevronUp,
  MoreHorizontal,
  Copy,
  Trash2
} from "lucide-react"
import { Reorder } from 'framer-motion'
import { Chapter, ChapterStatus, Outline, OutlineStructure, PacingPreference } from "@/types/ai"

interface OutlineGeneratorProps {
  bookId: string
  bookTitle: string
  bookSynopsis: string
  bookGenre: string
}

interface OutlineConfig {
  chapters: number
  structure: OutlineStructure
  pacing: PacingPreference
}

const STRUCTURE_OPTIONS = [
  { value: 'three-act' as OutlineStructure, label: 'Three-Act Structure', description: 'Classic beginning, middle, end structure' },
  { value: 'heros-journey' as OutlineStructure, label: "Hero's Journey", description: 'Joseph Campbell\'s monomyth framework' },
  { value: 'custom' as OutlineStructure, label: 'Custom Structure', description: 'Flexible structure for unique stories' }
]

const PACING_OPTIONS = [
  { value: 'fast' as PacingPreference, label: 'Fast-Paced', description: 'Quick plot progression, high energy' },
  { value: 'moderate' as PacingPreference, label: 'Moderate', description: 'Balanced pacing with steady development' },
  { value: 'slow' as PacingPreference, label: 'Contemplative', description: 'Character-driven, thoughtful progression' }
]

const STATUS_CONFIG = {
  planned: { label: 'Planned', color: 'bg-charcoal-200 text-charcoal-700', icon: '📋' },
  writing: { label: 'Writing', color: 'bg-yellow-200 text-yellow-800', icon: '✍️' },
  draft: { label: 'Draft', color: 'bg-blue-200 text-blue-800', icon: '📝' },
  review: { label: 'Review', color: 'bg-purple-200 text-purple-800', icon: '🔍' },
  final: { label: 'Final', color: 'bg-green-200 text-green-800', icon: '✅' }
}

// Manual outline templates
const OUTLINE_TEMPLATES = {
  'three-act': {
    name: 'Three-Act Structure',
    description: 'Classic beginning, middle, end with setup, confrontation, resolution',
    chapters: [
      { title: 'Opening Hook', act: 1, purpose: 'Introduce protagonist and world' },
      { title: 'Inciting Incident', act: 1, purpose: 'Event that starts the main conflict' },
      { title: 'First Plot Point', act: 1, purpose: 'Enter Act II, raise the stakes' },
      { title: 'Rising Action', act: 2, purpose: 'Build tension and develop characters' },
      { title: 'Midpoint', act: 2, purpose: 'Major revelation or plot twist' },
      { title: 'Crisis Point', act: 2, purpose: 'Everything seems lost' },
      { title: 'Climax', act: 3, purpose: 'Final confrontation' },
      { title: 'Resolution', act: 3, purpose: 'Wrap up loose ends' }
    ]
  },
  'heros-journey': {
    name: "Hero's Journey",
    description: 'Joseph Campbell\'s monomyth structure for transformative adventures',
    chapters: [
      { title: 'Ordinary World', stage: 'departure', purpose: 'Establish normal life before adventure' },
      { title: 'Call to Adventure', stage: 'departure', purpose: 'The quest begins' },
      { title: 'Refusal of the Call', stage: 'departure', purpose: 'Initial hesitation and doubt' },
      { title: 'Meeting the Mentor', stage: 'departure', purpose: 'Gain wisdom and magical aid' },
      { title: 'Crossing the Threshold', stage: 'departure', purpose: 'Enter the special world' },
      { title: 'Tests and Allies', stage: 'initiation', purpose: 'Face challenges, make friends and enemies' },
      { title: 'Approach to the Inmost Cave', stage: 'initiation', purpose: 'Prepare for major challenge' },
      { title: 'The Ordeal', stage: 'initiation', purpose: 'Face greatest fear or crisis' },
      { title: 'Reward (Seizing the Sword)', stage: 'initiation', purpose: 'Survive and gain something' },
      { title: 'The Road Back', stage: 'return', purpose: 'Begin journey back to ordinary world' },
      { title: 'Resurrection', stage: 'return', purpose: 'Final test and transformation' },
      { title: 'Return with the Elixir', stage: 'return', purpose: 'Return home changed' }
    ]
  },
  'mystery': {
    name: 'Mystery Structure',
    description: 'Classic mystery/detective story progression',
    chapters: [
      { title: 'The Crime', stage: 'setup', purpose: 'Establish the mystery to be solved' },
      { title: 'Investigation Begins', stage: 'setup', purpose: 'Detective takes the case' },
      { title: 'First Clues', stage: 'investigation', purpose: 'Gather initial evidence' },
      { title: 'Red Herrings', stage: 'investigation', purpose: 'False leads and misdirection' },
      { title: 'Deeper Mystery', stage: 'investigation', purpose: 'Complexity increases' },
      { title: 'Crisis Point', stage: 'investigation', purpose: 'Investigation seems to fail' },
      { title: 'Revelation', stage: 'resolution', purpose: 'Key insight or evidence' },
      { title: 'Confrontation', stage: 'resolution', purpose: 'Face the culprit' },
      { title: 'Resolution', stage: 'resolution', purpose: 'Explain the solution' }
    ]
  },
  'romance': {
    name: 'Romance Arc',
    description: 'Emotional journey of romantic relationship development',
    chapters: [
      { title: 'Meet Cute', stage: 'attraction', purpose: 'Characters first encounter' },
      { title: 'Initial Attraction', stage: 'attraction', purpose: 'Sparks fly between characters' },
      { title: 'Getting to Know You', stage: 'attraction', purpose: 'Characters learn about each other' },
      { title: 'First Kiss', stage: 'attraction', purpose: 'Physical intimacy begins' },
      { title: 'Falling in Love', stage: 'development', purpose: 'Emotional connection deepens' },
      { title: 'The Obstacle', stage: 'conflict', purpose: 'Major relationship challenge' },
      { title: 'The Break Up', stage: 'conflict', purpose: 'Relationship falls apart' },
      { title: 'Realization', stage: 'resolution', purpose: 'Understanding what really matters' },
      { title: 'Grand Gesture', stage: 'resolution', purpose: 'Fighting for love' },
      { title: 'Happily Ever After', stage: 'resolution', purpose: 'Romantic resolution' }
    ]
  }
}

export default function OutlineGenerator({ 
  bookId, 
  bookTitle, 
  bookSynopsis, 
  bookGenre 
}: OutlineGeneratorProps) {
  const [outline, setOutline] = useState<Outline | null>(null)
  const [showConfig, setShowConfig] = useState(false)
  const [isGenerating, setIsGenerating] = useState(false)
  const [editingChapter, setEditingChapter] = useState<string | null>(null)
  const [expandedChapters, setExpandedChapters] = useState<Set<string>>(new Set())
  const [enhancingChapter, setEnhancingChapter] = useState<string | null>(null)
  const [isCheckingConsistency, setIsCheckingConsistency] = useState(false)
  const [showManualCreation, setShowManualCreation] = useState(false)
  
  const [config, setConfig] = useState<OutlineConfig>({
    chapters: 16,
    structure: 'three-act',
    pacing: 'moderate'
  })

  // Handle drag and drop reordering
  const handleReorder = (newOrder: Chapter[]) => {
    if (!outline) return

    // Update chapter numbers
    const updatedChapters = newOrder.map((chapter, index) => ({
      ...chapter,
      number: index + 1
    }))

    setOutline({
      ...outline,
      chapters: updatedChapters
    })
  }

  // Generate outline using AI
  const generateOutline = async () => {
    setIsGenerating(true)
    try {
      const response = await fetch('/api/ai/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: 'outline',
          bookId,
          chapters: config.chapters,
          structure: config.structure,
          context: {
            title: bookTitle,
            synopsis: bookSynopsis,
            genre: bookGenre
          }
        })
      })

      if (!response.ok) {
        throw new Error('Failed to generate outline')
      }

      const result = await response.json()
      
      if (result.success && result.data) {
        // Parse the AI response (should be JSON)
        let chaptersData
        try {
          chaptersData = JSON.parse(result.data.generated)
        } catch {
          // If not JSON, try to extract chapters from text
          chaptersData = parseTextOutline(result.data.generated)
        }

        const chapters: Chapter[] = chaptersData.chapters.map((ch: Record<string, unknown>, index: number) => ({
          id: `chapter-${index + 1}`,
          number: index + 1,
          title: ch.title || `Chapter ${index + 1}`,
          summary: ch.summary || '',
          plotPoints: ch.plotPoints || [],
          characterArcs: ch.characterArcs || [],
          conflicts: ch.conflicts || [],
          wordCountTarget: Math.floor(80000 / config.chapters), // Default target
          wordCountActual: 0,
          status: 'planned' as ChapterStatus,
          createdAt: new Date(),
          updatedAt: new Date()
        }))

        const newOutline: Outline = {
          id: `outline-${Date.now()}`,
          bookId,
          structure: config.structure,
          totalChapters: config.chapters,
          chapters,
          createdAt: new Date(),
          updatedAt: new Date()
        }

        setOutline(newOutline)
        setShowConfig(false)
      }
    } catch (error) {
      console.error('Error generating outline:', error)
    } finally {
      setIsGenerating(false)
    }
  }

  // Fallback parser for non-JSON responses
  const parseTextOutline = (text: string) => {
    // Simple parser - in real app, this would be more sophisticated
    const chapters = []
    const lines = text.split('\n')
    let currentChapter: Record<string, unknown> | null = null
    
    for (const line of lines) {
      if (line.match(/^Chapter \d+/i) || line.match(/^\d+\./)) {
        if (currentChapter) chapters.push(currentChapter)
        currentChapter = {
          title: line.trim(),
          summary: '',
          plotPoints: [],
          characterArcs: [],
          conflicts: []
        }
      } else if (currentChapter && line.trim()) {
        currentChapter.summary += line.trim() + ' '
      }
    }
    
    if (currentChapter) chapters.push(currentChapter)
    return { chapters }
  }

  // Toggle chapter expansion
  const toggleChapterExpansion = (chapterId: string) => {
    const newExpanded = new Set(expandedChapters)
    if (newExpanded.has(chapterId)) {
      newExpanded.delete(chapterId)
    } else {
      newExpanded.add(chapterId)
    }
    setExpandedChapters(newExpanded)
  }

  // Update chapter status
  const updateChapterStatus = (chapterId: string, status: ChapterStatus) => {
    if (!outline) return
    
    const updatedChapters = outline.chapters.map(chapter =>
      chapter.id === chapterId ? { ...chapter, status, updatedAt: new Date() } : chapter
    )
    
    setOutline({
      ...outline,
      chapters: updatedChapters,
      updatedAt: new Date()
    })
  }

  // Update chapter content
  const updateChapter = (chapterId: string, updates: Partial<Chapter>) => {
    if (!outline) return
    
    const updatedChapters = outline.chapters.map(chapter =>
      chapter.id === chapterId ? { ...chapter, ...updates, updatedAt: new Date() } : chapter
    )
    
    setOutline({
      ...outline,
      chapters: updatedChapters,
      updatedAt: new Date()
    })
  }

  // Enhance single chapter with AI
  const enhanceChapter = async (chapterId: string) => {
    if (!outline) return
    
    const chapter = outline.chapters.find(c => c.id === chapterId)
    if (!chapter) return

    setEnhancingChapter(chapterId)
    try {
      const response = await fetch('/api/ai/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: 'chapter',
          bookId,
          chapterId,
          context: {
            title: bookTitle,
            synopsis: bookSynopsis,
            genre: bookGenre,
            chapterNumber: chapter.number,
            chapterTitle: chapter.title,
            outline: chapter.summary,
            previousChapters: outline.chapters.slice(0, chapter.number - 1).map(c => ({
              number: c.number,
              title: c.title,
              summary: c.summary
            })),
            characters: [], // TODO: Add characters from book context
            targetLength: chapter.wordCountTarget
          }
        })
      })

      if (!response.ok) {
        throw new Error('Failed to enhance chapter')
      }

      const result = await response.json()
      
      if (result.success && result.data) {
        // Parse the enhanced chapter content
        const enhancedContent = result.data.generated
        
        // Try to extract different sections from the enhanced content
        const sections = parseEnhancedContent(enhancedContent)
        
        updateChapter(chapterId, {
          summary: (sections.summary as string) || chapter.summary,
          plotPoints: (sections.plotPoints as string[]) || chapter.plotPoints,
          characterArcs: (sections.characterArcs as string[]) || chapter.characterArcs,
          conflicts: (sections.conflicts as string[]) || chapter.conflicts
        })
      }
    } catch (error) {
      console.error('Error enhancing chapter:', error)
    } finally {
      setEnhancingChapter(null)
    }
  }

  // Parse enhanced content into sections
  const parseEnhancedContent = (content: string) => {
    // Simple parser - in real app, this would be more sophisticated
    const sections: Record<string, unknown> = {}
    const lines = content.split('\n')
    let currentSection = 'summary'
    let currentContent = ''
    
    for (const line of lines) {
      if (line.toLowerCase().includes('plot points') || line.toLowerCase().includes('key events')) {
        if (currentContent.trim()) sections[currentSection] = currentContent.trim()
        currentSection = 'plotPoints'
        currentContent = ''
      } else if (line.toLowerCase().includes('character') && line.toLowerCase().includes('arc')) {
        if (currentContent.trim()) sections[currentSection] = currentContent.trim()
        currentSection = 'characterArcs'
        currentContent = ''
      } else if (line.toLowerCase().includes('conflict')) {
        if (currentContent.trim()) sections[currentSection] = currentContent.trim()
        currentSection = 'conflicts'
        currentContent = ''
      } else if (line.trim()) {
        currentContent += line + '\n'
      }
    }
    
    if (currentContent.trim()) sections[currentSection] = currentContent.trim()
    
    // Convert string arrays to actual arrays
    if (sections.plotPoints && typeof sections.plotPoints === 'string') {
      sections.plotPoints = sections.plotPoints.split('\n').filter((p: string) => p.trim()).map((p: string) => p.replace(/^[-•*]\s*/, ''))
    }
    if (sections.characterArcs && typeof sections.characterArcs === 'string') {
      sections.characterArcs = sections.characterArcs.split('\n').filter((a: string) => a.trim()).map((a: string) => a.replace(/^[-•*]\s*/, ''))
    }
    if (sections.conflicts && typeof sections.conflicts === 'string') {
      sections.conflicts = sections.conflicts.split('\n').filter((c: string) => c.trim()).map((c: string) => c.replace(/^[-•*]\s*/, ''))
    }
    
    return sections
  }

  // Check outline consistency
  const checkConsistency = async () => {
    if (!outline) return
    
    setIsCheckingConsistency(true)
    try {
      const response = await fetch('/api/ai/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: 'rewrite',
          text: JSON.stringify(outline.chapters.map(c => ({
            number: c.number,
            title: c.title,
            summary: c.summary,
            plotPoints: c.plotPoints,
            characterArcs: c.characterArcs,
            conflicts: c.conflicts
          }))),
          instruction: 'Analyze this book outline for consistency in plot progression, character development, pacing, and story flow. Identify any gaps, contradictions, or opportunities for improvement. Provide specific, actionable feedback.',
          context: {
            bookTitle,
            genre: bookGenre,
            tone: 'analytical'
          }
        })
      })

      if (!response.ok) {
        throw new Error('Failed to check consistency')
      }

      const result = await response.json()
      
      if (result.success && result.data) {
        // Show consistency report in a modal or alert
        alert(`Consistency Analysis:\n\n${result.data.generated}`)
      }
    } catch (error) {
      console.error('Error checking consistency:', error)
    } finally {
      setIsCheckingConsistency(false)
    }
  }

  // Export outline to different formats
  const exportOutline = (format: 'txt' | 'json' | 'md') => {
    if (!outline) return

    let content = ''
    let filename = `${bookTitle.replace(/[^a-z0-9]/gi, '_').toLowerCase()}_outline`

    switch (format) {
      case 'txt':
        content = generateTextExport()
        filename += '.txt'
        break
      case 'json':
        content = JSON.stringify(outline, null, 2)
        filename += '.json'
        break
      case 'md':
        content = generateMarkdownExport()
        filename += '.md'
        break
    }

    // Create and download file
    const blob = new Blob([content], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = filename
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const generateTextExport = (): string => {
    if (!outline) return ''

    let content = `${bookTitle.toUpperCase()}\n`
    content += `${'='.repeat(bookTitle.length)}\n\n`
    content += `Genre: ${bookGenre}\n`
    content += `Structure: ${outline.structure.replace('-', ' ')}\n`
    content += `Chapters: ${outline.totalChapters}\n\n`
    content += `SYNOPSIS\n--------\n${bookSynopsis}\n\n`
    content += `CHAPTER OUTLINE\n===============\n\n`

    outline.chapters.forEach(chapter => {
      content += `Chapter ${chapter.number}: ${chapter.title}\n`
      content += `${'-'.repeat(chapter.title.length + 10)}\n`
      content += `Status: ${STATUS_CONFIG[chapter.status].label}\n`
      content += `Target Words: ${chapter.wordCountTarget.toLocaleString()}\n\n`
      content += `Summary:\n${chapter.summary}\n\n`
      
      if (chapter.plotPoints.length > 0) {
        content += `Plot Points:\n${chapter.plotPoints.map(p => `• ${p}`).join('\n')}\n\n`
      }
      
      if (chapter.characterArcs.length > 0) {
        content += `Character Development:\n${chapter.characterArcs.map(a => `• ${a}`).join('\n')}\n\n`
      }
      
      if (chapter.conflicts.length > 0) {
        content += `Conflicts:\n${chapter.conflicts.map(c => `• ${c}`).join('\n')}\n\n`
      }
      
      content += '\n'
    })

    return content
  }

  const generateMarkdownExport = (): string => {
    if (!outline) return ''

    let content = `# ${bookTitle}\n\n`
    content += `**Genre:** ${bookGenre}  \n`
    content += `**Structure:** ${outline.structure.replace('-', ' ')}  \n`
    content += `**Chapters:** ${outline.totalChapters}  \n\n`
    content += `## Synopsis\n\n${bookSynopsis}\n\n`
    content += `## Chapter Outline\n\n`

    outline.chapters.forEach(chapter => {
      content += `### Chapter ${chapter.number}: ${chapter.title}\n\n`
      content += `**Status:** ${STATUS_CONFIG[chapter.status].icon} ${STATUS_CONFIG[chapter.status].label}  \n`
      content += `**Target Words:** ${chapter.wordCountTarget.toLocaleString()}  \n\n`
      content += `${chapter.summary}\n\n`
      
      if (chapter.plotPoints.length > 0) {
        content += `**Plot Points:**\n${chapter.plotPoints.map(p => `- ${p}`).join('\n')}\n\n`
      }
      
      if (chapter.characterArcs.length > 0) {
        content += `**Character Development:**\n${chapter.characterArcs.map(a => `- ${a}`).join('\n')}\n\n`
      }
      
      if (chapter.conflicts.length > 0) {
        content += `**Conflicts:**\n${chapter.conflicts.map(c => `- ${c}`).join('\n')}\n\n`
      }
      
      content += '---\n\n'
    })

    return content
  }

  // Create manual outline from template
  const createManualOutline = (templateKey: string, customChapterCount?: number) => {
    const template = OUTLINE_TEMPLATES[templateKey as keyof typeof OUTLINE_TEMPLATES]
    if (!template) return

    let chapterTemplates = template.chapters
    
    // If custom chapter count is provided, adjust the template
    if (customChapterCount && customChapterCount !== template.chapters.length) {
      if (customChapterCount > template.chapters.length) {
        // Add extra chapters
        const extraChapters = customChapterCount - template.chapters.length
        for (let i = 0; i < extraChapters; i++) {
          chapterTemplates.push({
            title: `Chapter ${template.chapters.length + i + 1}`,
            stage: 'development' as const,
            purpose: 'Continue the story progression',
            act: 3 // Default to act 3 for any additional chapters
          })
        }
      } else {
        // Use only the first N chapters
        chapterTemplates = template.chapters.slice(0, customChapterCount)
      }
    }

    const chapters: Chapter[] = chapterTemplates.map((chapterTemplate, index) => ({
      id: `chapter-${index + 1}`,
      number: index + 1,
      title: chapterTemplate.title,
      summary: chapterTemplate.purpose,
      plotPoints: [],
      characterArcs: [],
      conflicts: [],
      wordCountTarget: Math.floor(80000 / chapterTemplates.length),
      wordCountActual: 0,
      status: 'planned' as ChapterStatus,
      createdAt: new Date(),
      updatedAt: new Date()
    }))

    const newOutline: Outline = {
      id: `outline-${Date.now()}`,
      bookId,
      structure: templateKey === 'heros-journey' ? 'heros-journey' : 
                 templateKey === 'three-act' ? 'three-act' : 'custom',
      totalChapters: chapters.length,
      chapters,
      createdAt: new Date(),
      updatedAt: new Date()
    }

    setOutline(newOutline)
    setShowManualCreation(false)
  }

  // Create blank outline
  const createBlankOutline = (chapterCount: number) => {
    const chapters: Chapter[] = Array.from({ length: chapterCount }, (_, index) => ({
      id: `chapter-${index + 1}`,
      number: index + 1,
      title: `Chapter ${index + 1}`,
      summary: '',
      plotPoints: [],
      characterArcs: [],
      conflicts: [],
      wordCountTarget: Math.floor(80000 / chapterCount),
      wordCountActual: 0,
      status: 'planned' as ChapterStatus,
      createdAt: new Date(),
      updatedAt: new Date()
    }))

    const newOutline: Outline = {
      id: `outline-${Date.now()}`,
      bookId,
      structure: 'custom',
      totalChapters: chapterCount,
      chapters,
      createdAt: new Date(),
      updatedAt: new Date()
    }

    setOutline(newOutline)
    setShowManualCreation(false)
  }

  // Add new chapter
  const addChapter = (position?: number) => {
    if (!outline) return

    const insertAt = position ?? outline.chapters.length
    const newChapter: Chapter = {
      id: `chapter-${Date.now()}`,
      number: insertAt + 1,
      title: `Chapter ${insertAt + 1}`,
      summary: '',
      plotPoints: [],
      characterArcs: [],
      conflicts: [],
      wordCountTarget: Math.floor(80000 / (outline.totalChapters + 1)),
      wordCountActual: 0,
      status: 'planned' as ChapterStatus,
      createdAt: new Date(),
      updatedAt: new Date()
    }

    const updatedChapters = [...outline.chapters]
    updatedChapters.splice(insertAt, 0, newChapter)
    
    // Renumber all chapters
    const renumberedChapters = updatedChapters.map((chapter, index) => ({
      ...chapter,
      number: index + 1,
      title: chapter.title.includes('Chapter') ? `Chapter ${index + 1}` : chapter.title
    }))

    setOutline({
      ...outline,
      chapters: renumberedChapters,
      totalChapters: renumberedChapters.length,
      updatedAt: new Date()
    })
  }

  // Remove chapter
  const removeChapter = (chapterId: string) => {
    if (!outline || outline.chapters.length <= 1) return

    const updatedChapters = outline.chapters
      .filter(chapter => chapter.id !== chapterId)
      .map((chapter, index) => ({
        ...chapter,
        number: index + 1
      }))

    setOutline({
      ...outline,
      chapters: updatedChapters,
      totalChapters: updatedChapters.length,
      updatedAt: new Date()
    })
  }

  // Duplicate chapter
  const duplicateChapter = (chapterId: string) => {
    if (!outline) return

    const chapterToDuplicate = outline.chapters.find(c => c.id === chapterId)
    if (!chapterToDuplicate) return

    const chapterIndex = outline.chapters.findIndex(c => c.id === chapterId)
    const duplicatedChapter: Chapter = {
      ...chapterToDuplicate,
      id: `chapter-${Date.now()}`,
      number: chapterIndex + 2,
      title: `${chapterToDuplicate.title} (Copy)`,
      createdAt: new Date(),
      updatedAt: new Date()
    }

    const updatedChapters = [...outline.chapters]
    updatedChapters.splice(chapterIndex + 1, 0, duplicatedChapter)
    
    // Renumber chapters after insertion
    const renumberedChapters = updatedChapters.map((chapter, index) => ({
      ...chapter,
      number: index + 1
    }))

    setOutline({
      ...outline,
      chapters: renumberedChapters,
      totalChapters: renumberedChapters.length,
      updatedAt: new Date()
    })
  }

  // Bulk operations
  const bulkUpdateWordTargets = () => {
    if (!outline) return
    
    const targetWords = prompt('Enter total target word count for the book:', '80000')
    if (!targetWords) return
    
    const totalWords = parseInt(targetWords)
    if (isNaN(totalWords) || totalWords <= 0) return
    
    const wordsPerChapter = Math.floor(totalWords / outline.chapters.length)
    
    const updatedChapters = outline.chapters.map(chapter => ({
      ...chapter,
      wordCountTarget: wordsPerChapter,
      updatedAt: new Date()
    }))
    
    setOutline({
      ...outline,
      chapters: updatedChapters,
      updatedAt: new Date()
    })
  }

  const expandAllChapters = () => {
    if (!outline) return
    const allChapterIds = new Set<string>(outline.chapters.map(c => c.id))
    setExpandedChapters(allChapterIds)
  }

  const collapseAllChapters = () => {
    setExpandedChapters(new Set())
  }

  const resetAllChapterStatus = () => {
    if (!outline) return
    
    const updatedChapters = outline.chapters.map(chapter => ({
      ...chapter,
      status: 'planned' as ChapterStatus,
      updatedAt: new Date()
    }))
    
    setOutline({
      ...outline,
      chapters: updatedChapters,
      updatedAt: new Date()
    })
  }

  if (!outline && !showConfig && !showManualCreation) {
    return (
      <div className="text-center py-16 space-y-6">
        <div className="space-y-4">
          <div className="text-6xl">🌸</div>
          <h2 className="text-3xl font-bold text-charcoal-900 dark:text-white">
            The Outline Generator
          </h2>
          <p className="text-lg text-charcoal-600 dark:text-charcoal-400 max-w-2xl mx-auto">
            Transform your story idea into a structured, chapter-by-chapter outline with AI assistance. 
            Let creativity bloom with guided precision.
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            onClick={() => setShowConfig(true)}
            variant="sakura"
            size="lg"
            className="gap-2"
          >
            <Sparkles className="h-5 w-5" />
            Generate AI Outline
          </Button>
          <Button 
            onClick={() => setShowManualCreation(true)}
            variant="outline"
            size="lg"
            className="gap-2"
          >
            <Plus className="h-5 w-5" />
            Create Manual Outline
          </Button>
        </div>
      </div>
    )
  }

  if (showConfig) {
    return (
      <div className="max-w-2xl mx-auto py-8">
        <Card className="border-sakura-200/50 dark:border-charcoal-700/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5 text-sakura-500" />
              Configure Your Outline
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Chapter Count */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-charcoal-700 dark:text-charcoal-300">
                Number of Chapters: {config.chapters}
              </label>
              <input
                type="range"
                min="5"
                max="50"
                value={config.chapters}
                onChange={(e) => setConfig({ ...config, chapters: parseInt(e.target.value) })}
                className="w-full h-2 bg-sakura-100 rounded-lg appearance-none cursor-pointer dark:bg-charcoal-700"
              />
              <div className="flex justify-between text-xs text-charcoal-500">
                <span>5 chapters</span>
                <span>50 chapters</span>
              </div>
            </div>

            {/* Structure Selection */}
            <div className="space-y-3">
              <label className="text-sm font-medium text-charcoal-700 dark:text-charcoal-300">
                Story Structure
              </label>
              <div className="grid gap-3">
                {STRUCTURE_OPTIONS.map((option) => (
                  <div
                    key={option.value}
                    className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                      config.structure === option.value
                        ? 'border-sakura-300 bg-sakura-50/50 dark:bg-charcoal-700/50'
                        : 'border-charcoal-200 dark:border-charcoal-600 hover:border-sakura-200'
                    }`}
                    onClick={() => setConfig({ ...config, structure: option.value })}
                  >
                    <div className="font-medium text-charcoal-900 dark:text-white">
                      {option.label}
                    </div>
                    <div className="text-sm text-charcoal-600 dark:text-charcoal-400">
                      {option.description}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Pacing Preference */}
            <div className="space-y-3">
              <label className="text-sm font-medium text-charcoal-700 dark:text-charcoal-300">
                Pacing Preference
              </label>
              <div className="grid gap-3">
                {PACING_OPTIONS.map((option) => (
                  <div
                    key={option.value}
                    className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                      config.pacing === option.value
                        ? 'border-sakura-300 bg-sakura-50/50 dark:bg-charcoal-700/50'
                        : 'border-charcoal-200 dark:border-charcoal-600 hover:border-sakura-200'
                    }`}
                    onClick={() => setConfig({ ...config, pacing: option.value })}
                  >
                    <div className="font-medium text-charcoal-900 dark:text-white">
                      {option.label}
                    </div>
                    <div className="text-sm text-charcoal-600 dark:text-charcoal-400">
                      {option.description}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex gap-3 pt-4">
              <Button
                onClick={generateOutline}
                disabled={isGenerating}
                variant="sakura"
                className="flex-1 gap-2"
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Generating Outline...
                  </>
                ) : (
                  <>
                    <Sparkles className="h-4 w-4" />
                    Generate Outline
                  </>
                )}
              </Button>
              <Button
                onClick={() => setShowConfig(false)}
                variant="outline"
              >
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (showManualCreation) {
    return (
      <div className="max-w-4xl mx-auto py-8">
        <Card className="border-sakura-200/50 dark:border-charcoal-700/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Plus className="h-5 w-5 text-sakura-500" />
              Create Manual Outline
            </CardTitle>
            <p className="text-sm text-charcoal-600 dark:text-charcoal-400">
              Choose a story structure template or start from scratch
            </p>
          </CardHeader>
          <CardContent className="space-y-8">
            {/* Template Options */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-charcoal-900 dark:text-white">
                Story Structure Templates
              </h3>
              <div className="grid gap-4">
                {Object.entries(OUTLINE_TEMPLATES).map(([key, template]) => (
                  <div
                    key={key}
                    className="p-4 border-2 border-charcoal-200 dark:border-charcoal-600 rounded-lg hover:border-sakura-300 transition-colors cursor-pointer group"
                    onClick={() => createManualOutline(key)}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="font-medium text-charcoal-900 dark:text-white group-hover:text-sakura-600 transition-colors">
                          {template.name}
                        </h4>
                        <p className="text-sm text-charcoal-600 dark:text-charcoal-400 mt-1">
                          {template.description}
                        </p>
                        <div className="flex items-center gap-4 mt-3 text-xs text-charcoal-500">
                          <span>{template.chapters.length} chapters</span>
                          <span>•</span>
                          <span>Structured progression</span>
                        </div>
                      </div>
                      <div className="text-2xl group-hover:scale-110 transition-transform">
                        {key === 'three-act' && '🎭'}
                        {key === 'heros-journey' && '🗡️'}
                        {key === 'mystery' && '🔍'}
                        {key === 'romance' && '💕'}
                      </div>
                    </div>
                    
                    {/* Preview of chapter structure */}
                    <div className="mt-4 pt-3 border-t border-charcoal-100 dark:border-charcoal-700">
                      <div className="flex flex-wrap gap-2">
                        {template.chapters.slice(0, 6).map((chapter, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-1 bg-charcoal-50 dark:bg-charcoal-800 rounded text-xs text-charcoal-600 dark:text-charcoal-400"
                          >
                            {chapter.title}
                          </span>
                        ))}
                        {template.chapters.length > 6 && (
                          <span className="px-2 py-1 text-xs text-charcoal-500">
                            +{template.chapters.length - 6} more
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Custom Chapter Count */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-charcoal-900 dark:text-white">
                Or Start From Scratch
              </h3>
              <div className="p-4 border-2 border-charcoal-200 dark:border-charcoal-600 rounded-lg">
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-charcoal-700 dark:text-charcoal-300 mb-2 block">
                      Number of Chapters: {config.chapters}
                    </label>
                    <input
                      type="range"
                      min="3"
                      max="50"
                      value={config.chapters}
                      onChange={(e) => setConfig({ ...config, chapters: parseInt(e.target.value) })}
                      className="w-full h-2 bg-sakura-100 rounded-lg appearance-none cursor-pointer dark:bg-charcoal-700"
                    />
                    <div className="flex justify-between text-xs text-charcoal-500 mt-1">
                      <span>3 chapters</span>
                      <span>50 chapters</span>
                    </div>
                  </div>
                  
                  <Button
                    onClick={() => createBlankOutline(config.chapters)}
                    variant="sakura"
                    className="w-full gap-2"
                  >
                    <Plus className="h-4 w-4" />
                    Create Blank Outline ({config.chapters} chapters)
                  </Button>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3 pt-4 border-t border-charcoal-200 dark:border-charcoal-700">
              <Button
                onClick={() => setShowManualCreation(false)}
                variant="outline"
                className="flex-1"
              >
                Back
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-charcoal-900 dark:text-white flex items-center gap-2">
            <FileText className="h-6 w-6 text-sakura-500" />
            Story Outline
          </h2>
          <p className="text-charcoal-600 dark:text-charcoal-400">
            {outline?.totalChapters} chapters • {outline?.structure.replace('-', ' ')} structure
          </p>
        </div>
        
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => addChapter()}
            className="gap-2"
          >
            <Plus className="h-4 w-4" />
            Add Chapter
          </Button>
          
          {/* Bulk Actions Menu */}
          <div className="relative group">
            <Button variant="outline" size="sm" className="gap-2">
              <MoreHorizontal className="h-4 w-4" />
              Bulk Actions
            </Button>
            <div className="absolute left-0 top-full mt-1 bg-white dark:bg-charcoal-800 border border-charcoal-200 dark:border-charcoal-600 rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10 min-w-[180px]">
              <div className="py-1">
                <button
                  onClick={() => bulkUpdateWordTargets()}
                  className="w-full px-3 py-2 text-left text-sm hover:bg-charcoal-100 dark:hover:bg-charcoal-700 transition-colors"
                >
                  Update Word Targets
                </button>
                <button
                  onClick={() => expandAllChapters()}
                  className="w-full px-3 py-2 text-left text-sm hover:bg-charcoal-100 dark:hover:bg-charcoal-700 transition-colors"
                >
                  Expand All
                </button>
                <button
                  onClick={() => collapseAllChapters()}
                  className="w-full px-3 py-2 text-left text-sm hover:bg-charcoal-100 dark:hover:bg-charcoal-700 transition-colors"
                >
                  Collapse All
                </button>
                <button
                  onClick={() => resetAllChapterStatus()}
                  className="w-full px-3 py-2 text-left text-sm hover:bg-charcoal-100 dark:hover:bg-charcoal-700 transition-colors"
                >
                  Reset All to Planned
                </button>
              </div>
            </div>
          </div>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={checkConsistency}
            disabled={isCheckingConsistency}
          >
            {isCheckingConsistency ? (
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
            ) : (
              <AlertCircle className="h-4 w-4 mr-2" />
            )}
            Check Flow
          </Button>
          <Button variant="outline" size="sm" onClick={() => setShowConfig(true)}>
            <Settings className="h-4 w-4 mr-2" />
            Configure
          </Button>
          <div className="relative group">
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
            <div className="absolute right-0 top-full mt-1 bg-white dark:bg-charcoal-800 border border-charcoal-200 dark:border-charcoal-600 rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10 min-w-[120px]">
              <div className="py-1">
                <button
                  onClick={() => exportOutline('md')}
                  className="w-full px-3 py-2 text-left text-sm hover:bg-charcoal-100 dark:hover:bg-charcoal-700 transition-colors"
                >
                  Markdown (.md)
                </button>
                <button
                  onClick={() => exportOutline('txt')}
                  className="w-full px-3 py-2 text-left text-sm hover:bg-charcoal-100 dark:hover:bg-charcoal-700 transition-colors"
                >
                  Text (.txt)
                </button>
                <button
                  onClick={() => exportOutline('json')}
                  className="w-full px-3 py-2 text-left text-sm hover:bg-charcoal-100 dark:hover:bg-charcoal-700 transition-colors"
                >
                  JSON (.json)
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Chapter List */}
      <Reorder.Group 
        axis="y" 
        values={outline?.chapters || []} 
        onReorder={handleReorder}
        className="space-y-4"
      >
        {outline?.chapters.map((chapter) => (
          <Reorder.Item 
            key={chapter.id} 
            value={chapter}
            className="cursor-grab active:cursor-grabbing"
            whileDrag={{ 
              scale: 1.02, 
              rotate: 1,
              boxShadow: "0 10px 30px rgba(0,0,0,0.15)"
            }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <ChapterCard
              chapter={chapter}
              isExpanded={expandedChapters.has(chapter.id)}
              isEditing={editingChapter === chapter.id}
              isEnhancing={enhancingChapter === chapter.id}
              onToggleExpand={() => toggleChapterExpansion(chapter.id)}
              onStartEdit={() => setEditingChapter(chapter.id)}
              onStopEdit={() => setEditingChapter(null)}
              onUpdate={(updates) => updateChapter(chapter.id, updates)}
              onStatusChange={(status) => updateChapterStatus(chapter.id, status)}
              onEnhance={() => enhanceChapter(chapter.id)}
              onRemove={() => removeChapter(chapter.id)}
              onDuplicate={() => duplicateChapter(chapter.id)}
            />
          </Reorder.Item>
        ))}
      </Reorder.Group>
    </div>
  )
}

// Chapter Card Component
interface ChapterCardProps {
  chapter: Chapter
  isExpanded: boolean
  isEditing: boolean
  isEnhancing: boolean
  onToggleExpand: () => void
  onStartEdit: () => void
  onStopEdit: () => void
  onUpdate: (updates: Partial<Chapter>) => void
  onStatusChange: (status: ChapterStatus) => void
  onEnhance: () => void
  onRemove: () => void
  onDuplicate: () => void
}

function ChapterCard({
  chapter,
  isExpanded,
  isEditing,
  isEnhancing,
  onToggleExpand,
  onStartEdit,
  onStopEdit,
  onUpdate,
  onStatusChange,
  onEnhance,
  onRemove,
  onDuplicate
}: ChapterCardProps) {
  const [editForm, setEditForm] = useState({
    title: chapter.title,
    summary: chapter.summary,
    plotPoints: chapter.plotPoints.join('\n'),
    characterArcs: chapter.characterArcs.join('\n'),
    conflicts: chapter.conflicts.join('\n'),
    wordCountTarget: chapter.wordCountTarget
  })

  const handleSave = () => {
    onUpdate({
      title: editForm.title,
      summary: editForm.summary,
      plotPoints: editForm.plotPoints.split('\n').filter(p => p.trim()),
      characterArcs: editForm.characterArcs.split('\n').filter(a => a.trim()),
      conflicts: editForm.conflicts.split('\n').filter(c => c.trim()),
      wordCountTarget: editForm.wordCountTarget
    })
    onStopEdit()
  }

  const statusConfig = STATUS_CONFIG[chapter.status]

  return (
    <Card className="border-sakura-200/50 dark:border-charcoal-700/50 hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-center gap-3">
          <div className="cursor-grab hover:cursor-grabbing">
            <GripVertical className="h-4 w-4 text-charcoal-400" />
          </div>
          
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-sm font-mono text-charcoal-500">
                {chapter.number.toString().padStart(2, '0')}
              </span>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusConfig.color}`}>
                {statusConfig.icon} {statusConfig.label}
              </span>
            </div>
            
            {isEditing ? (
              <Input
                value={editForm.title}
                onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                className="font-semibold text-lg"
              />
            ) : (
              <h3 className="font-semibold text-lg text-charcoal-900 dark:text-white">
                {chapter.title}
              </h3>
            )}
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={onEnhance}
              disabled={isEnhancing || isEditing}
              title="Enhance with AI"
            >
              {isEnhancing ? <Loader2 className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={isEditing ? handleSave : onStartEdit}
            >
              {isEditing ? <Save className="h-4 w-4" /> : <Edit3 className="h-4 w-4" />}
            </Button>
            
            {/* Chapter Actions Menu */}
            <div className="relative group">
              <Button
                variant="ghost"
                size="sm"
                className="opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <MoreHorizontal className="h-4 w-4" />
              </Button>
              <div className="absolute right-0 top-full mt-1 bg-white dark:bg-charcoal-800 border border-charcoal-200 dark:border-charcoal-600 rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10 min-w-[140px]">
                <div className="py-1">
                  <button
                    onClick={onDuplicate}
                    className="w-full px-3 py-2 text-left text-sm hover:bg-charcoal-100 dark:hover:bg-charcoal-700 transition-colors flex items-center gap-2"
                  >
                    <Copy className="h-3 w-3" />
                    Duplicate
                  </button>
                  <button
                    onClick={onRemove}
                    className="w-full px-3 py-2 text-left text-sm hover:bg-red-50 hover:text-red-700 dark:hover:bg-red-900/20 dark:hover:text-red-400 transition-colors flex items-center gap-2"
                  >
                    <Trash2 className="h-3 w-3" />
                    Remove
                  </button>
                </div>
              </div>
            </div>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={onToggleExpand}
            >
              {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </Button>
          </div>
        </div>
      </CardHeader>

      {isExpanded && (
        <CardContent className="pt-0 space-y-4">
          {isEditing ? (
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-charcoal-700 dark:text-charcoal-300 mb-2 block">
                  Summary
                </label>
                <Textarea
                  value={editForm.summary}
                  onChange={(e) => setEditForm({ ...editForm, summary: e.target.value })}
                  rows={3}
                />
              </div>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-charcoal-700 dark:text-charcoal-300 mb-2 block">
                    Plot Points
                  </label>
                  <Textarea
                    value={editForm.plotPoints}
                    onChange={(e) => setEditForm({ ...editForm, plotPoints: e.target.value })}
                    placeholder="One plot point per line"
                    rows={4}
                  />
                </div>
                
                <div>
                  <label className="text-sm font-medium text-charcoal-700 dark:text-charcoal-300 mb-2 block">
                    Character Arcs
                  </label>
                  <Textarea
                    value={editForm.characterArcs}
                    onChange={(e) => setEditForm({ ...editForm, characterArcs: e.target.value })}
                    placeholder="One character arc per line"
                    rows={4}
                  />
                </div>
              </div>

              <div className="flex gap-2">
                <Button onClick={handleSave} variant="sakura" size="sm">
                  <Check className="h-4 w-4 mr-2" />
                  Save Changes
                </Button>
                <Button onClick={onStopEdit} variant="outline" size="sm">
                  <X className="h-4 w-4 mr-2" />
                  Cancel
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div>
                <h4 className="font-medium text-charcoal-900 dark:text-white mb-2">Summary</h4>
                <p className="text-charcoal-700 dark:text-charcoal-300 leading-relaxed">
                  {chapter.summary || 'No summary yet...'}
                </p>
              </div>

              {chapter.plotPoints.length > 0 && (
                <div>
                  <h4 className="font-medium text-charcoal-900 dark:text-white mb-2">Plot Points</h4>
                  <ul className="space-y-1">
                    {chapter.plotPoints.map((point, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm text-charcoal-700 dark:text-charcoal-300">
                        <span className="text-sakura-500 mt-1">•</span>
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {chapter.characterArcs.length > 0 && (
                <div>
                  <h4 className="font-medium text-charcoal-900 dark:text-white mb-2">Character Development</h4>
                  <ul className="space-y-1">
                    {chapter.characterArcs.map((arc, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm text-charcoal-700 dark:text-charcoal-300">
                        <span className="text-sakura-500 mt-1">•</span>
                        {arc}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="flex items-center justify-between pt-2 border-t border-charcoal-200 dark:border-charcoal-700">
                <div className="text-sm text-charcoal-600 dark:text-charcoal-400">
                  Target: {chapter.wordCountTarget.toLocaleString()} words
                </div>
                
                <select
                  value={chapter.status}
                  onChange={(e) => onStatusChange(e.target.value as ChapterStatus)}
                  className="text-sm border border-charcoal-300 rounded px-2 py-1 bg-white dark:bg-charcoal-800 dark:border-charcoal-600"
                >
                  {Object.entries(STATUS_CONFIG).map(([status, config]) => (
                    <option key={status} value={status}>
                      {config.icon} {config.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          )}
        </CardContent>
      )}
    </Card>
  )
}