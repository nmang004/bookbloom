"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useForm, UseFormReturn } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, ArrowRight, Sparkles, BookOpen, Target, Calendar, Loader2 } from "lucide-react"
import Link from "next/link"
// Remove direct import of AI service - we'll use the API route instead
import { motion, AnimatePresence } from "framer-motion"

// Validation schemas for each step
const step1Schema = z.object({
  title: z.string().min(1, "Story title is required").max(100, "Title must be under 100 characters"),
  genre: z.string().min(1, "Please select a genre")
})

const step2Schema = z.object({
  coreIdea: z.string()
    .min(10, "Please describe your story idea in at least 10 characters")
    .max(1000, "Core idea must be under 1000 characters")
})

const step3Schema = z.object({
  enhancedSynopsis: z.string().min(1, "Enhanced synopsis is required")
})

const step4Schema = z.object({
  targetWordCount: z.number().min(10000, "Minimum 10,000 words").max(500000, "Maximum 500,000 words"),
  writingSchedule: z.string().min(1, "Please select a writing schedule")
})

// Combined schema for full form
const wizardSchema = step1Schema.merge(step2Schema).merge(step3Schema).merge(step4Schema)

type WizardFormData = z.infer<typeof wizardSchema>

// Genre options with Zen Garden aesthetics
const genres = [
  { id: "fantasy", name: "Fantasy", icon: "✨", description: "Worlds where magic shapes reality" },
  { id: "science-fiction", name: "Science Fiction", icon: "🚀", description: "Explore futures beyond imagination" },
  { id: "romance", name: "Romance", icon: "💝", description: "Stories that touch the heart" },
  { id: "mystery", name: "Mystery", icon: "🔍", description: "Puzzles waiting to be solved" },
  { id: "thriller", name: "Thriller", icon: "⚡", description: "Edge-of-your-seat adventures" },
  { id: "literary-fiction", name: "Literary Fiction", icon: "📚", description: "Deep explorations of human nature" },
  { id: "young-adult", name: "Young Adult", icon: "🌟", description: "Coming-of-age journeys" },
  { id: "historical-fiction", name: "Historical Fiction", icon: "🏛️", description: "Stories from bygone eras" },
  { id: "dystopian", name: "Dystopian", icon: "🌆", description: "Visions of challenging futures" },
  { id: "adventure", name: "Adventure", icon: "🗻", description: "Epic quests and exploration" }
]

// Writing schedule options
const writingSchedules = [
  { id: "daily", name: "Daily Devotion", description: "Write a little every day", commitment: "15-30 min daily" },
  { id: "weekend", name: "Weekend Warrior", description: "Focused weekend sessions", commitment: "2-4 hours weekends" },
  { id: "flexible", name: "Flexible Flow", description: "Write when inspiration strikes", commitment: "As available" },
  { id: "intensive", name: "Intensive Burst", description: "Concentrated writing periods", commitment: "3+ hours sessions" }
]

