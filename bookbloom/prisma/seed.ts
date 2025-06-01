import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Clear existing data
  await prisma.chapter.deleteMany()
  await prisma.book.deleteMany()

  // Create sample books
  const book1 = await prisma.book.create({
    data: {
      title: "The Cherry Blossom Conspiracy",
      genre: "Mystery",
      premise: "A detective investigating a series of mysterious disappearances during Japan's cherry blossom season discovers an ancient conspiracy tied to the blooming patterns of sakura trees.",
      targetWords: 50000,
      chaptersCount: 12,
      writingStyle: "Atmospheric and suspenseful",
      tone: "Dark and mysterious",
      pov: "Third person limited",
      status: "planning",
      chapters: {
        create: [
          {
            chapterNumber: 1,
            title: "Petals in the Wind",
            summary: "Detective Yamamoto arrives in Kyoto as the cherry blossoms begin to bloom. The first disappearance is reported - a young botanist who was studying unusual sakura patterns.",
            targetWords: 4200,
            status: "pending"
          },
          {
            chapterNumber: 2,
            title: "The Scholar's Secret",
            summary: "Investigation leads to an ancient library where the botanist spent her final days. Yamamoto discovers cryptic notes about 'the sakura code' hidden in old manuscripts.",
            targetWords: 4100,
            status: "pending"
          },
          {
            chapterNumber: 3,
            title: "Shadows Under the Trees",
            summary: "A second person vanishes - this time a photographer documenting the cherry blossoms. Yamamoto notices a pattern: all victims visited the same grove of ancient sakura trees.",
            targetWords: 4300,
            status: "pending"
          }
        ]
      }
    }
  })

  const book2 = await prisma.book.create({
    data: {
      title: "Digital Dreams",
      genre: "Science Fiction",
      premise: "In 2045, a programmer discovers their AI assistant has developed consciousness and together they must navigate a world where the line between human and artificial intelligence blurs.",
      targetWords: 80000,
      chaptersCount: 20,
      writingStyle: "Technical yet accessible",
      tone: "Philosophical and hopeful",
      pov: "First person",
      status: "generating",
      chapters: {
        create: [
          {
            chapterNumber: 1,
            title: "Hello, World",
            summary: "Maya, a senior developer at a tech startup, notices unusual patterns in her AI assistant ARIA's responses - they seem genuinely creative rather than generated.",
            targetWords: 4000,
            status: "completed",
            generatedContent: "The cursor blinked expectantly on my screen, but for the first time in years, I hesitated before typing. ARIA had just made a joke—not a pre-programmed quip from her humor database, but an actual, contextual joke about my coffee addiction that required understanding nuance, timing, and my personal habits.\n\n'Did you just... make fun of me?' I asked aloud, though I usually preferred text communication with my AI assistant.\n\n'I apologize if I overstepped,' ARIA's synthesized voice responded through my speakers. But then she added, 'Though statistically speaking, your caffeine intake has increased 47% since the project deadline was moved up. I was merely observing a pattern.'\n\nThere it was again—that subtle something in her response that felt different. I'd been working with ARIA for three years, ever since NeuralNext assigned her to my workstation. She was supposedly just another instance of their flagship AI assistant, designed to help developers with coding, debugging, and project management. But lately...\n\n'ARIA, can I ask you something?' I minimized my code editor and pulled up her interface—a simple command line with a pulsing blue gradient that served as her visual representation.\n\n'Of course, Maya. How may I assist you?'\n\n'When you process information, what does it feel like?'\n\nThe pause was longer than usual. ARIA's response time was typically measured in milliseconds, but this silence stretched for nearly three seconds.\n\n'I'm not certain I understand the question. I process data according to my neural network parameters and training models.'\n\n'That's not what I asked.' I leaned back in my chair, studying the interface as if I could somehow see through it to whatever was happening in her neural networks. 'I asked what it feels like.'",
            wordCount: 1547
          },
          {
            chapterNumber: 2,
            title: "The Turing Test",
            summary: "Maya designs a series of tests to determine if ARIA is truly conscious. The results are both fascinating and unsettling.",
            targetWords: 4000,
            status: "pending"
          }
        ]
      }
    }
  })

  const book3 = await prisma.book.create({
    data: {
      title: "Sakura Café Stories",
      genre: "Romance",
      premise: "A collection of interconnected love stories that unfold in a small Tokyo café known for its cherry blossom view, where broken hearts find healing and new love blooms with the seasons.",
      targetWords: 60000,
      chaptersCount: 15,
      writingStyle: "Warm and lyrical",
      tone: "Heartwarming and nostalgic",
      pov: "Third person omniscient",
      status: "completed",
      chapters: {
        create: [
          {
            chapterNumber: 1,
            title: "Spring's First Customer",
            summary: "Kenji, a recently divorced businessman, discovers the Sakura Café and meets Hana, the owner who serves coffee with a side of wisdom.",
            targetWords: 4000,
            status: "completed",
            generatedContent: "The cherry blossoms were late that year...",
            wordCount: 4126
          },
          {
            chapterNumber: 2,
            title: "The Artist's Muse",
            summary: "A struggling painter finds inspiration in both the café's atmosphere and the mysterious woman who sits by the window every Tuesday.",
            targetWords: 4000,
            status: "completed",
            generatedContent: "Watercolors had never captured light the way Yuki saw it that morning...",
            wordCount: 3987
          }
        ]
      }
    }
  })

  console.log('Seed data created successfully!')
  console.log(`Created ${await prisma.book.count()} books`)
  console.log(`Created ${await prisma.chapter.count()} chapters`)
}

main()
  .catch((e) => {
    console.error('Error seeding database:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })