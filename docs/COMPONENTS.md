# 🧩 BookBloom Component Documentation

## Overview

BookBloom is built using a modular component architecture with React and TypeScript. All components follow the sakura design theme and are designed for reusability and maintainability.

## Component Categories

- **📄 Layout Components**: Header, Sidebar, Layout wrapper
- **📚 Book Components**: Book cards, preview cards, progress indicators
- **📝 Form Components**: Multi-step forms, chapter builders
- **🎨 UI Components**: Buttons, animations, counters

---

## 📄 Layout Components

### Layout (`src/components/layout/Layout.tsx`)

Main layout wrapper that provides the overall application structure.

#### Props
```typescript
interface LayoutProps {
  children: React.ReactNode
  showSidebar?: boolean
  maxWidth?: 'full' | '7xl' | '6xl' | '5xl' | '4xl'
  className?: string
}
```

#### Usage
```tsx
<Layout showSidebar={true} maxWidth="7xl">
  <YourPageContent />
</Layout>
```

#### Features
- Responsive sidebar management
- Mobile overlay handling
- Configurable max-width containers
- Scroll-to-top button
- Header integration

### Header (`src/components/layout/Header.tsx`)

Navigation header with branding and user menu.

#### Props
```typescript
interface HeaderProps {
  onMenuToggle?: () => void
  isMobileMenuOpen?: boolean
}
```

#### Features
- Sakura-themed branding
- Mobile hamburger menu
- Navigation links
- User profile dropdown
- Floating petal animations

### Sidebar (`src/components/layout/Sidebar.tsx`)

Left navigation sidebar with quick stats and navigation.

#### Props
```typescript
interface SidebarProps {
  isOpen?: boolean
  onClose?: () => void
  className?: string
}
```

#### Features
- Navigation menu with active states
- Quick statistics display
- Daily inspiration quotes
- Progress visualization
- Glass morphism styling

---

## 📚 Book Components

### BookCard (`src/components/book/BookCard.tsx`)

Main book display card for the books grid.

#### Props
```typescript
interface BookCardProps {
  book: Book
  onEdit?: (id: string) => void
  onDelete?: (id: string) => void
  onView?: (id: string) => void
}
```

#### Features
- Book cover simulation
- Progress indicators
- Action buttons (Edit, Delete, View)
- Status badges
- Hover animations

#### Usage
```tsx
<BookCard
  book={bookData}
  onEdit={(id) => router.push(`/dashboard/books/${id}/edit`)}
  onDelete={handleDelete}
  onView={(id) => router.push(`/dashboard/books/${id}`)}
/>
```

### BookPreviewCard (`src/components/book/BookPreviewCard.tsx`)

Compact book preview for dashboard and lists.

#### Props
```typescript
interface BookPreviewCardProps {
  book: Book
  onDelete?: (id: string) => void
  showActions?: boolean
}
```

#### Features
- Compact layout
- Genre badges
- Word count display
- Quick actions
- Responsive design

### ChapterStatusIndicator (`src/components/book/ChapterStatusIndicator.tsx`)

Visual indicator for chapter completion status.

#### Props
```typescript
interface ChapterStatusIndicatorProps {
  status: 'pending' | 'generating' | 'completed' | 'error'
  chapterNumber: number
  className?: string
}
```

#### Status Icons
- `pending`: ⏳ (Hourglass)
- `generating`: ⚡ (Lightning)
- `completed`: 🌸 (Cherry blossom)
- `error`: ❌ (Error)

### GenerationProgress (`src/components/book/GenerationProgress.tsx`)

Real-time progress display during book generation.

#### Props
```typescript
interface GenerationProgressProps {
  status: GenerationStatus
  onPause?: () => void
  onStop?: () => void
  onResume?: () => void
}
```

#### Features
- Animated progress bars
- Chapter-by-chapter status
- Word count tracking
- ETA calculation
- Control buttons (Pause/Resume/Stop)

---

## 📝 Form Components

### BookPlanningForm (`src/components/forms/BookPlanningForm.tsx`)

Multi-step wizard for creating new books.

#### Props
```typescript
interface BookPlanningFormProps {
  onSubmit: (data: BookFormData) => Promise<void>
  initialData?: Partial<BookFormData>
  isLoading?: boolean
}
```

#### Form Steps
1. **Basic Info**: Title, genre, premise
2. **Configuration**: Target words, chapters, style
3. **Review**: Confirm all details

#### Features
- React Hook Form integration
- Zod validation
- Progress indicator
- Step navigation
- Auto-save drafts (future)

#### Form Schema
```typescript
const bookPlanningSchema = z.object({
  title: z.string().min(1, 'Title is required').max(100),
  genre: z.enum(['fantasy', 'romance', 'mystery', 'sci-fi', 'literary', 'thriller']),
  premise: z.string().min(50, 'Premise must be at least 50 characters'),
  targetWords: z.number().min(10000).max(200000),
  chaptersCount: z.number().min(3).max(50),
  writingStyle: z.enum(['literary', 'conversational', 'narrative', 'descriptive']),
  tone: z.string(),
  pov: z.enum(['first-person', 'third-person-limited', 'third-person-omniscient'])
})
```

### ChapterOutlineBuilder (`src/components/forms/ChapterOutlineBuilder.tsx`)

Dynamic chapter management interface.

#### Props
```typescript
interface ChapterOutlineBuilderProps {
  chapters: Chapter[]
  onChaptersChange: (chapters: Chapter[]) => void
  totalTargetWords: number
  maxChapters?: number
}
```