// Sakura Progress Indicator Component
const SakuraProgressIndicator = ({ currentStep, totalSteps }: { currentStep: number, totalSteps: number }) => {
  const progressPercentage = (currentStep / totalSteps) * 100
  
  const getStageIcon = () => {
    if (currentStep >= 4) return "🌸" // Full bloom
    if (currentStep >= 3) return "🌺" // Budding
    if (currentStep >= 2) return "🌿" // Growing
    if (currentStep >= 1) return "🌱" // Sprouting
    return "🌰" // Seed
  }
  
  const getStageDescription = () => {
    if (currentStep >= 4) return "Story in full bloom"
    if (currentStep >= 3) return "Nearly ready to bloom"
    if (currentStep >= 2) return "Idea taking shape"
    if (currentStep >= 1) return "First sprout emerging"
    return "Seed planted"
  }

  return (
    <div className="flex items-center space-x-6 mb-12">
      {/* Animated Progress Ring */}
      <div className="relative">
        <div className="w-20 h-20 rounded-full bg-sakura-100 dark:bg-charcoal-800 flex items-center justify-center border-4 border-white dark:border-charcoal-700 shadow-lg">
          <motion.span 
            className="text-3xl"
            key={currentStep}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            {getStageIcon()}
          </motion.span>
          
          {/* Progress Ring Overlay */}
          <svg className="absolute inset-0 w-20 h-20 transform -rotate-90">
            <circle
              cx="40"
              cy="40"
              r="36"
              stroke="currentColor"
              strokeWidth="3"
              fill="transparent"
              className="text-sakura-200 dark:text-charcoal-700"
            />
            <motion.circle
              cx="40"
              cy="40"
              r="36"
              stroke="currentColor"
              strokeWidth="3"
              fill="transparent"
              strokeDasharray={`${2 * Math.PI * 36}`}
              className="text-sakura-500"
              strokeLinecap="round"
              initial={{ strokeDashoffset: `${2 * Math.PI * 36}` }}
              animate={{ strokeDashoffset: `${2 * Math.PI * 36 * (1 - progressPercentage / 100)}` }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            />
          </svg>
        </div>
      </div>
      
      {/* Progress Description */}
      <div className="space-y-2">
        <h3 className="text-lg font-semibold text-charcoal-900 dark:text-white">
          Step {currentStep} of {totalSteps}
        </h3>
        <p className="text-sm text-charcoal-600 dark:text-charcoal-400">
          {getStageDescription()}
        </p>
        <div className="w-64 h-2 bg-sakura-100 dark:bg-charcoal-700 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-sakura-400 to-sakura-500 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progressPercentage}%` }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          />
        </div>
      </div>
    </div>
  )
}

// Step 1: Title & Genre
const Step1 = ({ form, onNext }: { form: UseFormReturn<WizardFormData>, onNext: () => void }) => {
  const { register, watch, formState: { errors } } = form
  const selectedGenre = watch("genre")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const step1Data = { title: watch("title"), genre: watch("genre") }
    const result = step1Schema.safeParse(step1Data)
    if (result.success) {
      onNext()
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
      className="space-y-8"
    >
      <div className="text-center space-y-4">
        <h2 className="text-4xl font-bold text-charcoal-900 dark:text-white">
          Plant Your Seed
        </h2>
        <p className="text-xl text-charcoal-600 dark:text-charcoal-300 max-w-2xl mx-auto">
          Every great story begins with a name and a world to explore. 
          What universe will you create?
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Title Input */}
        <div className="space-y-3">
          <Label htmlFor="title" className="text-lg font-medium text-charcoal-700 dark:text-charcoal-300">
            Story Title
          </Label>
          <Input
            id="title"
            {...register("title")}
            placeholder="Enter your story's title..."
            className="text-lg p-6 border-2 border-sakura-200 dark:border-charcoal-600 rounded-2xl focus:border-sakura-400 focus:ring-4 focus:ring-sakura-200/50 transition-all duration-200"
          />
          {errors.title && (
            <p className="text-sm text-red-500 mt-2">{errors.title.message}</p>
          )}
        </div>

        {/* Genre Selection */}
        <div className="space-y-4">
          <Label className="text-lg font-medium text-charcoal-700 dark:text-charcoal-300">
            Choose Your Genre
          </Label>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {genres.map((genre) => (
              <Card
                key={genre.id}
                className={`cursor-pointer transition-all duration-200 hover:scale-105 hover:shadow-lg ${
                  selectedGenre === genre.id 
                    ? 'border-sakura-400 bg-sakura-50 dark:bg-sakura-900/20 shadow-lg' 
                    : 'border-sakura-200 dark:border-charcoal-700 hover:border-sakura-300'
                }`}
                onClick={() => form.setValue("genre", genre.id)}
              >
                <CardContent className="p-6 text-center space-y-3">
                  <div className="text-3xl">{genre.icon}</div>
                  <h3 className="font-semibold text-charcoal-900 dark:text-white">
                    {genre.name}
                  </h3>
                  <p className="text-sm text-charcoal-600 dark:text-charcoal-400">
                    {genre.description}
                  </p>
                  <input
                    type="radio"
                    {...register("genre")}
                    value={genre.id}
                    className="sr-only"
                  />
                </CardContent>
              </Card>
            ))}
          </div>
          {errors.genre && (
            <p className="text-sm text-red-500 mt-2">{errors.genre.message}</p>
          )}
        </div>

        <div className="flex justify-end pt-6">
          <Button
            type="submit"
            size="lg"
            className="px-8 py-4 text-lg font-semibold bg-sakura-500 hover:bg-sakura-600 hover:scale-105 transition-all duration-200 group"
          >
            Continue Growing
            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-200" />
          </Button>
        </div>
      </form>
    </motion.div>
  )
}

