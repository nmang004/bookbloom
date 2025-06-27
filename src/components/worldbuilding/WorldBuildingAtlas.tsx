"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { 
  Globe, 
  Plus, 
  Search, 
  Filter,
  MapPin,
  Sparkles,
  Cog,
  Users,
  Calendar,
  Building,
  Package,
  Star,
  Loader2,
  Settings,
  LayoutGrid,
  List,
  Compass,
  Wand2
} from "lucide-react"
import { motion, AnimatePresence } from 'framer-motion'
import { 
  WorldElement, 
  WorldElementType, 
  WorldElementStatus,
  WorldAtlasFilters,
  WORLD_ELEMENT_CATEGORIES,
  WORLD_ELEMENT_PROGRESS
} from "@/types/worldbuilding"
import { WorldElementCard } from "./WorldElementCard"
import { WorldElementForm } from "./WorldElementForm"

interface WorldBuildingAtlasProps {
  bookId: string
  bookTitle: string
  bookSynopsis: string
  bookGenre: string
}

const ELEMENT_TYPE_ICONS = {
  'location': MapPin,
  'magic-system': Sparkles,
  'technology': Cog,
  'culture': Users,
  'history': Calendar,
  'organization': Building,
  'item': Package,
  'other': Star
} as const

// Color mapping to avoid dynamic Tailwind classes
const CATEGORY_COLOR_CLASSES = {
  emerald: { bg: 'bg-emerald-500', bgHover: 'bg-emerald-600', text: 'text-emerald-500', bgLight: 'bg-emerald-100', textDark: 'text-emerald-700' },
  purple: { bg: 'bg-purple-500', bgHover: 'bg-purple-600', text: 'text-purple-500', bgLight: 'bg-purple-100', textDark: 'text-purple-700' },
  slate: { bg: 'bg-slate-500', bgHover: 'bg-slate-600', text: 'text-slate-500', bgLight: 'bg-slate-100', textDark: 'text-slate-700' },
  orange: { bg: 'bg-orange-500', bgHover: 'bg-orange-600', text: 'text-orange-500', bgLight: 'bg-orange-100', textDark: 'text-orange-700' },
  amber: { bg: 'bg-amber-500', bgHover: 'bg-amber-600', text: 'text-amber-500', bgLight: 'bg-amber-100', textDark: 'text-amber-700' },
  blue: { bg: 'bg-blue-500', bgHover: 'bg-blue-600', text: 'text-blue-500', bgLight: 'bg-blue-100', textDark: 'text-blue-700' },
  indigo: { bg: 'bg-indigo-500', bgHover: 'bg-indigo-600', text: 'text-indigo-500', bgLight: 'bg-indigo-100', textDark: 'text-indigo-700' },
  gray: { bg: 'bg-gray-500', bgHover: 'bg-gray-600', text: 'text-gray-500', bgLight: 'bg-gray-100', textDark: 'text-gray-700' },
} as const

const getCategoryColorClasses = (color: string) => {
  return CATEGORY_COLOR_CLASSES[color as keyof typeof CATEGORY_COLOR_CLASSES] || CATEGORY_COLOR_CLASSES.gray
}

