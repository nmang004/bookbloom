"use client"

import { useState, useRef, useEffect, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { 
  Bold, 
  Italic, 
  Underline, 
  AlignLeft, 
  AlignCenter, 
  AlignRight,
  List,
  ListOrdered,
  Quote,
  Heading1,
  Heading2,
  Heading3,
  Type,
  Eye,
  EyeOff,
  Undo,
  Redo,
  Save,
  MoreHorizontal,
  Minimize2
} from "lucide-react"
import { WritingMode, WritingSettings } from "@/types/writing"
import AIContextMenu from "./AIContextMenu"

interface RichTextEditorProps {
  content: string
  onChange: (content: string) => void
  onWordCountChange: (count: number) => void
  settings: WritingSettings
  writingMode: WritingMode
  isFullscreen?: boolean
  onToggleFullscreen?: () => void
  className?: string
  bookContext?: {
    id: string
    title: string
    genre: string
    chapterId: string
  }
}

interface FormatButton {
  command: string
  icon: any
  label: string
  shortcut?: string
}

const formatButtons: FormatButton[] = [
  { command: 'bold', icon: Bold, label: 'Bold', shortcut: 'Ctrl+B' },
  { command: 'italic', icon: Italic, label: 'Italic', shortcut: 'Ctrl+I' },
  { command: 'underline', icon: Underline, label: 'Underline', shortcut: 'Ctrl+U' },
]

const headingButtons: FormatButton[] = [
  { command: 'h1', icon: Heading1, label: 'Heading 1' },
  { command: 'h2', icon: Heading2, label: 'Heading 2' },
  { command: 'h3', icon: Heading3, label: 'Heading 3' },
]

const alignmentButtons: FormatButton[] = [
  { command: 'justifyLeft', icon: AlignLeft, label: 'Align Left' },
  { command: 'justifyCenter', icon: AlignCenter, label: 'Align Center' },
  { command: 'justifyRight', icon: AlignRight, label: 'Align Right' },
]

const listButtons: FormatButton[] = [
  { command: 'insertUnorderedList', icon: List, label: 'Bullet List' },
  { command: 'insertOrderedList', icon: ListOrdered, label: 'Numbered List' },
  { command: 'formatBlock', icon: Quote, label: 'Quote' },
]

const RichTextEditor = ({
  content,
  onChange,
  onWordCountChange,
  settings,
  writingMode,
  isFullscreen = false,
  onToggleFullscreen,
  className = "",
  bookContext
}: RichTextEditorProps) => {
  const editorRef = useRef<HTMLDivElement>(null)
  const [isToolbarVisible, setIsToolbarVisible] = useState(true)
  const [wordCount, setWordCount] = useState(0)
  const [characterCount, setCharacterCount] = useState(0)
  const [readingTime, setReadingTime] = useState(0)
  const [selectedText, setSelectedText] = useState("")
  const [cursorPosition, setCursorPosition] = useState(0)
  const [showContextMenu, setShowContextMenu] = useState(false)
  const [contextMenuPosition, setContextMenuPosition] = useState({ x: 0, y: 0 })

  // Calculate statistics
  const updateStats = useCallback((text: string) => {
    const words = text.trim() ? text.trim().split(/\s+/).length : 0
    const characters = text.length
    const reading = Math.ceil(words / 200) // 200 words per minute
    
    setWordCount(words)
    setCharacterCount(characters)
    setReadingTime(reading)
    onWordCountChange(words)
  }, [onWordCountChange])

  // Handle content changes
  const handleContentChange = useCallback(() => {
    if (!editorRef.current) return

    const text = editorRef.current.innerText || ""
    const html = editorRef.current.innerHTML || ""
    
    updateStats(text)
    onChange(html)
  }, [onChange, updateStats])

  // Format text
  const formatText = (command: string, value?: string) => {
    if (!editorRef.current) return

    editorRef.current.focus()
    
    if (command === 'h1' || command === 'h2' || command === 'h3') {
      document.execCommand('formatBlock', false, command)
    } else if (command === 'quote') {
      document.execCommand('formatBlock', false, 'blockquote')
    } else {
      document.execCommand(command, false, value)
    }
    
    handleContentChange()
  }

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!editorRef.current?.contains(e.target as Node)) return

      const isCtrlOrCmd = e.ctrlKey || e.metaKey

      if (isCtrlOrCmd) {
        switch (e.key.toLowerCase()) {
          case 'b':
            e.preventDefault()
            formatText('bold')
            break
          case 'i':
            e.preventDefault()
            formatText('italic')
            break
          case 'u':
            e.preventDefault()
            formatText('underline')
            break
          case 's':
            e.preventDefault()
            // Save handled by parent
            break
        }
      }

      // Handle Hemingway mode (disable backspace/delete)
      if (writingMode === 'hemingway' && (e.key === 'Backspace' || e.key === 'Delete')) {
        e.preventDefault()
      }

      // Toggle toolbar with Escape
      if (e.key === 'Escape') {
        setIsToolbarVisible(!isToolbarVisible)
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [writingMode, isToolbarVisible])

  // Handle text selection
  const handleSelection = () => {
    const selection = window.getSelection()
    if (selection) {
      setSelectedText(selection.toString())
      setCursorPosition(selection.anchorOffset)
    }
  }

  // Handle right click for AI context menu
  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault()
    
    const selection = window.getSelection()
    if (selection && selection.toString().trim() && bookContext) {
      setSelectedText(selection.toString().trim())
      setContextMenuPosition({ x: e.pageX, y: e.pageY })
      setShowContextMenu(true)
    }
  }

  // Apply AI result to editor
  const handleApplyAIResult = (newText: string) => {
    if (!editorRef.current) return

    const selection = window.getSelection()
    if (selection && selection.rangeCount > 0) {
      const range = selection.getRangeAt(0)
      range.deleteContents()
      range.insertNode(document.createTextNode(newText))
      
      // Clear selection and update content
      selection.removeAllRanges()
      handleContentChange()
    }
  }

  // Apply writing mode styles
  const getWritingModeStyles = () => {
    const baseStyles = {
      fontSize: `${settings.fontSize}px`,
      lineHeight: settings.lineHeight,
      fontFamily: settings.fontFamily === 'serif' ? 'Georgia, serif' : 'Inter, sans-serif'
    }

    switch (writingMode) {
      case 'focus':
        return {
          ...baseStyles,
          filter: 'none',
          transition: 'filter 0.3s ease'
        }
      case 'dark':
        return {
          ...baseStyles,
          backgroundColor: '#2c3e50',
          color: '#ecf0f1'
        }
      case 'typewriter':
        return {
          ...baseStyles,
          textAlign: 'left' as const,
        }
      default:
        return baseStyles
    }
  }

  // Get editor classes based on writing mode
  const getEditorClasses = () => {
    let classes = `
      min-h-[500px] p-6 bg-white dark:bg-charcoal-800 rounded-2xl shadow-sm border border-sakura-100/50 dark:border-charcoal-700/50
      prose prose-lg dark:prose-invert max-w-none writing-scroll
      focus:outline-none focus:ring-2 focus:ring-sakura-500/50
      ${className}
    `

    switch (writingMode) {
      case 'focus':
        classes += ' focus-mode'
        break
      case 'dark':
        classes += ' bg-charcoal-900 text-white border-charcoal-600'
        break
      case 'zen':
        classes += ' border-none shadow-none'
        break
      case 'typewriter':
        classes += ' typewriter-mode'
        break
    }

    return classes
  }

  return (
    <div className="flex flex-col h-full">
      {/* Toolbar */}
      {isToolbarVisible && writingMode !== 'zen' && (
        <div className="flex items-center justify-between p-3 bg-white dark:bg-charcoal-800 border-b border-sakura-100/50 dark:border-charcoal-700/50 rounded-t-2xl">
          {/* Formatting Controls */}
          <div className="flex items-center space-x-1">
            {/* Basic formatting */}
            <div className="flex items-center space-x-1 pr-2 border-r border-charcoal-200 dark:border-charcoal-600">
              {formatButtons.map((button) => {
                const Icon = button.icon
                return (
                  <Button
                    key={button.command}
                    variant="ghost"
                    size="sm"
                    onClick={() => formatText(button.command)}
                    title={`${button.label} ${button.shortcut ? `(${button.shortcut})` : ''}`}
                    className="h-8 w-8 p-0"
                  >
                    <Icon className="h-4 w-4" />
                  </Button>
                )
              })}
            </div>

            {/* Headings */}
            <div className="flex items-center space-x-1 pr-2 border-r border-charcoal-200 dark:border-charcoal-600">
              {headingButtons.map((button) => {
                const Icon = button.icon
                return (
                  <Button
                    key={button.command}
                    variant="ghost"
                    size="sm"
                    onClick={() => formatText(button.command)}
                    title={button.label}
                    className="h-8 w-8 p-0"
                  >
                    <Icon className="h-4 w-4" />
                  </Button>
                )
              })}
            </div>

            {/* Lists and quotes */}
            <div className="flex items-center space-x-1 pr-2 border-r border-charcoal-200 dark:border-charcoal-600">
              {listButtons.map((button) => {
                const Icon = button.icon
                return (
                  <Button
                    key={button.command}
                    variant="ghost"
                    size="sm"
                    onClick={() => formatText(button.command === 'formatBlock' ? 'quote' : button.command)}
                    title={button.label}
                    className="h-8 w-8 p-0"
                  >
                    <Icon className="h-4 w-4" />
                  </Button>
                )
              })}
            </div>

            {/* Alignment */}
            <div className="flex items-center space-x-1">
              {alignmentButtons.map((button) => {
                const Icon = button.icon
                return (
                  <Button
                    key={button.command}
                    variant="ghost"
                    size="sm"
                    onClick={() => formatText(button.command)}
                    title={button.label}
                    className="h-8 w-8 p-0"
                  >
                    <Icon className="h-4 w-4" />
                  </Button>
                )
              })}
            </div>
          </div>

          {/* Stats and controls */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-4 text-sm text-charcoal-600 dark:text-charcoal-400">
              {settings.showWordCount && (
                <span>{wordCount} words</span>
              )}
              <span>{characterCount} characters</span>
              {settings.showReadingTime && (
                <span>{readingTime}m read</span>
              )}
            </div>

            {onToggleFullscreen && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onToggleFullscreen}
                title="Toggle Fullscreen"
                className="h-8 w-8 p-0"
              >
                {isFullscreen ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </Button>
            )}

            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsToolbarVisible(false)}
              title="Hide Toolbar (Press Escape to toggle)"
              className="h-8 w-8 p-0"
            >
              <EyeOff className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}

      {/* Editor */}
      <div className={`
        flex-1 ${writingMode === 'typewriter' ? 'flex flex-col justify-center' : ''}
        ${writingMode === 'focus' ? 'focus-mode-container' : ''}
      `}>
        <div
          ref={editorRef}
          className={getEditorClasses()}
          contentEditable
          suppressContentEditableWarning
          style={getWritingModeStyles()}
          onInput={handleContentChange}
          onMouseUp={handleSelection}
          onKeyUp={handleSelection}
          onContextMenu={handleContextMenu}
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </div>

      {/* Hidden toolbar toggle */}
      {!isToolbarVisible && writingMode !== 'zen' && (
        <div className="absolute top-4 right-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsToolbarVisible(true)}
            title="Show Toolbar"
            className="h-8 w-8 p-0 opacity-50 hover:opacity-100"
          >
            <Eye className="h-4 w-4" />
          </Button>
        </div>
      )}

      {/* Focus mode styles */}
      {writingMode === 'focus' && (
        <style
          dangerouslySetInnerHTML={{
            __html: `
              .focus-mode-container .prose p:not(:focus-within) {
                opacity: ${settings.focusModeOpacity};
                transition: opacity 0.3s ease;
              }
              .focus-mode-container .prose p:focus-within {
                opacity: 1;
              }
            `
          }}
        />
      )}
      
      {writingMode === 'typewriter' && (
        <style
          dangerouslySetInnerHTML={{
            __html: `
              .typewriter-mode {
                scroll-behavior: smooth;
              }
            `
          }}
        />
      )}
      
      {writingMode === 'zen' && (
        <style
          dangerouslySetInnerHTML={{
            __html: `
              .zen-mode .prose {
                border: none !important;
                box-shadow: none !important;
                background: transparent !important;
              }
            `
          }}
        />
      )}

      {/* AI Context Menu */}
      {showContextMenu && selectedText && bookContext && (
        <AIContextMenu
          selectedText={selectedText}
          position={contextMenuPosition}
          onClose={() => setShowContextMenu(false)}
          onApplyResult={handleApplyAIResult}
          bookContext={bookContext}
        />
      )}
    </div>
  )
}

export default RichTextEditor