// Step 2: Core Idea
const Step2 = ({ form, onNext, onPrev }: { form: UseFormReturn<WizardFormData>, onNext: () => void, onPrev: () => void }) => {
  const { register, watch, formState: { errors } } = form
  const coreIdea = watch("coreIdea") || ""

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const step2Data = { coreIdea: watch("coreIdea") }
    const result = step2Schema.safeParse(step2Data)
    if (result.success) {
      onNext()
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
      className="space-y-8"
    >
      <div className="text-center space-y-4">
        <h2 className="text-4xl font-bold text-charcoal-900 dark:text-white">
          Nurture Your Idea
        </h2>
        <p className="text-xl text-charcoal-600 dark:text-charcoal-300 max-w-2xl mx-auto">
          Describe the heart of your story. What is the core idea that excites you? 
          Let your imagination flow freely.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="space-y-4">
          <Label htmlFor="coreIdea" className="text-lg font-medium text-charcoal-700 dark:text-charcoal-300">
            Your Story Concept
          </Label>
          <div className="relative">
            <Textarea
              id="coreIdea"
              {...register("coreIdea")}
              placeholder="Describe your story idea... What's the central conflict? Who are the main characters? What world does it take place in?"
              className="min-h-[200px] text-lg p-6 border-2 border-sakura-200 dark:border-charcoal-600 rounded-2xl focus:border-sakura-400 focus:ring-4 focus:ring-sakura-200/50 transition-all duration-200 resize-none"
            />
            <div className="absolute bottom-4 right-4 text-sm text-charcoal-500">
              {coreIdea.length}/1000
            </div>
          </div>
          {errors.coreIdea && (
            <p className="text-sm text-red-500 mt-2">{errors.coreIdea.message}</p>
          )}
        </div>

        {/* Inspiration Panel */}
        <div className="bg-gradient-to-br from-sakura-50 to-white dark:from-charcoal-800 dark:to-charcoal-700 p-6 rounded-2xl border border-sakura-200/50">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-8 h-8 bg-sakura-100 rounded-full flex items-center justify-center">
              <Sparkles className="h-4 w-4 text-sakura-600" />
            </div>
            <h4 className="font-semibold text-charcoal-900 dark:text-white">
              Writing Inspiration
            </h4>
          </div>
          <p className="text-sm text-charcoal-600 dark:text-charcoal-400 mb-4">
            Consider: What if your protagonist&apos;s greatest strength became their weakness? 
            What secret would change everything if revealed?
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
            <div className="bg-white/50 dark:bg-charcoal-700/50 p-3 rounded-lg">
              <span className="font-medium">Characters:</span> Who drives the story?
            </div>
            <div className="bg-white/50 dark:bg-charcoal-700/50 p-3 rounded-lg">
              <span className="font-medium">Conflict:</span> What&apos;s at stake?
            </div>
            <div className="bg-white/50 dark:bg-charcoal-700/50 p-3 rounded-lg">
              <span className="font-medium">Setting:</span> Where does it unfold?
            </div>
          </div>
        </div>

        <div className="flex justify-between pt-6">
          <Button
            type="button"
            onClick={onPrev}
            variant="outline"
            size="lg"
            className="px-6 py-4 border-sakura-300 text-sakura-600 hover:bg-sakura-50"
          >
            <ArrowLeft className="mr-2 h-5 w-5" />
            Back
          </Button>
          
          <Button
            type="submit"
            size="lg"
            className="px-8 py-4 text-lg font-semibold bg-sakura-500 hover:bg-sakura-600 hover:scale-105 transition-all duration-200 group"
          >
            Enhance with AI
            <Sparkles className="ml-2 h-5 w-5 group-hover:rotate-12 transition-transform duration-200" />
          </Button>
        </div>
      </form>
    </motion.div>
  )
}

