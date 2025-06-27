"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { 
  Users, 
  Plus, 
  Search, 
  Filter,
  UserPlus,
  Crown,
  Shield,
  Heart,
  User,
  Sparkles,
  Loader2,
  BookOpen,
  Edit3,
  MoreHorizontal,
  Eye,
  Settings,
  Trash2
} from "lucide-react"
import { motion, AnimatePresence } from 'framer-motion'
import { Character, CharacterRole, CharacterImportance, CharacterFilter, CharacterSortOptions } from "@/types/character"
import { CharacterCard } from "./CharacterCard"
import { CharacterForm } from "./CharacterForm"

interface CharacterArchitectProps {
  bookId: string
  bookTitle: string
  bookSynopsis: string
  bookGenre: string
}

const CHARACTER_ROLE_OPTIONS = [
  { value: CharacterRole.PROTAGONIST, label: 'Protagonist', icon: Crown, color: 'text-sakura-600' },
  { value: CharacterRole.ANTAGONIST, label: 'Antagonist', icon: Shield, color: 'text-red-500' },
  { value: CharacterRole.SUPPORTING, label: 'Supporting', icon: Heart, color: 'text-blue-500' },
  { value: CharacterRole.MINOR, label: 'Minor', icon: User, color: 'text-gray-500' }
]

const CHARACTER_IMPORTANCE_OPTIONS = [
  { value: CharacterImportance.MAIN, label: 'Main Character' },
  { value: CharacterImportance.SECONDARY, label: 'Secondary Character' },
  { value: CharacterImportance.BACKGROUND, label: 'Background Character' }
]

