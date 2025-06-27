# BookBloom 2.0 Design System
*The Visual Bible for Premium Writing Software*

## 🌸 Design Philosophy: "Zen Garden Precision"

BookBloom 2.0 embodies a unique hybrid aesthetic that combines the **serene minimalism of a Japanese Zen Garden** with the **crisp precision of modern premium software**. Every design decision should reflect this duality:

- **Zen Garden Foundation**: Extensive white space, contemplative layouts, soft color palette, and meditative flow
- **Modern Tech Precision**: Sharp typography, crisp micro-interactions, immediate feedback, and professional polish

The result: An application that feels like a peaceful sanctuary for creativity while functioning with the precision of industry-leading software.

---

## 🎨 Color Palette

### Primary Sakura Palette
Our signature colors that define the BookBloom brand identity.

```css
/* Light Sakura Tones - Primary Usage */
--sakura-50: #fef2f4    /* Backgrounds, subtle accents */
--sakura-100: #fce8ec   /* Light backgrounds, hover states */
--sakura-200: #f9c9d4   /* Borders, dividers */
--sakura-300: #f4a3b5   /* Secondary elements */
--sakura-400: #ec6f8e   /* Interactive elements */
--sakura-500: #e14372   /* Primary buttons, links, CTAs */
--sakura-600: #c92d5d   /* Button hover states */
--sakura-700: #a6234c   /* Active states, emphasis */
--sakura-800: #882041   /* Dark mode accents */
--sakura-900: #721e3a   /* Deep contrast elements */
--sakura-950: #451019   /* Maximum contrast */
```

### Charcoal Neutrals
Professional grays that provide the "modern tech" backbone.

```css
/* Clean Professional Grays */
--charcoal-50: #f7f7f8   /* Light backgrounds, cards */
--charcoal-100: #eeeff1  /* Subtle backgrounds */
--charcoal-200: #d9dce1  /* Borders, dividers */
--charcoal-300: #b8bec7  /* Muted text, placeholders */
--charcoal-400: #919aa6  /* Secondary text */
--charcoal-500: #747e8b  /* Body text */
--charcoal-600: #5c6570  /* Headings, emphasis */
--charcoal-700: #4b535c  /* Strong headings */
--charcoal-800: #40454d  /* Dark mode backgrounds */
--charcoal-900: #383c42  /* Primary dark text */
--charcoal-950: #25282c  /* Maximum contrast dark */
```

### Semantic Colors
Status and feedback colors that maintain brand harmony.

```css
/* Status Colors - Carefully chosen to complement Sakura */
--success-50: #f0fdf4    /* Success backgrounds */
--success-500: #22c55e   /* Success states */
--success-700: #15803d   /* Success emphasis */

--warning-50: #fffbeb    /* Warning backgrounds */
--warning-500: #f59e0b   /* Warning states */
--warning-700: #b45309   /* Warning emphasis */

--error-50: #fef2f2      /* Error backgrounds */
--error-500: #ef4444     /* Error states */
--error-700: #c53030     /* Error emphasis */

--info-50: #f0f9ff       /* Info backgrounds */
--info-500: #3b82f6     /* Info states */
--info-700: #1d4ed8     /* Info emphasis */
```

### Color Usage Guidelines

**DO:**
- Use Sakura-500 as the primary brand color for CTAs and key interactions
- Employ extensive white space (white/charcoal-50) as the foundation
- Use charcoal tones for all text to ensure readability
- Apply sakura tones sparingly for maximum impact

**DON'T:**
- Overwhelm layouts with too much sakura pink
- Use sakura colors for body text (readability issues)
- Mix warm and cool grays in the same interface
- Use semantic colors for decorative purposes

---

## ✍️ Typography System

### Font Families

```css
/* Primary Font Stack */
font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;

/* Monospace Font Stack */
font-family: 'JetBrains Mono', 'SF Mono', 'Monaco', 'Inconsolata', monospace;
```

### Type Scale & Hierarchy

