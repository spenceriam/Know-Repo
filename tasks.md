# Know-Repo MVP: Implementation Plan

This document outlines the development tasks for the Know-Repo MVP. As tasks are completed by the AI coding assistant or by you, please update the checkbox status from `[ ]` to `[x]`.

---

## Phase 1: Setup & Admin Core

- [ ] **Task 1: Initial Project & Auth Setup**
    - [ ] Initialize a new Next.js 14 project with TypeScript and Tailwind CSS.
    - [ ] Install and configure the Supabase client libraries (`@supabase/supabase-js`, `@supabase/auth-helpers-nextjs`) and environment variables.
    - [ ] Implement the GitHub OAuth flow using Supabase Auth helpers to allow an 'Admin' to sign in.
    - [ ] Create the `profiles` table in Supabase.
    - [ ] Implement a secure mechanism (e.g., a Supabase Edge Function) to store the user's encrypted GitHub `provider_token` in the `profiles` table upon first login.
    - [ ] Create and protect a route at `/dashboard` that is only accessible to authenticated users.
    - -- *Requirements: 1.1*

- [ ] **Task 2: Admin Dashboard & Adding Repos**
    - [ ] Build the basic UI for the Admin Dashboard. It should display a "Add a Repo to Get Started" prompt if no repos have been added.
    - [ ] Implement the server-side logic to securely use the admin's `provider_token` to fetch their list of GitHub repositories via the Octokit.js library.
    - [ ] Create an "Add Repo" modal/form. This form should simply display a searchable dropdown list of the user's fetched GitHub repos.
    - [ ] Implement the server action to create a new record in the `portals` table when a user selects a repo to add.
    - [ ] Implement the logic to display added repos as cards on the dashboard.
    - [ ] Add a "Share" button to each repo card that copies the unique portal URL (e.g., `/portal/[shareable_link_id]`) to the clipboard.
    - -- *Requirements: 1.2*

## Phase 2: Guest Portal & Launch Prep

- [ ] **Task 3: Guest Portal & Magic Link Auth**
    - [ ] Create the dynamic route page component at `/portal/[shareable_link_id]`.
    - [ ] Build the UI component that prompts an unauthenticated guest for their email address.
    - [ ] Implement the call to Supabase Auth `signInWithOtp` to send a magic link to the submitted email.
    - [ ] Ensure the guest is correctly authenticated and redirected back to the portal page after clicking the magic link from their email.
    - -- *Requirements: 2.1*

- [ ] **Task 4: Guest Issue Viewing & Creation**
    - [ ] Implement the secure data-fetching logic for the guest portal. Once a guest is authenticated, the page must call a Supabase Edge Function to fetch and display a simplified list of open issues from the correct GitHub repo.
    - [ ] Create the "Create New Issue" UI component (form with 'Title' and 'Description' fields).
    - [ ] Implement the server-side logic in a Supabase Edge Function that allows the form to securely create a new issue in GitHub on behalf of the repo owner.
    - [ ] Ensure the issue list on the guest portal updates after a new issue is successfully created.
    - -- *Requirements: 2.2, 2.3*

- [ ] **Task 5: Final Polish & Deployment**
    - [ ] Conduct a final review of the end-to-end user flows for both Admin and Guest.
    - [ ] Create a simple marketing/landing page with a call-to-action to join a waitlist (can be a simple Tally or Mailchimp form).
    - [ ] Prepare the project for production and deploy to Vercel.
    - [ ] Set up all necessary production environment variables in Vercel.
     

## Phase 3: Post-MVP Enhancements (V1.1)

- [ ] **Task 6: Enhance Guest Portal with README**
    - [ ] Implement logic to fetch and render the content of the repository's `README.md` file at the top of the guest portal for context.
    - [ ] Ensure the markdown is rendered cleanly and securely.

- [ ] **Task 7: Advanced Issue Filtering**
    - [ ] Add controls (e.g., tabs or a dropdown) to the guest portal to filter issues.
    - [ ] Implement a "Closed" issues view.
    - [ ] Implement an "In Progress" view (this may require the Admin to configure which GitHub label corresponds to "in-progress").
    - [ ] Implement an "Assigned" view to see issues assigned to specific users.
     
---
