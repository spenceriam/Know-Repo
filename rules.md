# Know-Repo Project Rules for AI Assistants

This document contains rules and conventions for the Know-Repo project. Please adhere to these for all code generation and modification tasks.

### 1. Technology Stack
- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Backend/DB:** Supabase (Use the Supabase JS Client for all interactions).
- **GitHub API:** Use the `octokit` library for all GitHub API interactions.

### 2. Architecture & Patterns
- **Server-Side Logic:** Prioritize Next.js Server Actions or Supabase Edge Functions for all backend logic.
- **Client-Side State:** Avoid complex state management libraries (Redux, Zustand) for the MVP. Use React's built-in `useState`, `useReducer`, or server components where possible.
- **Security:**
    - **NEVER** expose secret keys or admin-level tokens (like the GitHub `provider_token`) on the client side. All GitHub API calls that require an admin's token must be executed on the server (Server Action or Edge Function).
    - Use Supabase Row Level Security (RLS) policies to protect data. A user should only be able to access their own portals.
- **Components:** Decompose UI into small, reusable components located in the `/components` directory.

### 3. Code Conventions
- **File Naming:** Use `kebab-case` for files and `PascalCase` for React components (e.g., `project-card.tsx`, `ProjectCard.tsx`).
- **Error Handling:** Wrap all API calls and database operations in `try...catch` blocks. Provide clear user feedback for error states.
- **Environment Variables:** All keys and secrets must be loaded from `.env.local` and accessed via `process.env`. Prefix public variables with `NEXT_PUBLIC_`.

### 4. Task Execution
- Reference the `tasks.md` file for the current task scope.
- Do not implement features outside the scope of the current task block unless explicitly asked.
- After completing a task, provide a brief summary of the files created or modified.
- **NEW RULE:** After successfully completing a task or applying a fix, you must create a Git commit. Commit messages should follow the Conventional Commits specification.
    - **Example for a new feature:** `feat: implement GitHub OAuth for admin users`
    - **Example for a fix:** `fix: resolve guest portal rendering issue`
    - **Example for documentation:** `docs: update README with new user flow`
