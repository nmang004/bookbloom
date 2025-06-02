# 📡 BookBloom API Documentation

## Overview

BookBloom provides a RESTful API built with Next.js App Router for managing books, chapters, and statistics. All endpoints follow REST conventions and return JSON responses.

## Base URL

```
Local Development: http://localhost:3000/api
Production: https://bookbloom.netlify.app/api
```

## Authentication

Currently, the API does not require authentication. This will be added in future versions.

## Response Format

All API responses follow this format:

### Success Response
```json
{
  "data": {...},
  "status": "success"
}
```

### Error Response
```json
{
  "error": "Error message",
  "status": "error"
}
```

## HTTP Status Codes

- `200` - Success
- `201` - Created
- `400` - Bad Request
- `404` - Not Found
- `500` - Internal Server Error

---

## 📚 Books API

### List All Books

**GET** `/api/books`

Returns a list of all books with their chapters.

#### Response
```json
[
  {
    "id": "clxxx",
    "title": "The Crystal Chronicles",
    "genre": "fantasy",
    "premise": "A young mage discovers ancient crystals...",
    "targetWords": 75000,
    "chaptersCount": 15,
    "writingStyle": "literary",
    "tone": "dramatic",
    "pov": "third-person-limited",
    "status": "generating",
    "createdAt": "2024-01-15T00:00:00.000Z",
    "updatedAt": "2024-01-15T00:00:00.000Z",
    "chapters": [
      {
        "id": "chxxx",
        "chapterNumber": 1,
        "title": "The Discovery",
        "summary": "Young Aria finds the first crystal...",
        "targetWords": 5000,
        "generatedContent": "Chapter content here...",
        "wordCount": 4987,
        "status": "completed",
        "createdAt": "2024-01-15T00:00:00.000Z",
        "updatedAt": "2024-01-15T00:00:00.000Z"
      }
    ]
  }
]
```

### Create New Book

**POST** `/api/books`

Creates a new book with the provided data.

#### Request Body
```json
{
  "title": "My New Book",
  "genre": "fantasy",
  "premise": "A story about magical adventures",
  "targetWords": 80000,
  "chaptersCount": 16,
  "writingStyle": "narrative",
  "tone": "adventurous",
  "pov": "first-person"
}
```

#### Response
```json
{
  "id": "clxxx",
  "title": "My New Book",
  "genre": "fantasy",
  "premise": "A story about magical adventures",
  "targetWords": 80000,
  "chaptersCount": 16,
  "writingStyle": "narrative",
  "tone": "adventurous",
  "pov": "first-person",
  "status": "planning",
  "createdAt": "2024-01-15T00:00:00.000Z",
  "updatedAt": "2024-01-15T00:00:00.000Z",
  "chapters": []
}
```

### Get Specific Book

**GET** `/api/books/[id]`

Returns a specific book by ID with all its chapters.

#### URL Parameters
- `id` (string, required) - The unique book identifier

#### Response
```json
{
  "id": "clxxx",
  "title": "The Crystal Chronicles",
  "genre": "fantasy",
  "premise": "A young mage discovers ancient crystals...",
  "targetWords": 75000,
  "chaptersCount": 15,
  "writingStyle": "literary",
  "tone": "dramatic",
  "pov": "third-person-limited",
  "status": "generating",
  "createdAt": "2024-01-15T00:00:00.000Z",
  "updatedAt": "2024-01-15T00:00:00.000Z",
  "chapters": [...]
}
```

### Update Book

**PUT** `/api/books/[id]`

Updates an existing book. Only provided fields will be updated.

#### URL Parameters
- `id` (string, required) - The unique book identifier

#### Request Body
```json
{
  "title": "Updated Book Title",
  "status": "completed"
}
```

#### Response
```json
{
  "id": "clxxx",
  "title": "Updated Book Title",
  "genre": "fantasy",
  "premise": "A young mage discovers ancient crystals...",
  "targetWords": 75000,
  "chaptersCount": 15,
  "writingStyle": "literary",
  "tone": "dramatic",
  "pov": "third-person-limited",
  "status": "completed",
  "createdAt": "2024-01-15T00:00:00.000Z",
  "updatedAt": "2024-01-15T12:00:00.000Z",
  "chapters": [...]
}
```

### Delete Book

**DELETE** `/api/books/[id]`

Deletes a book and all its associated chapters.

