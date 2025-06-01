# BookBloom - AI Book Generator

## Project Overview
Build BookBloom, a beautiful web application that transforms story ideas into complete books using AI. Inspired by Japanese cherry blossoms (sakura), the app represents the natural blooming of ideas into fully-formed stories.

## Core Features

- **Book Planning**: Intuitive forms for title, genre, premise, target length, and style
- **Chapter Outlining**: Dynamic chapter builder with drag-and-drop reordering
- **AI Generation**: Sequential chapter generation with real-time progress tracking
- **Export System**: PDF, DOCX, and text downloads with professional formatting
- **Content Management**: Edit generated content, regenerate chapters, version history

## Tech Stack

- **Framework**: Next.js 14+ with TypeScript and App Router
- **Styling**: Tailwind CSS with shadcn/ui components
- **Database**: SQLite with Prisma ORM
- **State**: Zustand for client state management
- **Forms**: React Hook Form with Zod validation
- **AI**: Anthropic Claude API for text generation

## Brand Identity: Sakura Theme

### Colors
```css
:root {
  /* Sakura Pink Tones */
  --sakura-light: #FFE5E5;
  --sakura-soft: #FFB7C5;
  --sakura-main: #FF8FAB;
  --sakura-deep: #E91E63;
  --sakura-dark: #AD1457;
  
  /* Supporting Colors */
  --blossom-white: #FEFEFE;
  --cloud-gray: #F8F9FA;
  --branch-brown: #8D6E63;
  --leaf-green: #4CAF50;
  --sky-blue: #E3F2FD;
  
  /* Text Colors */
  --text-primary: #2D3436;
  --text-secondary: #636E72;
  --text-muted: #B2BEC3;
  
  /* Design System */
  --radius-soft: 12px;
  --radius-gentle: 16px;
  --radius-bloom: 20px;
  --shadow-petal: 0 4px 20px rgba(255, 143, 171, 0.1);
  --shadow-bloom: 0 8px 40px rgba(255, 143, 171, 0.15);
}
```

### Design Principles

- Gentle elegance with soft rounded corners (12-16px radius)
- Generous whitespace following Japanese minimalism
- Subtle animations like floating petals and bloom-in effects
- Glass morphism cards with soft pink backgrounds
- Growth-focused messaging - "bloom," "nurture," "flourish"

## Development Phases

### Phase 1: Foundation (Start Here)

- **Setup**: Create Next.js project with TypeScript, Tailwind, shadcn/ui
- **Layout**: Responsive header, sidebar navigation, main content area
- **Dashboard**: Hero section, stats overview, recent books grid
- **Types**: Define Book and Chapter interfaces

### Phase 2: Book Management UI

- **Database**: Prisma schema with Book/Chapter models
- **Planning Form**: Multi-step wizard with genre, word count, style selection
- **Books List**: Grid layout with search, filters, and action buttons
- **Chapter Builder**: Dynamic list with add/remove, drag-drop reordering

### Phase 3: AI Integration

- **AI Service**: Claude API integration with retry logic and error handling
- **Single Generation**: Generate individual chapters with preview
- **Progress UI**: Real-time status indicators and word count tracking
- **Content Preview**: Side-by-side outline vs generated content view

### Phase 4: Full Generation Pipeline

- **Queue System**: Manage sequential chapter generation
- **Progress Dashboard**: Live updates, pause/resume, ETA calculation
- **Batch Generation**: Complete book generation with context continuity
- **Error Recovery**: Robust retry mechanisms and partial save

### Phase 5: Export & Polish

- **Export Service**: PDF, DOCX, text downloads with formatting
- **Content Editing**: Rich text editor for generated chapters
- **Regeneration**: Individual chapter regeneration with different parameters
- **Final Polish**: Animations, accessibility, mobile optimization

## Key Components

### BookPlanningForm
```jsx
// Multi-step wizard with sakura styling
- Step 1: Title, genre, premise (textarea with word count)
- Step 2: Target words (slider), chapters count, writing style
- Step 3: Review and confirmation
- Validation with error messages, progress indicator
```

### ChapterOutlineBuilder
```jsx
// Dynamic chapter management
- Add/remove chapters with smooth animations
- Drag-and-drop reordering
- Auto-calculate word count distribution
- Collapsible chapter details
```

