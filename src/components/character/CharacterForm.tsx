"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { 
  X,
  Sparkles,
  Loader2,
  Crown,
  Shield,
  Heart,
  User,
  Save,
  Wand2,
  ChevronRight,
  ChevronLeft,
  Eye,
  AlertCircle
} from "lucide-react"
import { motion, AnimatePresence } from 'framer-motion'
import { Character, CharacterRole, CharacterImportance } from "@/types/character"

interface CharacterFormProps {
  character?: Character | null
  bookContext: {
    id: string
    title: string
    synopsis: string
    genre: string
    existingCharacters: Array<{
      id: string
      name: string
      role: CharacterRole
      importance: CharacterImportance
    }>
  }
  onSave: (character: Partial<Character>) => void
  onCancel: () => void
}

interface FormData {
  name: string
  role: CharacterRole
  importance: CharacterImportance
  basicInfo: {
    fullName: string
    age: number | undefined
    occupation: string
  }
  physical: {
    age: string
    height: string
    build: string
    hairColor: string
    eyeColor: string
    distinctiveFeatures: string
    overall: string
  }
  personality: {
    strengths: string[]
    weaknesses: string[]
    fears: string[]
    desires: string[]
    quirks: string[]
    speechPattern: string
    mannerisms: string
  }
  backstory: {
    childhood: string
    formativeEvents: string[]
    education: string
    secrets: string[]
    relationships: string[]
  }
  goals: {
    primary: string
    secondary: string[]
    internal: string
    external: string
    obstacles: string[]
    motivation: string
  }
  voice: {
    speakingStyle: string
    vocabulary: string
    commonPhrases: string[]
    formality: string
  }
}

const ROLE_OPTIONS = [
  { value: CharacterRole.PROTAGONIST, label: 'Protagonist', icon: Crown, description: 'Main character who drives the story' },
  { value: CharacterRole.ANTAGONIST, label: 'Antagonist', icon: Shield, description: 'Primary opposition to the protagonist' },
  { value: CharacterRole.SUPPORTING, label: 'Supporting', icon: Heart, description: 'Important characters who aid the story' },
  { value: CharacterRole.MINOR, label: 'Minor', icon: User, description: 'Characters with smaller but meaningful roles' }
]

const IMPORTANCE_OPTIONS = [
  { value: CharacterImportance.MAIN, label: 'Main Character', description: 'Central to the plot' },
  { value: CharacterImportance.SECONDARY, label: 'Secondary Character', description: 'Important but not central' },
  { value: CharacterImportance.BACKGROUND, label: 'Background Character', description: 'Provides context and atmosphere' }
]

const FORM_STEPS = [
  { id: 'basic', title: 'Basic Info', description: 'Name, role, and key details' },
  { id: 'physical', title: 'Physical Description', description: 'Appearance and distinctive features' },
  { id: 'personality', title: 'Personality', description: 'Traits, quirks, and mannerisms' },
  { id: 'backstory', title: 'Backstory', description: 'History and formative experiences' },
  { id: 'goals', title: 'Goals & Motivation', description: 'What drives this character' },
  { id: 'voice', title: 'Voice & Speech', description: 'How they communicate' }
]