export function CharacterArchitect({ bookId, bookTitle, bookSynopsis, bookGenre }: CharacterArchitectProps) {
  const [characters, setCharacters] = useState<Character[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [showCharacterForm, setShowCharacterForm] = useState(false)
  const [editingCharacter, setEditingCharacter] = useState<Character | null>(null)
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(null)
  const [filter, setFilter] = useState<CharacterFilter>({})
  const [sortOptions, setSortOptions] = useState<CharacterSortOptions>({
    field: 'name',
    direction: 'asc'
  })

  // Mock data for development - in production this would come from your backend
  useEffect(() => {
    // Initialize with some sample characters for development
    const sampleCharacters: Character[] = [
      {
        id: '1',
        bookId,
        name: 'Elena Blackwood',
        role: CharacterRole.PROTAGONIST,
        importance: CharacterImportance.MAIN,
        basicInfo: {
          fullName: 'Elena Rose Blackwood',
          age: 28,
          occupation: 'Archaeologist'
        },
        physical: {
          age: 'Late twenties',
          height: '5\'6"',
          build: 'Athletic',
          hairColor: 'Dark brown with copper highlights',
          eyeColor: 'Green',
          distinctiveFeatures: 'Scar above left eyebrow',
          overall: 'Confident and approachable with an adventurous spirit'
        },
        personality: {
          strengths: ['Intelligent', 'Determined', 'Empathetic'],
          weaknesses: ['Stubborn', 'Impulsive', 'Trust issues'],
          fears: ['Losing family', 'Being trapped'],
          desires: ['Discovery', 'Truth', 'Adventure'],
          quirks: ['Always carries a notebook', 'Speaks to artifacts'],
          speechPattern: 'Articulate but passionate when excited',
          mannerisms: 'Touches scar when thinking deeply'
        },
        backstory: {
          childhood: 'Grew up in a family of historians and archaeologists',
          formativeEvents: ['Father\'s disappearance during expedition', 'First major discovery at 22'],
          education: 'PhD in Archaeology from Cambridge',
          secrets: ['Knows her father is still alive'],
          relationships: ['Close with mentor Dr. Hayes', 'Estranged from mother']
        },
        goals: {
          primary: 'Find her missing father',
          secondary: ['Uncover ancient civilization', 'Protect historical sites'],
          internal: 'Overcome trust issues and open her heart',
          external: 'Complete the expedition her father started',
          obstacles: ['Dangerous rivals', 'Limited funding', 'Government interference'],
          motivation: 'Driven by love for father and passion for discovery'
        },
        voice: {
          speakingStyle: 'Direct but warm, uses academic terminology mixed with casual language',
          vocabulary: 'Educated, occasionally uses Latin phrases',
          commonPhrases: ['Fascinating!', 'Let me think about this', 'Based on the evidence...'],
          formality: 'Adapts to situation - formal with officials, casual with friends'
        },
        arcPoints: [],
        relationships: [],
        developmentProgress: {
          basicInfo: 100,
          physical: 90,
          personality: 85,
          backstory: 80,
          goals: 95,
          relationships: 60,
          arc: 40,
          overall: 79
        },
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]
    setCharacters(sampleCharacters)
  }, [bookId])

  const filteredAndSortedCharacters = characters
    .filter(character => {
      if (filter.role && filter.role.length > 0 && !filter.role.includes(character.role)) {
        return false
      }
      if (filter.importance && filter.importance.length > 0 && !filter.importance.includes(character.importance)) {
        return false
      }
      if (filter.searchTerm && !character.name.toLowerCase().includes(filter.searchTerm.toLowerCase())) {
        return false
      }
      if (filter.developmentLevel) {
        const progress = character.developmentProgress.overall
        switch (filter.developmentLevel) {
          case 'incomplete':
            return progress < 50
          case 'developing':
            return progress >= 50 && progress < 80
          case 'complete':
            return progress >= 80
        }
      }
      return true
    })
    .sort((a, b) => {
      const { field, direction } = sortOptions
      let aValue: any, bValue: any
      
      switch (field) {
        case 'name':
          aValue = a.name
          bValue = b.name
          break
        case 'role':
          aValue = a.role
          bValue = b.role
          break
        case 'importance':
          aValue = a.importance
          bValue = b.importance
          break
        case 'progress':
          aValue = a.developmentProgress.overall
          bValue = b.developmentProgress.overall
          break
        case 'createdAt':
          aValue = a.createdAt
          bValue = b.createdAt
          break
        case 'updatedAt':
          aValue = a.updatedAt
          bValue = b.updatedAt
          break
        default:
          return 0
      }
      
      if (aValue < bValue) return direction === 'asc' ? -1 : 1
      if (aValue > bValue) return direction === 'asc' ? 1 : -1
      return 0
    })

  const handleCreateCharacter = () => {
    setEditingCharacter(null)
    setShowCharacterForm(true)
  }

  const handleEditCharacter = (character: Character) => {
    setEditingCharacter(character)
    setShowCharacterForm(true)
  }

  const handleDeleteCharacter = async (characterId: string) => {
    if (confirm('Are you sure you want to delete this character? This action cannot be undone.')) {
      setCharacters(prev => prev.filter(c => c.id !== characterId))
    }
  }

  const handleSaveCharacter = (characterData: Partial<Character>) => {
    if (editingCharacter) {
      // Update existing character
      setCharacters(prev => prev.map(c => 
        c.id === editingCharacter.id 
          ? { ...c, ...characterData, updatedAt: new Date() }
          : c
      ))
    } else {
      // Create new character
      const newCharacter: Character = {
        ...characterData as Character,
        id: Date.now().toString(),
        bookId,
        createdAt: new Date(),
        updatedAt: new Date(),
        arcPoints: characterData.arcPoints || [],
        relationships: characterData.relationships || [],
        developmentProgress: characterData.developmentProgress || {
          basicInfo: 60,
          physical: 0,
          personality: 0,
          backstory: 0,
          goals: 0,
          relationships: 0,
          arc: 0,
          overall: 8
        }
      }
      setCharacters(prev => [...prev, newCharacter])
    }
    setShowCharacterForm(false)
    setEditingCharacter(null)
  }

  const getProgressEmoji = (progress: number) => {
    if (progress === 0) return '🌰'
    if (progress <= 25) return '🌱'
    if (progress <= 50) return '🌿'
    if (progress <= 75) return '🌺'
    return '🌸'
  }

  const getRoleIcon = (role: CharacterRole) => {
    const option = CHARACTER_ROLE_OPTIONS.find(opt => opt.value === role)
    return option ? option.icon : User
  }

  const getRoleColor = (role: CharacterRole) => {
    const option = CHARACTER_ROLE_OPTIONS.find(opt => opt.value === role)
    return option ? option.color : 'text-gray-500'
  }

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="flex flex-col space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-sakura-50 rounded-lg">
              <Users className="h-6 w-6 text-sakura-600" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-charcoal-900">Character Architect</h2>
              <p className="text-sm text-charcoal-600">Craft memorable characters that drive your story</p>
            </div>
          </div>
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Button 
              onClick={handleCreateCharacter}
              className="bg-sakura-500 hover:bg-sakura-600 text-white shadow-md"
            >
              <UserPlus className="h-4 w-4 mr-2" />
              Create Character
            </Button>
          </motion.div>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {CHARACTER_ROLE_OPTIONS.map(({ value, label, icon: Icon, color }) => {
            const count = characters.filter(c => c.role === value).length
            return (
              <Card key={value} className="border-0 shadow-sm bg-white/70 backdrop-blur-sm">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3">
                    <Icon className={`h-5 w-5 ${color}`} />
                    <div>
                      <p className="text-sm font-medium text-charcoal-700">{label}</p>
                      <p className="text-2xl font-bold text-charcoal-900">{count}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>

      {/* Filters and Search */}
      <Card className="border-0 shadow-sm bg-white/70 backdrop-blur-sm">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-charcoal-400" />
                <Input
                  placeholder="Search characters by name..."
                  value={filter.searchTerm || ''}
                  onChange={(e) => setFilter(prev => ({ ...prev, searchTerm: e.target.value }))}
                  className="pl-10 border-charcoal-200 focus:border-sakura-400 focus:ring-sakura-400"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                className="border-charcoal-200"
              >
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="border-charcoal-200"
              >
                <Settings className="h-4 w-4 mr-2" />
                Sort
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Character Gallery */}
      <AnimatePresence>
        {filteredAndSortedCharacters.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="text-center py-12"
          >
            <div className="mb-4">
              <Users className="h-12 w-12 text-charcoal-300 mx-auto mb-2" />
              <p className="text-lg text-charcoal-600">No characters yet</p>
              <p className="text-sm text-charcoal-500">
                {filter.searchTerm ? 
                  'No characters match your search criteria' : 
                  'Start building your cast by creating your first character'
                }
              </p>
            </div>
            {!filter.searchTerm && (
              <Button 
                onClick={handleCreateCharacter}
                className="bg-sakura-500 hover:bg-sakura-600 text-white"
              >
                <UserPlus className="h-4 w-4 mr-2" />
                Create Your First Character
              </Button>
            )}
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredAndSortedCharacters.map((character, index) => (
              <motion.div
                key={character.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ delay: index * 0.1 }}
              >
                <CharacterCard
                  character={character}
                  onEdit={() => handleEditCharacter(character)}
                  onDelete={() => handleDeleteCharacter(character.id)}
                  onView={() => setSelectedCharacter(character)}
                />
              </motion.div>
            ))}
          </div>
        )}
      </AnimatePresence>

      {/* Character Form Modal */}
      <AnimatePresence>
        {showCharacterForm && (
          <CharacterForm
            character={editingCharacter}
            bookContext={{
              id: bookId,
              title: bookTitle,
              synopsis: bookSynopsis,
              genre: bookGenre,
              existingCharacters: characters.map(c => ({
                id: c.id,
                name: c.name,
                role: c.role,
                importance: c.importance
              }))
            }}
            onSave={handleSaveCharacter}
            onCancel={() => {
              setShowCharacterForm(false)
              setEditingCharacter(null)
            }}
          />
        )}
      </AnimatePresence>

      {/* Loading Overlay */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
          >
            <Card className="p-6">
              <div className="flex items-center space-x-3">
                <Loader2 className="h-5 w-5 animate-spin text-sakura-500" />
                <p className="text-charcoal-700">Processing your request...</p>
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}