### GenerationProgress
```jsx
// Real-time progress tracking
- Animated progress bars with sakura gradients
- Chapter status indicators (🌸 for completed)
- Word count tracking and ETA
- Floating petal animations on completion
```

### BookCard
```jsx
// Elegant book display
- Glass morphism card with hover lift effect
- Progress bar showing completion
- Genre badge and word count
- Action buttons (View, Edit, Export, Delete)
```

## Database Schema

```sql
Book {
  id: String @id @default(cuid())
  title: String
  genre: String  
  premise: String
  targetWords: Int
  chaptersCount: Int
  writingStyle: String
  tone: String
  pov: String
  status: String @default("planning")
  createdAt: DateTime @default(now())
  chapters: Chapter[]
}

Chapter {
  id: String @id @default(cuid())
  bookId: String
  chapterNumber: Int
  title: String
  summary: String
  targetWords: Int
  generatedContent: String?
  wordCount: Int @default(0)
  status: String @default("pending")
  book: Book @relation
}
```

## API Routes

```
GET/POST  /api/books           # List and create books
GET/PUT   /api/books/[id]      # Get and update book
POST      /api/books/[id]/generate    # Start generation
GET       /api/books/[id]/progress    # Check progress  
GET/POST  /api/books/[id]/chapters    # Chapter CRUD
PUT       /api/chapters/[id]          # Update chapter
POST      /api/chapters/[id]/generate # Generate chapter
GET       /api/books/[id]/export      # Download exports
```

## Styling Guidelines

### Sakura Components
```css
.btn-sakura {
  background: linear-gradient(135deg, #FF8FAB, #E91E63);
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(255, 143, 171, 0.3);
  transition: all 0.3s ease;
}

.card-sakura {
  background: linear-gradient(145deg, #FEFEFE, #FFE5E5);
  border: 1px solid rgba(255, 183, 197, 0.3);
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(255, 143, 171, 0.1);
}

.glass-card {
  background: rgba(255, 229, 229, 0.7);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 183, 197, 0.2);
}
```

### Animations
```css
@keyframes bloom-in {
  from { transform: scale(0.8); opacity: 0; }
  to { transform: scale(1); opacity: 1; }
}

@keyframes petal-fall {
  from { transform: translateY(-10px) rotate(0deg); }
  to { transform: translateY(100vh) rotate(360deg); }
}
```

## Development Guidelines

### Frontend-First Approach

- **UI Components First**: Build with mock data before backend integration
- **Mobile-Responsive**: Design mobile-first with touch-friendly interactions
- **Accessibility**: ARIA labels, keyboard navigation, proper color contrast
- **Performance**: Lazy loading, skeleton screens, optimized animations

### Code Quality

- **TypeScript**: Strict typing for all components and data
- **Error Handling**: Graceful fallbacks with helpful user messages
- **Loading States**: Skeleton components and progress indicators
- **Consistent Patterns**: Reusable hooks, components, and utilities

### AI Integration Best Practices

- **Context Management**: Pass previous chapters for story continuity
- **Rate Limiting**: Handle API limits with queue system
- **Prompt Engineering**: Maintain character consistency across chapters
- **Quality Control**: Validate generated content before saving

## Success Metrics

- Users can create book outlines in under 5 minutes
- Generate 50k word books in under 30 minutes
- Mobile-responsive experience across all features
- Exported files open correctly in standard applications
- Error recovery allows continuing interrupted generations

## Quick Start Prompts for Claude Code

### Phase 1 Setup
Create a Next.js 14 project called "bookbloom" with TypeScript and Tailwind. Install shadcn/ui and add button, input, card, progress components. Set up a responsive layout with sakura-themed header, sidebar navigation, and dashboard homepage with hero section and placeholder book cards.

### Phase 2 Forms
Build a BookPlanningForm component using React Hook Form and Zod validation. Create a multi-step wizard with title/genre/premise in step 1, word count slider and style options in step 2, and review in step 3. Style with sakura theme colors and smooth step transitions.

### Phase 3 AI Integration
Set up Prisma with SQLite for Book and Chapter models. Create API routes for CRUD operations. Build a single chapter generation feature that calls Claude API and displays the generated content in a preview modal with sakura styling.

This specification provides everything needed to build BookBloom while maintaining focus on the core features and beautiful sakura-themed design.