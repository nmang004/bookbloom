"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { 
  Filter,
  Search,
  X,
  ChevronDown,
  MapPin,
  Sparkles,
  Cog,
  Users,
  Calendar,
  Building,
  Package,
  Star
} from "lucide-react"
import { motion, AnimatePresence } from 'framer-motion'
import { 
  WorldElementType, 
  WorldElementImportance, 
  WorldElementStatus,
  WorldAtlasFilters,
  WORLD_ELEMENT_CATEGORIES 
} from "@/types/worldbuilding"

interface WorldElementFiltersProps {
  filters: WorldAtlasFilters
  onFiltersChange: (filters: Partial<WorldAtlasFilters>) => void
  elementCounts: {
    total: number
    byType: Record<WorldElementType, number>
    byImportance: Record<WorldElementImportance, number>
    byStatus: Record<WorldElementStatus, number>
  }
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

const IMPORTANCE_OPTIONS = [
  { value: 'core', label: 'Core', color: 'red' },
  { value: 'supporting', label: 'Supporting', color: 'amber' },
  { value: 'background', label: 'Background', color: 'gray' }
] as const

const STATUS_OPTIONS = [
  { value: 'seed', label: 'Seed', emoji: '🌰' },
  { value: 'sprout', label: 'Sprout', emoji: '🌱' },
  { value: 'growth', label: 'Growth', emoji: '🌿' },
  { value: 'bud', label: 'Bud', emoji: '🌺' },
  { value: 'blossom', label: 'Blossom', emoji: '🌸' }
] as const

export function WorldElementFilters({ filters, onFiltersChange, elementCounts }: WorldElementFiltersProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  const hasActiveFilters = 
    filters.elementTypes.length > 0 ||
    filters.importance.length > 0 ||
    filters.status.length > 0 ||
    filters.tags.length > 0

  const clearAllFilters = () => {
    onFiltersChange({
      elementTypes: [],
      importance: [],
      status: [],
      tags: []
    })
  }

  const toggleTypeFilter = (type: WorldElementType) => {
    const currentTypes = filters.elementTypes
    const newTypes = currentTypes.includes(type)
      ? currentTypes.filter(t => t !== type)
      : [...currentTypes, type]
    onFiltersChange({ elementTypes: newTypes })
  }

  const toggleImportanceFilter = (importance: WorldElementImportance) => {
    const currentImportance = filters.importance
    const newImportance = currentImportance.includes(importance)
      ? currentImportance.filter(i => i !== importance)
      : [...currentImportance, importance]
    onFiltersChange({ importance: newImportance })
  }

  const toggleStatusFilter = (status: WorldElementStatus) => {
    const currentStatus = filters.status
    const newStatus = currentStatus.includes(status)
      ? currentStatus.filter(s => s !== status)
      : [...currentStatus, status]
    onFiltersChange({ status: newStatus })
  }

  return (
    <Card className="border-0 shadow-sm bg-white/70 backdrop-blur-sm">
      <CardContent className="p-4">
        {/* Search and Toggle */}
        <div className="flex items-center space-x-4 mb-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-charcoal-400" />
            <Input
              placeholder="Search world elements..."
              value={filters.searchTerm}
              onChange={(e) => onFiltersChange({ searchTerm: e.target.value })}
              className="pl-10 border-charcoal-200 focus:border-emerald-400 focus:ring-emerald-400"
            />
          </div>
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
            className={`border-charcoal-200 ${hasActiveFilters ? 'border-emerald-400 bg-emerald-50' : ''}`}
          >
            <Filter className="h-4 w-4 mr-2" />
            Filters
            {hasActiveFilters && (
              <Badge variant="secondary" className="ml-2 bg-emerald-100 text-emerald-700">
                {filters.elementTypes.length + filters.importance.length + filters.status.length}
              </Badge>
            )}
            <ChevronDown className={`h-4 w-4 ml-2 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
          </Button>

          {hasActiveFilters && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearAllFilters}
              className="text-charcoal-500 hover:text-charcoal-700"
            >
              <X className="h-4 w-4 mr-1" />
              Clear
            </Button>
          )}
        </div>

        {/* Active Filters Display */}
        {hasActiveFilters && (
          <div className="flex flex-wrap gap-2 mb-4">
            {filters.elementTypes.map(type => {
              const category = WORLD_ELEMENT_CATEGORIES.find(cat => cat.type === type)
              const Icon = ELEMENT_TYPE_ICONS[type]
              return (
                <Badge
                  key={type}
                  variant="secondary"
                  className={`flex items-center space-x-1 bg-${category?.color}-100 text-${category?.color}-700`}
                >
                  <Icon className="h-3 w-3" />
                  <span>{category?.label}</span>
                  <button
                    onClick={() => toggleTypeFilter(type)}
                    className="ml-1 hover:bg-white/20 rounded"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              )
            })}

            {filters.importance.map(importance => {
              const option = IMPORTANCE_OPTIONS.find(opt => opt.value === importance)
              return (
                <Badge
                  key={importance}
                  variant="secondary"
                  className={`flex items-center space-x-1 bg-${option?.color}-100 text-${option?.color}-700`}
                >
                  <span>{option?.label}</span>
                  <button
                    onClick={() => toggleImportanceFilter(importance)}
                    className="ml-1 hover:bg-white/20 rounded"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              )
            })}

            {filters.status.map(status => {
              const option = STATUS_OPTIONS.find(opt => opt.value === status)
              return (
                <Badge
                  key={status}
                  variant="secondary"
                  className="flex items-center space-x-1"
                >
                  <span>{option?.emoji}</span>
                  <span>{option?.label}</span>
                  <button
                    onClick={() => toggleStatusFilter(status)}
                    className="ml-1 hover:bg-white/20 rounded"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              )
            })}
          </div>
        )}

        {/* Expanded Filters */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="space-y-4 pt-4 border-t border-charcoal-100"
            >
              {/* Element Types */}
              <div>
                <h4 className="text-sm font-medium text-charcoal-700 mb-2">Element Types</h4>
                <div className="flex flex-wrap gap-2">
                  {WORLD_ELEMENT_CATEGORIES.map(category => {
                    const Icon = ELEMENT_TYPE_ICONS[category.type]
                    const isSelected = filters.elementTypes.includes(category.type)
                    const count = elementCounts.byType[category.type] || 0
                    
                    return (
                      <Button
                        key={category.type}
                        variant={isSelected ? "default" : "outline"}
                        size="sm"
                        onClick={() => toggleTypeFilter(category.type)}
                        className={`flex items-center space-x-2 ${
                          isSelected 
                            ? `bg-${category.color}-500 hover:bg-${category.color}-600 text-white` 
                            : `border-${category.color}-200 hover:bg-${category.color}-50`
                        }`}
                      >
                        <Icon className="h-4 w-4" />
                        <span>{category.label}</span>
                        <Badge variant="secondary" className="bg-white/20">
                          {count}
                        </Badge>
                      </Button>
                    )
                  })}
                </div>
              </div>

              {/* Importance Levels */}
              <div>
                <h4 className="text-sm font-medium text-charcoal-700 mb-2">Importance Level</h4>
                <div className="flex flex-wrap gap-2">
                  {IMPORTANCE_OPTIONS.map(option => {
                    const isSelected = filters.importance.includes(option.value)
                    const count = elementCounts.byImportance[option.value] || 0
                    
                    return (
                      <Button
                        key={option.value}
                        variant={isSelected ? "default" : "outline"}
                        size="sm"
                        onClick={() => toggleImportanceFilter(option.value)}
                        className={`flex items-center space-x-2 ${
                          isSelected 
                            ? `bg-${option.color}-500 hover:bg-${option.color}-600 text-white` 
                            : `border-${option.color}-200 hover:bg-${option.color}-50`
                        }`}
                      >
                        <span>{option.label}</span>
                        <Badge variant="secondary" className="bg-white/20">
                          {count}
                        </Badge>
                      </Button>
                    )
                  })}
                </div>
              </div>

              {/* Development Status */}
              <div>
                <h4 className="text-sm font-medium text-charcoal-700 mb-2">Development Status</h4>
                <div className="flex flex-wrap gap-2">
                  {STATUS_OPTIONS.map(option => {
                    const isSelected = filters.status.includes(option.value)
                    const count = elementCounts.byStatus[option.value] || 0
                    
                    return (
                      <Button
                        key={option.value}
                        variant={isSelected ? "default" : "outline"}
                        size="sm"
                        onClick={() => toggleStatusFilter(option.value)}
                        className={`flex items-center space-x-2 ${
                          isSelected 
                            ? "bg-emerald-500 hover:bg-emerald-600 text-white" 
                            : "border-emerald-200 hover:bg-emerald-50"
                        }`}
                      >
                        <span>{option.emoji}</span>
                        <span>{option.label}</span>
                        <Badge variant="secondary" className="bg-white/20">
                          {count}
                        </Badge>
                      </Button>
                    )
                  })}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </CardContent>
    </Card>
  )
}