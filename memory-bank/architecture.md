# System Architecture

## Overview

The system is built as a modern web application using Next.js with the following key components:

### Frontend Layer

- **Framework**: Next.js with App Router
- **UI Components**: ShadCN component library
- **Styling**: Tailwind CSS
- **State Management**: React Query for server state
- **Authentication**: Better-Auth for OAuth flows

### Backend Layer

- **Database**: PostgreSQL with Prisma ORM
- **API Integration**:
  - Gmail API for email operations
  - OpenAI API for email classification

## Data Flow

1. User authenticates via Gmail OAuth
2. System fetches emails through Gmail API
3. Emails are processed by GPT-4 for classification
4. Classifications are stored in PostgreSQL
5. Labels are applied back to Gmail via API
6. User interface updates to reflect changes

## Database Schema (Draft)

```prisma
model User {
  id            String   @id @default(cuid())
  email         String   @unique
  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt
  preferences   Json?    // Store classification preferences
  emailRules    Rule[]
}

model Rule {
  id          String   @id @default(cuid())
  userId      String
  name        String
  description String?
  criteria    Json     // Store rule matching criteria
  action      String   // e.g., "label", "archive", "prioritize"
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  user        User     @relation(fields: [userId], references: [id])
}

model EmailClassification {
  id        String   @id @default(cuid())
  emailId   String   // Gmail message ID
  userId    String
  category  String
  priority  Int      // 1-5 scale
  createdAt DateTime @default(now())
  metadata  Json?    // Additional classification data
}
```

## Security Considerations

1. OAuth 2.0 for secure Gmail access
2. Environment-based API key management
3. Rate limiting for API endpoints
4. Data encryption at rest
5. Regular security audits

## Performance Optimizations

1. Batch processing for email classification
2. Caching of classification results
3. Incremental static regeneration for dashboard
4. Background jobs for heavy processing
5. Connection pooling for database operations

## Monitoring and Logging

1. Error tracking
2. Performance metrics
3. API usage monitoring
4. User action logging
5. System health checks
