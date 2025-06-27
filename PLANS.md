# BookBloom 2.0 Development Plan

## Project Overview
BookBloom 2.0 is a complete ground-up redesign of an AI-powered book generation platform featuring a Japanese-inspired "From Seed to Sakura" theme. This next-generation platform combines sophisticated AI integration, beautiful UI/UX design, and production-ready infrastructure to create an unparalleled book writing experience.

## Core Philosophy: "From Seed to Sakura"
The entire user journey embodies the metaphor of a cherry blossom tree growing:
- **The Seed**: A user's raw, simple idea for a story
- **The Sprout**: The initial AI-assisted outline and planning phase
- **The Bud**: Detailed world-building, character creation, and plot development
- **The Blossom (Sakura)**: The fully written, chapter-by-chapter manuscript
- **The Garden**: The user's dashboard, where they can tend to all their blooming book projects

## Tech Stack

### Frontend
- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript (strict mode enabled)
- **Styling**: Tailwind CSS
- **Component Library**: shadcn/ui with custom Sakura theme
- **State Management**: Zustand
- **Forms**: React Hook Form with Zod validation
- **Hosting**: Vercel

### Backend
- **API**: Next.js API Routes + Railway for compute-intensive tasks
- **Database**: Supabase (PostgreSQL)
- **ORM**: Prisma
- **Authentication**: Supabase Auth
- **AI Integration**: Anthropic Claude API
- **Background Jobs**: Railway workers

### Infrastructure
- **Frontend Hosting**: Vercel (optimized for Next.js)
- **Backend Services**: Railway (API routes, AI processing, background jobs)
- **Database**: Supabase (PostgreSQL with real-time subscriptions)
- **File Storage**: Supabase Storage
- **Monitoring**: Sentry for error tracking
- **Analytics**: Vercel Analytics

## Design System & Branding

### Theme: Modern Japanese Minimalism
- **Inspiration**: Cherry blossoms (Sakura), Japanese aesthetics, serene minimalism
- **Feel**: Spacious, intentional, calming, elegant

### Color Palette
```css
--sakura-50: #fef2f4;    /* Lightest pink */
--sakura-100: #fce8ec;   /* Very light pink */
--sakura-200: #f9c9d4;   /* Light pink */
--sakura-300: #f4a3b5;   /* Soft pink */
--sakura-400: #ec6f8e;   /* Medium pink */
--sakura-500: #e14372;   /* Primary sakura pink */
--sakura-600: #c92d5d;   /* Dark pink */
--sakura-700: #a6234c;   /* Deeper pink */
--sakura-800: #882041;   /* Very dark pink */
--sakura-900: #721e3a;   /* Darkest pink */

--charcoal-50: #f7f7f8;  /* Lightest gray */
--charcoal-100: #eeeff1; /* Very light gray */
--charcoal-200: #d9dce1; /* Light gray */
--charcoal-300: #b8bec7; /* Medium gray */
--charcoal-400: #919aa6; /* Gray */
--charcoal-500: #747e8b; /* Medium charcoal */
--charcoal-600: #5c6570; /* Dark gray */
--charcoal-700: #4b535c; /* Darker gray */
--charcoal-800: #40454d; /* Very dark gray */
--charcoal-900: #383c42; /* Charcoal */

--white: #ffffff;
--off-white: #fafafa;
```

### Typography
- **Primary Font**: Inter (clean, modern sans-serif)
- **Display Font**: Optional Japanese-inspired font for headings
- **Code Font**: JetBrains Mono

### UI Principles
1. **Generous Whitespace**: Every element breathes
2. **Subtle Animations**: Smooth, purposeful transitions
3. **Clear Hierarchy**: Obvious primary actions
4. **Minimalist Icons**: Simple, recognizable symbols
5. **Consistent Spacing**: 4px grid system

## Database Schema (Prisma with Supabase)

