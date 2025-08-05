Technical PRD: Know-Repo MVP
Project: Know-Repo

Objective: Build a Minimum Viable Product in a 2-week sprint to validate the core value proposition: allowing non-technical guests to view and create issues in a specific GitHub repository via a simple, secure web portal.

Primary Personas:

The Admin: A developer or agency user with a GitHub account.

The Guest: A non-technical client, stakeholder, or tester.

Recommended Stack (As per your selection)
Framework: Next.js 14+ with App Router

Styling: Tailwind CSS

Backend & Database: Supabase (for Auth, Database, and Edge Functions)

Deployment: Vercel

Core APIs: GitHub API (via Octokit.js)

Frontend Generation (Optional): Lovable.dev, v0.dev for initial components.

Development Environment: Cursor IDE / VS Code + Copilot

User Flows & Core Logic
1. The Admin Flow
Onboarding: Admin lands on the marketing page and clicks "Sign Up with GitHub".

Authentication: They are redirected through the Supabase GitHub OAuth flow. Supabase handles the token exchange and creates a new user in the auth.users table. We will store the provider_token from GitHub to make API calls.

Dashboard: After login, they land on a dashboard. It's initially empty, prompting them to "Create Your First Project".

Project Creation:

Admin clicks "Create Project".

The app uses the stored GitHub token to fetch a list of repos the user has access to.

They select a repository from a dropdown list and give the project a friendly name.

A new projects record is created in Supabase, linking the user_id to the github_repo_name.

Sharing: Once a project is created, the dashboard displays it in a card with a "Share" button. Clicking it generates and copies a unique, unguessable URL to the clipboard (e.g., knowrepo.com/portal/[uuid]).

2. The Guest Flow
Access: The Guest receives and clicks the unique portal link.

Authentication (Magic Link): The page prompts them for their email address to access the portal. This is a crucial, painless security step.

Magic Link Sent: Supabase sends a magic link to their email.

Portal Access: They click the link in their email and are authenticated into a session for that specific project portal.

View Issues: The portal displays a simplified, read-only list of open issues from the linked GitHub repo.

Submit Issue: A prominent "Add New Issue" button opens a simple form with two fields: Title and Description (with markdown support).

Submission: On submit, the app uses the Admin's stored GitHub token on the backend (via a Supabase Edge Function) to create a new issue in the correct repository. The new issue immediately appears at the top of the portal list.

Supabase Database Schema (MVP)
profiles (public schema)

id (uuid, references auth.users.id, Primary Key)

github_username (text)

avatar_url (text)

github_provider_token (text, ENCRYPTED) - Crucial for making GitHub API calls.

projects (public schema)

id (uuid, Primary Key, default gen_random_uuid())

user_id (uuid, references profiles.id)

project_name (text)

github_repo_fullname (text, e.g., "username/repo-name")

shareable_link_id (uuid, unique, default gen_random_uuid()) - This is the ID used in the public URL.

guests (public schema)

id (uuid, Primary Key)

project_id (uuid, references projects.id)

guest_email (text)

Note: Supabase's auth.users will handle guest sessions via magic links, but we may want this table to track who has been invited to which project.

Important: Issues are NOT stored in our database. They are fetched live from the GitHub API to ensure real-time data and simplicity.
