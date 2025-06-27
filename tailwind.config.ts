import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: ["class"],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        // Custom Sakura color palette
        sakura: {
          50: '#fef2f4',
          100: '#fce8ec',
          200: '#f9c9d4',
          300: '#f4a3b5',
          400: '#ec6f8e',
          500: '#e14372',
          600: '#c92d5d',
          700: '#a6234c',
          800: '#882041',
          900: '#721e3a',
          950: '#451019',
        },
        charcoal: {
          50: '#f7f7f8',
          100: '#eeeff1',
          200: '#d9dce1',
          300: '#b8bec7',
          400: '#919aa6',
          500: '#747e8b',
          600: '#5c6570',
          700: '#4b535c',
          800: '#40454d',
          900: '#383c42',
          950: '#25282c',
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "fade-out": {
          "0%": { opacity: "1" },
          "100%": { opacity: "0" },
        },
        "slide-in": {
          "0%": { transform: "translateY(10px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        "bloom": {
          "0%": { transform: "scale(0.8)", opacity: "0" },
          "50%": { transform: "scale(1.05)" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
        "sakura-fall": {
          "0%": { transform: "translateY(-10px) rotate(0deg)", opacity: "0" },
          "10%": { opacity: "1" },
          "100%": { transform: "translateY(100vh) rotate(360deg)", opacity: "0" },
        },
        "gentle-sway": {
          "0%, 100%": { transform: "rotate(-2deg)" },
          "50%": { transform: "rotate(2deg)" },
        },
        "leaves-rustle": {
          "0%, 100%": { transform: "translateY(0px) rotate(0deg)" },
          "25%": { transform: "translateY(-2px) rotate(1deg)" },
          "75%": { transform: "translateY(2px) rotate(-1deg)" },
        },
        "pre-bloom": {
          "0%, 100%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.05)" },
        },
        "bloom-pulse": {
          "0%, 100%": { 
            transform: "scale(1)",
            filter: "drop-shadow(0 0 8px rgba(225, 67, 114, 0.3))",
          },
          "50%": { 
            transform: "scale(1.1)",
            filter: "drop-shadow(0 0 12px rgba(225, 67, 114, 0.5))",
          },
        },
        "float": {
          "0%, 100%": { transform: "translateY(0px) rotate(0deg)" },
          "50%": { transform: "translateY(-10px) rotate(5deg)" },
        },
        "shimmer": {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(100%)" },
        },
        "gentle-bloom": {
          "0%, 100%": { transform: "scale(1)", filter: "brightness(1)" },
          "50%": { transform: "scale(1.03)", filter: "brightness(1.1)" },
        },
        "peaceful-bloom": {
          "0%": { opacity: "0", transform: "translateY(10px) scale(0.95)" },
          "100%": { opacity: "1", transform: "translateY(0) scale(1)" },
        },
        "growth": {
          "0%": { transform: "scale(0.9)", opacity: "0.7" },
          "50%": { transform: "scale(1.02)" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
        "bloom-celebration": {
          "0%": { transform: "scale(1)", filter: "drop-shadow(0 0 8px rgba(225, 67, 114, 0.3))" },
          "25%": { transform: "scale(1.1)", filter: "drop-shadow(0 0 16px rgba(225, 67, 114, 0.5))" },
          "50%": { transform: "scale(1.05)", filter: "drop-shadow(0 0 20px rgba(225, 67, 114, 0.7))" },
          "75%": { transform: "scale(1.1)", filter: "drop-shadow(0 0 16px rgba(225, 67, 114, 0.5))" },
          "100%": { transform: "scale(1)", filter: "drop-shadow(0 0 8px rgba(225, 67, 114, 0.3))" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fade-in 0.5s ease-out",
        "fade-out": "fade-out 0.5s ease-out",
        "slide-in": "slide-in 0.3s ease-out",
        "bloom": "bloom 0.6s ease-out",
        "sakura-fall": "sakura-fall 8s linear infinite",
        "gentle-sway": "gentle-sway 3s ease-in-out infinite",
        "leaves-rustle": "leaves-rustle 4s ease-in-out infinite",
        "pre-bloom": "pre-bloom 2s ease-in-out infinite",
        "bloom-pulse": "bloom-pulse 2.5s ease-in-out infinite",
        "float": "float 6s ease-in-out infinite",
        "shimmer": "shimmer 2s infinite",
        "gentle-bloom": "gentle-bloom 3s ease-in-out infinite",
        "peaceful-bloom": "peaceful-bloom 1.2s ease-out forwards",
        "growth": "growth 2s ease-in-out infinite",
        "bloom-celebration": "bloom-celebration 3s ease-in-out infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")],
}
export default config