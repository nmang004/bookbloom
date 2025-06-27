"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { 
  Settings, 
  BookOpen, 
  Target, 
  Brain, 
  Shield, 
  Palette,
  Save,
  Upload,
  Download,
  RotateCcw,
  Sparkles,
  Calendar,
  User,
  Globe
} from "lucide-react"
import { BookSettings } from "@/types/export"

const bookSettingsSchema = z.object({
  basicInfo: z.object({
    title: z.string().min(1, "Title is required"),
    subtitle: z.string().optional(),
    author: z.string().min(1, "Author is required"),
    genre: z.string().min(1, "Genre is required"),
    description: z.string().min(10, "Description must be at least 10 characters"),
    isbn: z.string().optional(),
    publisher: z.string().optional(),
    copyright: z.string().optional(),
  }),
  goals: z.object({
    targetWordCount: z.number().min(1000, "Target must be at least 1000 words"),
    dailyGoal: z.number().min(100, "Daily goal must be at least 100 words"),
    deadline: z.date().optional(),
    writingSchedule: z.enum(['daily', 'weekly', 'custom']),
  }),
  display: z.object({
    coverImage: z.string().optional(),
    status: z.enum(['planning', 'writing', 'editing', 'completed']),
    tags: z.array(z.string()),
    isPrivate: z.boolean(),
  }),
  aiPreferences: z.object({
    defaultModel: z.string(),
    writingStyle: z.string(),
    tone: z.string(),
    generationLength: z.enum(['short', 'medium', 'long']),
    creativityLevel: z.number().min(0).max(100),
  }),
  writingEnvironment: z.object({
    autoSaveInterval: z.number().min(1).max(30),
    backupEnabled: z.boolean(),
    focusMode: z.boolean(),
    wordCountGoalVisible: z.boolean(),
  }),
  exportDefaults: z.object({
    preferredFormat: z.enum(['PDF', 'DOCX', 'TXT']),
    standardOptions: z.record(z.any()),
    includeMetadata: z.boolean(),
  }),
  privacy: z.object({
    allowCollaboration: z.boolean(),
    shareAnalytics: z.boolean(),
    publicProfile: z.boolean(),
  }),
})

interface BookSettingsProps {
  bookId: string
  initialSettings: BookSettings
  onSettingsChange: (settings: BookSettings) => void
}

