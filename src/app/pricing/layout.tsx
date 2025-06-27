import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Pricing - BookBloom 2.0 | AI Writing Plans & Features',
  description: 'Choose the perfect BookBloom plan for your writing journey. From free to professional - find the right AI-powered writing assistance for your needs.',
  keywords: ['BookBloom pricing', 'AI writing plans', 'writing software cost', 'book creation pricing', 'writing assistant plans'],
  openGraph: {
    title: 'Pricing - BookBloom 2.0',
    description: 'Choose the perfect plan for your writing journey',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Pricing - BookBloom 2.0',
    description: 'From seedling to forest - find your perfect plan',
  },
}

export default function PricingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}