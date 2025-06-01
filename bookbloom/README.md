# BookBloom 🌸 - AI Book Generator

A beautiful web application that transforms story ideas into complete books using AI, inspired by Japanese cherry blossoms (sakura). BookBloom represents the natural blooming of ideas into fully-formed stories.

## ✨ Features

- **Book Planning**: Intuitive forms for title, genre, premise, target length, and style
- **Chapter Outlining**: Dynamic chapter builder with drag-and-drop reordering
- **AI Generation**: Sequential chapter generation with real-time progress tracking
- **Export System**: PDF, DOCX, and text downloads with professional formatting
- **Content Management**: Edit generated content, regenerate chapters, version history

## 🌸 Sakura-Themed Design

BookBloom features a beautiful Japanese cherry blossom theme with:
- Soft pink color palette with sakura tones
- Gentle animations including floating petals
- Glass morphism cards with elegant shadows
- Growth-focused messaging ("bloom," "nurture," "flourish")

## 🛠️ Tech Stack

- **Framework**: Next.js 14+ with TypeScript and App Router
- **Styling**: Tailwind CSS with shadcn/ui components
- **Database**: SQLite with Prisma ORM
- **State**: Zustand for client state management
- **Forms**: React Hook Form with Zod validation
- **AI**: Anthropic Claude API for text generation

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/nmang004/bookbloom.git
cd bookbloom/bookbloom
```

2. Install dependencies:
```bash
npm install
```

3. Set up the database:
```bash
npx prisma generate
npx prisma db push
```

4. Create a `.env.local` file with your environment variables:
```env
DATABASE_URL="file:./dev.db"
ANTHROPIC_API_KEY="your_claude_api_key_here"
```

5. Run the development server:
```bash
npm run dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
src/
├── app/                    # Next.js app router pages
│   ├── dashboard/         # Dashboard pages
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── book/             # Book-related components
│   ├── forms/            # Form components
│   ├── layout/           # Layout components
│   └── ui/               # UI components
├── lib/                  # Utility libraries
├── stores/               # Zustand state stores
└── types/                # TypeScript type definitions
```

## 🏗️ Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

### Database Commands

- `npx prisma studio` - Open Prisma Studio
- `npx prisma db push` - Push schema changes
- `npx prisma generate` - Generate Prisma client

## 📋 Recent Updates

### Build Quality Improvements (Latest)

✅ **Resolved all TypeScript and ESLint errors for clean production build**

- **Code Quality**: Removed unused imports and variables across all components
- **Type Safety**: Replaced `any` types with proper TypeScript interfaces
- **JSX Compliance**: Fixed unescaped quotes using proper HTML entities
- **Database Integration**: Updated all method calls to match Prisma API structure
- **UI Completeness**: Extended components to handle all status enum values
- **Interface Consistency**: Fixed property naming across type definitions

**Impact**: Build now passes successfully with zero errors, ready for production deployment.

### Previous Updates

- **Sakura Theme Implementation**: Complete UI transformation with cherry blossom design
- **Prisma Database Setup**: Full database schema with Book and Chapter models
- **Responsive Layout**: Mobile-first design with touch-friendly interactions
- **State Management**: Zustand integration for client-side state
- **Form Validation**: React Hook Form with Zod validation schemas

## 🎨 Color Palette

```css
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
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Inspired by Japanese cherry blossom aesthetics
- Built with Next.js and modern React patterns
- Powered by Anthropic Claude AI for text generation

---

**BookBloom** - Where ideas bloom into beautiful stories 🌸✨