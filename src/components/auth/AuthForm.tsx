'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { Eye, EyeOff, Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'

interface AuthFormProps {
  type: 'signin' | 'signup' | 'reset'
  onSubmit: (data: AuthFormData) => Promise<void>
  isLoading?: boolean
  error?: string
  className?: string
}

interface AuthFormData {
  email: string
  password?: string
  confirmPassword?: string
  firstName?: string
  lastName?: string
  rememberMe?: boolean
}

export function AuthForm({ type, onSubmit, isLoading = false, error, className }: AuthFormProps) {
  const [formData, setFormData] = useState<AuthFormData>({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    rememberMe: false
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({})

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Basic validation
    const errors: Record<string, string> = {}
    
    if (!formData.email) {
      errors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Please enter a valid email'
    }

    if (type !== 'reset') {
      if (!formData.password) {
        errors.password = 'Password is required'
      } else if (formData.password.length < 8) {
        errors.password = 'Password must be at least 8 characters'
      }
    }

    if (type === 'signup') {
      if (!formData.firstName) {
        errors.firstName = 'First name is required'
      }
      if (!formData.lastName) {
        errors.lastName = 'Last name is required'
      }
      if (formData.password !== formData.confirmPassword) {
        errors.confirmPassword = 'Passwords do not match'
      }
    }

    setValidationErrors(errors)
    
    if (Object.keys(errors).length === 0) {
      await onSubmit(formData)
    }
  }

  const handleInputChange = (field: keyof AuthFormData, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    // Clear validation error when user starts typing
    if (validationErrors[field]) {
      setValidationErrors(prev => ({ ...prev, [field]: '' }))
    }
  }

  const getTitle = () => {
    switch (type) {
      case 'signin': return 'Welcome back'
      case 'signup': return 'Create your account'
      case 'reset': return 'Reset your password'
    }
  }

  const getSubmitText = () => {
    if (isLoading) return <Loader2 className="h-4 w-4 animate-spin" />
    switch (type) {
      case 'signin': return 'Sign In'
      case 'signup': return 'Create Account'
      case 'reset': return 'Send Reset Email'
    }
  }

  return (
    <form onSubmit={handleSubmit} className={cn('space-y-6', className)}>
      {/* Error message */}
      {error && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 px-4 py-3 rounded-lg text-sm">
          {error}
        </div>
      )}

      {/* Name fields for signup */}
      {type === 'signup' && (
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="firstName">First Name</Label>
            <Input
              id="firstName"
              type="text"
              value={formData.firstName || ''}
              onChange={(e) => handleInputChange('firstName', e.target.value)}
              className={cn(
                'transition-all duration-200',
                validationErrors.firstName && 'border-red-500 focus:border-red-500'
              )}
              disabled={isLoading}
            />
            {validationErrors.firstName && (
              <p className="text-red-500 text-xs">{validationErrors.firstName}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="lastName">Last Name</Label>
            <Input
              id="lastName"
              type="text"
              value={formData.lastName || ''}
              onChange={(e) => handleInputChange('lastName', e.target.value)}
              className={cn(
                'transition-all duration-200',
                validationErrors.lastName && 'border-red-500 focus:border-red-500'
              )}
              disabled={isLoading}
            />
            {validationErrors.lastName && (
              <p className="text-red-500 text-xs">{validationErrors.lastName}</p>
            )}
          </div>
        </div>
      )}

      {/* Email field */}
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          value={formData.email}
          onChange={(e) => handleInputChange('email', e.target.value)}
          className={cn(
            'transition-all duration-200',
            validationErrors.email && 'border-red-500 focus:border-red-500'
          )}
          disabled={isLoading}
        />
        {validationErrors.email && (
          <p className="text-red-500 text-xs">{validationErrors.email}</p>
        )}
      </div>

      {/* Password fields */}
      {type !== 'reset' && (
        <>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? 'text' : 'password'}
                value={formData.password || ''}
                onChange={(e) => handleInputChange('password', e.target.value)}
                className={cn(
                  'pr-10 transition-all duration-200',
                  validationErrors.password && 'border-red-500 focus:border-red-500'
                )}
                disabled={isLoading}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-charcoal-500 hover:text-charcoal-700 dark:text-charcoal-400 dark:hover:text-charcoal-200"
                disabled={isLoading}
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
            {validationErrors.password && (
              <p className="text-red-500 text-xs">{validationErrors.password}</p>
            )}
          </div>

          {/* Confirm password for signup */}
          {type === 'signup' && (
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={formData.confirmPassword || ''}
                  onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                  className={cn(
                    'pr-10 transition-all duration-200',
                    validationErrors.confirmPassword && 'border-red-500 focus:border-red-500'
                  )}
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-charcoal-500 hover:text-charcoal-700 dark:text-charcoal-400 dark:hover:text-charcoal-200"
                  disabled={isLoading}
                >
                  {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              {validationErrors.confirmPassword && (
                <p className="text-red-500 text-xs">{validationErrors.confirmPassword}</p>
              )}
            </div>
          )}
        </>
      )}

      {/* Remember me for signin */}
      {type === 'signin' && (
        <div className="flex items-center space-x-2">
          <Checkbox
            id="rememberMe"
            checked={formData.rememberMe}
            onCheckedChange={(checked) => handleInputChange('rememberMe', checked as boolean)}
            disabled={isLoading}
          />
          <Label htmlFor="rememberMe" className="text-sm">
            Remember me
          </Label>
        </div>
      )}

      {/* Submit button */}
      <Button
        type="submit"
        variant="sakura"
        className="w-full py-3 font-semibold hover:scale-105 transition-all duration-200 tech-feedback"
        disabled={isLoading}
      >
        {getSubmitText()}
      </Button>
    </form>
  )
}