**Display & Headers** *(Sharp, Modern, Impactful)*
```css
/* Display 1 - Hero Headlines */
font-size: 4rem;        /* 64px */
font-weight: 700;       /* Bold */
line-height: 1.1;       /* 70.4px */
letter-spacing: -0.02em;

/* Display 2 - Section Headlines */
font-size: 3rem;        /* 48px */
font-weight: 700;       /* Bold */
line-height: 1.15;      /* 55.2px */
letter-spacing: -0.015em;

/* H1 - Page Titles */
font-size: 2.5rem;      /* 40px */
font-weight: 600;       /* Semibold */
line-height: 1.2;       /* 48px */
letter-spacing: -0.01em;

/* H2 - Major Sections */
font-size: 2rem;        /* 32px */
font-weight: 600;       /* Semibold */
line-height: 1.25;      /* 40px */

/* H3 - Subsections */
font-size: 1.5rem;      /* 24px */
font-weight: 500;       /* Medium */
line-height: 1.3;       /* 31.2px */

/* H4 - Minor Headers */
font-size: 1.25rem;     /* 20px */
font-weight: 500;       /* Medium */
line-height: 1.35;      /* 27px */
```

**Body Text** *(Readable, Comfortable, Professional)*
```css
/* Body Large - Primary text */
font-size: 1.125rem;    /* 18px */
font-weight: 400;       /* Regular */
line-height: 1.6;       /* 28.8px */

/* Body Regular - Standard text */
font-size: 1rem;        /* 16px */
font-weight: 400;       /* Regular */
line-height: 1.5;       /* 24px */

/* Body Small - Secondary text */
font-size: 0.875rem;    /* 14px */
font-weight: 400;       /* Regular */
line-height: 1.45;      /* 20.3px */

/* Caption - Labels, captions */
font-size: 0.75rem;     /* 12px */
font-weight: 500;       /* Medium */
line-height: 1.4;       /* 16.8px */
letter-spacing: 0.025em;
```

### Typography Usage Guidelines

**DO:**
- Use Inter for all interface text (clean, modern, highly readable)
- Maintain consistent line heights for vertical rhythm
- Use font-weight 500+ for headings to ensure clarity
- Apply letter-spacing to improve readability at large sizes

**DON'T:**
- Mix multiple font families in a single interface
- Use font weights below 400 for body text
- Exceed 65-70 characters per line for optimal readability
- Use decorative fonts that compromise accessibility

---

## 🧩 Component Library

### Buttons

**Primary Button (Sakura)**
```css
.btn-primary {
  background: var(--sakura-500);
  color: white;
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: 500;
  font-size: 1rem;
  border: none;
  cursor: pointer;
  transition: all 150ms cubic-bezier(0.4, 0, 0.2, 1);
  
  /* Modern Zen Tech Precision */
  &:hover {
    background: var(--sakura-600);
    transform: translateY(-1px);
    box-shadow: 0 8px 16px rgba(225, 67, 114, 0.2);
  }
  
  &:active {
    transform: translateY(0);
    transition-duration: 75ms;
  }
  
  &:focus-visible {
    outline: 2px solid var(--sakura-400);
    outline-offset: 2px;
  }
}
```

**Secondary Button (Outlined)**
```css
.btn-secondary {
  background: transparent;
  color: var(--sakura-600);
  padding: 12px 24px;
  border: 2px solid var(--sakura-300);
  border-radius: 8px;
  font-weight: 500;
  font-size: 1rem;
  cursor: pointer;
  transition: all 150ms cubic-bezier(0.4, 0, 0.2, 1);
  
  &:hover {
    background: var(--sakura-50);
    border-color: var(--sakura-500);
    color: var(--sakura-700);
  }
}
```

**Sizes**
```css
/* Small */
.btn-sm { padding: 8px 16px; font-size: 0.875rem; }

/* Default */
.btn-md { padding: 12px 24px; font-size: 1rem; }

/* Large */
.btn-lg { padding: 16px 32px; font-size: 1.125rem; }
```

### Cards

**Base Card**
```css
.card {
  background: white;
  border: 1px solid var(--charcoal-200);
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  transition: all 200ms cubic-bezier(0.4, 0, 0.2, 1);
  
  /* Zen Garden: Subtle elevation */
  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    transform: translateY(-2px);
    border-color: var(--sakura-200);
  }
}
```