```prisma
model User {
  id                String    @id @default(uuid())
  email             String    @unique
  createdAt         DateTime  @default(now())
  updatedAt         DateTime  @updatedAt
  books             Book[]
  aiGenerations     AIGeneration[]
  subscription      Subscription?
}

model Book {
  id                String    @id @default(uuid())
  userId            String
  user              User      @relation(fields: [userId], references: [id])
  title             String
  synopsis          String    @db.Text
  genre             String
  status            BookStatus @default(PLANNING)
  coverImage        String?
  wordCount         Int       @default(0)
  targetWordCount   Int?
  createdAt         DateTime  @default(now())
  updatedAt         DateTime  @updatedAt
  
  chapters          Chapter[]
  characters        Character[]
  worldElements     WorldBuildingElement[]
  aiGenerations     AIGeneration[]
  exports           Export[]
}

model Chapter {
  id                String    @id @default(uuid())
  bookId            String
  book              Book      @relation(fields: [bookId], references: [id])
  chapterNumber     Int
  title             String
  content           String    @db.Text
  wordCount         Int       @default(0)
  status            ChapterStatus @default(PLANNED)
  outline           String?   @db.Text
  notes             String?   @db.Text
  createdAt         DateTime  @default(now())
  updatedAt         DateTime  @updatedAt
}

model Character {
  id                String    @id @default(uuid())
  bookId            String
  book              Book      @relation(fields: [bookId], references: [id])
  name              String
  description       String    @db.Text
  traits            Json      // Array of traits
  backstory         String?   @db.Text
  arc               String?   @db.Text
  relationships     Json?     // Relationships with other characters
  imageUrl          String?
  notes             String?   @db.Text
  createdAt         DateTime  @default(now())
  updatedAt         DateTime  @updatedAt
}

model WorldBuildingElement {
  id                String    @id @default(uuid())
  bookId            String
  book              Book      @relation(fields: [bookId], references: [id])
  name              String
  type              WorldElementType
  description       String    @db.Text
  details           Json?     // Flexible structure for different types
  imageUrl          String?
  notes             String?   @db.Text
  createdAt         DateTime  @default(now())
  updatedAt         DateTime  @updatedAt
}

model AIGeneration {
  id                String    @id @default(uuid())
  userId            String
  user              User      @relation(fields: [userId], references: [id])
  bookId            String?
  book              Book?     @relation(fields: [bookId], references: [id])
  type              GenerationType
  prompt            String    @db.Text
  response          String    @db.Text
  tokensUsed        Int
  modelVersion      String
  createdAt         DateTime  @default(now())
}

model Export {
  id                String    @id @default(uuid())
  bookId            String
  book              Book      @relation(fields: [bookId], references: [id])
  format            ExportFormat
  fileUrl           String
  status            ExportStatus
  createdAt         DateTime  @default(now())
  expiresAt         DateTime
}

model Subscription {
  id                String    @id @default(uuid())
  userId            String    @unique
  user              User      @relation(fields: [userId], references: [id])
  plan              SubscriptionPlan
  status            SubscriptionStatus
  currentPeriodEnd  DateTime
  createdAt         DateTime  @default(now())
  updatedAt         DateTime  @updatedAt
}

enum BookStatus {
  PLANNING
  WRITING
  EDITING
  COMPLETED
  ARCHIVED
}

enum ChapterStatus {
  PLANNED
  WRITING
  DRAFT
  REVIEW
  FINAL
}

enum WorldElementType {
  LOCATION
  MAGIC_SYSTEM
  TECHNOLOGY
  CULTURE
  HISTORY
  ORGANIZATION
  ITEM
  OTHER
}

enum GenerationType {
  SYNOPSIS
  CHAPTER_OUTLINE
  CHAPTER_CONTENT
  CHARACTER_PROFILE
  WORLD_BUILDING
  REWRITE
  CONTINUATION
}

enum ExportFormat {
  PDF
  DOCX
  EPUB
  TXT
}

enum ExportStatus {
  PROCESSING
  COMPLETED
  FAILED
}

enum SubscriptionPlan {
  FREE
  STARTER
  PROFESSIONAL
  UNLIMITED
}

enum SubscriptionStatus {
  ACTIVE
  CANCELED
  PAST_DUE
  TRIALING
}
```

## Feature Specifications

### 1. Authentication System
- **Sign Up/Sign In**: Email/password with verification
- **OAuth Providers**: Google, GitHub
- **Password Reset**: Secure email-based flow
- **Session Management**: Supabase Auth with JWT
- **Protected Routes**: Middleware-based protection

### 2. The Garden (Dashboard)
**Purpose**: Central hub for all user's book projects

