/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'sakura-light': 'var(--sakura-light)',
        'sakura-soft': 'var(--sakura-soft)',
        'sakura-main': 'var(--sakura-main)',
        'sakura-deep': 'var(--sakura-deep)',
        'sakura-dark': 'var(--sakura-dark)',
        'blossom-white': 'var(--blossom-white)',
        'cloud-gray': 'var(--cloud-gray)',
        'branch-brown': 'var(--branch-brown)',
        'leaf-green': 'var(--leaf-green)',
        'sky-blue': 'var(--sky-blue)',
        'text-primary': 'var(--text-primary)',
        'text-secondary': 'var(--text-secondary)',
        'text-muted': 'var(--text-muted)',
      },
      borderRadius: {
        'soft': 'var(--radius-soft)',
        'gentle': 'var(--radius-gentle)',
        'bloom': 'var(--radius-bloom)',
      },
      boxShadow: {
        'petal': 'var(--shadow-petal)',
        'bloom': 'var(--shadow-bloom)',
      },
      animation: {
        'bloom-in': 'bloom-in 0.6s ease-out forwards',
        'petal-fall': 'petal-fall 3s ease-in-out infinite',
        'float-gentle': 'float-gentle 4s ease-in-out infinite',
        'pulse-sakura': 'pulse-sakura 2s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};