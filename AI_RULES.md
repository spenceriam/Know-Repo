# AI Rules for Know-Repo Development

## Tech Stack Overview

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Backend/Database**: Supabase (Auth, Database, Edge Functions)
- **GitHub Integration**: Octokit.js library
- **UI Components**: shadcn/ui component library
- **Deployment**: Vercel
- **Authentication**: Supabase Auth with GitHub OAuth and Magic Links

## Library Usage Rules

### Authentication
- **Supabase Auth** is the only authentication system. Use `@supabase/supabase-js` and `@supabase/auth-helpers-nextjs` for all auth operations.
- For Admin users, implement GitHub OAuth using Supabase's `signInWithOAuth` method.
- For Guest users, implement email magic links using Supabase's `signInWithOtp` method.

### Backend Logic
- All server-side logic must be implemented using **Next.js Server Actions** or **Supabase Edge Functions**.
- Never expose secret keys or admin-level tokens (like GitHub `provider_token`) on the client side.
- All GitHub API calls requiring admin tokens must be executed on the server.

### Database Operations
- Use the **Supabase JavaScript client** for all database interactions.
- Implement **Row Level Security (RLS)** policies to protect data access.
- Never query the database directly from client components.

### GitHub Integration
- Use the **Octokit.js** library for all GitHub API interactions.
- All GitHub API calls must be made from server-side code (Server Actions or Edge Functions).
- Never expose GitHub personal access tokens or provider tokens to the client.

### UI Components
- Use **shadcn/ui** components as the primary UI library.
- Style all components exclusively with **Tailwind CSS** classes.
- Create custom components in the `src/components` directory when shadcn/ui doesn't provide what's needed.
- Follow the existing file structure: components in `src/components`, pages in `src/pages`.

### State Management
- Prefer React's built-in `useState` and `useReducer` for client-side state management.
- Avoid complex state management libraries (Redux, Zustand) for the MVP.
- Use Server Components where possible to minimize client-side state.

### Data Fetching
- Use Next.js Server Components for data fetching when possible.
- For client-side data fetching, use Supabase client with proper authentication checks.
- Always handle loading and error states for data fetching operations.

### Error Handling
- Wrap all API calls and database operations in `try...catch` blocks.
- Provide clear user feedback for all error states.
- Log errors appropriately for debugging while not exposing sensitive information to users.

### Environment Variables
- Store all secrets and keys in environment variables.
- Prefix public variables with `NEXT_PUBLIC_`.
- Load environment variables using `process.env` only.