**Features**:
- Visual grid/list toggle view
- Book cards with:
  - Title and cover image
  - Synopsis preview (truncated)
  - Progress visualization (Sakura tree that grows with word count)
  - Status badge (Planning, Writing, Editing, Complete)
  - Quick actions (Open, Edit, Export, Archive)
- Sorting options (Recent, Name, Status, Progress)
- Search functionality
- "Plant a New Seed" CTA button

**Technical Implementation**:
- Server-side rendered with Next.js
- Real-time updates via Supabase subscriptions
- Optimistic UI updates
- Lazy loading for performance

### 3. The Seed (New Book Wizard)
**Purpose**: Guided, conversational book creation process

**Steps**:
1. **Title Input**
   - "What shall we call your story?"
   - Auto-save to prevent data loss
   
2. **Core Idea**
   - "In one or two sentences, what's your story about?"
   - Character limit: 500 characters
   
3. **Genre Selection**
   - Beautiful genre cards with icons
   - Options: Fantasy, Sci-Fi, Mystery, Romance, Thriller, Literary Fiction, Young Adult, Non-Fiction, Other
   
4. **AI Enhancement**
   - "Let me help expand your vision..."
   - AI generates:
     - Extended synopsis (300-500 words)
     - 3-5 tagline options
     - Initial character suggestions
     - Setting recommendations
   
5. **Review & Customize**
   - Edit AI suggestions
   - Set target word count
   - Choose cover style/upload image

**Technical Implementation**:
- Multi-step form with React Hook Form
- Zod validation at each step
- Progress indicator
- Auto-save to localStorage
- Smooth transitions between steps

### 4. The Book Workbench
**Purpose**: Central workspace for book development

**Layout**:
- **Sidebar Navigation**:
  - Overview
  - Outline
  - Characters
  - World Building
  - Writing Studio
  - Settings
  
- **Main Content Area**: Dynamic based on selected section

**Features by Section**:

