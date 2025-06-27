interface StructuredDataProps {
  type: 'website' | 'product' | 'faq' | 'howto'
  data: any
}

export function StructuredData({ type, data }: StructuredDataProps) {
  const getSchema = () => {
    switch (type) {
      case 'website':
        return {
          "@context": "https://schema.org",
          "@type": "WebSite",
          "name": "BookBloom 2.0",
          "description": "AI-powered book writing platform that transforms ideas into manuscripts",
          "url": "https://bookbloom.app",
          "potentialAction": {
            "@type": "SearchAction",
            "target": "https://bookbloom.app/search?q={search_term_string}",
            "query-input": "required name=search_term_string"
          }
        }
      
      case 'product':
        return {
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          "name": "BookBloom 2.0",
          "description": "AI-powered book writing platform with features for outline generation, character development, and manuscript creation",
          "applicationCategory": "WritingApplication",
          "operatingSystem": "Web Browser",
          "offers": [
            {
              "@type": "Offer",
              "name": "Free Plan",
              "price": "0",
              "priceCurrency": "USD",
              "description": "1 book project, 50 AI requests per month"
            },
            {
              "@type": "Offer",
              "name": "Garden Plan",
              "price": "12",
              "priceCurrency": "USD",
              "priceSpecification": {
                "@type": "UnitPriceSpecification",
                "price": "12.00",
                "priceCurrency": "USD",
                "unitText": "MONTH"
              },
              "description": "5 book projects, 500 AI requests per month"
            }
          ],
          "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "4.9",
            "reviewCount": "500"
          },
          "featureList": [
            "AI-powered writing assistance",
            "Character development tools", 
            "World building features",
            "Professional export formats",
            "Plot consistency checking"
          ]
        }

      case 'faq':
        return {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": data.map((faq: any) => ({
            "@type": "Question",
            "name": faq.question,
            "acceptedAnswer": {
              "@type": "Answer",
              "text": faq.answer
            }
          }))
        }

      case 'howto':
        return {
          "@context": "https://schema.org",
          "@type": "HowTo",
          "name": "How to Write a Book with BookBloom",
          "description": "Step-by-step guide to creating a book using AI-powered writing assistance",
          "image": "https://bookbloom.app/images/how-it-works.jpg",
          "totalTime": "P3M", // 3 months average
          "estimatedCost": {
            "@type": "MonetaryAmount",
            "currency": "USD",
            "value": "0"
          },
          "supply": [
            {
              "@type": "HowToSupply",
              "name": "Story idea"
            },
            {
              "@type": "HowToSupply", 
              "name": "BookBloom account"
            }
          ],
          "step": [
            {
              "@type": "HowToStep",
              "name": "Plant Your Seed",
              "text": "Input your story idea and let AI expand it into a compelling synopsis",
              "image": "https://bookbloom.app/images/step-1.jpg"
            },
            {
              "@type": "HowToStep",
              "name": "AI Enhancement",
              "text": "Our intelligent system enriches your idea with plot structures and frameworks",
              "image": "https://bookbloom.app/images/step-2.jpg"
            },
            {
              "@type": "HowToStep",
              "name": "Build Your World",
              "text": "Develop characters, settings, and world-building elements",
              "image": "https://bookbloom.app/images/step-3.jpg"
            },
            {
              "@type": "HowToStep",
              "name": "Write Together",
              "text": "Collaborate with AI to write and refine your manuscript",
              "image": "https://bookbloom.app/images/step-4.jpg"
            },
            {
              "@type": "HowToStep",
              "name": "Harvest Your Book",
              "text": "Export your completed manuscript in professional formats",
              "image": "https://bookbloom.app/images/step-5.jpg"
            }
          ]
        }

      default:
        return null
    }
  }

  const schema = getSchema()
  
  if (!schema) return null

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}