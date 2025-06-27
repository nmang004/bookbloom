export enum CharacterRole {
  PROTAGONIST = 'protagonist',
  ANTAGONIST = 'antagonist',
  SUPPORTING = 'supporting',
  MINOR = 'minor',
}

export enum CharacterImportance {
  MAIN = 'main',
  SECONDARY = 'secondary',
  BACKGROUND = 'background',
}

export enum RelationshipType {
  FAMILY = 'family',
  FRIEND = 'friend',
  ENEMY = 'enemy',
  RIVAL = 'rival',
  MENTOR = 'mentor',
  STUDENT = 'student',
  LOVE_INTEREST = 'love_interest',
  ALLY = 'ally',
  NEUTRAL = 'neutral',
  COMPLEX = 'complex',
}

export enum ArcMilestone {
  INTRODUCTION = 'introduction',
  INCITING_INCIDENT = 'inciting_incident',
  FIRST_CHALLENGE = 'first_challenge',
  MIDPOINT_CRISIS = 'midpoint_crisis',
  DARKEST_MOMENT = 'darkest_moment',
  CLIMAX = 'climax',
  RESOLUTION = 'resolution',
}

export interface PhysicalDescription {
  age?: string
  height?: string
  build?: string
  hairColor?: string
  eyeColor?: string
  distinctiveFeatures?: string
  clothing?: string
  overall?: string
}

export interface PersonalityTraits {
  strengths?: string[]
  weaknesses?: string[]
  fears?: string[]
  desires?: string[]
  quirks?: string[]
  speechPattern?: string
  mannerisms?: string
}

export interface CharacterBackstory {
  childhood?: string
  formativeEvents?: string[]
  education?: string
  occupation?: string
  secrets?: string[]
  trauma?: string[]
  achievements?: string[]
  relationships?: string[]
}

export interface CharacterRelationship {
  id: string
  characterId: string
  relatedCharacterId: string
  relationshipType: RelationshipType
  strength: number // 1-10 scale
  description?: string
  conflictPotential?: number // 1-10 scale
  emotionalDynamics?: string
  history?: string
  currentStatus?: string
}

export interface CharacterArcPoint {
  id: string
  milestone: ArcMilestone
  description: string
  chapter?: number
  emotionalState?: string
  growthMoment?: string
  internalChange?: string
  externalAction?: string
  completed?: boolean
}

export interface CharacterGoals {
  primary?: string
  secondary?: string[]
  internal?: string
  external?: string
  obstacles?: string[]
  stakes?: string
  motivation?: string
}

export interface CharacterVoice {
  speakingStyle?: string
  vocabulary?: string
  cadence?: string
  commonPhrases?: string[]
  dialectOrAccent?: string
  formality?: string
  emotionalExpression?: string
}

export interface Character {
  id: string
  bookId: string
  name: string
  role: CharacterRole
  importance: CharacterImportance
  
  basicInfo: {
    fullName?: string
    nickname?: string
    title?: string
    age?: number
    occupation?: string
  }
  
  physical: PhysicalDescription
  personality: PersonalityTraits
  backstory: CharacterBackstory
  goals: CharacterGoals
  voice: CharacterVoice
  
  arcPoints: CharacterArcPoint[]
  relationships: string[] // Array of relationship IDs
  
  notes?: string
  tags?: string[]
  
  developmentProgress: {
    basicInfo: number // 0-100%
    physical: number
    personality: number
    backstory: number
    goals: number
    relationships: number
    arc: number
    overall: number
  }
  
  aiGenerated?: {
    physicalDescription?: boolean
    personality?: boolean
    backstory?: boolean
    goals?: boolean
    voice?: boolean
    relationships?: boolean
  }
  
  consistencyFlags?: {
    id: string
    type: 'contradiction' | 'missing' | 'inconsistent'
    description: string
    severity: 'low' | 'medium' | 'high'
    location?: string
  }[]
  
  createdAt: Date
  updatedAt: Date
}

export interface CharacterFilter {
  role?: CharacterRole[]
  importance?: CharacterImportance[]
  searchTerm?: string
  tags?: string[]
  developmentLevel?: 'incomplete' | 'developing' | 'complete'
}

export interface CharacterSortOptions {
  field: 'name' | 'role' | 'importance' | 'progress' | 'createdAt' | 'updatedAt'
  direction: 'asc' | 'desc'
}

export interface CharacterCreationRequest {
  name: string
  role: CharacterRole
  importance: CharacterImportance
  basicDescription?: string
  bookContext: {
    title: string
    synopsis: string
    genre: string
    existingCharacters: Pick<Character, 'id' | 'name' | 'role' | 'importance'>[]
  }
}

export interface CharacterEnhancementRequest {
  characterId: string
  enhancementType: 
    | 'physical_description'
    | 'personality'
    | 'backstory'
    | 'goals'
    | 'voice'
    | 'relationships'
    | 'arc'
    | 'comprehensive'
  bookContext: {
    title: string
    synopsis: string
    genre: string
    character: Character
    existingCharacters: Pick<Character, 'id' | 'name' | 'role' | 'importance'>[]
  }
}

export interface CharacterAnalysisRequest {
  analysisType: 'consistency' | 'relationships' | 'development' | 'voice_comparison'
  characters: Character[]
  bookContext: {
    title: string
    synopsis: string
    genre: string
    chapters?: unknown[]
  }
}

export interface CharacterRelationshipSuggestion {
  characterId: string
  relatedCharacterId: string
  suggestedType: RelationshipType
  rationale: string
  storyPotential: string
  conflictOpportunities: string[]
  developmentArcs: string[]
}

export interface CharacterProgressUpdate {
  characterId: string
  field: keyof Character['developmentProgress']
  value: number
  autoCalculateOverall?: boolean
}

export type CharacterExportFormat = 'json' | 'pdf' | 'docx' | 'csv'

export interface CharacterExportOptions {
  format: CharacterExportFormat
  includeRelationships: boolean
  includeBackstory: boolean
  includeArcPoints: boolean
  includeNotes: boolean
  characters?: string[] // Character IDs to export, if not provided exports all
}