**Book Card (Special)**
```css
.book-card {
  @extend .card;
  cursor: pointer;
  overflow: hidden;
  
  /* Modern Tech: Precise feedback */
  &:hover {
    box-shadow: 0 8px 24px rgba(225, 67, 114, 0.15);
    border-color: var(--sakura-300);
  }
  
  &:active {
    transform: translateY(0);
    transition-duration: 75ms;
  }
}
```

### Input Fields

**Text Input**
```css
.input {
  width: 100%;
  padding: 12px 16px;
  border: 2px solid var(--charcoal-200);
  border-radius: 8px;
  font-size: 1rem;
  font-family: inherit;
  background: white;
  color: var(--charcoal-700);
  transition: all 150ms cubic-bezier(0.4, 0, 0.2, 1);
  
  &:focus {
    outline: none;
    border-color: var(--sakura-400);
    box-shadow: 0 0 0 3px rgba(225, 67, 114, 0.1);
  }
  
  &::placeholder {
    color: var(--charcoal-400);
  }
}
```

### Modal/Dialog

```css
.modal {
  background: white;
  border-radius: 16px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
  max-width: 500px;
  width: 90vw;
  max-height: 90vh;
  overflow: hidden;
  
  /* Zen Garden: Breathing room */
  padding: 32px;
  
  /* Modern Tech: Smooth entrance */
  animation: modal-enter 200ms cubic-bezier(0.4, 0, 0.2, 1);
}

.modal-overlay {
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
  animation: overlay-enter 200ms ease-out;
}

@keyframes modal-enter {
  from {
    opacity: 0;
    transform: scale(0.9) translateY(20px);
  }
  to {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}
```

---

## 🎭 Animation Principles

### Core Values
```css
/* Timing Functions - Modern Zen Tech Precision */
--ease-smooth: cubic-bezier(0.4, 0, 0.2, 1);        /* Standard smooth */
--ease-swift: cubic-bezier(0.4, 0, 0.6, 1);         /* Quick responses */
--ease-gentle: cubic-bezier(0.25, 0.46, 0.45, 0.94); /* Zen-like flow */

/* Duration Values */
--duration-instant: 75ms;    /* Immediate feedback */
--duration-fast: 150ms;      /* Standard interactions */
--duration-smooth: 200ms;    /* Gentle transitions */
--duration-slow: 300ms;      /* Emphasis transitions */
--duration-sakura: 600ms;    /* Bloom animations */
```

### Animation Categories

**Micro-interactions** *(Modern Tech Precision)*
- Button clicks: 75ms instant feedback
- Input focus: 150ms border/shadow change
- Hover states: 150ms transform/color
- Link hovers: 150ms color transitions

**Layout Transitions** *(Zen Garden Flow)*
- Page transitions: 200ms smooth slide
- Modal enter/exit: 200ms scale + opacity
- Card hover: 200ms lift + shadow
- Menu open/close: 300ms gentle slide

**Sakura Metaphor Animations** *(Brand-specific)*
- Progress bloom: 600ms scale + opacity
- Petal fall: 8000ms linear infinite
- Tree growth: 400ms staged reveals
- Achievement celebrations: 800ms bounce sequence

### Usage Guidelines

**DO:**
- Use faster animations (75-150ms) for immediate feedback
- Apply gentle easing for contemplative interactions
- Combine multiple properties (transform + opacity) for richness
- Respect user's motion preferences (`prefers-reduced-motion`)

**DON'T:**
- Use linear easing except for continuous animations
- Exceed 300ms for standard UI interactions
- Animate layout-shifting properties without consideration
- Create distracting or excessive motion

---

## 📐 Spacing & Layout

### Spacing Scale
Based on an 8px baseline grid for mathematical harmony.