export function BookSettings({ bookId, initialSettings, onSettingsChange }: BookSettingsProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [lastSaved, setLastSaved] = useState<Date>(new Date())
  const [newTag, setNewTag] = useState("")

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    getValues,
    formState: { errors, isDirty }
  } = useForm<BookSettings>({
    resolver: zodResolver(bookSettingsSchema),
    defaultValues: initialSettings,
    mode: "onChange"
  })

  const watchedValues = watch()

  const onSubmit = async (data: BookSettings) => {
    setIsLoading(true)
    try {
      // Mock API call - replace with actual API
      await new Promise(resolve => setTimeout(resolve, 1000))
      onSettingsChange(data)
      setLastSaved(new Date())
    } catch (error) {
      console.error('Failed to save settings:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleAutoSave = async () => {
    if (isDirty) {
      const data = getValues()
      await onSubmit(data)
    }
  }

  const addTag = () => {
    if (newTag.trim()) {
      const currentTags = getValues('display.tags') || []
      if (!currentTags.includes(newTag.trim())) {
        setValue('display.tags', [...currentTags, newTag.trim()], { shouldDirty: true })
      }
      setNewTag("")
    }
  }

  const removeTag = (tagToRemove: string) => {
    const currentTags = getValues('display.tags') || []
    setValue('display.tags', currentTags.filter(tag => tag !== tagToRemove), { shouldDirty: true })
  }

  const resetToDefaults = () => {
    if (confirm('Reset all settings to defaults? This cannot be undone.')) {
      // Reset form to initial values
      Object.keys(initialSettings).forEach(key => {
        setValue(key as keyof BookSettings, initialSettings[key as keyof BookSettings])
      })
    }
  }

  const exportSettings = () => {
    const settings = getValues()
    const blob = new Blob([JSON.stringify(settings, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${watchedValues.basicInfo.title}-settings.json`
    a.click()
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-charcoal-900 dark:text-white">
            Book Settings
          </h2>
          <p className="text-charcoal-600 dark:text-charcoal-400 mt-1">
            Configure your book preferences and publishing details
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <div className="text-sm text-charcoal-500">
            Last saved: {lastSaved.toLocaleTimeString()}
          </div>
          <Button 
            onClick={handleSubmit(onSubmit)}
            disabled={!isDirty || isLoading}
            className="bg-sakura-500 hover:bg-sakura-600"
          >
            <Save className="h-4 w-4 mr-2" />
            {isLoading ? 'Saving...' : 'Save Changes'}
          </Button>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        <Tabs defaultValue="basic" className="w-full">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="basic">Basic Info</TabsTrigger>
            <TabsTrigger value="goals">Goals</TabsTrigger>
            <TabsTrigger value="display">Display</TabsTrigger>
            <TabsTrigger value="ai">AI Preferences</TabsTrigger>
            <TabsTrigger value="environment">Environment</TabsTrigger>
            <TabsTrigger value="privacy">Privacy</TabsTrigger>
          </TabsList>

          <TabsContent value="basic" className="space-y-6">
            <Card className="border-sakura-200/50 dark:border-charcoal-700/50">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BookOpen className="h-5 w-5 mr-2 text-sakura-500" />
                  Book Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-charcoal-700 dark:text-charcoal-300">
                      Title *
                    </label>
                    <Input
                      {...register('basicInfo.title')}
                      className="border-sakura-200 focus:border-sakura-400"
                    />
                    {errors.basicInfo?.title && (
                      <p className="text-sm text-red-500">{errors.basicInfo.title.message}</p>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-charcoal-700 dark:text-charcoal-300">
                      Subtitle
                    </label>
                    <Input
                      {...register('basicInfo.subtitle')}
                      className="border-sakura-200 focus:border-sakura-400"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-charcoal-700 dark:text-charcoal-300">
                      Author *
                    </label>
                    <Input
                      {...register('basicInfo.author')}
                      className="border-sakura-200 focus:border-sakura-400"
                    />
                    {errors.basicInfo?.author && (
                      <p className="text-sm text-red-500">{errors.basicInfo.author.message}</p>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-charcoal-700 dark:text-charcoal-300">
                      Genre *
                    </label>
                    <Select value={watchedValues.basicInfo?.genre} onValueChange={(value) => setValue('basicInfo.genre', value, { shouldDirty: true })}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Fantasy">Fantasy</SelectItem>
                        <SelectItem value="Science Fiction">Science Fiction</SelectItem>
                        <SelectItem value="Mystery">Mystery</SelectItem>
                        <SelectItem value="Romance">Romance</SelectItem>
                        <SelectItem value="Thriller">Thriller</SelectItem>
                        <SelectItem value="Historical Fiction">Historical Fiction</SelectItem>
                        <SelectItem value="Literary Fiction">Literary Fiction</SelectItem>
                        <SelectItem value="Non-Fiction">Non-Fiction</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium text-charcoal-700 dark:text-charcoal-300">
                    Description *
                  </label>
                  <Textarea
                    {...register('basicInfo.description')}
                    className="min-h-[100px] border-sakura-200 focus:border-sakura-400 resize-none"
                    placeholder="Enter a compelling description of your book..."
                  />
                  {errors.basicInfo?.description && (
                    <p className="text-sm text-red-500">{errors.basicInfo.description.message}</p>
                  )}
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-charcoal-700 dark:text-charcoal-300">
                      ISBN
                    </label>
                    <Input
                      {...register('basicInfo.isbn')}
                      className="border-sakura-200 focus:border-sakura-400"
                      placeholder="978-0-123456-78-9"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-charcoal-700 dark:text-charcoal-300">
                      Publisher
                    </label>
                    <Input
                      {...register('basicInfo.publisher')}
                      className="border-sakura-200 focus:border-sakura-400"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-charcoal-700 dark:text-charcoal-300">
                      Copyright
                    </label>
                    <Input
                      {...register('basicInfo.copyright')}
                      className="border-sakura-200 focus:border-sakura-400"
                      placeholder="© 2024 Author Name"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="goals" className="space-y-6">
            <Card className="border-sakura-200/50 dark:border-charcoal-700/50">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Target className="h-5 w-5 mr-2 text-sakura-500" />
                  Writing Goals
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-charcoal-700 dark:text-charcoal-300">
                      Target Word Count *
                    </label>
                    <Input
                      type="number"
                      {...register('goals.targetWordCount', { valueAsNumber: true })}
                      className="border-sakura-200 focus:border-sakura-400"
                      min="1000"
                    />
                    {errors.goals?.targetWordCount && (
                      <p className="text-sm text-red-500">{errors.goals.targetWordCount.message}</p>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-charcoal-700 dark:text-charcoal-300">
                      Daily Goal (words) *
                    </label>
                    <Input
                      type="number"
                      {...register('goals.dailyGoal', { valueAsNumber: true })}
                      className="border-sakura-200 focus:border-sakura-400"
                      min="100"
                    />
                    {errors.goals?.dailyGoal && (
                      <p className="text-sm text-red-500">{errors.goals.dailyGoal.message}</p>
                    )}
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-charcoal-700 dark:text-charcoal-300">
                      Writing Schedule
                    </label>
                    <Select value={watchedValues.goals?.writingSchedule} onValueChange={(value: 'daily' | 'weekly' | 'custom') => setValue('goals.writingSchedule', value, { shouldDirty: true })}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="daily">Daily</SelectItem>
                        <SelectItem value="weekly">Weekly</SelectItem>
                        <SelectItem value="custom">Custom</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-charcoal-700 dark:text-charcoal-300">
                      Target Completion Date
                    </label>
                    <Input
                      type="date"
                      {...register('goals.deadline', { valueAsDate: true })}
                      className="border-sakura-200 focus:border-sakura-400"
                    />
                  </div>
                </div>
                
                <div className="p-4 bg-sakura-50 dark:bg-sakura-900/20 rounded-lg">
                  <div className="flex items-start space-x-2">
                    <Calendar className="h-4 w-4 text-sakura-500 mt-0.5" />
                    <div>
                      <div className="text-sm font-medium text-sakura-900 dark:text-sakura-300">
                        Progress Estimate
                      </div>
                      <div className="text-xs text-sakura-700 dark:text-sakura-400">
                        At {watchedValues.goals?.dailyGoal || 0} words per day, you'll complete your {(watchedValues.goals?.targetWordCount || 0).toLocaleString()} word goal in approximately {Math.ceil((watchedValues.goals?.targetWordCount || 0) / (watchedValues.goals?.dailyGoal || 1))} days.
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="display" className="space-y-6">
            <Card className="border-sakura-200/50 dark:border-charcoal-700/50">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Palette className="h-5 w-5 mr-2 text-sakura-500" />
                  Display & Status
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-charcoal-700 dark:text-charcoal-300">
                      Current Status
                    </label>
                    <Select value={watchedValues.display?.status} onValueChange={(value: 'planning' | 'writing' | 'editing' | 'completed') => setValue('display.status', value, { shouldDirty: true })}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="planning">Planning</SelectItem>
                        <SelectItem value="writing">Writing</SelectItem>
                        <SelectItem value="editing">Editing</SelectItem>
                        <SelectItem value="completed">Completed</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-charcoal-700 dark:text-charcoal-300">
                      Cover Image
                    </label>
                    <div className="flex space-x-2">
                      <Input
                        {...register('display.coverImage')}
                        className="border-sakura-200 focus:border-sakura-400"
                        placeholder="Image URL or upload"
                      />
                      <Button type="button" variant="outline" size="sm">
                        <Upload className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium text-charcoal-700 dark:text-charcoal-300">
                    Tags
                  </label>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {(watchedValues.display?.tags || []).map((tag) => (
                      <Badge key={tag} variant="secondary" className="bg-sakura-100 text-sakura-700">
                        {tag}
                        <button
                          type="button"
                          onClick={() => removeTag(tag)}
                          className="ml-1 text-sakura-500 hover:text-sakura-700"
                        >
                          ×
                        </button>
                      </Badge>
                    ))}
                  </div>
                  <div className="flex space-x-2">
                    <Input
                      value={newTag}
                      onChange={(e) => setNewTag(e.target.value)}
                      className="border-sakura-200 focus:border-sakura-400"
                      placeholder="Add a tag..."
                      onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                    />
                    <Button type="button" onClick={addTag} variant="outline" size="sm">
                      Add
                    </Button>
                  </div>
                </div>
                
                <div className="flex items-center justify-between p-3 border border-charcoal-200 dark:border-charcoal-700 rounded-lg">
                  <div>
                    <div className="text-sm font-medium text-charcoal-900 dark:text-white">
                      Private Book
                    </div>
                    <div className="text-xs text-charcoal-500">
                      Only you can see this book
                    </div>
                  </div>
                  <Switch
                    checked={watchedValues.display?.isPrivate || false}
                    onCheckedChange={(checked) => setValue('display.isPrivate', checked, { shouldDirty: true })}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="ai" className="space-y-6">
            <Card className="border-sakura-200/50 dark:border-charcoal-700/50">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Brain className="h-5 w-5 mr-2 text-sakura-500" />
                  AI Writing Preferences
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-charcoal-700 dark:text-charcoal-300">
                      Default AI Model
                    </label>
                    <Select value={watchedValues.aiPreferences?.defaultModel} onValueChange={(value) => setValue('aiPreferences.defaultModel', value, { shouldDirty: true })}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="claude-3-sonnet">Claude 3 Sonnet</SelectItem>
                        <SelectItem value="claude-3-haiku">Claude 3 Haiku</SelectItem>
                        <SelectItem value="gpt-4">GPT-4</SelectItem>
                        <SelectItem value="gpt-3.5-turbo">GPT-3.5 Turbo</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-charcoal-700 dark:text-charcoal-300">
                      Writing Style
                    </label>
                    <Select value={watchedValues.aiPreferences?.writingStyle} onValueChange={(value) => setValue('aiPreferences.writingStyle', value, { shouldDirty: true })}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="descriptive">Descriptive</SelectItem>
                        <SelectItem value="concise">Concise</SelectItem>
                        <SelectItem value="dialogue-heavy">Dialogue Heavy</SelectItem>
                        <SelectItem value="literary">Literary</SelectItem>
                        <SelectItem value="action-packed">Action Packed</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-charcoal-700 dark:text-charcoal-300">
                      Tone
                    </label>
                    <Select value={watchedValues.aiPreferences?.tone} onValueChange={(value) => setValue('aiPreferences.tone', value, { shouldDirty: true })}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="serious">Serious</SelectItem>
                        <SelectItem value="humorous">Humorous</SelectItem>
                        <SelectItem value="dark">Dark</SelectItem>
                        <SelectItem value="light">Light</SelectItem>
                        <SelectItem value="dramatic">Dramatic</SelectItem>
                        <SelectItem value="conversational">Conversational</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-charcoal-700 dark:text-charcoal-300">
                      Generation Length
                    </label>
                    <Select value={watchedValues.aiPreferences?.generationLength} onValueChange={(value: 'short' | 'medium' | 'long') => setValue('aiPreferences.generationLength', value, { shouldDirty: true })}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="short">Short (100-300 words)</SelectItem>
                        <SelectItem value="medium">Medium (300-600 words)</SelectItem>
                        <SelectItem value="long">Long (600-1000 words)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium text-charcoal-700 dark:text-charcoal-300">
                    Creativity Level: {watchedValues.aiPreferences?.creativityLevel || 50}%
                  </label>
                  <Slider
                    value={[watchedValues.aiPreferences?.creativityLevel || 50]}
                    onValueChange={([value]) => setValue('aiPreferences.creativityLevel', value, { shouldDirty: true })}
                    min={0}
                    max={100}
                    step={5}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-charcoal-500">
                    <span>Conservative</span>
                    <span>Balanced</span>
                    <span>Creative</span>
                  </div>
                </div>
                
                <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <div className="flex items-start space-x-2">
                    <Sparkles className="h-4 w-4 text-blue-500 mt-0.5" />
                    <div>
                      <div className="text-sm font-medium text-blue-900 dark:text-blue-300">
                        AI Writing Tips
                      </div>
                      <div className="text-xs text-blue-700 dark:text-blue-400">
                        Higher creativity levels produce more unique content but may deviate from your intended style. Start with 50% and adjust based on results.
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="environment" className="space-y-6">
            <Card className="border-sakura-200/50 dark:border-charcoal-700/50">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Settings className="h-5 w-5 mr-2 text-sakura-500" />
                  Writing Environment
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 border border-charcoal-200 dark:border-charcoal-700 rounded-lg">
                    <div>
                      <div className="text-sm font-medium text-charcoal-900 dark:text-white">
                        Auto-save
                      </div>
                      <div className="text-xs text-charcoal-500">
                        Save changes every {watchedValues.writingEnvironment?.autoSaveInterval || 5} minutes
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Slider
                        value={[watchedValues.writingEnvironment?.autoSaveInterval || 5]}
                        onValueChange={([value]) => setValue('writingEnvironment.autoSaveInterval', value, { shouldDirty: true })}
                        min={1}
                        max={30}
                        step={1}
                        className="w-20"
                      />
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 border border-charcoal-200 dark:border-charcoal-700 rounded-lg">
                    <div>
                      <div className="text-sm font-medium text-charcoal-900 dark:text-white">
                        Backup Enabled
                      </div>
                      <div className="text-xs text-charcoal-500">
                        Create automatic backups of your work
                      </div>
                    </div>
                    <Switch
                      checked={watchedValues.writingEnvironment?.backupEnabled || false}
                      onCheckedChange={(checked) => setValue('writingEnvironment.backupEnabled', checked, { shouldDirty: true })}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between p-3 border border-charcoal-200 dark:border-charcoal-700 rounded-lg">
                    <div>
                      <div className="text-sm font-medium text-charcoal-900 dark:text-white">
                        Focus Mode
                      </div>
                      <div className="text-xs text-charcoal-500">
                        Hide distracting UI elements while writing
                      </div>
                    </div>
                    <Switch
                      checked={watchedValues.writingEnvironment?.focusMode || false}
                      onCheckedChange={(checked) => setValue('writingEnvironment.focusMode', checked, { shouldDirty: true })}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between p-3 border border-charcoal-200 dark:border-charcoal-700 rounded-lg">
                    <div>
                      <div className="text-sm font-medium text-charcoal-900 dark:text-white">
                        Show Word Count Goal
                      </div>
                      <div className="text-xs text-charcoal-500">
                        Display daily word count progress in writing mode
                      </div>
                    </div>
                    <Switch
                      checked={watchedValues.writingEnvironment?.wordCountGoalVisible || false}
                      onCheckedChange={(checked) => setValue('writingEnvironment.wordCountGoalVisible', checked, { shouldDirty: true })}
                    />
                  </div>
                </div>
                
                <Card className="border-charcoal-200/50 dark:border-charcoal-700/50">
                  <CardHeader>
                    <CardTitle className="text-lg">Export Defaults</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-charcoal-700 dark:text-charcoal-300">
                          Preferred Format
                        </label>
                        <Select value={watchedValues.exportDefaults?.preferredFormat} onValueChange={(value: 'PDF' | 'DOCX' | 'TXT') => setValue('exportDefaults.preferredFormat', value, { shouldDirty: true })}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="PDF">PDF</SelectItem>
                            <SelectItem value="DOCX">DOCX</SelectItem>
                            <SelectItem value="TXT">TXT</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-sm font-medium text-charcoal-900 dark:text-white">
                            Include Metadata
                          </div>
                          <div className="text-xs text-charcoal-500">
                            Add book info to exported files
                          </div>
                        </div>
                        <Switch
                          checked={watchedValues.exportDefaults?.includeMetadata || false}
                          onCheckedChange={(checked) => setValue('exportDefaults.includeMetadata', checked, { shouldDirty: true })}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="privacy" className="space-y-6">
            <Card className="border-sakura-200/50 dark:border-charcoal-700/50">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Shield className="h-5 w-5 mr-2 text-sakura-500" />
                  Privacy & Collaboration
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 border border-charcoal-200 dark:border-charcoal-700 rounded-lg">
                    <div>
                      <div className="text-sm font-medium text-charcoal-900 dark:text-white">
                        Allow Collaboration
                      </div>
                      <div className="text-xs text-charcoal-500">
                        Let others contribute to your book
                      </div>
                    </div>
                    <Switch
                      checked={watchedValues.privacy?.allowCollaboration || false}
                      onCheckedChange={(checked) => setValue('privacy.allowCollaboration', checked, { shouldDirty: true })}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between p-3 border border-charcoal-200 dark:border-charcoal-700 rounded-lg">
                    <div>
                      <div className="text-sm font-medium text-charcoal-900 dark:text-white">
                        Share Analytics
                      </div>
                      <div className="text-xs text-charcoal-500">
                        Help improve BookBloom with anonymous usage data
                      </div>
                    </div>
                    <Switch
                      checked={watchedValues.privacy?.shareAnalytics || false}
                      onCheckedChange={(checked) => setValue('privacy.shareAnalytics', checked, { shouldDirty: true })}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between p-3 border border-charcoal-200 dark:border-charcoal-700 rounded-lg">
                    <div>
                      <div className="text-sm font-medium text-charcoal-900 dark:text-white">
                        Public Profile
                      </div>
                      <div className="text-xs text-charcoal-500">
                        Show your published books on your public profile
                      </div>
                    </div>
                    <Switch
                      checked={watchedValues.privacy?.publicProfile || false}
                      onCheckedChange={(checked) => setValue('privacy.publicProfile', checked, { shouldDirty: true })}
                    />
                  </div>
                </div>
                
                <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                  <div className="flex items-start space-x-2">
                    <Shield className="h-4 w-4 text-yellow-500 mt-0.5" />
                    <div>
                      <div className="text-sm font-medium text-yellow-900 dark:text-yellow-300">
                        Privacy Note
                      </div>
                      <div className="text-xs text-yellow-700 dark:text-yellow-400">
                        Your book content is always private until you choose to publish. Collaboration settings only apply when you explicitly invite others.
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="flex items-center justify-between pt-6 border-t border-charcoal-200 dark:border-charcoal-700">
          <div className="flex space-x-3">
            <Button type="button" variant="outline" onClick={exportSettings}>
              <Download className="h-4 w-4 mr-2" />
              Export Settings
            </Button>
            <Button type="button" variant="outline">
              <Upload className="h-4 w-4 mr-2" />
              Import Settings
            </Button>
          </div>
          
          <div className="flex space-x-3">
            <Button type="button" variant="ghost" onClick={resetToDefaults}>
              <RotateCcw className="h-4 w-4 mr-2" />
              Reset to Defaults
            </Button>
            <Button 
              type="submit"
              disabled={!isDirty || isLoading}
              className="bg-sakura-500 hover:bg-sakura-600"
            >
              <Save className="h-4 w-4 mr-2" />
              {isLoading ? 'Saving...' : 'Save All Settings'}
            </Button>
          </div>
        </div>
      </form>
    </div>
  )
}