#### URL Parameters
- `id` (string, required) - The unique book identifier

#### Response
```json
{
  "success": true
}
```

---

## 📊 Statistics API

### Get Dashboard Statistics

**GET** `/api/stats`

Returns aggregated statistics for the dashboard.

#### Response
```json
{
  "totalBooks": 4,
  "completedBooks": 1,
  "booksInProgress": 2,
  "totalWordsGenerated": 131500
}
```

---

## 🔍 Error Handling

### Common Error Responses

#### Book Not Found (404)
```json
{
  "error": "Book not found",
  "status": "error"
}
```

#### Validation Error (400)
```json
{
  "error": "Validation failed: Title is required",
  "status": "error"
}
```

#### Server Error (500)
```json
{
  "error": "Internal server error",
  "status": "error"
}
```

---

## 📝 Data Models

### Book Model
```typescript
interface Book {
  id: string
  title: string
  genre: string
  premise: string
  targetWords: number
  chaptersCount: number
  writingStyle: string
  tone: string
  pov: string
  status: 'planning' | 'generating' | 'completed' | 'paused'
  createdAt: Date
  updatedAt: Date
  chapters?: Chapter[]
}
```

### Chapter Model
```typescript
interface Chapter {
  id: string
  bookId: string
  chapterNumber: number
  title: string
  summary: string
  targetWords: number
  generatedContent?: string
  wordCount: number
  status: 'pending' | 'generating' | 'completed' | 'error'
  createdAt: Date
  updatedAt: Date
}
```

### Book Statistics Model
```typescript
interface BookStats {
  totalBooks: number
  completedBooks: number
  booksInProgress: number
  totalWordsGenerated: number
}
```

---

## 🚀 Future Endpoints

The following endpoints are planned for future releases:

### Chapters API
```
GET    /api/chapters/[id]       // Get specific chapter
PUT    /api/chapters/[id]       // Update chapter
POST   /api/chapters/[id]/generate  // Generate chapter content
```

### AI Generation API
```
POST   /api/books/[id]/generate     // Start book generation
GET    /api/books/[id]/progress     // Check generation progress
POST   /api/books/[id]/stop         // Stop generation
```

### Export API
```
GET    /api/books/[id]/export/pdf   // Export as PDF
GET    /api/books/[id]/export/docx  // Export as DOCX
GET    /api/books/[id]/export/txt   // Export as plain text
```

### User Management (Future)
```
POST   /api/auth/login             // User login
POST   /api/auth/register          // User registration
GET    /api/auth/profile           // Get user profile
PUT    /api/auth/profile           // Update user profile
```

---

## 🧪 Testing the API

### Using cURL

#### List all books
```bash
curl -X GET http://localhost:3000/api/books
```

#### Create a new book
```bash
curl -X POST http://localhost:3000/api/books \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Test Book",
    "genre": "fantasy",
    "premise": "A test story",
    "targetWords": 50000,
    "chaptersCount": 10,
    "writingStyle": "narrative",
    "tone": "adventurous",
    "pov": "third-person"
  }'
```

#### Get specific book
```bash
curl -X GET http://localhost:3000/api/books/[book-id]
```

#### Update a book
```bash
curl -X PUT http://localhost:3000/api/books/[book-id] \
  -H "Content-Type: application/json" \
  -d '{
    "status": "completed"
  }'
```

#### Delete a book
```bash
curl -X DELETE http://localhost:3000/api/books/[book-id]
```

### Using JavaScript Fetch

```javascript
// List all books
const books = await fetch('/api/books').then(res => res.json())

// Create new book
const newBook = await fetch('/api/books', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    title: 'My New Book',
    genre: 'romance',
    premise: 'A love story',
    targetWords: 60000,
    chaptersCount: 12,
    writingStyle: 'conversational',
    tone: 'romantic',
    pov: 'first-person'
  })
}).then(res => res.json())

// Get statistics
const stats = await fetch('/api/stats').then(res => res.json())
```

---

## 🔧 Rate Limiting

Currently, there are no rate limits on the API. Rate limiting will be implemented in future versions to ensure fair usage and system stability.

## 📋 Changelog

### v1.0.0
- Initial API implementation
- Books CRUD operations
- Statistics endpoint
- Basic error handling

### Future Versions
- Authentication and authorization
- Rate limiting
- Chapter management endpoints
- AI generation endpoints
- Export functionality
- Webhook support