"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { 
  MapPin,
  Sparkles,
  Cog,
  Users,
  Calendar,
  Building,
  Package,
  Star,
  Edit3,
  Eye,
  MoreHorizontal,
  Trash2,
  Wand2,
  BookOpen,
  Link,
  Clock
} from "lucide-react"
import { motion, AnimatePresence } from 'framer-motion'
import { 
  WorldElement, 
  WORLD_ELEMENT_CATEGORIES,
  WORLD_ELEMENT_PROGRESS
} from "@/types/worldbuilding"

interface WorldElementCardProps {
  element: WorldElement
  viewMode: 'grid' | 'list'
  onEdit: () => void
  onDelete: () => void
  onView: () => void
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

const IMPORTANCE_CONFIG = {
  'core': { 
    color: 'text-red-600', 
    bgColor: 'bg-red-50',
    borderColor: 'border-l-red-500',
    label: 'Core'
  },
  'supporting': { 
    color: 'text-amber-600', 
    bgColor: 'bg-amber-50',
    borderColor: 'border-l-amber-500',
    label: 'Supporting'
  },
  'background': { 
    color: 'text-gray-600', 
    bgColor: 'bg-gray-50',
    borderColor: 'border-l-gray-500',
    label: 'Background'
  }
} as const

export function WorldElementCard({ element, viewMode, onEdit, onDelete, onView }: WorldElementCardProps) {
  const [showActions, setShowActions] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)

  const category = WORLD_ELEMENT_CATEGORIES.find(cat => cat.type === element.type)
  const Icon = ELEMENT_TYPE_ICONS[element.type]
  const importanceConfig = IMPORTANCE_CONFIG[element.importance]
  const progressInfo = WORLD_ELEMENT_PROGRESS[element.status]

  const getCategoryBgColor = (color?: string) => {
    switch (color) {
      case 'emerald': return 'bg-emerald-50'
      case 'purple': return 'bg-purple-50'
      case 'slate': return 'bg-slate-50'
      case 'orange': return 'bg-orange-50'
      case 'amber': return 'bg-amber-50'
      case 'blue': return 'bg-blue-50'
      case 'indigo': return 'bg-indigo-50'
      default: return 'bg-gray-50'
    }
  }

  const getCategoryTextColor = (color?: string) => {
    switch (color) {
      case 'emerald': return 'text-emerald-500'
      case 'purple': return 'text-purple-500'
      case 'slate': return 'text-slate-500'
      case 'orange': return 'text-orange-500'
      case 'amber': return 'text-amber-500'
      case 'blue': return 'text-blue-500'
      case 'indigo': return 'text-indigo-500'
      default: return 'text-gray-500'
    }
  }

  const getCategoryTagBgColor = (color?: string) => {
    switch (color) {
      case 'emerald': return 'bg-emerald-100'
      case 'purple': return 'bg-purple-100'
      case 'slate': return 'bg-slate-100'
      case 'orange': return 'bg-orange-100'
      case 'amber': return 'bg-amber-100'
      case 'blue': return 'bg-blue-100'
      case 'indigo': return 'bg-indigo-100'
      default: return 'bg-gray-100'
    }
  }

  const getCategoryTagTextColor = (color?: string) => {
    switch (color) {
      case 'emerald': return 'text-emerald-700'
      case 'purple': return 'text-purple-700'
      case 'slate': return 'text-slate-700'
      case 'orange': return 'text-orange-700'
      case 'amber': return 'text-amber-700'
      case 'blue': return 'text-blue-700'
      case 'indigo': return 'text-indigo-700'
      default: return 'text-gray-700'
    }
  }

  const getProgressColor = (percentage: number) => {
    if (percentage === 0) return 'bg-gray-200'
    if (percentage <= 25) return 'bg-green-200'
    if (percentage <= 50) return 'bg-yellow-200'
    if (percentage <= 75) return 'bg-orange-200'
    return 'bg-emerald-200'
  }

  const getProgressBarColor = (percentage: number) => {
    if (percentage === 0) return 'bg-gray-400'
    if (percentage <= 25) return 'bg-green-400'
    if (percentage <= 50) return 'bg-yellow-400'
    if (percentage <= 75) return 'bg-orange-400'
    return 'bg-emerald-500'
  }

