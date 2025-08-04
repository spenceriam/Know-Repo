2-Week MVP Sprint Plan & AI Prompts
Here are the sequential prompts for your AI coding assistant.

Week 1: Core Admin Functionality
Day 1-3: Setup & Admin Auth

Code snippet

Objective: Set up a new Next.js 14 App Router project with Supabase integration and GitHub OAuth for user authentication.

Requirements:
1.  Initialize a Next.js project using `npx create-next-app@latest` with TypeScript and Tailwind CSS.
2.  Install the Supabase JS client libraries: `@supabase/supabase-js`, `@supabase/auth-helpers-nextjs`.
3.  Set up Supabase environment variables (`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`).
4.  Create a Supabase authentication client for server components.
5.  Implement the GitHub OAuth flow. Create a "Login with GitHub" button.
6.  On successful login, store the user's `provider_token` from GitHub in a new `profiles` table in my Supabase database. The token MUST be encrypted before storing. Create a Supabase database function or edge function to handle the secure insertion of the profile data including the encrypted token.
7.  Protect a `/dashboard` route so only authenticated users can access it.
Day 4-7: Admin Dashboard & Project Creation

Code snippet

Objective: Build the Admin Dashboard where users can create "Projects" by linking them to their GitHub repositories.

Requirements:
1.  On the `/dashboard` page, create a server component that uses the logged-in user's encrypted `provider_token` to make an authenticated request to the GitHub API. Use the 'octokit' library.
2.  Fetch the list of repositories for the authenticated user (`GET /user/repos`).
3.  Create a "Create Project" form/modal with two fields:
    a. A friendly "Project Name" (text input).
    b. A dropdown list populated with the user's GitHub repositories fetched in the previous step.
4.  When the form is submitted, create a new record in the `projects` table in Supabase, linking the `user_id` to the selected `github_repo_fullname`.
5.  The main dashboard should display a list of created projects. Each project card should show the `project_name` and have a "Share" button.
Week 2: Guest Portal & Launch Prep
Day 8-10: Guest Portal & Issue Submission

Code snippet

Objective: Build the public-facing Guest Portal where non-technical users can view and create issues.

Requirements:
1.  Create a dynamic route at `/portal/[shareable_link_id]`.
2.  This page should first check for a valid user session. If none exists, show a simple form asking for an email address.
3.  When an email is submitted, use Supabase Auth to send a `signInWithOtp` (magic link) to that email. Set the `redirectTo` URL to be the current portal page.
4.  Once the user is authenticated by clicking the magic link, the page should:
    a. Fetch the project details using the `shareable_link_id`.
    b. Use the project's owner's encrypted GitHub token (via a secure Supabase Edge Function) to fetch all open issues for the linked repository.
    c. Display the issues in a clean, simple, read-only list.
    d. Include a "Create New Issue" button that opens a form with 'Title' and 'Description' fields.
    e. On form submission, call another Supabase Edge Function that uses the project owner's token to create a new issue in the GitHub repository.
Day 11-14: Polish, Deploy & Waitlist Page

Focus: UI/UX cleanup, creating a simple landing page, and deploying.

Action:

Use an AI UI generator (v0.dev) for the landing page.

Create a waitlist form using Tally and embed it.

Deploy the entire application to Vercel.

Do one final end-to-end test of the full Admin -> Guest flow.

Skip Initially (Add After Validation)
Stripe Integration: We are validating the idea, not charging for it yet.

Custom Branding: All portals look the same for the MVP.

Commenting on Issues: This adds too much complexity. Guests can only view and create.

Advanced Settings: No role management, no complex permissions.

Email Notifications: No emails other than the magic link.