// Step 3: AI Enhancement
const Step3 = ({ form, onNext, onPrev }: { form: UseFormReturn<WizardFormData>, onNext: () => void, onPrev: () => void }) => {
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedSynopsis, setGeneratedSynopsis] = useState("")
  const [showComparison, setShowComparison] = useState(false)
  const { register, watch, setValue, formState: { errors } } = form
  
  const title = watch("title")
  const genre = watch("genre")
  const coreIdea = watch("coreIdea")
  const enhancedSynopsis = watch("enhancedSynopsis")

  const generateEnhancedSynopsis = async () => {
    setIsGenerating(true)
    try {
      const response = await fetch('/api/ai/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: 'synopsis',
          idea: coreIdea,
          genre: genres.find(g => g.id === genre)?.name || genre,
          length: 'medium'
        })
      })
      
      const result = await response.json()
      
      if (result.success && result.data) {
        setGeneratedSynopsis(result.data.generated)
        setValue("enhancedSynopsis", result.data.generated)
        setShowComparison(true)
      } else {
        console.error('AI generation failed:', result.error)
      }
    } catch (error) {
      console.error('Error generating synopsis:', error)
    } finally {
      setIsGenerating(false)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const step3Data = { enhancedSynopsis: watch("enhancedSynopsis") }
    const result = step3Schema.safeParse(step3Data)
    if (result.success) {
      onNext()
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
      className="space-y-8"
    >
      <div className="text-center space-y-4">
        <h2 className="text-4xl font-bold text-charcoal-900 dark:text-white">
          Bloom with AI
        </h2>
        <p className="text-xl text-charcoal-600 dark:text-charcoal-300 max-w-2xl mx-auto">
          Let AI help your story idea blossom into a rich, compelling synopsis 
          that captures the essence of your vision.
        </p>
      </div>

      {!showComparison ? (
        <div className="text-center space-y-8">
          <div className="bg-gradient-to-br from-sakura-50 to-white dark:from-charcoal-800 dark:to-charcoal-700 p-8 rounded-3xl border border-sakura-200/50">
            <div className="space-y-6">
              <div className="w-16 h-16 bg-sakura-100 rounded-full flex items-center justify-center mx-auto">
                <Sparkles className="h-8 w-8 text-sakura-600" />
              </div>
              
              <div className="space-y-4">
                <h3 className="text-2xl font-bold text-charcoal-900 dark:text-white">
                  &quot;{title}&quot;
                </h3>
                <div className="bg-white/50 dark:bg-charcoal-700/50 p-6 rounded-xl">
                  <p className="text-charcoal-700 dark:text-charcoal-300 italic">
                    {coreIdea}
                  </p>
                </div>
              </div>
              
              <Button
                onClick={generateEnhancedSynopsis}
                disabled={isGenerating}
                size="lg"
                className="px-8 py-4 text-lg font-semibold bg-sakura-500 hover:bg-sakura-600 hover:scale-105 transition-all duration-200 group"
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="mr-3 h-5 w-5 animate-spin" />
                    AI is weaving magic...
                  </>
                ) : (
                  <>
                    <Sparkles className="mr-3 h-5 w-5 group-hover:rotate-12 transition-transform duration-200" />
                    Enhance with AI
                  </>
                )}
              </Button>
            </div>
          </div>
          
          <div className="flex justify-between">
            <Button
              type="button"
              onClick={onPrev}
              variant="outline"
              size="lg"
              className="px-6 py-4 border-sakura-300 text-sakura-600 hover:bg-sakura-50"
            >
              <ArrowLeft className="mr-2 h-5 w-5" />
              Back
            </Button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Original Idea - Smaller column */}
            <div className="lg:col-span-1 space-y-4">
              <h3 className="text-lg font-semibold text-charcoal-700 dark:text-charcoal-300 flex items-center">
                <div className="w-6 h-6 bg-charcoal-200 rounded-full flex items-center justify-center mr-2">
                  <span className="w-2 h-2 bg-charcoal-500 rounded-full"></span>
                </div>
                Your Original Seed
              </h3>
              <div className="relative">
                {/* Beautiful original seed container */}
                <div className="bg-gradient-to-br from-charcoal-50 via-white to-charcoal-25 dark:from-charcoal-800 dark:via-charcoal-750 dark:to-charcoal-800 rounded-2xl border-2 border-charcoal-200/50 dark:border-charcoal-600/50 p-1 shadow-sm">
                  <div className="bg-white dark:bg-charcoal-800 rounded-xl p-4 min-h-[120px] relative">
                    {/* Original badge */}
                    <div className="absolute top-4 right-4 bg-charcoal-500 text-white px-3 py-1 rounded-full text-xs font-medium">
                      Original
                    </div>
                    
                    <div className="pr-16"> {/* Add padding to avoid overlap with badge */}
                      <p className="text-charcoal-700 dark:text-charcoal-300 text-sm leading-relaxed">
                        {coreIdea}
                      </p>
                    </div>
                    
                    {/* Subtle texture */}
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-charcoal-100/10 via-transparent to-charcoal-200/5 dark:from-charcoal-700/10 dark:to-charcoal-600/5 pointer-events-none"></div>
                  </div>
                </div>
                
                {/* Word count */}
                <div className="flex justify-end mt-3 text-xs text-charcoal-500 dark:text-charcoal-400">
                  <span>{coreIdea?.split(' ').length || 0} words</span>
                </div>
              </div>
            </div>
            
            {/* Enhanced Synopsis - Larger column */}
            <div className="lg:col-span-2 space-y-4">
              <h3 className="text-lg font-semibold text-charcoal-700 dark:text-charcoal-300 flex items-center">
                <div className="w-6 h-6 bg-sakura-200 rounded-full flex items-center justify-center mr-2">
                  <Sparkles className="w-3 h-3 text-sakura-600" />
                </div>
                AI-Enhanced Bloom
              </h3>
              <div className="relative">
                {/* Beautiful AI-enhanced container */}
                <div className="bg-gradient-to-br from-sakura-50 via-white to-sakura-25 dark:from-charcoal-800 dark:via-charcoal-750 dark:to-charcoal-800 rounded-2xl border-2 border-sakura-200/50 dark:border-charcoal-600/50 p-1 shadow-lg">
                  <div className="bg-white dark:bg-charcoal-800 rounded-xl p-8 min-h-[300px] relative">
                    {/* Floating AI badge */}
                    <div className="absolute top-4 right-4 bg-gradient-to-r from-sakura-500 to-sakura-600 text-white px-3 py-1 rounded-full text-xs font-medium flex items-center space-x-1 shadow-sm">
                      <Sparkles className="w-3 h-3" />
                      <span>AI Enhanced</span>
                    </div>
                    
                    <Textarea
                      {...register("enhancedSynopsis")}
                      value={enhancedSynopsis}
                      onChange={(e) => setValue("enhancedSynopsis", e.target.value)}
                      className="w-full min-h-[240px] text-lg leading-relaxed border-none bg-transparent resize-none focus:outline-none focus:ring-0 p-0 placeholder:text-charcoal-400 dark:placeholder:text-charcoal-500"
                      placeholder="Your AI-enhanced synopsis will bloom here..."
                    />
                    
                    {/* Subtle glow effect */}
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-sakura-100/20 via-transparent to-sakura-200/10 dark:from-sakura-900/10 dark:to-sakura-800/5 pointer-events-none"></div>
                  </div>
                </div>
                
                {/* Character count */}
                <div className="flex justify-between items-center mt-3 text-xs text-charcoal-500 dark:text-charcoal-400">
                  <span className="flex items-center space-x-1">
                    <Sparkles className="w-3 h-3 text-sakura-500" />
                    <span>Enhanced by Claude 4</span>
                  </span>
                  <span>{enhancedSynopsis?.length || 0} characters</span>
                </div>
              </div>
              {errors.enhancedSynopsis && (
                <p className="text-sm text-red-500">{errors.enhancedSynopsis.message}</p>
              )}
            </div>
          </div>
          
          <div className="text-center space-y-4">
            <p className="text-sm text-charcoal-600 dark:text-charcoal-400">
              Feel free to edit the AI-generated synopsis to match your vision perfectly.
            </p>
            <Button
              type="button"
              onClick={generateEnhancedSynopsis}
              variant="outline"
              disabled={isGenerating}
              className="border-sakura-300 text-sakura-600 hover:bg-sakura-50"
            >
              {isGenerating ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Sparkles className="mr-2 h-4 w-4" />
              )}
              Regenerate
            </Button>
          </div>

          <div className="flex justify-between pt-6">
            <Button
              type="button"
              onClick={() => setShowComparison(false)}
              variant="outline"
              size="lg"
              className="px-6 py-4 border-sakura-300 text-sakura-600 hover:bg-sakura-50"
            >
              <ArrowLeft className="mr-2 h-5 w-5" />
              Back
            </Button>
            
            <Button
              type="submit"
              size="lg"
              className="px-8 py-4 text-lg font-semibold bg-sakura-500 hover:bg-sakura-600 hover:scale-105 transition-all duration-200 group"
            >
              Finalize Story
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-200" />
            </Button>
          </div>
        </form>
      )}
    </motion.div>
  )
}

