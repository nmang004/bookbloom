# 🌸 BookBloom 2.0 - AI-Powered Book Writing Platform

<div align="center">
  <img src="https://img.shields.io/badge/Next.js-15.1.6-black?style=for-the-badge&logo=next.js" alt="Next.js"/>
  <img src="https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript" alt="TypeScript"/>
  <img src="https://img.shields.io/badge/Supabase-Database-green?style=for-the-badge&logo=supabase" alt="Supabase"/>
  <img src="https://img.shields.io/badge/Claude-AI-purple?style=for-the-badge&logo=anthropic" alt="Claude AI"/>
</div>

<div align="center">
  <h3>Transform your story ideas into fully-realized books with the power of AI</h3>
  <p>Experience the future of creative writing with our Zen Garden Precision design philosophy</p>
</div>

---

## ✨ Features

### 🎯 Core Capabilities
- **AI-Powered Writing Studio** - Advanced writing environment with multiple modes (Focus, Dark, Typewriter, Hemingway, Zen)
- **Intelligent Chapter Generation** - Generate complete chapters based on your story outline and characters
- **Real-time AI Assistance** - Context-aware writing suggestions, dialogue generation, and style improvements
- **Character Architect** - Build deep, complex characters with AI-assisted development
- **World Building Atlas** - Create rich, consistent fictional worlds
- **Sakura Progress System** - Beautiful visual progress tracking inspired by cherry blossom growth stages

### 🛠️ Technical Excellence
- **Next.js 15 App Router** - Latest framework features for optimal performance
- **TypeScript** - Full type safety throughout the application
- **Supabase Integration** - Scalable backend with real-time capabilities
- **Anthropic Claude API** - State-of-the-art AI for natural, creative writing
- **Responsive Design** - Beautiful on all devices with Tailwind CSS
- **Dark Mode Support** - Easy on the eyes during long writing sessions

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Supabase account
- Anthropic API key

### Installation

1. Clone the repository
```bash
git clone https://github.com/nmang004/bookbloom.git
cd bookbloom
```

2. Install dependencies
```bash
npm install
```

3. Set up environment variables
```bash
cp .env.example .env.local
```

Edit `.env.local` with your credentials:
```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# Anthropic Claude
ANTHROPIC_API_KEY=your_anthropic_api_key

# Optional: NextAuth
NEXTAUTH_SECRET=your_nextauth_secret
NEXTAUTH_URL=http://localhost:3000
```

4. Run the development server
```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to see your BookBloom instance!

## 🏗️ Project Structure

```
bookbloom2/
├── src/
│   ├── app/              # Next.js 15 app directory
│   │   ├── api/          # API routes
│   │   ├── book/         # Book workbench pages
│   │   ├── dashboard/    # User dashboard
│   │   └── new/          # Book creation wizard
│   ├── components/       # React components
│   │   ├── character/    # Character management
│   │   ├── outline/      # Story outline tools
│   │   ├── ui/           # Reusable UI components
│   │   ├── worldbuilding/# World building tools
│   │   └── writing/      # Writing studio components
│   ├── lib/              # Utility functions and services
│   └── types/            # TypeScript type definitions
├── public/               # Static assets
└── docs/                 # Documentation
```

## 🎨 Design System

BookBloom follows the **"Zen Garden Precision"** design philosophy, combining:
- Japanese minimalist aesthetics
- Modern tech precision
- Contemplative user experience
- Sakura (cherry blossom) themed progress indicators

### Color Palette
- **Sakura Pink**: #FFB6C1 - Primary accent
- **Charcoal**: #2C3E50 - Text and dark elements  
- **Zen White**: #FAFAFA - Clean backgrounds
- **Garden Green**: #4CAF50 - Success states

## 📖 Usage Guide

### Creating Your First Book

1. **Start a New Project**
   - Click "Plant a New Story" on the dashboard
   - Enter your book idea (as simple as "A detective story in space")
   - Let AI help generate initial concepts

2. **Develop Your Story**
   - Use the Outline Generator to structure chapters
   - Create characters with the Character Architect
   - Build your world with the World Building Atlas

3. **Write with AI Assistance**
   - Open the Writing Studio for your focused writing space
   - Right-click any text for AI enhancement options
   - Use writing modes for different experiences

4. **Track Your Progress**
   - Watch your Sakura progress indicator bloom
   - Set daily word count goals
   - Celebrate milestones as your story grows

## 🤖 AI Features

### Intelligent Writing Assistance
- **Smart Continuation**: AI continues your story naturally
- **Style Matching**: Maintains consistent voice and tone
- **Dialogue Generation**: Create natural character conversations
- **Description Enhancement**: Add sensory details and atmosphere
- **Show Don't Tell**: Convert exposition to engaging scenes

### Context-Aware Suggestions
- Character consistency checking
- World-building rule validation
- Pacing and flow analysis
- Genre-specific recommendations

## 💻 Developer Guidelines

### Design System Implementation
```typescript
// Use design system colors
className="bg-sakura-500 text-white hover:bg-sakura-600"

