"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { 
  Crown,
  Shield,
  Heart,
  User,
  Edit3,
  Eye,
  MoreHorizontal,
  Trash2,
  Sparkles,
  BookOpen,
} from "lucide-react"
import { motion, AnimatePresence } from 'framer-motion'
import { Character, CharacterRole } from "@/types/character"

interface CharacterCardProps {
  character: Character
  onEdit: () => void
  onDelete: () => void
  onView: () => void
}

const ROLE_CONFIG = {
  [CharacterRole.PROTAGONIST]: { 
    icon: Crown, 
    color: 'text-sakura-600', 
    bgColor: 'bg-sakura-50',
    borderColor: 'border-l-sakura-500'
  },
  [CharacterRole.ANTAGONIST]: { 
    icon: Shield, 
    color: 'text-red-500', 
    bgColor: 'bg-red-50',
    borderColor: 'border-l-red-500'
  },
  [CharacterRole.SUPPORTING]: { 
    icon: Heart, 
    color: 'text-blue-500', 
    bgColor: 'bg-blue-50',
    borderColor: 'border-l-blue-500'
  },
  [CharacterRole.MINOR]: { 
    icon: User, 
    color: 'text-gray-500', 
    bgColor: 'bg-gray-50',
    borderColor: 'border-l-gray-500'
  }
}

export function CharacterCard({ character, onEdit, onDelete, onView }: CharacterCardProps) {
  const [showActions, setShowActions] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)

  const roleConfig = ROLE_CONFIG[character.role]
  const RoleIcon = roleConfig.icon

  const getProgressEmoji = (progress: number) => {
    if (progress === 0) return '🌰'
    if (progress <= 25) return '🌱'
    if (progress <= 50) return '🌿'
    if (progress <= 75) return '🌺'
    return '🌸'
  }

  const getProgressColor = (progress: number) => {
    if (progress === 0) return 'bg-gray-200'
    if (progress <= 25) return 'bg-green-200'
    if (progress <= 50) return 'bg-yellow-200'
    if (progress <= 75) return 'bg-orange-200'
    return 'bg-sakura-200'
  }

  const getProgressBarColor = (progress: number) => {
    if (progress === 0) return 'bg-gray-400'
    if (progress <= 25) return 'bg-green-400'
    if (progress <= 50) return 'bg-yellow-400'
    if (progress <= 75) return 'bg-orange-400'
    return 'bg-sakura-500'
  }

  return (
    <motion.div
      layout
      whileHover={{ y: -4, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="group"
    >
      <Card 
        className={`border-0 shadow-md hover:shadow-lg transition-all duration-200 bg-white/90 backdrop-blur-sm border-l-4 ${roleConfig.borderColor} cursor-pointer`}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="flex items-start space-x-3 flex-1">
              <div className={`p-2 rounded-lg ${roleConfig.bgColor}`}>
                <RoleIcon className={`h-4 w-4 ${roleConfig.color}`} />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-charcoal-900 truncate">
                  {character.name}
                </h3>
                <div className="flex items-center space-x-2 mt-1">
                  <span className={`text-xs px-2 py-1 rounded-full ${roleConfig.bgColor} ${roleConfig.color} font-medium`}>
                    {character.role}
                  </span>
                  <span className="text-xs text-charcoal-500">
                    {character.importance}
                  </span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-1">
              <div className="flex items-center space-x-1">
                <span className="text-lg">{getProgressEmoji(character.developmentProgress.overall)}</span>
                <span className="text-xs text-charcoal-600 font-medium">
                  {character.developmentProgress.overall}%
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
            <div className={`w-full h-2 rounded-full ${getProgressColor(character.developmentProgress.overall)}`}>
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${character.developmentProgress.overall}%` }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className={`h-full rounded-full ${getProgressBarColor(character.developmentProgress.overall)}`}
              />
            </div>
          </div>

          {/* Basic Info */}
          <div className="space-y-3">
            {character.basicInfo.age && (
              <div className="flex items-center text-sm text-charcoal-600">
                <span className="font-medium">Age:</span>
                <span className="ml-2">{character.basicInfo.age}</span>
              </div>
            )}
            
            {character.basicInfo.occupation && (
              <div className="flex items-center text-sm text-charcoal-600">
                <span className="font-medium">Role:</span>
                <span className="ml-2">{character.basicInfo.occupation}</span>
              </div>
            )}

            {/* Key Traits Preview */}
            {character.personality.strengths && character.personality.strengths.length > 0 && (
              <div className="text-sm">
                <span className="font-medium text-charcoal-700">Key Strengths:</span>
                <div className="flex flex-wrap gap-1 mt-1">
                  {character.personality.strengths.slice(0, 3).map((strength, index) => (
                    <span 
                      key={index}
                      className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs"
                    >
                      {strength}
                    </span>
                  ))}
                  {character.personality.strengths.length > 3 && (
                    <span className="px-2 py-1 bg-charcoal-100 text-charcoal-600 rounded-full text-xs">
                      +{character.personality.strengths.length - 3} more
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
                {/* Development Progress Breakdown */}
                <div>
                  <h4 className="text-sm font-medium text-charcoal-700 mb-2">Development Progress</h4>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="flex justify-between">
                      <span>Physical:</span>
                      <span className="font-medium">{character.developmentProgress.physical}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Personality:</span>
                      <span className="font-medium">{character.developmentProgress.personality}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Backstory:</span>
                      <span className="font-medium">{character.developmentProgress.backstory}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Goals:</span>
                      <span className="font-medium">{character.developmentProgress.goals}%</span>
                    </div>
                  </div>
                </div>

                {/* Primary Goal */}
                {character.goals.primary && (
                  <div>
                    <h4 className="text-sm font-medium text-charcoal-700 mb-1">Primary Goal</h4>
                    <p className="text-xs text-charcoal-600">{character.goals.primary}</p>
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
                    <Sparkles className="h-3 w-3 mr-1" />
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