// Step 4: Final Setup
const Step4 = ({ form, onPrev, onComplete }: { form: UseFormReturn<WizardFormData>, onPrev: () => void, onComplete: () => void }) => {
  const { register, watch, setValue, formState: { errors } } = form
  const targetWordCount = watch("targetWordCount") || 80000
  const writingSchedule = watch("writingSchedule")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const step4Data = { 
      targetWordCount: watch("targetWordCount"), 
      writingSchedule: watch("writingSchedule") 
    }
    const result = step4Schema.safeParse(step4Data)
    if (result.success) {
      onComplete()
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
      className="space-y-8"
    >
      <div className="text-center space-y-4">
        <h2 className="text-4xl font-bold text-charcoal-900 dark:text-white">
          Set Your Journey
        </h2>
        <p className="text-xl text-charcoal-600 dark:text-charcoal-300 max-w-2xl mx-auto">
          Define your writing goals and schedule. Remember, every masterpiece 
          is written one word at a time.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Target Word Count */}
        <div className="space-y-6">
          <Label className="text-lg font-medium text-charcoal-700 dark:text-charcoal-300 flex items-center">
            <Target className="mr-2 h-5 w-5 text-sakura-500" />
            Target Word Count
          </Label>
          
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <span className="text-sm text-charcoal-600 dark:text-charcoal-400 w-16">10K</span>
              <input
                type="range"
                min="10000"
                max="200000"
                step="5000"
                value={targetWordCount}
                onChange={(e) => setValue("targetWordCount", parseInt(e.target.value))}
                className="flex-1 h-3 bg-sakura-100 rounded-lg appearance-none cursor-pointer slider"
              />
              <span className="text-sm text-charcoal-600 dark:text-charcoal-400 w-16">200K</span>
            </div>
            
            <div className="text-center">
              <div className="text-3xl font-bold text-sakura-600">
                {targetWordCount.toLocaleString()}
              </div>
              <div className="text-sm text-charcoal-600 dark:text-charcoal-400">
                words (~{Math.round(targetWordCount / 250)} pages)
              </div>
            </div>
          </div>
          {errors.targetWordCount && (
            <p className="text-sm text-red-500">{errors.targetWordCount.message}</p>
          )}
        </div>

        {/* Writing Schedule */}
        <div className="space-y-4">
          <Label className="text-lg font-medium text-charcoal-700 dark:text-charcoal-300 flex items-center">
            <Calendar className="mr-2 h-5 w-5 text-sakura-500" />
            Writing Schedule
          </Label>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {writingSchedules.map((schedule) => (
              <Card
                key={schedule.id}
                className={`cursor-pointer transition-all duration-200 hover:scale-105 hover:shadow-lg ${
                  writingSchedule === schedule.id 
                    ? 'border-sakura-400 bg-sakura-50 dark:bg-sakura-900/20 shadow-lg' 
                    : 'border-sakura-200 dark:border-charcoal-700 hover:border-sakura-300'
                }`}
                onClick={() => setValue("writingSchedule", schedule.id)}
              >
                <CardContent className="p-6 space-y-3">
                  <h3 className="font-semibold text-charcoal-900 dark:text-white">
                    {schedule.name}
                  </h3>
                  <p className="text-sm text-charcoal-600 dark:text-charcoal-400">
                    {schedule.description}
                  </p>
                  <div className="text-xs text-sakura-600 font-medium">
                    {schedule.commitment}
                  </div>
                  <input
                    type="radio"
                    {...register("writingSchedule")}
                    value={schedule.id}
                    className="sr-only"
                  />
                </CardContent>
              </Card>
            ))}
          </div>
          {errors.writingSchedule && (
            <p className="text-sm text-red-500">{errors.writingSchedule.message}</p>
          )}
        </div>

        <div className="flex justify-between pt-6">
          <Button
            type="button"
            onClick={onPrev}
            variant="outline"
            size="lg"
            className="px-6 py-4 border-sakura-300 text-sakura-600 hover:bg-sakura-50"
          >
            <ArrowLeft className="mr-2 h-5 w-5" />
            Back
          </Button>
          
          <Button
            type="submit"
            size="lg"
            className="px-8 py-4 text-lg font-semibold bg-sakura-500 hover:bg-sakura-600 hover:scale-105 transition-all duration-200 group"
          >
            <BookOpen className="mr-2 h-5 w-5" />
            Create Your Book
          </Button>
        </div>
      </form>
    </motion.div>
  )
}

