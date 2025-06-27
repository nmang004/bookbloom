// World-Building Atlas Types for BookBloom 2.0

// Core World Element Types
export type WorldElementType = 
  | 'location'
  | 'magic-system'
  | 'technology'
  | 'culture'
  | 'history'
  | 'organization'
  | 'item'
  | 'other'

export type WorldElementImportance = 'core' | 'supporting' | 'background'

export type WorldElementStatus = 'seed' | 'sprout' | 'growth' | 'bud' | 'blossom'

// World Element Relationship Types
export type WorldElementRelationshipType =
  | 'located-in'
  | 'part-of'
  | 'conflicts-with'
  | 'influenced-by'
  | 'controls'
  | 'created-by'
  | 'destroyed-by'
  | 'connected-to'
  | 'depends-on'
  | 'rivals-with'

// World Element Base Interface
export interface WorldElement {
  id: string
  bookId: string
  name: string
  type: WorldElementType
  importance: WorldElementImportance
  status: WorldElementStatus
  briefDescription: string
  detailedDescription?: string
  
  // Core Details
  overview: {
    keyFeatures: string[]
    significance: string
    firstAppearance?: string
  }
  
  // Detailed Information
  details: {
    specifications?: string
    rules?: string[]
    limitations?: string[]
    capabilities?: string[]
    appearance?: string
    function?: string
  }
  
  // Historical Context
  history: {
    origin?: string
    timeline?: WorldTimelineEvent[]
    evolution?: string
    significantEvents?: string[]
  }
  
  // Story Integration
  usage: {
    storyRole: string
    chapterReferences: string[]
    characterConnections: string[]
    plotRelevance: string
  }
  
  // Writer's Notes
  notes: {
    developmentIdeas: string[]
    inspirationSources: string[]
    futureConsiderations: string[]
    privateNotes: string
  }
  
  // Metadata
  createdAt: Date
  updatedAt: Date
  completionPercentage: number
  tags: string[]
}

// Specialized World Element Types
export interface Location extends WorldElement {
  type: 'location'
  details: WorldElement['details'] & {
    geography?: string
    climate?: string
    population?: string
    government?: string
    economy?: string
    defenses?: string
    notableFeatures?: string[]
    culturalSignificance?: string
  }
}

export interface MagicSystem extends WorldElement {
  type: 'magic-system'
  details: WorldElement['details'] & {
    powerSource: string
    castingMethods: string[]
    costs: string[]
    restrictions: string[]
    hierarchy?: string
    practitioners?: string[]
    artifacts?: string[]
  }
}

export interface Technology extends WorldElement {
  type: 'technology'
  details: WorldElement['details'] & {
    complexity: 'primitive' | 'medieval' | 'renaissance' | 'industrial' | 'modern' | 'futuristic'
    materials: string[]
    creators?: string[]
    users?: string[]
    impact: string
    evolution?: string
  }
}

export interface Culture extends WorldElement {
  type: 'culture'
  details: WorldElement['details'] & {
    values: string[]
    traditions: string[]
    socialStructure: string
    beliefs: string[]
    conflicts: string[]
    allies: string[]
    language?: string
    customs?: string[]
    taboos?: string[]
  }
}

export interface HistoricalEvent extends WorldElement {
  type: 'history'
  details: WorldElement['details'] & {
    date: string
    participants: string[]
    causes: string[]
    consequences: string[]
    impact: string
    duration?: string
    locations?: string[]
  }
}

export interface Organization extends WorldElement {
  type: 'organization'
  details: WorldElement['details'] & {
    structure: string
    leadership: string[]
    members?: string[]
    goals: string[]
    methods: string[]
    resources: string[]
    territories?: string[]
    rivals?: string[]
    allies?: string[]
  }
}

export interface Item extends WorldElement {
  type: 'item'
  details: WorldElement['details'] & {
    properties: string[]
    materials: string[]
    creator?: string
    currentOwner?: string
    previousOwners?: string[]
    powers?: string[]
    weaknesses?: string[]
    rarity: 'common' | 'uncommon' | 'rare' | 'legendary' | 'unique'
  }
}

// World Element Relationships
export interface WorldElementRelationship {
  id: string
  sourceElementId: string
  targetElementId: string
  relationshipType: WorldElementRelationshipType
  description: string
  strength: 'weak' | 'moderate' | 'strong'
  isReciprocal: boolean
  notes?: string
  createdAt: Date
}

// Timeline Events
export interface WorldTimelineEvent {
  id: string
  name: string
  date: string
  description: string
  significance: string
  relatedElements: string[]
  consequences: string[]
  participants?: string[]
}

// World Atlas State Management
export interface WorldAtlasState {
  elements: WorldElement[]
  relationships: WorldElementRelationship[]
  timeline: WorldTimelineEvent[]
  filters: WorldAtlasFilters
  loading: boolean
  error: string | null
}

