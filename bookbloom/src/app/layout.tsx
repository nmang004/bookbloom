import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'BookBloom - AI Book Generator',
  description: 'Transform your story ideas into complete books using AI. Inspired by the natural blooming of cherry blossoms.',
  keywords: ['AI', 'book', 'writing', 'generator', 'stories', 'novels'],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}