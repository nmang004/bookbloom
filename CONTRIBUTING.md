# 🤝 Contributing to BookBloom

Thank you for your interest in contributing to BookBloom! This document provides guidelines and information for contributors.

## 🌸 Code of Conduct

BookBloom follows the [Contributor Covenant](https://www.contributor-covenant.org/) Code of Conduct. Please read and follow these guidelines to ensure a welcoming environment for all contributors.

## 🚀 Getting Started

### Prerequisites

- Node.js 18 or higher
- npm or yarn
- Git
- Basic knowledge of React, TypeScript, and Next.js

### Development Setup

1. **Fork the repository**
   ```bash
   # Fork on GitHub, then clone your fork
   git clone https://github.com/your-username/bookbloom.git
   cd bookbloom/bookbloom
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment**
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your configuration
   ```

4. **Initialize database**
   ```bash
   npx prisma generate
   npx prisma db push
   npx prisma db seed
   ```

5. **Start development server**
   ```bash
   npm run dev
   ```

6. **Verify setup**
   - Open http://localhost:3000
   - Check that the app loads correctly
   - Verify database connectivity

## 📋 How to Contribute

### Types of Contributions

We welcome various types of contributions:

- 🐛 **Bug fixes**
- ✨ **New features**
- 📚 **Documentation improvements**
- 🎨 **Design enhancements**
- 🧪 **Tests**
- 🔧 **Performance optimizations**
- 🌐 **Accessibility improvements**

### Contribution Workflow

1. **Create an issue** (for new features or significant changes)
2. **Create a branch** from main
3. **Make your changes**
4. **Test thoroughly**
5. **Submit a pull request**

## 🔀 Pull Request Process

### Before Creating a PR

- [ ] Code follows project style guidelines
- [ ] All tests pass
- [ ] Documentation is updated
- [ ] Commits are clean and descriptive
- [ ] PR addresses a specific issue or feature

### PR Template

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Documentation update
- [ ] Performance improvement
- [ ] Other (please describe)

## Testing
- [ ] I have tested these changes locally
- [ ] I have added/updated tests as needed
- [ ] All existing tests pass

## Screenshots (if applicable)
Add screenshots to help explain your changes

## Checklist
- [ ] My code follows the style guidelines
- [ ] I have performed a self-review
- [ ] I have commented my code where needed
- [ ] I have updated documentation
- [ ] My changes generate no new warnings
```

### Review Process

1. **Automated checks** will run (linting, tests, build)
2. **Code review** by maintainers
3. **Feedback incorporation** if needed
4. **Approval and merge**

## 🎨 Design Guidelines

### Sakura Theme

BookBloom follows a cherry blossom (sakura) design theme:

- **Colors**: Pink gradients (#FF8FAB to #E91E63)
- **Style**: Gentle, elegant, minimalist
- **Animation**: Smooth, blooming effects
- **Typography**: Clean, readable fonts

### Component Design

- Use existing design tokens and CSS variables
- Follow responsive design principles
- Ensure accessibility (WCAG 2.1 AA)
- Include hover and focus states
- Test on multiple screen sizes

## 💻 Code Style

### TypeScript

- Use strict TypeScript
- Define interfaces for all props
- Avoid `any` type
- Use meaningful variable names

```typescript
// Good
interface BookCardProps {
  book: Book
  onEdit: (id: string) => void
  className?: string
}

// Avoid
interface Props {
  data: any
  onClick: Function
}
```

### React Components

- Use functional components with hooks
- Keep components small and focused
- Use proper prop destructuring
- Handle loading and error states

```tsx
// Good
export default function BookCard({ 
  book, 
  onEdit, 
  className = '' 
}: BookCardProps) {
  if (!book) return null
  
  return (
    <div className={`card-sakura ${className}`}>
      {/* Component content */}
    </div>
  )
}
```

### CSS/Styling

- Use Tailwind CSS for utilities
- Use custom CSS classes for sakura theme
- Follow mobile-first responsive design
- Use CSS variables for theming

```css
/* Good - Sakura theme classes */
.btn-sakura {
  background: linear-gradient(135deg, var(--sakura-main), var(--sakura-deep));
  border-radius: var(--radius-soft);
}

/* Good - Responsive utilities */
.grid-responsive {
  @apply grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4;
}
```

### File Structure

```
src/
├── app/                    # Next.js pages
├── components/
│   ├── book/              # Book-related components
│   ├── forms/             # Form components
│   ├── layout/            # Layout components
│   └── ui/                # Reusable UI components
├── lib/                   # Utilities and helpers
├── stores/                # State management
└── types/                 # TypeScript types
```

## 🧪 Testing

### Testing Strategy

- **Unit tests**: Individual component logic
- **Integration tests**: Component interactions
- **E2E tests**: Full user workflows
- **Visual tests**: UI consistency

### Writing Tests

```typescript
// Component test example
import { render, screen, fireEvent } from '@testing-library/react'
import BookCard from './BookCard'
import { mockBook } from '@/test-utils/mocks'

describe('BookCard', () => {
  it('renders book information correctly', () => {
    const onEdit = jest.fn()
    
    render(
      <BookCard book={mockBook} onEdit={onEdit} />
    )
    
    expect(screen.getByText(mockBook.title)).toBeInTheDocument()
    expect(screen.getByText(mockBook.genre)).toBeInTheDocument()
  })
  
  it('calls onEdit when edit button is clicked', () => {
    const onEdit = jest.fn()
    
    render(
      <BookCard book={mockBook} onEdit={onEdit} />
    )
    
    fireEvent.click(screen.getByText('Edit'))
    expect(onEdit).toHaveBeenCalledWith(mockBook.id)
  })
})
```

### Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run e2e tests
npm run test:e2e

# Check test coverage
npm run test:coverage
```

## 📚 Documentation

### Code Documentation

- Add JSDoc comments for complex functions
- Include examples in component documentation
- Document prop interfaces thoroughly
- Explain non-obvious business logic

```typescript
/**
 * Calculates the estimated reading time for a book
 * @param wordCount - Total number of words in the book
 * @param wordsPerMinute - Average reading speed (default: 250)
 * @returns Estimated reading time in minutes
 * 
 * @example
 * const readingTime = calculateReadingTime(75000) // 300 minutes
 */
export function calculateReadingTime(
  wordCount: number, 
  wordsPerMinute: number = 250
): number {
  return Math.ceil(wordCount / wordsPerMinute)
}
```

### Documentation Updates

When making changes, update relevant documentation:

- README.md for setup changes
- API.md for API modifications
- COMPONENTS.md for new components
- DEPLOYMENT.md for deployment changes

## 🐛 Reporting Bugs

### Bug Report Template

```markdown
**Describe the bug**
A clear description of what the bug is.

**To Reproduce**
Steps to reproduce the behavior:
1. Go to '...'
2. Click on '....'
3. Scroll down to '....'
4. See error

**Expected behavior**
What you expected to happen.

**Screenshots**
If applicable, add screenshots.

**Environment:**
- OS: [e.g. macOS, Windows, Linux]
- Browser: [e.g. Chrome, Firefox, Safari]
- Version: [e.g. 22]
- Node.js version: [e.g. 18.17.0]

**Additional context**
Any other context about the problem.
```

### Security Issues

For security vulnerabilities:
- **DO NOT** open a public issue
- Email security@bookbloom.app (if available)
- Include detailed steps to reproduce
- Allow time for fix before disclosure

## ✨ Feature Requests

### Feature Request Template

```markdown
**Is your feature request related to a problem?**
A clear description of what the problem is.

**Describe the solution you'd like**
A clear description of what you want to happen.

**Describe alternatives you've considered**
Other solutions you've considered.

**Additional context**
Any other context or screenshots about the feature request.

**Implementation ideas**
If you have ideas about how to implement this feature.
```

## 🏷️ Release Process

### Versioning

BookBloom follows [Semantic Versioning](https://semver.org/):
- **MAJOR**: Breaking changes
- **MINOR**: New features (backward compatible)
- **PATCH**: Bug fixes

### Release Checklist

- [ ] All tests pass
- [ ] Documentation updated
- [ ] Changelog updated
- [ ] Version bumped
- [ ] Release notes prepared
- [ ] Deployment successful

## 🎯 Development Priorities

### Current Focus Areas

1. **AI Integration**: Claude API implementation
2. **Export Features**: PDF, DOCX, EPUB generation
3. **User Management**: Authentication and profiles
4. **Performance**: Optimization and caching
5. **Testing**: Comprehensive test coverage

### Future Roadmap

- Real-time collaboration
- Advanced AI features
- Mobile application
- Publishing integrations
- Community features

## 🤔 Questions?

- **General questions**: Open a discussion on GitHub
- **Development questions**: Join our Discord (if available)
- **Bug reports**: Create an issue with the bug template
- **Feature requests**: Create an issue with the feature template

## 🙏 Recognition

Contributors will be recognized in:
- README.md contributors section
- Release notes for significant contributions
- Special badges for ongoing contributors

Thank you for contributing to BookBloom! 🌸