export default function NewBookWizard() {
  const [currentStep, setCurrentStep] = useState(1)
  const [isComplete, setIsComplete] = useState(false)
  const router = useRouter()
  
  const form = useForm<WizardFormData>({
    resolver: zodResolver(wizardSchema),
    mode: "onChange",
    defaultValues: {
      title: "",
      genre: "",
      coreIdea: "",
      enhancedSynopsis: "",
      targetWordCount: 80000,
      writingSchedule: ""
    }
  })

  // Auto-save functionality
  useEffect(() => {
    const subscription = form.watch((value) => {
      localStorage.setItem('bookbloom-wizard-data', JSON.stringify(value))
    })
    return () => subscription.unsubscribe()
  }, [form])

  // Load saved data on mount
  useEffect(() => {
    const savedData = localStorage.getItem('bookbloom-wizard-data')
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData)
        Object.keys(parsedData).forEach((key) => {
          if (parsedData[key]) {
            form.setValue(key as keyof WizardFormData, parsedData[key])
          }
        })
      } catch (error) {
        console.error('Error loading saved wizard data:', error)
      }
    }
  }, [form])

  const nextStep = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const completeWizard = () => {
    // Clear saved data
    localStorage.removeItem('bookbloom-wizard-data')
    
    // Here you would typically save the book data to your database
    const formData = form.getValues()
    console.log('Book created:', formData)
    
    setIsComplete(true)
    
    // Redirect to dashboard after a moment
    setTimeout(() => {
      router.push('/dashboard')
    }, 2000)
  }

  if (isComplete) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-sakura-50/30 to-white dark:from-charcoal-900 dark:to-charcoal-800 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center space-y-8 p-12"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="text-8xl"
          >
            🌸
          </motion.div>
          
          <div className="space-y-4">
            <h1 className="text-4xl font-bold text-charcoal-900 dark:text-white">
              Your Story Has Blossomed!
            </h1>
            <p className="text-xl text-charcoal-600 dark:text-charcoal-300">
              {form.watch("title")} is ready to grow in your garden
            </p>
          </div>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="text-sm text-charcoal-500"
          >
            Redirecting to your dashboard...
          </motion.div>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-sakura-50/30 to-white dark:from-charcoal-900 dark:to-charcoal-800">
      {/* Header */}
      <nav className="border-b border-sakura-100/30 dark:border-charcoal-700/50 backdrop-blur-xl bg-white/90 dark:bg-charcoal-900/90">
        <div className="container mx-auto px-6 py-5">
          <div className="flex items-center justify-between">
            <Link href="/dashboard" className="flex items-center space-x-3 group">
              <div className="text-2xl transition-transform duration-200 group-hover:scale-110">🌸</div>
              <span className="text-xl font-semibold text-sakura-600">BookBloom</span>
            </Link>
            
            <div className="text-sm text-charcoal-600 dark:text-charcoal-400">
              The Seed - Book Creation Wizard
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Progress Indicator */}
          <SakuraProgressIndicator currentStep={currentStep} totalSteps={4} />
          
          {/* Step Content */}
          <div className="bg-white dark:bg-charcoal-800 rounded-3xl shadow-xl border border-sakura-100/50 dark:border-charcoal-700/50 p-12">
            <AnimatePresence mode="wait">
              {currentStep === 1 && (
                <Step1 key="step1" form={form} onNext={nextStep} />
              )}
              {currentStep === 2 && (
                <Step2 key="step2" form={form} onNext={nextStep} onPrev={prevStep} />
              )}
              {currentStep === 3 && (
                <Step3 key="step3" form={form} onNext={nextStep} onPrev={prevStep} />
              )}
              {currentStep === 4 && (
                <Step4 key="step4" form={form} onPrev={prevStep} onComplete={completeWizard} />
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  )
}