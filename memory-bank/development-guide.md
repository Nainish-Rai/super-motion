# Development Guide

## Prerequisites

- Node.js 18+
- PostgreSQL 15+
- Gmail API credentials
- OpenAI API key

## Project Setup

1. **Clone and Install Dependencies**

```bash
git clone [repository-url]
cd stupid-mails
npm install
```

2. **Environment Configuration**
   Create a `.env` file in the root directory:

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/stupid_mails"

# Authentication
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-here"

# Gmail API
GMAIL_CLIENT_ID="your-client-id"
GMAIL_CLIENT_SECRET="your-client-secret"

# OpenAI
OPENAI_API_KEY="your-openai-key"
```

3. **Database Setup**

```bash
npx prisma generate
npx prisma db push
```

4. **Start Development Server**

```bash
npm run dev
```

## Development Workflow

### 1. Branch Strategy

- `main`: Production-ready code
- `develop`: Integration branch
- Feature branches: `feature/[feature-name]`
- Bug fixes: `fix/[bug-description]`

### 2. Commit Convention

```
type(scope): description

[optional body]

[optional footer]
```

Types:

- feat: New feature
- fix: Bug fix
- docs: Documentation
- style: Formatting
- refactor: Code restructuring
- test: Adding tests
- chore: Maintenance

### 3. Code Style

- Use TypeScript strict mode
- Follow ESLint configuration
- Use Prettier for formatting
- Write JSDoc comments for complex functions

### 4. Testing

```bash
# Run all tests
npm test

# Run specific test file
npm test -- [file-name]

# Run tests in watch mode
npm test -- --watch
```

### 5. Building for Production

```bash
npm run build
npm start
```

## API Integration Guidelines

### Gmail API

- Use OAuth 2.0 for authentication
- Implement retry logic for failed requests
- Cache API responses when appropriate
- Monitor rate limits

### OpenAI API

- Implement fallback options for API failures
- Cache common classification results
- Monitor token usage
- Implement cost controls

## Deployment Pipeline

1. **Code Quality Checks**

   - Linting
   - Type checking
   - Unit tests
   - Integration tests

2. **Staging Deployment**

   - Automated deployment to staging
   - E2E tests
   - Performance testing

3. **Production Deployment**
   - Manual approval required
   - Zero-downtime deployment
   - Database migrations
   - Post-deployment health checks

## Monitoring and Debug

### Logging Levels

- ERROR: Application errors
- WARN: Potential issues
- INFO: Important operations
- DEBUG: Detailed debugging

### Performance Monitoring

- API response times
- Database query performance
- Memory usage
- Error rates

### Debug Tools

- Chrome DevTools
- React DevTools
- Network inspection
- Database monitoring
