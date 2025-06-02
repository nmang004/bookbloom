# 🌸 BookBloom - AI Book Generator

> Transform your story ideas into beautiful books using AI. Inspired by the natural blooming of cherry blossoms (sakura), BookBloom represents the gentle evolution of simple ideas into fully-realized stories.

![BookBloom Banner](https://img.shields.io/badge/BookBloom-AI%20Book%20Generator-FF8FAB?style=for-the-badge&logo=data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTEyIDJMMTMuMDkgOC4yNkwyMCA5TDEzLjA5IDE1Ljc0TDEyIDIyTDEwLjkxIDE1Ljc0TDQgOUwxMC45MSA4LjI2TDEyIDJaIiBmaWxsPSJ3aGl0ZSIvPgo8L3N2Zz4K)

## ✨ Features

- **🎯 Smart Story Planning**: AI-powered wizard helps create detailed outlines, character profiles, and world-building elements
- **🤖 AI Chapter Generation**: Watch your story bloom as AI writes engaging chapters maintaining consistency and your unique voice
- **📊 Real-Time Progress**: Beautiful visualizations show your writing journey with word counts, completion rates, and time estimates
- **🎨 Style Customization**: Choose from multiple writing styles, tones, and perspectives to match your creative vision
- **📱 Export Anywhere**: Download your masterpiece as PDF, DOCX, EPUB, or plain text with professional formatting
- **🔄 Iterative Editing**: Edit, regenerate, and refine any chapter until it blooms into exactly what you envisioned

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- npm or yarn
- SQLite (included with the project)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/nmang004/bookbloom.git
   cd bookbloom/bookbloom
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Add your environment variables:
   ```env
   # Database
   DATABASE_URL="file:./dev.db"
   
   # AI Provider (Optional - for future AI integration)
   ANTHROPIC_API_KEY="your_api_key_here"
   ```

4. **Initialize the database**
   ```bash
   npx prisma generate
   npx prisma db push
   npx prisma db seed
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🎨 Design Philosophy

BookBloom embraces the **Sakura Theme** - inspired by Japanese cherry blossoms, representing the natural blooming of ideas into stories.

### Color Palette
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
  --sky-blue: #E3F2FD;
  --leaf-green: #4CAF50;
}
```

### Design Principles
- **Japanese Minimalism**: Clean layouts with generous whitespace
- **Gentle Elegance**: Soft rounded corners and smooth animations
- **Growth Metaphors**: Visual language focused on "blooming," "nurturing," and "flourishing"

## 🏗️ Architecture

### Tech Stack

- **Frontend**: Next.js 14+ with TypeScript and App Router
- **Styling**: Tailwind CSS with custom sakura theme + shadcn/ui components
- **Database**: SQLite with Prisma ORM
- **State Management**: Zustand for client state
- **Forms**: React Hook Form with Zod validation
- **AI Integration**: Ready for Anthropic Claude API

### Project Structure

```
bookbloom/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── api/               # API routes
│   │   ├── dashboard/         # Dashboard pages
│   │   └── globals.css        # Global styles & sakura theme
│   ├── components/            # React components
│   │   ├── book/             # Book-related components
│   │   ├── forms/            # Form components
│   │   ├── layout/           # Layout components
│   │   └── ui/               # Reusable UI components
│   ├── lib/                  # Utility libraries
│   ├── stores/               # Zustand state stores
│   └── types/                # TypeScript type definitions
├── prisma/                   # Database schema and migrations
├── public/                   # Static assets
└── docs/                     # Documentation
```

## 📚 Key Components

### 🏠 Homepage (`src/app/page.tsx`)
- **Hero Section**: Compelling value proposition with animated stats
- **Features Grid**: 6 feature cards with gradient icons and hover effects
- **3-Step Process**: Visual journey from seed to story
- **Testimonials**: Social proof with user avatars and ratings
- **Floating Petals**: 20 animated sakura petals for ambiance

### 📊 Dashboard (`src/app/dashboard/page.tsx`)
- **Welcome Section**: Personalized greeting and quick actions
- **Stats Overview**: Animated counters for books, words, chapters
- **Recent Books**: Grid of book cards with progress indicators
- **Achievement Badges**: Milestone celebrations

### 📝 Book Planning Form (`src/components/forms/BookPlanningForm.tsx`)
- **Multi-step Wizard**: Title/genre → Target words/style → Review
- **Genre Selection**: Fantasy, Romance, Mystery, Sci-Fi, and more
- **Style Customization**: Literary, conversational, narrative, descriptive
- **Validation**: Zod schema validation with helpful error messages

### 📖 Chapter Outline Builder (`src/components/forms/ChapterOutlineBuilder.tsx`)
- **Dynamic Management**: Add, remove, reorder chapters
- **Drag & Drop**: Smooth chapter reordering
- **Word Distribution**: Auto-calculate target words per chapter
- **Collapsible Details**: Expandable chapter summaries

## 🗄️ Database Schema

### Books Table
```sql
model Book {
  id            String   @id @default(cuid())
  title         String
  genre         String  
  premise       String
  targetWords   Int
  chaptersCount Int
  writingStyle  String
  tone          String
  pov           String
  status        String   @default("planning")
  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt
  chapters      Chapter[]
}
```

### Chapters Table
```sql
model Chapter {
  id               String  @id @default(cuid())
  bookId           String
  chapterNumber    Int
  title            String
  summary          String
  targetWords      Int
  generatedContent String?
  wordCount        Int     @default(0)
  status           String  @default("pending")
  createdAt        DateTime @default(now())
  updatedAt        DateTime @updatedAt
  book             Book    @relation(fields: [bookId], references: [id], onDelete: Cascade)
}
```

## 🔌 API Endpoints

### Books API
```typescript
GET    /api/books           // List all books
POST   /api/books           // Create new book
GET    /api/books/[id]      // Get specific book
PUT    /api/books/[id]      // Update book
DELETE /api/books/[id]      // Delete book
```

### Stats API
```typescript
GET    /api/stats           // Get dashboard statistics
```

## 🎭 State Management

BookBloom uses Zustand for client-side state management with the following stores:

### Book Store (`src/stores/book-store.ts`)
```typescript
interface BookStore {
  // State
  books: Book[]
  currentBook: Book | null
  stats: BookStats
  isLoading: boolean
  error: string | null

  // Actions
  fetchBooks: () => Promise<void>
  createBook: (data: BookFormData) => Promise<Book | null>
  updateBook: (id: string, updates: Partial<Book>) => Promise<void>
  deleteBook: (id: string) => Promise<void>
  fetchStats: () => Promise<void>
}
```

## 🎨 Styling Guide

### Custom CSS Classes

#### Buttons
```css
.btn-sakura           // Primary gradient button
.btn-sakura-outline   // Secondary outline button
```

#### Cards
```css
.card-sakura         // Main card style with gradient background
.glass-card          // Glass morphism effect
```

#### Animations
```css
.bloom-in            // Gentle scale and fade-in
.animate-float-gentle // Floating petal animation
.petal-fall          // Falling petal animation
```

## 🚀 Development Workflow

### Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run type-check   # Run TypeScript compiler
```

### Code Quality

- **TypeScript**: Strict typing enabled
- **ESLint**: Configured for Next.js and React best practices
- **Prettier**: Code formatting (if configured)
- **Husky**: Git hooks for pre-commit checks (if configured)

### Testing (Future)

```bash
npm run test         # Run unit tests
npm run test:e2e     # Run end-to-end tests
npm run test:watch   # Run tests in watch mode
```

## 🌐 Deployment

### Netlify (Current)

The project is configured for Netlify deployment with:

- **Build Command**: `npm run build`
- **Publish Directory**: `.next`
- **Node Version**: 18+

### Environment Variables

Set these in your deployment platform:

```env
DATABASE_URL=file:./dev.db
ANTHROPIC_API_KEY=your_api_key
NODE_ENV=production
```

### Other Platforms

BookBloom can be deployed to:
- **Vercel**: Native Next.js support
- **Netlify**: Current deployment target
- **Railway**: With PostgreSQL database
- **DigitalOcean**: App Platform

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

### Development Setup

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes
4. Run tests: `npm run test`
5. Commit: `git commit -m 'Add amazing feature'`
6. Push: `git push origin feature/amazing-feature`
7. Open a Pull Request

### Code Style

- Use TypeScript for all new code
- Follow the existing component patterns
- Add JSDoc comments for complex functions
- Ensure responsive design for all components

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Design Inspiration**: Japanese cherry blossom (sakura) symbolism
- **UI Components**: [shadcn/ui](https://ui.shadcn.com/)
- **Icons**: Emoji and custom SVG icons
- **Fonts**: Inter font family from Google Fonts

## 📞 Support

- **GitHub Issues**: [Report bugs or request features](https://github.com/nmang004/bookbloom/issues)
- **Documentation**: Check the `/docs` folder for detailed guides
- **Community**: Join our discussions in GitHub Discussions

---

<div align="center">

**Made with ❤️ and 🌸 for storytellers everywhere**

[🌐 Live Demo](https://bookbloom.netlify.app) • [📖 Documentation](./docs/) • [🐛 Report Bug](https://github.com/nmang004/bookbloom/issues) • [✨ Request Feature](https://github.com/nmang004/bookbloom/issues)

</div>