export function WorldBuildingAtlas({ bookId, bookTitle, bookSynopsis, bookGenre }: WorldBuildingAtlasProps) {
  const [elements, setElements] = useState<WorldElement[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [showElementForm, setShowElementForm] = useState(false)
  const [editingElement, setEditingElement] = useState<WorldElement | null>(null)
  const [selectedElement, setSelectedElement] = useState<WorldElement | null>(null)
  const [filters, setFilters] = useState<WorldAtlasFilters>({
    searchTerm: '',
    elementTypes: [],
    importance: [],
    status: [],
    tags: [],
    sortBy: 'name',
    sortOrder: 'asc',
    viewMode: 'grid'
  })
  const [selectedCategory, setSelectedCategory] = useState<WorldElementType | 'all'>('all')

  // Mock data for development - in production this would come from your backend
  useEffect(() => {
    // Initialize with some sample world elements for development
    const sampleElements: WorldElement[] = [
      {
        id: '1',
        bookId,
        name: 'The Crystal Caverns',
        type: 'location',
        importance: 'core',
        status: 'growth',
        briefDescription: 'Ancient underground caverns filled with luminous crystals that amplify magical energy',
        detailedDescription: 'A vast network of interconnected caves beneath the Whispering Mountains, where crystalline formations have grown for millennia. The crystals emit a soft blue-green light and pulse with magical energy.',
        overview: {
          keyFeatures: ['Luminous crystals', 'Amplified magic', 'Ancient origins', 'Underground network'],
          significance: 'Central location where the main characters discover the source of their world\'s magic',
          firstAppearance: 'Chapter 3'
        },
        details: {
          specifications: 'Approximately 50 square miles of connected caverns',
          appearance: 'Towering crystal formations in shades of blue, green, and violet',
          function: 'Natural magical amplifier and energy source'
        },
        history: {
          origin: 'Formed during the Great Sundering 3,000 years ago',
          significantEvents: ['Discovery by the Arcane Order', 'The Crystal War', 'Recent magical disturbances']
        },
        usage: {
          storyRole: 'Major setting for climactic scenes and magical discoveries',
          chapterReferences: ['Chapter 3', 'Chapter 12', 'Chapter 18'],
          characterConnections: ['Elena discovers her powers here', 'Site of final confrontation'],
          plotRelevance: 'Contains the key to saving the magical realm'
        },
        notes: {
          developmentIdeas: ['Add hidden chambers', 'Include crystal guardians'],
          inspirationSources: ['Carlsbad Caverns', 'Fantasy crystal caves'],
          futureConsiderations: ['Potential for sequel location'],
          privateNotes: 'Consider making crystals respond to emotions'
        },
        createdAt: new Date(),
        updatedAt: new Date(),
        completionPercentage: 65,
        tags: ['magical', 'underground', 'crystals', 'discovery']
      },
      {
        id: '2',
        bookId,
        name: 'Elemental Magic System',
        type: 'magic-system',
        importance: 'core',
        status: 'bud',
        briefDescription: 'Magic system based on elemental affinities and crystal resonance',
        detailedDescription: 'Practitioners draw power from one of four elements (earth, air, fire, water) through crystal focuses that amplify their natural affinity.',
        overview: {
          keyFeatures: ['Four elemental schools', 'Crystal amplification', 'Natural affinity', 'Limited practitioners'],
          significance: 'Primary magic system that drives plot and character abilities',
          firstAppearance: 'Chapter 1'
        },
        details: {
          specifications: 'Four elemental schools with crystal amplification system',
          rules: ['Single element affinity per practitioner', 'Requires crystal focus for amplification'],
          limitations: ['Physical exhaustion with overuse', 'Crystal degradation over time'],
          capabilities: ['Elemental manipulation', 'Energy channeling', 'Environmental control'],
          appearance: 'Crystals glow with elemental energy when activated',
          function: 'Amplifies natural elemental affinities through crystalline resonance'
        },
        history: {
          origin: 'Discovered after the Great Sundering when crystals first appeared',
          significantEvents: ['Formation of the Elemental Orders', 'The Mage Wars', 'Recent power fluctuations']
        },
        usage: {
          storyRole: 'Central to protagonist abilities and conflict resolution',
          chapterReferences: ['Chapter 1', 'Chapter 5', 'Chapter 15'],
          characterConnections: ['Elena - Water affinity', 'Marcus - Fire affinity'],
          plotRelevance: 'Key to understanding and stopping the magical crisis'
        },
        notes: {
          developmentIdeas: ['Add combined element techniques', 'Create forbidden magic'],
          inspirationSources: ['Avatar: The Last Airbender', 'Classical elements'],
          futureConsiderations: ['Evolution of magic system in sequels'],
          privateNotes: 'Balance power levels carefully'
        },
        createdAt: new Date(),
        updatedAt: new Date(),
        completionPercentage: 78,
        tags: ['magic', 'elements', 'crystals', 'power']
      }
    ]
    setElements(sampleElements)
  }, [bookId])

  const filteredElements = elements
    .filter(element => {
      // Category filter
      if (selectedCategory !== 'all' && element.type !== selectedCategory) {
        return false
      }
      // Search filter
      if (filters.searchTerm && !element.name.toLowerCase().includes(filters.searchTerm.toLowerCase())) {
        return false
      }
      // Type filter
      if (filters.elementTypes.length > 0 && !filters.elementTypes.includes(element.type)) {
        return false
      }
      // Importance filter
      if (filters.importance.length > 0 && !filters.importance.includes(element.importance)) {
        return false
      }
      // Status filter
      if (filters.status.length > 0 && !filters.status.includes(element.status)) {
        return false
      }
      return true
    })
    .sort((a, b) => {
      const { sortBy, sortOrder } = filters
      let aValue: any, bValue: any
      
      switch (sortBy) {
        case 'name':
          aValue = a.name
          bValue = b.name
          break
        case 'type':
          aValue = a.type
          bValue = b.type
          break
        case 'importance':
          aValue = a.importance
          bValue = b.importance
          break
        case 'status':
          aValue = a.status
          bValue = b.status
          break
        case 'created':
          aValue = a.createdAt
          bValue = b.createdAt
          break
        case 'updated':
          aValue = a.updatedAt
          bValue = b.updatedAt
          break
        default:
          return 0
      }
      
      if (aValue < bValue) return sortOrder === 'asc' ? -1 : 1
      if (aValue > bValue) return sortOrder === 'asc' ? 1 : -1
      return 0
    })

  const handleCreateElement = () => {
    setEditingElement(null)
    setShowElementForm(true)
  }

  const handleEditElement = (element: WorldElement) => {
    setEditingElement(element)
    setShowElementForm(true)
  }

  const handleDeleteElement = async (elementId: string) => {
    if (confirm('Are you sure you want to delete this world element? This action cannot be undone.')) {
      setElements(prev => prev.filter(e => e.id !== elementId))
    }
  }

  const handleSaveElement = (elementData: Partial<WorldElement>) => {
    if (editingElement) {
      // Update existing element
      setElements(prev => prev.map(e => 
        e.id === editingElement.id 
          ? { ...e, ...elementData, updatedAt: new Date() }
          : e
      ))
    } else {
      // Create new element
      const newElement: WorldElement = {
        ...elementData as WorldElement,
        id: Date.now().toString(),
        bookId,
        createdAt: new Date(),
        updatedAt: new Date(),
        completionPercentage: 25 // Start with basic completion
      }
      setElements(prev => [...prev, newElement])
    }
    setShowElementForm(false)
    setEditingElement(null)
  }

  const getElementStats = () => {
    return WORLD_ELEMENT_CATEGORIES.map(category => ({
      ...category,
      count: elements.filter(e => e.type === category.type).length
    }))
  }

  const getCategoryColor = (type: WorldElementType) => {
    const category = WORLD_ELEMENT_CATEGORIES.find(cat => cat.type === type)
    return category?.color || 'gray'
  }

  const getProgressEmoji = (status: WorldElementStatus) => {
    return WORLD_ELEMENT_PROGRESS[status]?.emoji || '🌰'
  }

  const toggleViewMode = () => {
    setFilters(prev => ({
      ...prev,
      viewMode: prev.viewMode === 'grid' ? 'list' : 'grid'
    }))
  }

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="flex flex-col space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-emerald-50 rounded-lg">
              <Globe className="h-6 w-6 text-emerald-600" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-charcoal-900">World-Building Atlas</h2>
              <p className="text-sm text-charcoal-600">Create and manage your story&apos;s world, locations, and lore</p>
            </div>
          </div>
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Button 
              onClick={handleCreateElement}
              className="bg-emerald-500 hover:bg-emerald-600 text-white shadow-md"
            >
              <Plus className="h-4 w-4 mr-2" />
              Create Element
            </Button>
          </motion.div>
        </div>

        {/* Category Navigation */}
        <div className="flex flex-wrap gap-2">
          <Button
            variant={selectedCategory === 'all' ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedCategory('all')}
            className={selectedCategory === 'all' ? "bg-emerald-500 hover:bg-emerald-600" : ""}
          >
            <Compass className="h-4 w-4 mr-2" />
            All Elements ({elements.length})
          </Button>
          {WORLD_ELEMENT_CATEGORIES.map(category => {
            const Icon = ELEMENT_TYPE_ICONS[category.type]
            const count = elements.filter(e => e.type === category.type).length
            return (
              <Button
                key={category.type}
                variant={selectedCategory === category.type ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category.type)}
                className={selectedCategory === category.type ? `${getCategoryColorClasses(category.color).bg} hover:${getCategoryColorClasses(category.color).bgHover}` : ""}
              >
                <Icon className="h-4 w-4 mr-2" />
                {category.label} ({count})
              </Button>
            )
          })}
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {getElementStats().slice(0, 4).map((stat) => {
            const Icon = ELEMENT_TYPE_ICONS[stat.type]
            return (
              <Card key={stat.type} className="border-0 shadow-sm bg-white/70 backdrop-blur-sm">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3">
                    <Icon className={`h-5 w-5 ${getCategoryColorClasses(stat.color).text}`} />
                    <div>
                      <p className="text-sm font-medium text-charcoal-700">{stat.label}</p>
                      <p className="text-2xl font-bold text-charcoal-900">{stat.count}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>

      {/* Search and Filters */}
      <Card className="border-0 shadow-sm bg-white/70 backdrop-blur-sm">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-charcoal-400" />
                <Input
                  placeholder="Search world elements by name..."
                  value={filters.searchTerm}
                  onChange={(e) => setFilters(prev => ({ ...prev, searchTerm: e.target.value }))}
                  className="pl-10 border-charcoal-200 focus:border-emerald-400 focus:ring-emerald-400"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={toggleViewMode}
                className="border-charcoal-200"
              >
                {filters.viewMode === 'grid' ? <List className="h-4 w-4 mr-2" /> : <LayoutGrid className="h-4 w-4 mr-2" />}
                {filters.viewMode === 'grid' ? 'List' : 'Grid'}
              </Button>
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

      {/* World Elements Gallery */}
      <AnimatePresence>
        {filteredElements.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="text-center py-12"
          >
            <div className="mb-6">
              <Globe className="h-12 w-12 text-charcoal-300 mx-auto mb-4" />
              <p className="text-lg text-charcoal-600 mb-2">
                {selectedCategory === 'all' ? 'No world elements yet' : `No ${WORLD_ELEMENT_CATEGORIES.find(c => c.type === selectedCategory)?.label.toLowerCase()} yet`}
              </p>
              <p className="text-sm text-charcoal-500">
                {filters.searchTerm ? 
                  'No elements match your search criteria' : 
                  'Start building your world by creating your first element'
                }
              </p>
            </div>
            {!filters.searchTerm && (
              <div className="space-y-4">
                <Button 
                  onClick={handleCreateElement}
                  className="bg-emerald-500 hover:bg-emerald-600 text-white"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Create Your First Element
                </Button>
                <div className="text-sm text-charcoal-500">
                  <p>Try creating:</p>
                  <div className="flex flex-wrap justify-center gap-2 mt-2">
                    {WORLD_ELEMENT_CATEGORIES.slice(0, 4).map(category => (
                      <span key={category.type} className={`px-2 py-1 rounded-md ${getCategoryColorClasses(category.color).bgLight} ${getCategoryColorClasses(category.color).textDark} text-xs`}>
                        {category.examples[0]}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        ) : (
          <div className={filters.viewMode === 'grid' 
            ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            : "space-y-4"
          }>
            {filteredElements.map((element, index) => (
              <motion.div
                key={element.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ delay: index * 0.1 }}
              >
                <WorldElementCard
                  element={element}
                  viewMode={filters.viewMode}
                  onEdit={() => handleEditElement(element)}
                  onDelete={() => handleDeleteElement(element.id)}
                  onView={() => setSelectedElement(element)}
                />
              </motion.div>
            ))}
          </div>
        )}
      </AnimatePresence>

      {/* World Element Form Modal */}
      <AnimatePresence>
        {showElementForm && (
          <WorldElementForm
            element={editingElement}
            bookContext={{
              id: bookId,
              title: bookTitle,
              synopsis: bookSynopsis,
              genre: bookGenre,
              existingElements: elements.map(e => ({
                id: e.id,
                name: e.name,
                type: e.type,
                description: e.briefDescription
              }))
            }}
            onSave={handleSaveElement}
            onCancel={() => {
              setShowElementForm(false)
              setEditingElement(null)
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
                <Loader2 className="h-5 w-5 animate-spin text-emerald-500" />
                <p className="text-charcoal-700">Crafting your world...</p>
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}