#### Features
- Add/remove chapters
- Drag & drop reordering
- Automatic word distribution
- Chapter title editing
- Collapsible summaries
- Real-time validation

#### Usage
```tsx
<ChapterOutlineBuilder
  chapters={chapterList}
  onChaptersChange={setChapters}
  totalTargetWords={80000}
  maxChapters={25}
/>
```

---

## 🎨 UI Components

### AnimatedCounter (`src/components/ui/AnimatedCounter.tsx`)

Smooth number animation component for statistics.

#### Props
```typescript
interface AnimatedCounterProps {
  end: number
  start?: number
  duration?: number
  delay?: number
  decimals?: number
  suffix?: string
  className?: string
}
```

#### Features
- Smooth easing animation
- Configurable duration and delay
- Decimal support
- Suffix support (K+, M+, etc.)
- Accessible number formatting

#### Usage
```tsx
<AnimatedCounter 
  end={50} 
  suffix="K+" 
  duration={2000}
  delay={500}
/>
```

### Button Variants

#### Primary Button (`.btn-sakura`)
```css
.btn-sakura {
  background: linear-gradient(135deg, #FF8FAB, #E91E63);
  color: white;
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(255, 143, 171, 0.3);
}
```

#### Secondary Button (`.btn-sakura-outline`)
```css
.btn-sakura-outline {
  background: transparent;
  border: 2px solid var(--sakura-main);
  color: var(--sakura-main);
  border-radius: 12px;
}
```

### Card Variants

#### Main Card (`.card-sakura`)
```css
.card-sakura {
  background: linear-gradient(145deg, #FEFEFE, #FFE5E5);
  border: 1px solid rgba(255, 183, 197, 0.3);
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(255, 143, 171, 0.1);
}
```

#### Glass Card (`.glass-card`)
```css
.glass-card {
  background: rgba(255, 229, 229, 0.7);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 183, 197, 0.2);
  border-radius: 16px;
}
```

---

## 🎭 Animation Components

### Floating Petals

Decorative sakura petals that float across the background.

```tsx
{[...Array(20)].map((_, i) => (
  <div
    key={i}
    className="absolute text-sakura-main/20 animate-float-gentle"
    style={{
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      animationDelay: `${Math.random() * 10}s`
    }}
  >
    🌸
  </div>
))}
```

### Bloom-in Animation

Gentle entrance animation for components.

```css
@keyframes bloom-in {
  0% {
    opacity: 0;
    transform: scale(0.8) translateY(30px);
  }
  100% {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}

.bloom-in {
  animation: bloom-in 0.8s ease-out forwards;
}
```

---

## 🔧 Component Best Practices

### TypeScript Usage

All components use strict TypeScript:

```typescript
interface ComponentProps {
  requiredProp: string
  optionalProp?: number
  children?: React.ReactNode
  className?: string
}

export default function Component({ 
  requiredProp, 
  optionalProp = 0,
  children,
  className = '' 
}: ComponentProps) {
  return (
    <div className={`base-styles ${className}`}>
      {children}
    </div>
  )
}
```

### Styling Patterns

1. **Use Tailwind for layout and spacing**
2. **Use custom CSS classes for sakura theme elements**
3. **Combine classes with conditional logic**

```tsx
className={`
  base-styles
  ${isActive ? 'active-styles' : 'inactive-styles'}
  ${variant === 'primary' ? 'btn-sakura' : 'btn-sakura-outline'}
  ${className}
`}
```

### Error Handling

Components should handle loading and error states:

```tsx
if (isLoading) return <LoadingSpinner />
if (error) return <ErrorMessage message={error} />
if (!data) return <EmptyState />

return <ComponentContent data={data} />
```

### Accessibility

- Use semantic HTML elements
- Include ARIA labels where needed
- Ensure keyboard navigation
- Maintain color contrast ratios

```tsx
<button
  aria-label="Delete book"
  className="btn-sakura"
  onClick={onDelete}
>
  🗑️ Delete
</button>
```

---

## 📱 Responsive Design

All components are designed mobile-first:

```tsx
<div className="
  grid 
  grid-cols-1 
  sm:grid-cols-2 
  lg:grid-cols-3 
  xl:grid-cols-4 
  gap-4 
  sm:gap-6 
  lg:gap-8
">
  {items.map(item => <ItemCard key={item.id} item={item} />)}
</div>
```

### Breakpoints
- `sm`: 640px and up
- `md`: 768px and up  
- `lg`: 1024px and up
- `xl`: 1280px and up

---

## 🚀 Component Development

### Creating New Components

1. **Create component file**: `src/components/[category]/ComponentName.tsx`
2. **Define TypeScript interface** for props
3. **Implement component** with sakura styling
4. **Add to exports** if needed
5. **Document usage** and examples

### Testing Components

```tsx
// ComponentName.test.tsx
import { render, screen } from '@testing-library/react'
import ComponentName from './ComponentName'

describe('ComponentName', () => {
  it('renders correctly', () => {
    render(<ComponentName requiredProp="test" />)
    expect(screen.getByText('Expected Text')).toBeInTheDocument()
  })
})
```

### Storybook (Future)

Components will be documented in Storybook for better development workflow:

```tsx
// ComponentName.stories.tsx
export default {
  title: 'Components/ComponentName',
  component: ComponentName,
}

export const Default = {
  args: {
    requiredProp: 'Default value'
  }
}
```