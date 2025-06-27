import { ExportJob } from '@/types/export'

export class ExportProgressTracker {
  private static progressStore = new Map<string, ExportJob>()
  private static progressCallbacks = new Map<string, Set<(job: ExportJob) => void>>()

  /**
   * Start tracking an export job
   */
  static startTracking(jobId: string, initialJob: ExportJob): void {
    this.progressStore.set(jobId, initialJob)
    this.notifyCallbacks(jobId, initialJob)
  }

  /**
   * Update job progress
   */
  static updateProgress(jobId: string, progress: number, status?: ExportJob['status']): void {
    const job = this.progressStore.get(jobId)
    if (!job) return

    const updatedJob: ExportJob = {
      ...job,
      progress,
      status: status || job.status
    }

    this.progressStore.set(jobId, updatedJob)
    this.notifyCallbacks(jobId, updatedJob)
  }

  /**
   * Complete an export job
   */
  static completeJob(jobId: string, downloadUrl: string, expiresAt?: Date): void {
    const job = this.progressStore.get(jobId)
    if (!job) return

    const completedJob: ExportJob = {
      ...job,
      status: 'completed',
      progress: 100,
      downloadUrl,
      expiresAt: expiresAt || new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
    }

    this.progressStore.set(jobId, completedJob)
    this.notifyCallbacks(jobId, completedJob)
  }

  /**
   * Mark job as failed
   */
  static failJob(jobId: string, error: string): void {
    const job = this.progressStore.get(jobId)
    if (!job) return

    const failedJob: ExportJob = {
      ...job,
      status: 'failed',
      error
    }

    this.progressStore.set(jobId, failedJob)
    this.notifyCallbacks(jobId, failedJob)
  }

  /**
   * Get current job status
   */
  static getJob(jobId: string): ExportJob | undefined {
    return this.progressStore.get(jobId)
  }

  /**
   * Subscribe to job progress updates
   */
  static subscribe(jobId: string, callback: (job: ExportJob) => void): () => void {
    if (!this.progressCallbacks.has(jobId)) {
      this.progressCallbacks.set(jobId, new Set())
    }
    
    this.progressCallbacks.get(jobId)!.add(callback)

    // Return unsubscribe function
    return () => {
      const callbacks = this.progressCallbacks.get(jobId)
      if (callbacks) {
        callbacks.delete(callback)
        if (callbacks.size === 0) {
          this.progressCallbacks.delete(jobId)
        }
      }
    }
  }

  /**
   * Notify all callbacks for a job
   */
  private static notifyCallbacks(jobId: string, job: ExportJob): void {
    const callbacks = this.progressCallbacks.get(jobId)
    if (callbacks) {
      callbacks.forEach(callback => callback(job))
    }
  }

  /**
   * Clean up old completed jobs
   */
  static cleanup(): void {
    const now = new Date()
    const jobsToDelete: string[] = []

    this.progressStore.forEach((job, jobId) => {
      if (job.expiresAt && job.expiresAt < now) {
        jobsToDelete.push(jobId)
      }
    })

    jobsToDelete.forEach(jobId => {
      this.progressStore.delete(jobId)
      this.progressCallbacks.delete(jobId)
    })
  }

  /**
   * Simulate progress updates for demo purposes
   */
  static simulateProgress(jobId: string, totalDuration: number = 5000): void {
    const job = this.getJob(jobId)
    if (!job || job.status !== 'processing') return

    const updateInterval = 200 // Update every 200ms
    const totalUpdates = totalDuration / updateInterval
    let currentUpdate = 0

    const interval = setInterval(() => {
      currentUpdate++
      const progress = Math.min((currentUpdate / totalUpdates) * 100, 100)

      if (progress >= 100) {
        clearInterval(interval)
        this.completeJob(
          jobId,
          `/exports/${jobId}.${job.format.toLowerCase()}`,
          new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
        )
      } else {
        this.updateProgress(jobId, progress)
      }
    }, updateInterval)
  }

  /**
   * Get all jobs for a book
   */
  static getJobsForBook(bookId: string): ExportJob[] {
    const jobs: ExportJob[] = []
    this.progressStore.forEach(job => {
      if (job.bookId === bookId) {
        jobs.push(job)
      }
    })
    return jobs.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
  }
}