# API Integration Documentation

## Gmail API Integration

### Authentication Flow

1. **OAuth 2.0 Setup**
   - Scopes required:
     ```
     https://www.googleapis.com/auth/gmail.modify
     https://www.googleapis.com/auth/gmail.labels
     https://www.googleapis.com/auth/gmail.readonly
     ```
   - Redirect URI: `http://localhost:3000/api/auth/callback/google`

### Email Operations

#### 1. Fetching Emails

```typescript
interface EmailFetchOptions {
  maxResults?: number;
  pageToken?: string;
  labelIds?: string[];
  q?: string;
}

interface EmailMetadata {
  id: string;
  threadId: string;
  labelIds: string[];
  snippet: string;
  internalDate: string;
}
```

#### 2. Label Management

```typescript
interface Label {
  id: string;
  name: string;
  type: "system" | "user";
  messageListVisibility: "show" | "hide";
  labelListVisibility: "labelShow" | "labelHide" | "labelShowIfUnread";
}

interface CreateLabelRequest {
  name: string;
  messageListVisibility?: "show" | "hide";
  labelListVisibility?: "labelShow" | "labelHide" | "labelShowIfUnread";
}
```

#### 3. Email Modification

```typescript
interface ModifyMessageRequest {
  addLabelIds?: string[];
  removeLabelIds?: string[];
}
```

### Rate Limits

- Queries per day: 1,000,000
- Queries per 100 seconds per user: 250
- Queries per second per user: 25

## OpenAI API Integration

### Email Classification

#### 1. Prompt Template

```typescript
interface EmailContext {
  subject: string;
  sender: string;
  snippet: string;
  date: string;
}

const BASE_PROMPT = `
Analyze the following email and categorize it based on:
1. Priority (1-5)
2. Category (Work, Personal, Finance, Shopping, Newsletter, Social)
3. Action Required (Urgent Action, Response Needed, For Review, No Action)

Email Details:
Subject: {{subject}}
From: {{sender}}
Date: {{date}}
Preview: {{snippet}}

Provide response in JSON format:
{
  "priority": number,
  "category": string,
  "action": string,
  "reasoning": string
}
`;
```

#### 2. Model Configuration

```typescript
interface GPTConfig {
  model: "gpt-4-turbo-preview";
  temperature: 0.3;
  max_tokens: 150;
  presence_penalty: 0;
  frequency_penalty: 0;
}
```

#### 3. Classification Schema

```typescript
interface Classification {
  priority: 1 | 2 | 3 | 4 | 5;
  category:
    | "Work"
    | "Personal"
    | "Finance"
    | "Shopping"
    | "Newsletter"
    | "Social";
  action: "Urgent Action" | "Response Needed" | "For Review" | "No Action";
  reasoning: string;
}
```

### Rate Limiting Strategy

1. **Token Management**

   - Track token usage per request
   - Implement token budget per user
   - Set up alerts for high usage

2. **Cost Control**

   ```typescript
   interface CostControl {
     maxTokensPerRequest: number;
     maxRequestsPerDay: number;
     costPerToken: number;
     dailyBudget: number;
   }
   ```

3. **Error Handling**
   ```typescript
   interface APIError {
     type: "rate_limit" | "invalid_request" | "api_error";
     message: string;
     retryAfter?: number;
   }
   ```

### Fallback Mechanisms

1. **Cached Classifications**

   - Store similar email classifications
   - Use for quick lookups
   - Regular cache invalidation

2. **Offline Classification**

   ```typescript
   interface FallbackRules {
     senderPatterns: Record<string, Classification>;
     subjectPatterns: Record<string, Classification>;
     defaultClassification: Classification;
   }
   ```

3. **Batch Processing**
   - Queue emails for classification
   - Process during off-peak hours
   - Implement retry mechanism

## Error Handling

### Retry Strategy

```typescript
interface RetryConfig {
  maxRetries: number;
  baseDelay: number;
  maxDelay: number;
  backoffFactor: number;
}

const defaultRetryConfig: RetryConfig = {
  maxRetries: 3,
  baseDelay: 1000,
  maxDelay: 10000,
  backoffFactor: 2,
};
```

### Error Logging

```typescript
interface ErrorLog {
  timestamp: Date;
  operation: string;
  errorType: string;
  message: string;
  metadata: Record<string, any>;
  retryCount: number;
}
```

## Monitoring

### Metrics to Track

1. **API Performance**

   - Response times
   - Error rates
   - Token usage
   - Request volume

2. **Classification Quality**

   - Accuracy scores
   - User corrections
   - Processing time
   - Cache hit rates

3. **System Health**
   - Queue length
   - Processing backlog
   - Error frequency
   - Resource usage
