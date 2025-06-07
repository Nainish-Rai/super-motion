# `better-auth` Integration Rules

This document outlines the rules and conventions for interacting with the authentication system in this Next.js project, which uses `better-auth`.

## Core Concepts

The authentication system is split into server-side and client-side logic.

- **Server-Side Auth**: Used in Server Components, API Routes, and Server Actions to get the current session and user data directly. It relies on functions from `@/lib/auth` and `@/lib/auth-utils`.
- **Client-Side Auth**: Used in Client Components (`"use client"`) to get session data via a React hook (`useSession`) and to trigger actions like `signIn` and `signOut`. It relies on functions from `@/lib/auth-client`.
- **Middleware**: A middleware at `src/middleware.ts` handles route protection, redirecting unauthenticated users from protected pages and authenticated users from sign-in pages.

## Key Files

- `src/lib/auth.ts`: **Main configuration for `better-auth`**. This is where you configure the database adapter and add or remove social login providers.
- `src/lib/auth-client.ts`: Exports **client-side** auth functions (`useSession`, `signIn`, `signOut`). Use these in components marked with `"use client"`.
- `src/lib/auth-utils.ts`: Exports **server-side** auth helpers (`getSession`, `getUser`). Use these in Server Components, Route Handlers, and Server Actions.
- `src/middleware.ts`: Defines protected routes. To protect a new route, add its path to the `protectedRoutes` array.
- `src/app/api/auth/[...all]/route.ts`: The catch-all API route that handles all authentication requests (e.g., OAuth callbacks). You should not need to edit this file.
- `src/components/auth-card.tsx`: The UI component for signing in. This is where you would add a button for a new social provider.
- `.env.example`: Lists all required environment variables. `BETTER_AUTH_SECRET` and `BETTER_AUTH_URL` are essential, as are the client ID and secret for each OAuth provider.
- `src/lib/db/schema.ts`: Contains the Drizzle schema for `user`, `session`, `account`, and `verification` tables, which are required by `better-auth`.

## How-to Guides

### How to get the user/session on the server

In Server Components, API Routes, or Server Actions, use the `getUser` or `getSession` helpers from `@/lib/auth-utils`.

**Example (`src/app/(dashboard)/dashboard/page.tsx`):**

```typescript
import { getUser } from "@/lib/auth-utils";

export default async function DashboardPage() {
  const user = await getUser();

  return <p>Signed in as: {user?.email}</p>;
}
```

### How to get the user/session on the client

In Client Components (`"use client"`), use the `useSession` hook from `@/lib/auth-client`.

**Example (`src/components/user-profile.tsx`):**

```typescript
"use client";

import { useSession } from "@/lib/auth-client";

export function UserProfile() {
  const { data: session, isPending } = useSession();

  if (isPending) {
    return <div>Loading...</div>;
  }

  if (!session) {
    return null;
  }

  return <p>Welcome, {session.user.name}</p>;
}
```

### How to sign in or out

Use the `signIn` and `signOut` functions from `@/lib/auth-client` within a Client Component.

- **Sign In**: See `src/components/auth-card.tsx` for implementation. It uses `signIn.social({ provider: "...", callbackURL: "..." })`.
- **Sign Out**: See `src/components/user-profile.tsx` for implementation. It calls `signOut()`.

### How to add a new protected route

1.  Open `src/middleware.ts`.
2.  Add the new route path (e.g., `"/settings"`) to the `protectedRoutes` array.

**Example (`src/middleware.ts`):**

```typescript
// ...
const protectedRoutes = ["/dashboard", "/settings"]; // Add "/settings" here
// ...
```

### How to add a new social login provider (e.g., Facebook)

1.  **Environment Variables**:

    - Add `FACEBOOK_CLIENT_ID` and `FACEBOOK_CLIENT_SECRET` to `.env.example` and your local `.env` file.
    - Add the new variables to the Zod schema in `src/env.ts`.

2.  **Configure `better-auth`**:

    - Open `src/lib/auth.ts`.
    - Add the new provider to the `socialProviders` object.

    ```typescript
    // src/lib/auth.ts
    export const auth = betterAuth({
      // ...
      socialProviders: {
        github: {
          /* ... */
        },
        google: {
          /* ... */
        },
        discord: {
          /* ... */
        },
        facebook: {
          // Add this block
          clientId: env.FACEBOOK_CLIENT_ID,
          clientSecret: env.FACEBOOK_CLIENT_SECRET,
        },
      },
      // ...
    });
    ```

3.  **Update UI**:

    - Open `src/components/auth-card.tsx`.
    - Add state for the new provider's loading status.
    - Add a new `<SignInButton>` component instance for Facebook.

    ```tsx
    // src/components/auth-card.tsx
    // ...
    const [facebookLoading, setFacebookLoading] = useState(false);
    // ...
    <SignInButton
      title="Sign in with Facebook"
      provider="facebook" // Use the key from auth.ts
      loading={facebookLoading}
      setLoading={setFacebookLoading}
      callbackURL="/dashboard"
      icon={<Icons.Facebook />} // Assuming you add an icon
    />;
    // ...
    ```
