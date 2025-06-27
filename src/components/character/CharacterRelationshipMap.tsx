"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Network } from "lucide-react"
import { Character } from "@/types/character"

interface CharacterRelationshipMapProps {
  characters: Character[]
  onAddRelationship?: (characterId: string, relatedCharacterId: string) => void
}

export function CharacterRelationshipMap({ characters: _characters, onAddRelationship: _onAddRelationship }: CharacterRelationshipMapProps) {
  return (
    <Card className="border-0 shadow-sm bg-white/70 backdrop-blur-sm">
      <CardHeader>
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-sakura-50 rounded-lg">
            <Network className="h-5 w-5 text-sakura-600" />
          </div>
          <div>
            <CardTitle className="text-lg">Character Relationships</CardTitle>
            <p className="text-sm text-charcoal-600">Visual mapping of character connections</p>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-center py-12">
          <Network className="h-12 w-12 text-charcoal-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-charcoal-700 mb-2">Relationship Map Coming Soon</h3>
          <p className="text-sm text-charcoal-500 mb-6">
            Interactive relationship mapping will help you visualize and manage character connections,
            conflicts, and story dynamics.
          </p>
          <div className="space-y-2 text-xs text-charcoal-600">
            <p>• Visual relationship web with connection types</p>
            <p>• Relationship strength indicators</p>
            <p>• Conflict potential analysis</p>
            <p>• AI-powered relationship suggestions</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}