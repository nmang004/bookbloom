"use client"

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { useToast } from '@/components/ui/use-toast'

export default function TestPage() {
  const [loading, setLoading] = useState(false)
  const [response, setResponse] = useState<string>('')
  const { toast } = useToast()

  const testAIGeneration = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/ai/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'synopsis',
          idea: 'A young wizard discovers they have the power to rewrite reality with their words',
          genre: 'Fantasy'
        })
      })

      const data = await res.json()
      
      if (data.success) {
        setResponse(data.data.generated)
        toast({
          title: "Success!",
          description: `Generated ${data.data.tokensUsed} tokens`,
        })
      } else {
        toast({
          title: "Error",
          description: data.error,
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to test AI generation",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold sakura-text-gradient mb-8">
        BookBloom 2.0 Test Page
      </h1>
      
      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-semibold mb-4">AI Generation Test</h2>
          <Button 
            onClick={testAIGeneration} 
            disabled={loading}
            variant="sakura"
            className="mb-4"
          >
            {loading ? 'Generating...' : 'Test AI Synopsis Generation'}
          </Button>
          
          {response && (
            <div className="p-4 bg-sakura-50 dark:bg-charcoal-800 rounded-lg border border-sakura-200">
              <h3 className="font-semibold mb-2">Generated Synopsis:</h3>
              <p className="text-charcoal-700 dark:text-charcoal-300 whitespace-pre-wrap">
                {response}
              </p>
            </div>
          )}
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">Theme Test</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-4 bg-sakura-100 rounded-lg text-center">
              <div className="text-2xl mb-2">🌱</div>
              <div className="text-sm font-medium">Sakura 100</div>
            </div>
            <div className="p-4 bg-sakura-300 rounded-lg text-center">
              <div className="text-2xl mb-2">🌿</div>
              <div className="text-sm font-medium">Sakura 300</div>
            </div>
            <div className="p-4 bg-sakura-500 text-white rounded-lg text-center">
              <div className="text-2xl mb-2">🌺</div>
              <div className="text-sm font-medium">Sakura 500</div>
            </div>
            <div className="p-4 bg-sakura-700 text-white rounded-lg text-center">
              <div className="text-2xl mb-2">🌸</div>
              <div className="text-sm font-medium">Sakura 700</div>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">Component Test</h2>
          <div className="flex gap-2 flex-wrap">
            <Button variant="default">Default</Button>
            <Button variant="sakura">Sakura</Button>
            <Button variant="sakura-outline">Sakura Outline</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
          </div>
        </div>
      </div>
    </div>
  )
}