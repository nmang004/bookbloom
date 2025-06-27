"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { 
  Download, 
  FileText, 
  File, 
  FileImage,
  Settings,
  Clock,
  CheckCircle,
  AlertCircle,
  Trash2,
  Eye,
  Sparkles
} from "lucide-react"
import { ExportRequest, ExportJob, ExportFormat } from "@/types/export"

const exportFormats: ExportFormat[] = [
  {
    id: 'PDF',
    name: 'PDF Manuscript',
    description: 'Professional manuscript format with customizable styling',
    icon: '📄',
    fileExtension: 'pdf',
    features: ['Custom fonts', 'Margins control', 'Headers & footers', 'Page numbering'],
    recommended: true
  },
  {
    id: 'DOCX',
    name: 'Word Document',
    description: 'Word-compatible with proper styles and formatting',
    icon: '📝',
    fileExtension: 'docx',
    features: ['Style templates', 'Heading styles', 'Track changes ready', 'Universal compatibility'],
    recommended: false
  },
  {
    id: 'TXT',
    name: 'Plain Text',
    description: 'Clean plain text for universal compatibility',
    icon: '📋',
    fileExtension: 'txt',
    features: ['Universal format', 'Small file size', 'No formatting', 'Fast generation'],
    recommended: false
  }
]

interface ExportSystemProps {
  bookId: string
  bookTitle: string
  chapters: Array<{ id: string; title: string; wordCount: number }>
}

