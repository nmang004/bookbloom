import { 
  Target, TreePine, PenTool, Sparkles, Download, 
  Zap, Users, Brain, BookOpen, Palette, Share2,
  Edit3, Bold, Italic, Underline, List, Code,
  User, Crown, Shield, Heart, Sword, Scroll
} from 'lucide-react'

export const iconRegistry = {
  Target,
  TreePine, 
  PenTool,
  Sparkles,
  Download,
  Zap,
  Users,
  Brain,
  BookOpen,
  Palette,
  Share2,
  Edit3,
  Bold,
  Italic,
  Underline,
  List,
  Code,
  User,
  Crown,
  Shield,
  Heart,
  Sword,
  Scroll
} as const

export type IconName = keyof typeof iconRegistry

export function getIcon(iconName: IconName) {
  return iconRegistry[iconName]
}