// Apply Zen Garden spacing (8px grid)
className="space-y-8 p-6" // 32px spacing, 24px padding

// Modern Tech precision timing
className="transition-all duration-200 hover:scale-105"

// Sakura progress indicators
<SakuraProgressIndicator 
  status="writing" 
  progress={65} 
  size="medium" 
/>
```

### Component Development Checklist
- [ ] Follows design system color palette
- [ ] Uses 8px spacing grid (space-4, space-6, space-8, etc.)
- [ ] Implements proper typography hierarchy
- [ ] Includes hover/focus/active states (150-200ms timing)
- [ ] Supports dark mode variants
- [ ] Meets WCAG 2.1 AA accessibility standards
- [ ] Includes proper ARIA labels and keyboard navigation
- [ ] Responsive across all breakpoints (sm, md, lg, xl, 2xl)

### AI Integration Patterns
```typescript
// Standard AI service usage
import { generateAIContent } from '@/lib/ai-service'

const result = await generateAIContent({
  type: 'synopsis' | 'outline' | 'chapter' | 'character' | 'worldbuilding' | 'rewrite' | 'continue',
  idea: string,
  genre: string,
  // Additional context based on type
})

// Error handling with user-friendly messages
try {
  const content = await generateAIContent(request)
  // Handle success
} catch (error) {
  // Use design system error states
  toast.error("The AI Muse needs a moment to gather inspiration...")
}
```

### File Structure & Naming
```
src/
├── app/                    # Next.js App Router
│   ├── page.tsx           # Homepage
│   ├── dashboard/         # Dashboard pages
│   └── api/ai/generate/   # AI endpoints
├── components/
│   ├── ui/               # shadcn/ui base components
│   ├── sakura/           # Custom Sakura-themed components
│   └── layout/           # Layout components
├── lib/
│   ├── ai-service.ts     # AI integration
│   ├── utils.ts          # Utility functions
│   └── validations.ts    # Zod schemas
└── types/
    ├── ai.ts             # AI-related types
    └── book.ts           # Book-related types
```

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run db:push` - Push schema to database
- `npm run db:studio` - Open Prisma Studio

## 🚢 Deployment

### Vercel (Frontend)
1. Connect your GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push to main

### Railway (Backend Services)
1. Connect repository to Railway
2. Configure environment variables
3. Deploy API routes and background workers

### Supabase (Database)
1. Create new Supabase project
2. Copy connection strings to environment variables
3. Run database migrations

## 📝 Environment Variables

See `.env.example` for required environment variables:

- **Supabase**: Database and authentication
- **Anthropic**: AI generation capabilities
- **Railway**: Backend service hosting
- **Vercel**: Frontend deployment

## 🔧 Development

### Running Tests
```bash
npm test
```

### Building for Production
```bash
npm run build
```

### Code Quality
```bash
npm run lint
npm run type-check
```

## 🌟 Upcoming Features

- [ ] Collaborative writing with real-time sync
- [ ] Export to multiple formats (EPUB, PDF, DOCX)
- [ ] Advanced AI character dialogue training
- [ ] Writing analytics and insights
- [ ] Mobile app for writing on the go
- [ ] Community marketplace for prompts and templates

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Anthropic** for Claude AI capabilities
- **Vercel** for Next.js framework
- **Supabase** for backend infrastructure
- **Tailwind CSS** for styling system
- The creative writing community for inspiration

## 📞 Support

- 📧 Email: support@bookbloom.app
- 💬 Discord: [Join our community](https://discord.gg/bookbloom)
- 📚 Documentation: [docs.bookbloom.app](https://docs.bookbloom.app)

---

<div align="center">
  <p>Built with 💖 and 🌸 by writers, for writers</p>
  <p>Transform your ideas into stories that bloom</p>
</div>