  if (viewMode === 'list') {
    return (
      <motion.div
        layout
        whileHover={{ x: 4 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="group"
      >
        <Card 
          className={`border-0 shadow-sm hover:shadow-md transition-all duration-200 bg-white/90 backdrop-blur-sm border-l-4 ${importanceConfig.borderColor} cursor-pointer`}
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4 flex-1 min-w-0">
                <div className={`p-2 rounded-lg ${getCategoryBgColor(category?.color)}`}>
                  <Icon className={`h-5 w-5 ${getCategoryTextColor(category?.color)}`} />
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-3">
                    <h3 className="font-semibold text-charcoal-900 truncate">
                      {element.name}
                    </h3>
                    <div className="flex items-center space-x-2">
                      <span className={`text-xs px-2 py-1 rounded-full ${importanceConfig.bgColor} ${importanceConfig.color} font-medium`}>
                        {importanceConfig.label}
                      </span>
                      <span className={`text-xs px-2 py-1 rounded-full ${getCategoryTagBgColor(category?.color)} ${getCategoryTagTextColor(category?.color)} font-medium`}>
                        {category?.label}
                      </span>
                    </div>
                  </div>
                  <p className="text-sm text-charcoal-600 mt-1 truncate">
                    {element.briefDescription}
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                {/* Progress */}
                <div className="flex items-center space-x-2">
                  <span className="text-lg">{progressInfo.emoji}</span>
                  <span className="text-sm text-charcoal-600 font-medium">
                    {element.completionPercentage}%
                  </span>
                </div>

                {/* Tags Preview */}
                {element.tags.length > 0 && (
                  <div className="flex items-center space-x-1">
                    {element.tags.slice(0, 2).map((tag, index) => (
                      <span 
                        key={index}
                        className="px-2 py-1 bg-charcoal-100 text-charcoal-600 rounded-full text-xs"
                      >
                        {tag}
                      </span>
                    ))}
                    {element.tags.length > 2 && (
                      <span className="text-xs text-charcoal-500">
                        +{element.tags.length - 2}
                      </span>
                    )}
                  </div>
                )}

                {/* Actions */}
                <div className="relative">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={(e) => {
                      e.stopPropagation()
                      setShowActions(!showActions)
                    }}
                  >
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                  
                  <AnimatePresence>
                    {showActions && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: -10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: -10 }}
                        transition={{ duration: 0.15 }}
                        className="absolute right-0 top-full mt-1 bg-white border border-charcoal-200 rounded-lg shadow-lg py-1 z-20 min-w-[120px]"
                        onMouseLeave={() => setShowActions(false)}
                      >
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            onView()
                            setShowActions(false)
                          }}
                          className="w-full text-left px-3 py-2 text-sm text-charcoal-700 hover:bg-charcoal-50 flex items-center space-x-2"
                        >
                          <Eye className="h-4 w-4" />
                          <span>View Details</span>
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            onEdit()
                            setShowActions(false)
                          }}
                          className="w-full text-left px-3 py-2 text-sm text-charcoal-700 hover:bg-charcoal-50 flex items-center space-x-2"
                        >
                          <Edit3 className="h-4 w-4" />
                          <span>Edit</span>
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            onDelete()
                            setShowActions(false)
                          }}
                          className="w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center space-x-2"
                        >
                          <Trash2 className="h-4 w-4" />
                          <span>Delete</span>
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    )
  }

  return (
    <motion.div
      layout
      whileHover={{ y: -4, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="group"
    >
      <Card 
        className={`border-0 shadow-md hover:shadow-lg transition-all duration-200 bg-white/90 backdrop-blur-sm border-l-4 ${importanceConfig.borderColor} cursor-pointer`}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="flex items-start space-x-3 flex-1">
              <div className={`p-2 rounded-lg ${getCategoryBgColor(category?.color)}`}>
                <Icon className={`h-4 w-4 ${getCategoryTextColor(category?.color)}`} />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-charcoal-900 truncate">
                  {element.name}
                </h3>
                <div className="flex items-center space-x-2 mt-1">
                  <span className={`text-xs px-2 py-1 rounded-full ${importanceConfig.bgColor} ${importanceConfig.color} font-medium`}>
                    {importanceConfig.label}
                  </span>
                  <span className={`text-xs px-2 py-1 rounded-full ${getCategoryTagBgColor(category?.color)} ${getCategoryTagTextColor(category?.color)} font-medium`}>
                    {category?.label}
                  </span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-1">
              <div className="flex items-center space-x-1">
                <span className="text-lg">{progressInfo.emoji}</span>
                <span className="text-xs text-charcoal-600 font-medium">
                  {element.completionPercentage}%
                </span>
              </div>
              
              <div className="relative">
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={(e) => {
                    e.stopPropagation()
                    setShowActions(!showActions)
                  }}
                >
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
                
                <AnimatePresence>
                  {showActions && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95, y: -10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95, y: -10 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 top-full mt-1 bg-white border border-charcoal-200 rounded-lg shadow-lg py-1 z-20 min-w-[120px]"
                      onMouseLeave={() => setShowActions(false)}
                    >
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          onView()
                          setShowActions(false)
                        }}
                        className="w-full text-left px-3 py-2 text-sm text-charcoal-700 hover:bg-charcoal-50 flex items-center space-x-2"
                      >
                        <Eye className="h-4 w-4" />
                        <span>View Details</span>
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          onEdit()
                          setShowActions(false)
                        }}
                        className="w-full text-left px-3 py-2 text-sm text-charcoal-700 hover:bg-charcoal-50 flex items-center space-x-2"
                      >
                        <Edit3 className="h-4 w-4" />
                        <span>Edit</span>
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          onDelete()
                          setShowActions(false)
                        }}
                        className="w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center space-x-2"
                      >
                        <Trash2 className="h-4 w-4" />
                        <span>Delete</span>
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </CardHeader>

        <CardContent className="pt-0">
          {/* Progress Bar */}
          <div className="mb-4">
            <div className={`w-full h-2 rounded-full ${getProgressColor(element.completionPercentage)}`}>
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${element.completionPercentage}%` }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className={`h-full rounded-full ${getProgressBarColor(element.completionPercentage)}`}
              />
            </div>
          </div>

          {/* Brief Description */}
          <div className="space-y-3">
            <p className="text-sm text-charcoal-600 line-clamp-2">
              {element.briefDescription}
            </p>

            {/* Key Features */}
            {element.overview.keyFeatures.length > 0 && (
              <div className="text-sm">
                <span className="font-medium text-charcoal-700">Key Features:</span>
                <div className="flex flex-wrap gap-1 mt-1">
                  {element.overview.keyFeatures.slice(0, 3).map((feature, index) => (
                    <span 
                      key={index}
                      className={`px-2 py-1 ${getCategoryTagBgColor(category?.color)} ${getCategoryTagTextColor(category?.color)} rounded-full text-xs`}
                    >
                      {feature}
                    </span>
                  ))}
                  {element.overview.keyFeatures.length > 3 && (
                    <span className="px-2 py-1 bg-charcoal-100 text-charcoal-600 rounded-full text-xs">
                      +{element.overview.keyFeatures.length - 3} more
                    </span>
                  )}
                </div>
              </div>
            )}

            {/* Tags */}
            {element.tags.length > 0 && (
              <div className="text-sm">
                <span className="font-medium text-charcoal-700">Tags:</span>
                <div className="flex flex-wrap gap-1 mt-1">
                  {element.tags.slice(0, 4).map((tag, index) => (
                    <span 
                      key={index}
                      className="px-2 py-1 bg-charcoal-100 text-charcoal-600 rounded-full text-xs"
                    >
                      {tag}
                    </span>
                  ))}
                  {element.tags.length > 4 && (
                    <span className="px-2 py-1 bg-charcoal-100 text-charcoal-600 rounded-full text-xs">
                      +{element.tags.length - 4} more
                    </span>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Expanded Content */}
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2 }}
                className="mt-4 pt-4 border-t border-charcoal-100 space-y-4"
              >
                {/* Story Integration */}
                <div>
                  <h4 className="text-sm font-medium text-charcoal-700 mb-2">Story Integration</h4>
                  <div className="text-xs text-charcoal-600 space-y-1">
                    <div className="flex items-center space-x-2">
                      <BookOpen className="h-3 w-3" />
                      <span>{element.usage.storyRole}</span>
                    </div>
                    {element.overview.firstAppearance && (
                      <div className="flex items-center space-x-2">
                        <Clock className="h-3 w-3" />
                        <span>First appears: {element.overview.firstAppearance}</span>
                      </div>
                    )}
                    {element.usage.chapterReferences.length > 0 && (
                      <div className="flex items-center space-x-2">
                        <Link className="h-3 w-3" />
                        <span>Referenced in: {element.usage.chapterReferences.slice(0, 3).join(', ')}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Significance */}
                {element.overview.significance && (
                  <div>
                    <h4 className="text-sm font-medium text-charcoal-700 mb-1">Significance</h4>
                    <p className="text-xs text-charcoal-600">{element.overview.significance}</p>
                  </div>
                )}

                {/* Quick Actions */}
                <div className="flex gap-2 pt-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-xs h-7"
                    onClick={(e) => {
                      e.stopPropagation()
                      onEdit()
                    }}
                  >
                    <Wand2 className="h-3 w-3 mr-1" />
                    Enhance
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-xs h-7"
                    onClick={(e) => {
                      e.stopPropagation()
                      onView()
                    }}
                  >
                    <BookOpen className="h-3 w-3 mr-1" />
                    Details
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </CardContent>
      </Card>
    </motion.div>
  )
}