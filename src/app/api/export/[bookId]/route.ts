import { NextRequest, NextResponse } from 'next/server'
import { ExportRequest, ExportJob } from '@/types/export'

// Mock export processing - in production this would be a background job
const processExport = async (request: ExportRequest): Promise<ExportJob> => {
  // Simulate processing time
  await new Promise(resolve => setTimeout(resolve, 2000))
  
  return {
    id: Date.now().toString(),
    bookId: request.bookId,
    format: request.format,
    status: 'completed',
    progress: 100,
    downloadUrl: `/exports/${request.bookId}-${request.format.toLowerCase()}-${Date.now()}.${getFileExtension(request.format)}`,
    expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
    createdAt: new Date()
  }
}

const getFileExtension = (format: string): string => {
  switch (format) {
    case 'PDF': return 'pdf'
    case 'DOCX': return 'docx' 
    case 'TXT': return 'txt'
    default: return 'pdf'
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: { bookId: string } }
) {
  try {
    const { bookId } = params
    const exportRequest: ExportRequest = await request.json()
    
    // Validate request
    if (!exportRequest.format || !exportRequest.chapters?.length) {
      return NextResponse.json(
        { error: 'Invalid export request. Format and chapters are required.' },
        { status: 400 }
      )
    }
    
    // In production, this would queue a background job
    const exportJob = await processExport(exportRequest)
    
    return NextResponse.json(exportJob, { status: 201 })
  } catch (error) {
    console.error('Export creation failed:', error)
    return NextResponse.json(
      { error: 'Failed to create export' },
      { status: 500 }
    )
  }
}

export async function GET(
  request: NextRequest,
  { params }: { params: { bookId: string } }
) {
  try {
    const { bookId } = params
    
    // Mock export history - in production this would fetch from database
    const exportJobs: ExportJob[] = [
      {
        id: '1',
        bookId,
        format: 'PDF',
        status: 'completed',
        progress: 100,
        downloadUrl: `/exports/${bookId}-pdf-sample.pdf`,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000)
      },
      {
        id: '2',
        bookId,
        format: 'DOCX',
        status: 'processing',
        progress: 65,
        createdAt: new Date(Date.now() - 5 * 60 * 1000)
      }
    ]
    
    return NextResponse.json(exportJobs)
  } catch (error) {
    console.error('Failed to fetch export history:', error)
    return NextResponse.json(
      { error: 'Failed to fetch export history' },
      { status: 500 }
    )
  }
}