import { PrismaClient } from '@prisma/client'

declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined
}

export const prisma = global.prisma || new PrismaClient()

if (process.env.NODE_ENV !== 'production') {
  global.prisma = prisma
}

// Helper functions for common database operations
export const db = {
  // Book operations
  book: {
    create: async (data: {
      title: string
      genre: string
      premise: string
      targetWords: number
      chaptersCount: number
      writingStyle: string
      tone?: string
      pov?: string
    }) => {
      return await prisma.book.create({
        data,
        include: {
          chapters: true,
        },
      })
    },

    findMany: async (options?: {
      skip?: number
      take?: number
      where?: object
      orderBy?: object
    }) => {
      return await prisma.book.findMany({
        ...options,
        include: {
          chapters: {
            orderBy: {
              chapterNumber: 'asc',
            },
          },
        },
      })
    },

    findUnique: async (id: string) => {
      return await prisma.book.findUnique({
        where: { id },
        include: {
          chapters: {
            orderBy: {
              chapterNumber: 'asc',
            },
          },
        },
      })
    },

    update: async (id: string, data: object) => {
      return await prisma.book.update({
        where: { id },
        data,
        include: {
          chapters: true,
        },
      })
    },

    delete: async (id: string) => {
      return await prisma.book.delete({
        where: { id },
      })
    },

    updateStatus: async (id: string, status: string) => {
      return await prisma.book.update({
        where: { id },
        data: { status },
      })
    },
  },

  // Chapter operations
  chapter: {
    create: async (data: {
      bookId: string
      chapterNumber: number
      title: string
      summary: string
      targetWords: number
    }) => {
      return await prisma.chapter.create({
        data,
      })
    },

    createMany: async (chapters: Array<{
      bookId: string
      chapterNumber: number
      title: string
      summary: string
      targetWords: number
    }>) => {
      return await prisma.chapter.createMany({
        data: chapters,
      })
    },

    update: async (id: string, data: object) => {
      return await prisma.chapter.update({
        where: { id },
        data,
      })
    },

    updateContent: async (id: string, content: string, wordCount: number) => {
      return await prisma.chapter.update({
        where: { id },
        data: {
          generatedContent: content,
          wordCount,
          status: 'completed',
        },
      })
    },

    delete: async (id: string) => {
      return await prisma.chapter.delete({
        where: { id },
      })
    },

    findMany: async (bookId: string) => {
      return await prisma.chapter.findMany({
        where: { bookId },
        orderBy: {
          chapterNumber: 'asc',
        },
      })
    },
  },

  // Utility functions
  stats: {
    getBookStats: async () => {
      const [totalBooks, completedBooks, inProgressBooks, totalWords] = await Promise.all([
        prisma.book.count(),
        prisma.book.count({ where: { status: 'completed' } }),
        prisma.book.count({ where: { status: 'generating' } }),
        prisma.chapter.aggregate({
          _sum: {
            wordCount: true,
          },
        }),
      ])

      return {
        totalBooks,
        completedBooks,
        booksInProgress: inProgressBooks,
        totalWordsGenerated: totalWords._sum.wordCount || 0,
      }
    },
  },
}