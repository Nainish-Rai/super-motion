# Technical Context

## Technology Stack

### Frontend

- **Framework**: Next.js 14+

  - App Router
  - React Server Components
  - Server Actions
  - Edge Runtime support

- **UI Components**: ShadCN UI

  - Radix UI primitives
  - Tailwind CSS styling
  - Custom theme system
  - Accessible components

- **State Management**
  - TanStack Query v5
  - React Context
  - Zustand (for complex client state)
  - Server state preferences

### Backend

- **Runtime**: Node.js 20+

  - ESM modules
  - Native fetch
  - Web Streams API
  - Enhanced debugging

- **Database**: PostgreSQL 15

  - Prisma ORM
  - Connection pooling
  - Full-text search
  - JSON operations

- **Caching**: Redis 7
  - Classification cache
  - Rate limiting
  - Session storage
  - Pub/Sub events

### APIs & Integration

- **Gmail API**

  - REST API v1
  - Push notifications
  - Watch resources
  - Batch operations

- **OpenAI API**
  - GPT-4 Turbo
  - Embeddings API
  - Fine-tuning capability
  - Streaming responses

### Authentication

- **Better-Auth**
  - OAuth 2.0
  - JWT tokens
  - Secure cookies
  - Role-based access

## Development Environment

### Required Tools

```bash
# Core
node v20.11.0
pnpm v8.15.0
git v2.43.0

# Database
postgresql v15.5
redis v7.2.4

# Development
Visual Studio Code v1.87.0
```

### VS Code Extensions

```json
{
  "recommendations": [
    "dbaeumer.vscode-eslint",
    "esbenp.prettier-vscode",
    "bradlc.vscode-tailwindcss",
    "prisma.prisma",
    "ms-playwright.playwright",
    "github.copilot"
  ]
}
```

### Environment Variables

```bash
# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
NODE_ENV=development

# Database
DATABASE_URL=postgresql://user:pass@localhost:5432/stupid_mails
REDIS_URL=redis://localhost:6379

# Auth
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-here

# Gmail
GMAIL_CLIENT_ID=your-client-id
GMAIL_CLIENT_SECRET=your-client-secret
GMAIL_REDIRECT_URI=http://localhost:3000/api/auth/callback/google

# OpenAI
OPENAI_API_KEY=your-api-key
```

## Development Tools

### Package Management

```json
{
  "packageManager": "pnpm@8.15.0",
  "engines": {
    "node": ">=20.11.0"
  }
}
```

### Code Quality

- **ESLint**: Custom configuration
- **Prettier**: Strict formatting
- **TypeScript**: Strict mode
- **Husky**: Git hooks

### Testing Stack

- **Jest**: Unit testing
- **Testing Library**: Component testing
- **Playwright**: E2E testing
- **MSW**: API mocking

### CI/CD

- **GitHub Actions**: Automated pipeline
- **Vercel**: Deployment platform
- **Docker**: Container builds
- **Railway**: Database hosting

## Technical Constraints

### Performance Targets

- **First Contentful Paint**: < 1.5s
- **Time to Interactive**: < 3.0s
- **Largest Contentful Paint**: < 2.5s
- **Cumulative Layout Shift**: < 0.1

### API Limits

- **Gmail**:

  - 1M queries/day
  - 250 queries/100s/user
  - 25 queries/s/user

- **OpenAI**:
  - Token budget/request
  - Rate limits/minute
  - Cost considerations

### Security Requirements

- **Authentication**:

  - Multi-factor support
  - Session management
  - CSRF protection

- **Data Protection**:
  - Email content encryption
  - Secure credentials
  - Data retention policy

## Monitoring & Logging

### Application Monitoring

- **Sentry**: Error tracking
- **Axiom**: Log aggregation
- **Grafana**: Metrics visualization
- **Prometheus**: Time series data

### Performance Monitoring

- **Web Vitals**:
  - Real user monitoring
  - Core Web Vitals
  - Custom metrics

### Health Checks

- **Endpoints**:
  - /api/health
  - /api/status
  - Database connection
  - Redis connection

## Development Scripts

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "test": "jest",
    "test:e2e": "playwright test",
    "db:push": "prisma db push",
    "db:studio": "prisma studio",
    "postinstall": "prisma generate"
  }
}
```

## Documentation

- API documentation (OpenAPI)
- Component storybook
- Architecture diagrams
- Development guides