#### Outline Generator
- Chapter list with drag-and-drop reordering
- "Generate Outline" button with options:
  - Number of chapters
  - Pacing preference (Fast, Moderate, Slow)
  - Plot structure (Three-act, Hero's Journey, etc.)
- Chapter cards showing:
  - Chapter number and title
  - Brief description
  - Status indicator
  - Word count (if written)
- Bulk actions (Generate all descriptions, Export outline)

#### Character Architect
- Character gallery view
- "Create Character" workflow:
  - Name and basic info
  - AI enhancement options:
    - "Develop Physical Description"
    - "Create Backstory"
    - "Define Character Arc"
    - "Generate Personality Traits"
- Character profiles with:
  - Image (AI-generated or uploaded)
  - Expandable sections for details
  - Relationship mapper
  - Character arc timeline
- Character interaction analyzer

#### World-Building Atlas
- Categorized elements (Locations, Magic, Culture, etc.)
- Interactive map option
- "World Builder" AI assistant:
  - Consistency checker
  - Cultural development
  - Magic system rules
  - Historical timeline generator
- Wiki-style interconnected entries

### 5. The Blossom (Writing Studio)
**Purpose**: Distraction-free writing environment with AI assistance

**Layout**:
- **Left Panel**: Chapter navigation
- **Center**: Writing area
- **Right Panel**: AI Muse (collapsible)

**Core Features**:
- **Rich Text Editor**:
  - Basic formatting (bold, italic, underline)
  - Headings and paragraphs
  - Word count (live)
  - Reading time estimate
  - Auto-save indicator

- **AI-Powered Generation**:
  - "Write Chapter" button for full generation
  - Context-aware (uses book details, outline, characters)
  - Adjustable length targets
  - Style preferences (saved per book)

- **The Muse (AI Assistant)**:
  - Highlight text for context menu:
    - "Rewrite this paragraph"
    - "Make more descriptive"
    - "Add dialogue"
    - "Continue from here"
    - "Check consistency"
  - Sidebar suggestions:
    - Plot hole detection
    - Character consistency
    - Pacing analysis
    - Style suggestions

- **Writing Modes**:
  - Focus Mode (minimal UI)
  - Dark Mode
  - Typewriter Mode (current line centered)
  - Hemingway Mode (no backspace)

### 6. Export System
**Purpose**: Professional manuscript generation

**Formats**:
- **PDF**: Professional manuscript format
- **DOCX**: Word-compatible with styles
- **EPUB**: eBook format (future)
- **TXT**: Plain text

**Features**:
- Format-specific options:
  - PDF: Font selection, margins, headers/footers
  - DOCX: Style templates
- Chapter selection
- Front/back matter inclusion
- Progress indicator for generation
- Download management

**Technical Implementation**:
- Background job processing on Railway
- Temporary file storage on Supabase
- Email notification when complete
- 7-day download expiration

## API Specifications

### /api/ai/generate
Central endpoint for all AI interactions

**Request Types**:
```typescript
type AIGenerateRequest = 
  | { type: 'synopsis', bookId: string, idea: string, genre: string }
  | { type: 'outline', bookId: string, chapters: number, structure: string }
  | { type: 'chapter', bookId: string, chapterId: string, context: ChapterContext }
  | { type: 'character', bookId: string, name: string, role: string }
  | { type: 'worldbuilding', bookId: string, elementType: string, name: string }
  | { type: 'rewrite', text: string, instruction: string }
  | { type: 'continue', text: string, direction?: string }
```

**Response**:
```typescript
interface AIGenerateResponse {
  success: boolean;
  data?: {
    generated: string;
    tokensUsed: number;
    suggestions?: string[];
  };
  error?: string;
}
```

### Authentication Endpoints
- `/api/auth/signup`
- `/api/auth/signin`
- `/api/auth/signout`
- `/api/auth/reset-password`
- `/api/auth/verify-email`

### Book Management
- `/api/books` - CRUD operations
- `/api/books/[id]/chapters` - Chapter management
- `/api/books/[id]/characters` - Character management
- `/api/books/[id]/world` - World building elements
- `/api/books/[id]/export` - Export generation

## Deployment Configuration

### Vercel (Frontend)
```json
{
  "framework": "nextjs",
  "buildCommand": "npm run build",
  "outputDirectory": ".next",
  "environmentVariables": {
    "NEXT_PUBLIC_SUPABASE_URL": "@supabase-url",
    "NEXT_PUBLIC_SUPABASE_ANON_KEY": "@supabase-anon-key",
    "ANTHROPIC_API_KEY": "@anthropic-api-key"
  }
}
```

### Railway (Backend Services)
```yaml
services:
  api:
    build: .
    env:
      PORT: 3001
      DATABASE_URL: $SUPABASE_DATABASE_URL
      ANTHROPIC_API_KEY: $ANTHROPIC_API_KEY
    healthcheck:
      path: /api/health
      
  worker:
    build: .
    command: npm run worker
    env:
      DATABASE_URL: $SUPABASE_DATABASE_URL
      SUPABASE_SERVICE_KEY: $SUPABASE_SERVICE_KEY
```

### Supabase Configuration
1. **Database**:
   - Enable RLS on all tables
   - Create appropriate indexes
   - Set up database functions for complex queries

2. **Authentication**:
   - Configure OAuth providers
   - Set up email templates
   - Configure redirect URLs

3. **Storage**:
   - Create buckets for book covers and exports
   - Set up access policies

## MCP Integration Strategy

### 1. Context7 MCP
- Use for fetching latest Next.js 14 patterns
- Ensure Supabase integration follows best practices
- Get current Tailwind CSS utilities

### 2. Serena MCP
- Regular code quality analysis
- Performance optimization suggestions
- Security vulnerability scanning

### 3. Memory MCP
- Store project-specific conventions
- Track architectural decisions
- Maintain component patterns

### 4. GitHub MCP
- Automated PR descriptions
- Issue tracking for bugs
- Release management

### 5. Sentry MCP
- Production error monitoring
- Performance tracking
- User impact analysis

## 🎯 Current Progress Summary

**Status:** Foundation Complete, Core Features 60% Done
**Last Updated:** December 27, 2024

### ✅ What's Working Right Now:
1. **Professional Homepage** - Industry-leading design with Sakura aesthetics
2. **The Garden Dashboard** - Complete project management interface
3. **AI Infrastructure** - Full Anthropic Claude integration ready
4. **Design System** - Beautiful custom Sakura theme with animations
5. **Type Safety** - Comprehensive TypeScript implementation
6. **Build System** - Production-ready Next.js configuration

### 🚧 Currently In Development:
- **The Seed (Book Wizard)** - Multi-step book creation flow

### 📋 Next Priority Features:
1. The Book Workbench layout
2. Outline Generator with AI
3. Character Architect tools
4. Writing Studio with AI Muse
5. Export functionality

### 🔗 Navigation Flow:
- Homepage (`/`) → Dashboard (`/dashboard`) → Book Wizard (`/new`) → Workbench (`/book/[id]`)

## Development Phases

### Phase 1: Foundation ✅ COMPLETED
- [x] Project setup and configuration
- [x] Next.js 14+ with TypeScript initialization
- [x] Comprehensive package.json with all dependencies
- [x] Prisma with Supabase PostgreSQL schema
- [x] Tailwind CSS v3 with custom Sakura theme
- [x] shadcn/ui with custom theming
- [x] Root layout with theme providers

### Phase 2: Core Infrastructure ✅ COMPLETED
- [x] AI Generation API (/api/ai/generate)
- [x] Comprehensive AI service with Anthropic Claude
- [x] Type definitions and utilities
- [x] Rate limiting and error handling
- [x] Support for all generation types

### Phase 3: User Interface ✅ COMPLETED
- [x] Industry-revolutionary homepage (Living Writer inspired)
- [x] Professional navigation and hero section
- [x] Feature showcases with interactive mockups
- [x] The Garden (Dashboard) with beautiful UI
- [x] Grid and list view modes
- [x] Search, filtering, and progress visualization

### Phase 4: Advanced Features (IN PROGRESS)
- [ ] The Seed (New Book Wizard) - 🚧 IN PROGRESS
- [ ] Book workbench structure
- [ ] Outline generator
- [ ] Character architect
- [ ] World-building atlas
- [ ] Writing studio with AI Muse

### Phase 5: Polish & Export
- [ ] Export functionality (PDF, DOCX, EPUB)
- [ ] Performance optimization
- [ ] Security hardening
- [ ] Authentication system
- [ ] User management

### Phase 6: Production & Enhancement
- [ ] Production deployment (Vercel + Railway + Supabase)
- [ ] Monitoring setup
- [ ] User feedback integration
- [ ] Advanced AI features
- [ ] Collaboration features

## Security Considerations

1. **API Security**:
   - Rate limiting per user
   - API key rotation
   - Request validation
   - CORS configuration

2. **Data Security**:
   - Encryption at rest (Supabase)
   - Secure file uploads
   - Input sanitization
   - XSS prevention

3. **Authentication**:
   - Secure session management
   - 2FA support (future)
   - Account recovery flows
   - OAuth security

## Performance Targets

- **Page Load**: < 2s (LCP)
- **Interactivity**: < 100ms (FID)
- **Visual Stability**: < 0.1 (CLS)
- **API Response**: < 500ms (p95)
- **AI Generation**: < 10s for chapters
- **Export Generation**: < 30s for full book

## Monitoring & Analytics

1. **Application Monitoring**:
   - Vercel Analytics for web vitals
   - Sentry for error tracking
   - Custom metrics for AI usage

2. **Business Metrics**:
   - User engagement (DAU/MAU)
   - Book completion rates
   - AI usage patterns
   - Export statistics

3. **Infrastructure Monitoring**:
   - Railway metrics
   - Supabase dashboard
   - API response times
   - Database performance

## Success Criteria

1. **Technical Excellence**:
   - Clean, maintainable code
   - 90%+ test coverage
   - < 1% error rate
   - A+ security rating

2. **User Experience**:
   - Intuitive interface
   - Fast, responsive UI
   - Helpful AI assistance
   - Professional exports

3. **Business Impact**:
   - User retention > 60%
   - Book completion rate > 30%
   - 5-star user satisfaction
   - Viral growth potential

## Future Enhancements

1. **Collaboration Features**:
   - Multi-author support
   - Real-time co-writing
   - Comments and suggestions
   - Version control

2. **Advanced AI**:
   - Voice-to-text writing
   - AI cover generation
   - Style matching
   - Plot analysis

3. **Publishing Integration**:
   - Direct to Amazon KDP
   - Literary agent connections
   - Marketing tools
   - Reader analytics

4. **Mobile Apps**:
   - iOS/Android native apps
   - Offline writing
   - Voice recording
   - Reading mode

This comprehensive plan positions BookBloom 2.0 as the premier AI-powered book writing platform, combining cutting-edge technology with beautiful design and exceptional user experience.