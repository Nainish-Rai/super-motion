**Product Plan: AI-Powered Email Management Tool**

## 1. Problem Statement

Many professionals experience anxiety from an overflowing inbox, leading to inefficiency and stress. A streamlined email management tool that intelligently categorizes and prioritizes emails can significantly reduce decision fatigue and improve productivity.

## 2. Solution

An AI-powered email assistant that integrates with Gmail, automatically classifies emails using GPT-based categorization, and applies labels directly in the inbox. The user can then easily identify the top 20 most important emails daily without sifting through clutter.

## 3. Core Features

### MVP (Minimum Viable Product)

1. **Gmail Integration:**
   - OAuth-based authentication.
   - Read and modify Gmail messages via API.
2. **AI-Powered Email Categorization:**
   - Uses OpenAI's GPT to classify emails based on custom rules.
   - Labels applied directly in Gmail.
3. **Customizable Prompting:**
   - Users can define preferences for classification.
4. **Top 20 Prioritization:**
   - Highlights the most relevant emails each day.
5. **Basic Dashboard:**
   - Simple interface for viewing and adjusting settings.
6. **Auto-cleaning of clutter:**
   - Filters out unimportant content.

## 4. Technology Stack

- **Tech:** Next.js, Tailwind, ShadCN, Better-Auth, React Query, Prisma, Postgres
- **AI:** OpenAI GPT-4 for classification.