export function ExportSystem({ bookId, bookTitle: _bookTitle, chapters }: ExportSystemProps) {
  const [selectedFormat, setSelectedFormat] = useState<'PDF' | 'DOCX' | 'TXT'>('PDF')
  const [selectedChapters, setSelectedChapters] = useState<string[]>(chapters.map(c => c.id))
  const [exportOptions, setExportOptions] = useState({
    includeTitle: true,
    includeTOC: true,
    includeCharacters: false,
    includeWorldBuilding: false,
    font: 'Times New Roman',
    margins: { top: 1, bottom: 1, left: 1, right: 1 },
    pageNumbers: true,
    chapterBreaks: true,
    lineSpacing: 2,
    encoding: 'UTF-8'
  })
  const [exportJobs, setExportJobs] = useState<ExportJob[]>([])
  const [isExporting, setIsExporting] = useState(false)

  // Mock export jobs for demo
  useEffect(() => {
    setExportJobs([
      {
        id: '1',
        bookId,
        format: 'PDF',
        status: 'completed',
        progress: 100,
        downloadUrl: '/exports/sample.pdf',
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000)
      },
      {
        id: '2',
        bookId,
        format: 'DOCX',
        status: 'processing',
        progress: 65,
        createdAt: new Date(Date.now() - 5 * 60 * 1000)
      }
    ])
  }, [bookId])

  const handleSelectAllChapters = () => {
    setSelectedChapters(chapters.map(c => c.id))
  }

  const handleDeselectAllChapters = () => {
    setSelectedChapters([])
  }

  const handleChapterToggle = (chapterId: string) => {
    setSelectedChapters(prev =>
      prev.includes(chapterId)
        ? prev.filter(id => id !== chapterId)
        : [...prev, chapterId]
    )
  }

  const startExport = async () => {
    if (selectedChapters.length === 0) return

    setIsExporting(true)
    
    const _exportRequest: ExportRequest = {
      bookId,
      format: selectedFormat,
      chapters: selectedChapters,
      options: exportOptions
    }

    try {
      // Mock API call - replace with actual API
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      const newJob: ExportJob = {
        id: Date.now().toString(),
        bookId,
        format: selectedFormat,
        status: 'processing',
        progress: 0,
        createdAt: new Date()
      }
      
      setExportJobs(prev => [newJob, ...prev])
    } catch (error) {
      console.error('Export failed:', error)
    } finally {
      setIsExporting(false)
    }
  }

  const getStatusColor = (status: ExportJob['status']) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-700 border-green-200'
      case 'processing': return 'bg-blue-100 text-blue-700 border-blue-200'
      case 'failed': return 'bg-red-100 text-red-700 border-red-200'
      default: return 'bg-gray-100 text-gray-700 border-gray-200'
    }
  }

  const getStatusIcon = (status: ExportJob['status']) => {
    switch (status) {
      case 'completed': return <CheckCircle className="h-4 w-4" />
      case 'processing': return <Clock className="h-4 w-4" />
      case 'failed': return <AlertCircle className="h-4 w-4" />
      default: return <Clock className="h-4 w-4" />
    }
  }

  const selectedChapterCount = selectedChapters.length
  const totalWordCount = chapters
    .filter(c => selectedChapters.includes(c.id))
    .reduce((sum, c) => sum + c.wordCount, 0)

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-charcoal-900 dark:text-white">
            Export System
          </h2>
          <p className="text-charcoal-600 dark:text-charcoal-400 mt-1">
            Generate professional manuscripts in multiple formats
          </p>
        </div>
        <Button 
          onClick={startExport}
          disabled={selectedChapters.length === 0 || isExporting}
          className="bg-sakura-500 hover:bg-sakura-600"
        >
          <Download className="h-4 w-4 mr-2" />
          {isExporting ? 'Generating...' : 'Start Export'}
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Format Selection */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="border-sakura-200/50 dark:border-charcoal-700/50">
            <CardHeader>
              <CardTitle className="flex items-center">
                <FileText className="h-5 w-5 mr-2 text-sakura-500" />
                Choose Export Format
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {exportFormats.map((format) => (
                  <div key={format.id} className="relative">
                    <button
                      onClick={() => setSelectedFormat(format.id)}
                      className={`
                        w-full p-4 border-2 rounded-xl text-left transition-all duration-200
                        ${selectedFormat === format.id
                          ? 'border-sakura-400 bg-sakura-50 dark:bg-sakura-900/20'
                          : 'border-charcoal-200 dark:border-charcoal-700 hover:border-sakura-300'
                        }
                      `}
                    >
                      <div className="flex items-start justify-between mb-3">
                        <span className="text-2xl">{format.icon}</span>
                        {format.recommended && (
                          <Badge className="bg-sakura-100 text-sakura-700 text-xs">
                            Recommended
                          </Badge>
                        )}
                      </div>
                      <h3 className="font-semibold text-charcoal-900 dark:text-white mb-1">
                        {format.name}
                      </h3>
                      <p className="text-sm text-charcoal-600 dark:text-charcoal-400 mb-3">
                        {format.description}
                      </p>
                      <div className="space-y-1">
                        {format.features.slice(0, 2).map((feature, i) => (
                          <div key={i} className="flex items-center text-xs text-charcoal-500">
                            <div className="w-1 h-1 bg-sakura-400 rounded-full mr-2" />
                            {feature}
                          </div>
                        ))}
                      </div>
                    </button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Chapter Selection */}
          <Card className="border-sakura-200/50 dark:border-charcoal-700/50">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center">
                  <File className="h-5 w-5 mr-2 text-sakura-500" />
                  Select Chapters
                </div>
                <div className="flex items-center space-x-2">
                  <Button variant="ghost" size="sm" onClick={handleSelectAllChapters}>
                    Select All
                  </Button>
                  <Button variant="ghost" size="sm" onClick={handleDeselectAllChapters}>
                    None
                  </Button>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 max-h-64 overflow-y-auto">
                {chapters.map((chapter) => (
                  <div key={chapter.id} className="flex items-center space-x-3 p-2 rounded-lg hover:bg-sakura-50/50 dark:hover:bg-charcoal-700/50">
                    <Checkbox
                      checked={selectedChapters.includes(chapter.id)}
                      onCheckedChange={() => handleChapterToggle(chapter.id)}
                    />
                    <div className="flex-1">
                      <div className="font-medium text-charcoal-900 dark:text-white">
                        {chapter.title}
                      </div>
                      <div className="text-sm text-charcoal-500">
                        {chapter.wordCount.toLocaleString()} words
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              {selectedChapterCount > 0 && (
                <div className="mt-4 p-3 bg-sakura-50 dark:bg-sakura-900/20 rounded-lg">
                  <div className="text-sm font-medium text-charcoal-900 dark:text-white">
                    Export Summary
                  </div>
                  <div className="text-sm text-charcoal-600 dark:text-charcoal-400">
                    {selectedChapterCount} chapters • {totalWordCount.toLocaleString()} words
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Format-Specific Options */}
          <Card className="border-sakura-200/50 dark:border-charcoal-700/50">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Settings className="h-5 w-5 mr-2 text-sakura-500" />
                Export Options
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="content" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="content">Content</TabsTrigger>
                  <TabsTrigger value="formatting">Formatting</TabsTrigger>
                  <TabsTrigger value="advanced">Advanced</TabsTrigger>
                </TabsList>
                
                <TabsContent value="content" className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        checked={exportOptions.includeTitle}
                        onCheckedChange={(checked) => 
                          setExportOptions(prev => ({ ...prev, includeTitle: !!checked }))
                        }
                      />
                      <label className="text-sm text-charcoal-700 dark:text-charcoal-300">
                        Include title page
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        checked={exportOptions.includeTOC}
                        onCheckedChange={(checked) => 
                          setExportOptions(prev => ({ ...prev, includeTOC: !!checked }))
                        }
                      />
                      <label className="text-sm text-charcoal-700 dark:text-charcoal-300">
                        Include table of contents
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        checked={exportOptions.includeCharacters}
                        onCheckedChange={(checked) => 
                          setExportOptions(prev => ({ ...prev, includeCharacters: !!checked }))
                        }
                      />
                      <label className="text-sm text-charcoal-700 dark:text-charcoal-300">
                        Include character list
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        checked={exportOptions.includeWorldBuilding}
                        onCheckedChange={(checked) => 
                          setExportOptions(prev => ({ ...prev, includeWorldBuilding: !!checked }))
                        }
                      />
                      <label className="text-sm text-charcoal-700 dark:text-charcoal-300">
                        Include world building notes
                      </label>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="formatting" className="space-y-4">
                  {selectedFormat === 'PDF' && (
                    <>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-charcoal-700 dark:text-charcoal-300">
                          Font Family
                        </label>
                        <Select value={exportOptions.font} onValueChange={(value) => 
                          setExportOptions(prev => ({ ...prev, font: value }))
                        }>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Times New Roman">Times New Roman</SelectItem>
                            <SelectItem value="Garamond">Garamond</SelectItem>
                            <SelectItem value="Georgia">Georgia</SelectItem>
                            <SelectItem value="Palatino">Palatino</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-charcoal-700 dark:text-charcoal-300">
                          Line Spacing: {exportOptions.lineSpacing}x
                        </label>
                        <Slider
                          value={[exportOptions.lineSpacing]}
                          onValueChange={([value]) => 
                            setExportOptions(prev => ({ ...prev, lineSpacing: value }))
                          }
                          min={1}
                          max={3}
                          step={0.5}
                          className="w-full"
                        />
                      </div>
                    </>
                  )}
                  
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      checked={exportOptions.pageNumbers}
                      onCheckedChange={(checked) => 
                        setExportOptions(prev => ({ ...prev, pageNumbers: !!checked }))
                      }
                    />
                    <label className="text-sm text-charcoal-700 dark:text-charcoal-300">
                      Include page numbers
                    </label>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      checked={exportOptions.chapterBreaks}
                      onCheckedChange={(checked) => 
                        setExportOptions(prev => ({ ...prev, chapterBreaks: !!checked }))
                      }
                    />
                    <label className="text-sm text-charcoal-700 dark:text-charcoal-300">
                      Start chapters on new pages
                    </label>
                  </div>
                </TabsContent>
                
                <TabsContent value="advanced" className="space-y-4">
                  {selectedFormat === 'TXT' && (
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-charcoal-700 dark:text-charcoal-300">
                        Text Encoding
                      </label>
                      <Select value={exportOptions.encoding} onValueChange={(value) => 
                        setExportOptions(prev => ({ ...prev, encoding: value }))
                      }>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="UTF-8">UTF-8</SelectItem>
                          <SelectItem value="ASCII">ASCII</SelectItem>
                          <SelectItem value="ISO-8859-1">ISO-8859-1</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  )}
                  
                  <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <div className="flex items-start space-x-2">
                      <Sparkles className="h-4 w-4 text-blue-500 mt-0.5" />
                      <div>
                        <div className="text-sm font-medium text-blue-900 dark:text-blue-300">
                          Pro Tip
                        </div>
                        <div className="text-xs text-blue-700 dark:text-blue-400">
                          PDF format is recommended for professional submissions and printing.
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        {/* Export History & Queue */}
        <div className="space-y-6">
          <Card className="border-sakura-200/50 dark:border-charcoal-700/50">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Clock className="h-5 w-5 mr-2 text-sakura-500" />
                Export History
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {exportJobs.map((job) => (
                  <div key={job.id} className="p-3 border border-charcoal-200 dark:border-charcoal-700 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <span className="text-lg">
                          {exportFormats.find(f => f.id === job.format)?.icon}
                        </span>
                        <div>
                          <div className="text-sm font-medium text-charcoal-900 dark:text-white">
                            {job.format} Export
                          </div>
                          <div className="text-xs text-charcoal-500">
                            {new Date(job.createdAt).toLocaleString()}
                          </div>
                        </div>
                      </div>
                      <Badge className={getStatusColor(job.status)}>
                        <div className="flex items-center space-x-1">
                          {getStatusIcon(job.status)}
                          <span className="capitalize">{job.status}</span>
                        </div>
                      </Badge>
                    </div>
                    
                    {job.status === 'processing' && (
                      <div className="space-y-1">
                        <Progress value={job.progress} className="h-2" />
                        <div className="text-xs text-charcoal-500 text-center">
                          {job.progress}% complete
                        </div>
                      </div>
                    )}
                    
                    {job.status === 'completed' && job.downloadUrl && (
                      <div className="flex space-x-2 mt-2">
                        <Button size="sm" variant="outline" className="flex-1">
                          <Download className="h-3 w-3 mr-1" />
                          Download
                        </Button>
                        <Button size="sm" variant="ghost">
                          <Eye className="h-3 w-3" />
                        </Button>
                        <Button size="sm" variant="ghost">
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    )}
                    
                    {job.expiresAt && (
                      <div className="text-xs text-charcoal-500 mt-2">
                        Expires: {new Date(job.expiresAt).toLocaleDateString()}
                      </div>
                    )}
                  </div>
                ))}
                
                {exportJobs.length === 0 && (
                  <div className="text-center py-8 text-charcoal-500">
                    <FileImage className="h-8 w-8 mx-auto mb-2 opacity-50" />
                    <p className="text-sm">No exports yet</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}