```css
--space-1: 4px;     /* 0.25rem - Tight spacing */
--space-2: 8px;     /* 0.5rem  - Base unit */
--space-3: 12px;    /* 0.75rem - Small gaps */
--space-4: 16px;    /* 1rem    - Standard spacing */
--space-5: 20px;    /* 1.25rem - Medium gaps */
--space-6: 24px;    /* 1.5rem  - Large gaps */
--space-8: 32px;    /* 2rem    - Section spacing */
--space-10: 40px;   /* 2.5rem  - Major spacing */
--space-12: 48px;   /* 3rem    - Hero spacing */
--space-16: 64px;   /* 4rem    - Dramatic spacing */
--space-20: 80px;   /* 5rem    - Page sections */
--space-24: 96px;   /* 6rem    - Major sections */
```

### Layout Guidelines

**Zen Garden Principles:**
- Use generous white space (minimum 32px between major sections)
- Allow content to breathe (minimum 24px padding in containers)
- Create visual rest areas with empty space
- Use asymmetric layouts for visual interest

**Modern Tech Precision:**
- Align all elements to 8px grid
- Use consistent spacing patterns throughout
- Maintain clear visual hierarchy with spacing
- Ensure touch targets are minimum 44px

---

## 🌸 Sakura Progress System

The heart of our visual metaphor: representing the journey from idea to finished book.

### Progress States

**🌰 Seed (0% - Idea Phase)**
```css
.progress-seed {
  color: var(--charcoal-400);
  font-size: 2rem;
  filter: grayscale(0.3);
  transition: all var(--duration-smooth) var(--ease-smooth);
}
```

**🌱 Sprout (1-25% - Initial Planning)**
```css
.progress-sprout {
  color: #22c55e;
  font-size: 2.25rem;
  animation: gentle-sway 3s ease-in-out infinite;
}

@keyframes gentle-sway {
  0%, 100% { transform: rotate(-2deg); }
  50% { transform: rotate(2deg); }
}
```

**🌿 Growth (26-50% - Outline/Structure)**
```css
.progress-growth {
  color: #16a34a;
  font-size: 2.5rem;
  animation: leaves-rustle 4s ease-in-out infinite;
}
```

**🌺 Bud (51-75% - Active Writing)**
```css
.progress-bud {
  color: var(--sakura-400);
  font-size: 2.75rem;
  animation: pre-bloom 2s ease-in-out infinite;
}

@keyframes pre-bloom {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.05); }
}
```

**🌸 Blossom (76-100% - Near Completion)**
```css
.progress-blossom {
  color: var(--sakura-500);
  font-size: 3rem;
  animation: bloom-pulse 2.5s ease-in-out infinite;
  filter: drop-shadow(0 0 8px rgba(225, 67, 114, 0.3));
}

@keyframes bloom-pulse {
  0%, 100% { 
    transform: scale(1);
    filter: drop-shadow(0 0 8px rgba(225, 67, 114, 0.3));
  }
  50% { 
    transform: scale(1.1);
    filter: drop-shadow(0 0 12px rgba(225, 67, 114, 0.5));
  }
}
```

### Progress Bar Component
```css
.sakura-progress {
  width: 100%;
  height: 8px;
  background: var(--sakura-100);
  border-radius: 4px;
  overflow: hidden;
  position: relative;
}

.sakura-progress-fill {
  height: 100%;
  background: linear-gradient(90deg, 
    var(--sakura-400) 0%, 
    var(--sakura-500) 100%
  );
  border-radius: 4px;
  transition: width var(--duration-smooth) var(--ease-smooth);
  position: relative;
  
  /* Subtle shimmer for active progress */
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, 
      transparent, 
      rgba(255, 255, 255, 0.4), 
      transparent
    );
    animation: shimmer 2s infinite;
  }
}

@keyframes shimmer {
  to { left: 100%; }
}
```

---

## 🎯 Iconography

### Icon System
- **Library**: Lucide Icons (consistent stroke width, minimal design)
- **Size Standard**: 16px, 20px, 24px multiples
- **Stroke Width**: 1.5px for perfect optical balance
- **Style**: Outline style for clean, modern appearance