export function CharacterForm({ character, bookContext, onSave, onCancel }: CharacterFormProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [isGenerating, setIsGenerating] = useState(false)
  const [formData, setFormData] = useState<FormData>({
    name: character?.name || '',
    role: character?.role || CharacterRole.SUPPORTING,
    importance: character?.importance || CharacterImportance.SECONDARY,
    basicInfo: {
      fullName: character?.basicInfo.fullName || '',
      age: character?.basicInfo.age,
      occupation: character?.basicInfo.occupation || ''
    },
    physical: {
      age: character?.physical.age || '',
      height: character?.physical.height || '',
      build: character?.physical.build || '',
      hairColor: character?.physical.hairColor || '',
      eyeColor: character?.physical.eyeColor || '',
      distinctiveFeatures: character?.physical.distinctiveFeatures || '',
      overall: character?.physical.overall || ''
    },
    personality: {
      strengths: character?.personality.strengths || [],
      weaknesses: character?.personality.weaknesses || [],
      fears: character?.personality.fears || [],
      desires: character?.personality.desires || [],
      quirks: character?.personality.quirks || [],
      speechPattern: character?.personality.speechPattern || '',
      mannerisms: character?.personality.mannerisms || ''
    },
    backstory: {
      childhood: character?.backstory.childhood || '',
      formativeEvents: character?.backstory.formativeEvents || [],
      education: character?.backstory.education || '',
      secrets: character?.backstory.secrets || [],
      relationships: character?.backstory.relationships || []
    },
    goals: {
      primary: character?.goals.primary || '',
      secondary: character?.goals.secondary || [],
      internal: character?.goals.internal || '',
      external: character?.goals.external || '',
      obstacles: character?.goals.obstacles || [],
      motivation: character?.goals.motivation || ''
    },
    voice: {
      speakingStyle: character?.voice.speakingStyle || '',
      vocabulary: character?.voice.vocabulary || '',
      commonPhrases: character?.voice.commonPhrases || [],
      formality: character?.voice.formality || ''
    }
  })

  const handleInputChange = (field: string, value: any, section?: string) => {
    if (section) {
      setFormData(prev => ({
        ...prev,
        [section]: {
          ...(prev[section as keyof FormData] as any),
          [field]: value
        }
      }))
    } else {
      setFormData(prev => ({
        ...prev,
        [field]: value
      }))
    }
  }

  const handleArrayFieldChange = (field: string, value: string[], section: string) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...(prev[section as keyof FormData] as any),
        [field]: value
      }
    }))
  }

  const addArrayItem = (field: string, section: string) => {
    const currentArray = (formData[section as keyof FormData] as any)[field] as string[]
    handleArrayFieldChange(field, [...currentArray, ''], section)
  }

  const updateArrayItem = (field: string, section: string, index: number, value: string) => {
    const currentArray = (formData[section as keyof FormData] as any)[field] as string[]
    const newArray = [...currentArray]
    newArray[index] = value
    handleArrayFieldChange(field, newArray, section)
  }

  const removeArrayItem = (field: string, section: string, index: number) => {
    const currentArray = (formData[section as keyof FormData] as any)[field] as string[]
    const newArray = currentArray.filter((_, i) => i !== index)
    handleArrayFieldChange(field, newArray, section)
  }

  const handleAIGenerate = async (type: string) => {
    setIsGenerating(true)
    try {
      const response = await fetch('/api/ai/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: 'character_enhancement',
          characterId: character?.id || 'new',
          enhancementType: type,
          context: {
            title: bookContext.title,
            synopsis: bookContext.synopsis,
            genre: bookContext.genre,
            character: {
              ...formData
            },
            existingCharacters: bookContext.existingCharacters
          }
        })
      })

      if (response.ok) {
        const result = await response.json()
        if (result.success) {
          const generatedData = JSON.parse(result.data.generated)
          // Merge the generated data with current form data
          setFormData(prev => ({
            ...prev,
            ...generatedData
          }))
        }
      }
    } catch (error) {
      console.error('AI generation failed:', error)
    } finally {
      setIsGenerating(false)
    }
  }

  const handleSave = () => {
    const characterData: Partial<Character> = {
      ...formData,
      basicInfo: formData.basicInfo,
      physical: formData.physical,
      personality: formData.personality,
      backstory: formData.backstory,
      goals: formData.goals,
      voice: formData.voice
    }
    onSave(characterData)
  }

  const renderArrayField = (
    label: string,
    field: string,
    section: string,
    placeholder: string
  ) => {
    const currentArray = (formData[section as keyof FormData] as any)[field] as string[]
    
    return (
      <div className="space-y-2">
        <label className="text-sm font-medium text-charcoal-700">{label}</label>
        {currentArray.map((item, index) => (
          <div key={index} className="flex gap-2">
            <Input
              value={item}
              onChange={(e) => updateArrayItem(field, section, index, e.target.value)}
              placeholder={placeholder}
              className="flex-1"
            />
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => removeArrayItem(field, section, index)}
              className="px-3"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        ))}
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => addArrayItem(field, section)}
          className="w-full"
        >
          Add {label.slice(0, -1)}
        </Button>
      </div>
    )
  }

  const renderStepContent = () => {
    const step = FORM_STEPS[currentStep]

    switch (step.id) {
      case 'basic':
        return (
          <div className="space-y-6">
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-charcoal-700">Character Name *</label>
                <Input
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  placeholder="Enter character name"
                  className="mt-1"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-charcoal-700">Role in Story *</label>
                <div className="grid grid-cols-2 gap-3 mt-2">
                  {ROLE_OPTIONS.map(({ value, label, icon: Icon, description }) => (
                    <button
                      key={value}
                      type="button"
                      onClick={() => handleInputChange('role', value)}
                      className={`p-3 border rounded-lg text-left transition-all ${
                        formData.role === value
                          ? 'border-sakura-500 bg-sakura-50'
                          : 'border-charcoal-200 hover:border-charcoal-300'
                      }`}
                    >
                      <div className="flex items-center space-x-2 mb-1">
                        <Icon className="h-4 w-4" />
                        <span className="font-medium">{label}</span>
                      </div>
                      <p className="text-xs text-charcoal-600">{description}</p>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-charcoal-700">Character Importance</label>
                <div className="space-y-2 mt-2">
                  {IMPORTANCE_OPTIONS.map(({ value, label, description }) => (
                    <button
                      key={value}
                      type="button"
                      onClick={() => handleInputChange('importance', value)}
                      className={`w-full p-3 border rounded-lg text-left transition-all ${
                        formData.importance === value
                          ? 'border-sakura-500 bg-sakura-50'
                          : 'border-charcoal-200 hover:border-charcoal-300'
                      }`}
                    >
                      <div className="font-medium">{label}</div>
                      <p className="text-xs text-charcoal-600">{description}</p>
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-charcoal-700">Full Name</label>
                  <Input
                    value={formData.basicInfo.fullName}
                    onChange={(e) => handleInputChange('fullName', e.target.value, 'basicInfo')}
                    placeholder="Full character name"
                    className="mt-1"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-charcoal-700">Age</label>
                  <Input
                    type="number"
                    value={formData.basicInfo.age || ''}
                    onChange={(e) => handleInputChange('age', e.target.value ? parseInt(e.target.value) : undefined, 'basicInfo')}
                    placeholder="Age"
                    className="mt-1"
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-charcoal-700">Occupation/Role</label>
                <Input
                  value={formData.basicInfo.occupation}
                  onChange={(e) => handleInputChange('occupation', e.target.value, 'basicInfo')}
                  placeholder="What does this character do?"
                  className="mt-1"
                />
              </div>
            </div>
          </div>
        )

      case 'physical':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium text-charcoal-900">Physical Description</h3>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => handleAIGenerate('physical_description')}
                disabled={isGenerating}
                className="flex items-center space-x-2"
              >
                {isGenerating ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Sparkles className="h-4 w-4" />
                )}
                <span>Generate with AI</span>
              </Button>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-charcoal-700">Age Description</label>
                <Input
                  value={formData.physical.age}
                  onChange={(e) => handleInputChange('age', e.target.value, 'physical')}
                  placeholder="e.g., Mid-twenties"
                  className="mt-1"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-charcoal-700">Height</label>
                <Input
                  value={formData.physical.height}
                  onChange={(e) => handleInputChange('height', e.target.value, 'physical')}
                  placeholder="e.g., 5'6 inches"
                  className="mt-1"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-charcoal-700">Build</label>
                <Input
                  value={formData.physical.build}
                  onChange={(e) => handleInputChange('build', e.target.value, 'physical')}
                  placeholder="e.g., Athletic, Slender"
                  className="mt-1"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-charcoal-700">Hair Color</label>
                <Input
                  value={formData.physical.hairColor}
                  onChange={(e) => handleInputChange('hairColor', e.target.value, 'physical')}
                  placeholder="e.g., Auburn, curly"
                  className="mt-1"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-charcoal-700">Eye Color</label>
                <Input
                  value={formData.physical.eyeColor}
                  onChange={(e) => handleInputChange('eyeColor', e.target.value, 'physical')}
                  placeholder="e.g., Green, piercing"
                  className="mt-1"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-charcoal-700">Distinctive Features</label>
                <Input
                  value={formData.physical.distinctiveFeatures}
                  onChange={(e) => handleInputChange('distinctiveFeatures', e.target.value, 'physical')}
                  placeholder="e.g., Scar on left cheek"
                  className="mt-1"
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-charcoal-700">Overall Appearance</label>
              <Textarea
                value={formData.physical.overall}
                onChange={(e) => handleInputChange('overall', e.target.value, 'physical')}
                placeholder="Describe the character's overall appearance and presence..."
                className="mt-1"
                rows={3}
              />
            </div>
          </div>
        )

      case 'personality':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium text-charcoal-900">Personality & Traits</h3>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => handleAIGenerate('personality')}
                disabled={isGenerating}
                className="flex items-center space-x-2"
              >
                {isGenerating ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Sparkles className="h-4 w-4" />
                )}
                <span>Generate with AI</span>
              </Button>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-4">
                {renderArrayField('Strengths', 'strengths', 'personality', 'e.g., Brave, Intelligent')}
                {renderArrayField('Fears', 'fears', 'personality', 'e.g., Heights, Abandonment')}
                {renderArrayField('Quirks', 'quirks', 'personality', 'e.g., Always taps pen when thinking')}
              </div>
              <div className="space-y-4">
                {renderArrayField('Weaknesses', 'weaknesses', 'personality', 'e.g., Stubborn, Impatient')}
                {renderArrayField('Desires', 'desires', 'personality', 'e.g., Freedom, Recognition')}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-charcoal-700">Speech Pattern</label>
                <Textarea
                  value={formData.personality.speechPattern}
                  onChange={(e) => handleInputChange('speechPattern', e.target.value, 'personality')}
                  placeholder="How does this character speak?"
                  className="mt-1"
                  rows={2}
                />
              </div>
              <div>
                <label className="text-sm font-medium text-charcoal-700">Mannerisms</label>
                <Textarea
                  value={formData.personality.mannerisms}
                  onChange={(e) => handleInputChange('mannerisms', e.target.value, 'personality')}
                  placeholder="Physical habits and gestures"
                  className="mt-1"
                  rows={2}
                />
              </div>
            </div>
          </div>
        )

      case 'backstory':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium text-charcoal-900">Backstory & History</h3>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => handleAIGenerate('backstory')}
                disabled={isGenerating}
                className="flex items-center space-x-2"
              >
                {isGenerating ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Sparkles className="h-4 w-4" />
                )}
                <span>Generate with AI</span>
              </Button>
            </div>

            <div>
              <label className="text-sm font-medium text-charcoal-700">Childhood</label>
              <Textarea
                value={formData.backstory.childhood}
                onChange={(e) => handleInputChange('childhood', e.target.value, 'backstory')}
                placeholder="Describe their childhood and upbringing..."
                className="mt-1"
                rows={3}
              />
            </div>

            <div>
              <label className="text-sm font-medium text-charcoal-700">Education</label>
              <Textarea
                value={formData.backstory.education}
                onChange={(e) => handleInputChange('education', e.target.value, 'backstory')}
                placeholder="Educational background and learning experiences..."
                className="mt-1"
                rows={2}
              />
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-4">
                {renderArrayField('Formative Events', 'formativeEvents', 'backstory', 'e.g., Parent\'s death, First love')}
                {renderArrayField('Important Relationships', 'relationships', 'backstory', 'e.g., Mentor, Best friend')}
              </div>
              <div className="space-y-4">
                {renderArrayField('Secrets', 'secrets', 'backstory', 'e.g., Hidden talent, Past mistake')}
              </div>
            </div>
          </div>
        )

      case 'goals':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium text-charcoal-900">Goals & Motivation</h3>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => handleAIGenerate('goals')}
                disabled={isGenerating}
                className="flex items-center space-x-2"
              >
                {isGenerating ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Sparkles className="h-4 w-4" />
                )}
                <span>Generate with AI</span>
              </Button>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-charcoal-700">Primary Goal</label>
                <Textarea
                  value={formData.goals.primary}
                  onChange={(e) => handleInputChange('primary', e.target.value, 'goals')}
                  placeholder="What is their main objective?"
                  className="mt-1"
                  rows={2}
                />
              </div>
              <div>
                <label className="text-sm font-medium text-charcoal-700">Core Motivation</label>
                <Textarea
                  value={formData.goals.motivation}
                  onChange={(e) => handleInputChange('motivation', e.target.value, 'goals')}
                  placeholder="What drives them deep down?"
                  className="mt-1"
                  rows={2}
                />
              </div>
              <div>
                <label className="text-sm font-medium text-charcoal-700">Internal Goal</label>
                <Textarea
                  value={formData.goals.internal}
                  onChange={(e) => handleInputChange('internal', e.target.value, 'goals')}
                  placeholder="Emotional/psychological goal"
                  className="mt-1"
                  rows={2}
                />
              </div>
              <div>
                <label className="text-sm font-medium text-charcoal-700">External Goal</label>
                <Textarea
                  value={formData.goals.external}
                  onChange={(e) => handleInputChange('external', e.target.value, 'goals')}
                  placeholder="Physical/tangible goal"
                  className="mt-1"
                  rows={2}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div>
                {renderArrayField('Secondary Goals', 'secondary', 'goals', 'e.g., Find love, Get promoted')}
              </div>
              <div>
                {renderArrayField('Major Obstacles', 'obstacles', 'goals', 'e.g., Lack of resources, Past trauma')}
              </div>
            </div>
          </div>
        )

      case 'voice':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium text-charcoal-900">Voice & Speech</h3>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => handleAIGenerate('voice')}
                disabled={isGenerating}
                className="flex items-center space-x-2"
              >
                {isGenerating ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Sparkles className="h-4 w-4" />
                )}
                <span>Generate with AI</span>
              </Button>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-charcoal-700">Speaking Style</label>
                <Textarea
                  value={formData.voice.speakingStyle}
                  onChange={(e) => handleInputChange('speakingStyle', e.target.value, 'voice')}
                  placeholder="How do they communicate?"
                  className="mt-1"
                  rows={3}
                />
              </div>
              <div>
                <label className="text-sm font-medium text-charcoal-700">Vocabulary</label>
                <Textarea
                  value={formData.voice.vocabulary}
                  onChange={(e) => handleInputChange('vocabulary', e.target.value, 'voice')}
                  placeholder="Type of words they use"
                  className="mt-1"
                  rows={3}
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-charcoal-700">Formality Level</label>
              <Textarea
                value={formData.voice.formality}
                onChange={(e) => handleInputChange('formality', e.target.value, 'voice')}
                placeholder="Formal, casual, adapts to situation?"
                className="mt-1"
                rows={2}
              />
            </div>

            <div>
              {renderArrayField('Common Phrases', 'commonPhrases', 'voice', 'e.g., "Fascinating!", "Let me think..."')}
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="bg-white rounded-xl shadow-2xl w-full max-w-4xl h-[85vh] flex flex-col"
      >
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-charcoal-100 flex-shrink-0">
            <div>
              <h2 className="text-xl font-bold text-charcoal-900">
                {character ? 'Edit Character' : 'Create New Character'}
              </h2>
              <p className="text-sm text-charcoal-600">
                {FORM_STEPS[currentStep].description}
              </p>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={onCancel}
              className="h-8 w-8 p-0"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Progress Steps */}
          <div className="px-4 py-3 border-b border-charcoal-100 flex-shrink-0">
            <div className="flex items-center space-x-2 overflow-x-auto">
              {FORM_STEPS.map((step, index) => (
                <div key={step.id} className="flex items-center space-x-2 min-w-0">
                  <button
                    onClick={() => setCurrentStep(index)}
                    className={`flex items-center space-x-2 px-3 py-1.5 rounded-full text-sm whitespace-nowrap transition-colors ${
                      index === currentStep
                        ? 'bg-sakura-100 text-sakura-700'
                        : index < currentStep
                        ? 'bg-green-100 text-green-700'
                        : 'bg-charcoal-100 text-charcoal-600 hover:bg-charcoal-200'
                    }`}  
                  >
                    <span className="font-medium">{index + 1}</span>
                    <span>{step.title}</span>
                  </button>
                  {index < FORM_STEPS.length - 1 && (
                    <ChevronRight className="h-4 w-4 text-charcoal-400" />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Form Content */}
          <div className="flex-1 overflow-y-auto min-h-0 p-6">
            {renderStepContent()}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between p-4 bg-charcoal-50 border-t border-charcoal-100 flex-shrink-0">
            <div className="flex space-x-2">
              <Button
                variant="outline"
                onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
                disabled={currentStep === 0}
              >
                <ChevronLeft className="h-4 w-4 mr-2" />
                Previous
              </Button>
              {currentStep < FORM_STEPS.length - 1 && (
                <Button
                  onClick={() => setCurrentStep(Math.min(FORM_STEPS.length - 1, currentStep + 1))}
                >
                  Next
                  <ChevronRight className="h-4 w-4 ml-2" />
                </Button>
              )}
            </div>

            <div className="flex space-x-2">
              <Button variant="outline" onClick={onCancel}>
                Cancel
              </Button>
              <Button onClick={handleSave} className="bg-sakura-500 hover:bg-sakura-600 text-white">
                <Save className="h-4 w-4 mr-2" />
                {character ? 'Save Changes' : 'Create Character'}
              </Button>
            </div>
          </div>
      </motion.div>
    </motion.div>
  )
}