export interface WorldAtlasFilters {
  searchTerm: string
  elementTypes: WorldElementType[]
  importance: WorldElementImportance[]
  status: WorldElementStatus[]
  tags: string[]
  sortBy: 'name' | 'type' | 'importance' | 'status' | 'created' | 'updated'
  sortOrder: 'asc' | 'desc'
  viewMode: 'grid' | 'list'
}

// World Element Creation and Editing
export interface WorldElementFormData {
  name: string
  type: WorldElementType
  importance: WorldElementImportance
  briefDescription: string
  tags: string[]
  overview: {
    keyFeatures: string[]
    significance: string
    firstAppearance?: string
  }
}

export interface WorldElementEnhancementRequest {
  elementId: string
  elementType: WorldElementType
  enhancementType: 
    | 'expand-description'
    | 'add-history'
    | 'create-relationships'
    | 'develop-details'
    | 'suggest-usage'
    | 'check-consistency'
  currentData: Partial<WorldElement>
  bookContext: {
    title: string
    synopsis: string
    genre: string
    existingElements: Array<{
      name: string
      type: WorldElementType
      description: string
    }>
  }
}

// AI Generation specific to world-building
export interface WorldElementAIResponse {
  success: boolean
  data?: {
    enhancedElement?: Partial<WorldElement>
    suggestions?: string[]
    connections?: WorldElementRelationship[]
    consistencyIssues?: string[]
    developmentTips?: string[]
  }
  error?: string
}

// World Consistency Checking
export interface WorldConsistencyCheck {
  elementId: string
  issues: WorldConsistencyIssue[]
  suggestions: string[]
  severity: 'low' | 'medium' | 'high'
}

export interface WorldConsistencyIssue {
  type: 'contradiction' | 'gap' | 'overlap' | 'unrealistic'
  description: string
  affectedElements: string[]
  suggestedFix: string
}

// World Element Categories for UI Organization
export interface WorldElementCategory {
  type: WorldElementType
  label: string
  icon: string
  color: string
  description: string
  examples: string[]
}

export const WORLD_ELEMENT_CATEGORIES: WorldElementCategory[] = [
  {
    type: 'location',
    label: 'Locations',
    icon: 'MapPin',
    color: 'emerald',
    description: 'Places, regions, cities, and geographical features',
    examples: ['Cities', 'Kingdoms', 'Dungeons', 'Landmarks', 'Regions']
  },
  {
    type: 'magic-system',
    label: 'Magic Systems',
    icon: 'Sparkles',
    color: 'purple',
    description: 'Magical systems, powers, and supernatural elements',
    examples: ['Spellcasting', 'Divine Magic', 'Elemental Powers', 'Enchantments']
  },
  {
    type: 'technology',
    label: 'Technology',
    icon: 'Cog',
    color: 'slate',
    description: 'Tools, weapons, inventions, and technological systems',
    examples: ['Weapons', 'Transportation', 'Communication', 'Machinery']
  },
  {
    type: 'culture',
    label: 'Cultures',
    icon: 'Users',
    color: 'orange',
    description: 'Societies, peoples, traditions, and ways of life',
    examples: ['Civilizations', 'Tribes', 'Social Classes', 'Traditions']
  },
  {
    type: 'history',
    label: 'History',
    icon: 'Calendar',
    color: 'amber',
    description: 'Historical events, timelines, and past occurrences',
    examples: ['Wars', 'Discoveries', 'Catastrophes', 'Founding Events']
  },
  {
    type: 'organization',
    label: 'Organizations',
    icon: 'Building',
    color: 'blue',
    description: 'Groups, institutions, guilds, and structured entities',
    examples: ['Guilds', 'Governments', 'Military Orders', 'Secret Societies']
  },
  {
    type: 'item',
    label: 'Items',
    icon: 'Package',
    color: 'indigo',
    description: 'Objects, artifacts, tools, and significant items',
    examples: ['Artifacts', 'Weapons', 'Treasures', 'Magical Items']
  },
  {
    type: 'other',
    label: 'Other',
    icon: 'Star',
    color: 'gray',
    description: 'Unique elements that don\'t fit other categories',
    examples: ['Phenomena', 'Creatures', 'Languages', 'Concepts']
  }
]

// Progress tracking for world elements
export const WORLD_ELEMENT_PROGRESS = {
  seed: { label: 'Seed', emoji: '🌰', percentage: 0, color: 'brown' },
  sprout: { label: 'Sprout', emoji: '🌱', percentage: 25, color: 'green' },
  growth: { label: 'Growth', emoji: '🌿', percentage: 50, color: 'emerald' },
  bud: { label: 'Bud', emoji: '🌺', percentage: 75, color: 'pink' },
  blossom: { label: 'Blossom', emoji: '🌸', percentage: 100, color: 'rose' }
} as const

// Helper type for union of specialized world elements
export type SpecializedWorldElement = 
  | Location 
  | MagicSystem 
  | Technology 
  | Culture 
  | HistoricalEvent 
  | Organization 
  | Item