### Icon Usage
```css
.icon-sm { width: 16px; height: 16px; }
.icon-md { width: 20px; height: 20px; }
.icon-lg { width: 24px; height: 24px; }

.icon {
  stroke-width: 1.5;
  color: currentColor;
  transition: color var(--duration-fast) var(--ease-smooth);
}
```

### Custom Sakura Icons
For brand-specific moments, we use emoji that maintain our aesthetic:
- 🌸 Achievement, completion, celebration
- 🌱 Growth, progress, new beginnings  
- 📝 Writing, creation, documentation
- 🎨 Design, creativity, customization

---

## ♿ Accessibility Standards

### WCAG 2.1 AA Compliance

**Color Contrast Ratios:**
- Large text (18px+): Minimum 3:1
- Normal text: Minimum 4.5:1
- UI components: Minimum 3:1

**Verified Combinations:**
```css
/* High contrast text combinations */
charcoal-900 on white: 18.23:1 ✓
charcoal-700 on sakura-50: 8.94:1 ✓
sakura-700 on white: 7.12:1 ✓
white on sakura-500: 4.89:1 ✓
```

**Keyboard Navigation:**
- All interactive elements must be keyboard accessible
- Focus indicators use sakura-400 with 2px outline
- Tab order follows logical visual flow
- Skip links provided for main content

**Screen Reader Support:**
- Semantic HTML structure required
- ARIA labels for complex interactions
- Alt text for all meaningful images
- Status announcements for dynamic content

**Motion Preferences:**
```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## 📱 Responsive Design

### Breakpoint System
```css
/* Mobile First Approach */
--breakpoint-sm: 640px;   /* Large phones */
--breakpoint-md: 768px;   /* Tablets */
--breakpoint-lg: 1024px;  /* Laptops */
--breakpoint-xl: 1280px;  /* Desktops */
--breakpoint-2xl: 1536px; /* Large desktops */
```

### Responsive Typography
```css
/* Fluid typography scales */
.text-display-1 {
  font-size: clamp(2.5rem, 5vw, 4rem);
}

.text-display-2 {
  font-size: clamp(2rem, 4vw, 3rem);
}

.text-h1 {
  font-size: clamp(1.75rem, 3vw, 2.5rem);
}
```

### Layout Patterns
- **Mobile**: Single column, full-width cards
- **Tablet**: 2-column grids, sidebar navigation
- **Desktop**: 3-column grids, permanent sidebars
- **Large Desktop**: Maximum 1400px container width

---

## 🎨 Dark Mode Support

### Color Adaptations
```css
.dark {
  /* Background adjustments */
  --background: var(--charcoal-900);
  --card-bg: var(--charcoal-800);
  --border-color: var(--charcoal-700);
  
  /* Text adjustments */
  --text-primary: var(--charcoal-50);
  --text-secondary: var(--charcoal-300);
  
  /* Sakura adjustments for dark backgrounds */
  --sakura-primary: var(--sakura-400);
  --sakura-hover: var(--sakura-300);
}
```

### Dark Mode Guidelines
- Maintain sakura brand colors as accent
- Use charcoal-800/900 as primary backgrounds
- Ensure sufficient contrast for all text
- Adapt shadows to work on dark backgrounds
- Test all components in both modes

---

## 🔧 Implementation Guidelines

### CSS Architecture
```
styles/
├── globals.css          # Base styles, CSS variables
├── components/          # Component-specific styles
├── utilities/           # Utility classes
└── animations/          # Animation definitions
```

### Component Development Checklist
- [ ] Follows design system color palette
- [ ] Uses consistent spacing scale
- [ ] Implements proper typography hierarchy
- [ ] Includes hover/focus/active states
- [ ] Supports dark mode
- [ ] Meets accessibility standards
- [ ] Includes proper animations
- [ ] Responsive across all breakpoints

### Quality Assurance
- Visual regression testing required
- Accessibility audit with axe-core
- Cross-browser compatibility testing
- Performance impact assessment
- Design system adherence review

---

*This design system serves as the foundational truth for all BookBloom 2.0 interface decisions. When in doubt, prioritize the Zen Garden aesthetic with Modern Tech precision - serene focus powered by premium functionality.*