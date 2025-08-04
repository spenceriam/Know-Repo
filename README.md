# Know-Repo

![Project Status](https://img.shields.io/badge/status-in%20progress-yellow)
![Version](https://img.shields.io/badge/version-0.1.0--MVP-blue)
![License](https://img.shields.io/badge/license-MIT-green)

![Tech Stack](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![Tech Stack](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Tech Stack](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Tech Stack](https://img.shields.io/badge/Supabase-3FCF8E?style=for-the-badge&logo=supabase&logoColor=white)
![Tech Stack](https://img.shields.io/badge/Netlify-000000?style=for-the-badge&logo=netlify&logoColor=white)

The simplest way for freelancers and agencies to share GitHub project progress with non-technical clients and stakeholders.

---

## The Problem

Developers live in GitHub. Clients and non-technical stakeholders do not. This leads to friction: developers manually copying/pasting issue updates into emails and project management tools, and clients struggling to report bugs or track progress without being forced to sign up for a tool they don't understand.

## The Solution

**Know-Repo** provides a secure, dead-simple, read-only portal for your clients. An admin (you) can select a GitHub repository and generate a unique, shareable link. Your client can use this link to view a clean list of open issues and submit new ones directly to your repository, all without needing a GitHub account.

## ✨ Core Features (MVP)

* **Secure Admin Auth:** Admins authenticate securely using their existing GitHub account.
* **Repo Selection:** Quickly select any of your private or public repositories to create a shareable portal.
* **Frictionless Guest Access:** Guests access the portal via a secure magic link sent to their email. No GitHub account or password is required.
* **Simple Issue Viewing:** Guests see a clean, simplified list of all **open** issues in the repository.
* **Direct Issue Creation:** Guests can create new issues through a simple form, which land directly in your GitHub repo, perfectly formatted.

---

## 🌊 User Flows

### Admin User Flow

```mermaid
graph TD
    A[Start: Unauthenticated Admin] --> B{Lands on Homepage};
    B --> C[Clicks &quot;Sign in with GitHub&quot;];
    C --> D[Redirects to GitHub OAuth];
    D --> E{Authorizes App};
    E --> F[Redirects back to /dashboard];
    F --> G{Are any repos added?};
    G -- No --> H[Prompts &quot;Add Repo&quot;];
    G -- Yes --> I[Displays list of Added Repos];
    H --> J[Clicks &quot;Add Repo&quot;];
    J --> K[Selects a Repo from their list];
    K --> L[Repo is added to dashboard];
    L --> I;
    I --> M[Clicks &quot;Share&quot; on a Repo Card];
    M --> N[Copies unique portal URL to clipboard];
    N --> O[End: Sends URL to Guest];
Guest User Flow
Code snippet

graph TD
    A[Start: Guest receives Portal URL] --> B[Clicks Link];
    B --> C{Portal Page: Is Guest Authenticated?};
    C -- No --> D[Prompts for Email];
    D --> E[Submits Email];
    E --> F[Receives Magic Link Email];
    F --> G[Clicks Link in Email];
    G --> C;
    C -- Yes --> H[Displays simple list of **OPEN** issues];
    H --> I{Wants to add an issue?};
    I -- Yes --> J[Clicks &quot;Add New Issue&quot;];
    J --> K[Fills out Title/Description Form];
    K --> L[Submits Form];
    L --> M[New issue appears in list];
    M --> H;
    I -- No --> N[End: Finishes viewing];
🛠️ Tech Stack
Framework: Next.js 14 (App Router)

Language: TypeScript

Styling: Tailwind CSS

Backend & Database: Supabase (Auth, Database, Edge Functions)

Deployment: Vercel

GitHub Integration: Octokit.js

🚀 Project Status
This project is currently in the MVP development phase. The core features are being built as defined in the tasks.md document.

🏁 Getting Started (Running Locally)
To run this project locally, follow these steps:

Clone the repository:

Bash

git clone [https://github.com/](https://github.com/)[your-github-username]/know-repo.git
cd know-repo
Install dependencies:

Bash

npm install
Set up environment variables:

Create a file named .env.local in the root of the project.

Add your Supabase URL and Anon Key, as well as your GitHub OAuth Client ID and Secret.

Code snippet

NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
GITHUB_CLIENT_ID=your_github_oauth_client_id
GITHUB_CLIENT_SECRET=your_github_oauth_client_secret
# You will also need a secret for encrypting the provider_token
ENCRYPTION_SECRET=a_very_strong_random_32_character_secret
Run the development server:

Bash

npm run dev
Open http://localhost:3000 to view it in the browser.

🗺️ Roadmap (Post-MVP)
Our immediate focus after launching the MVP includes:

[ ] Display Repository README.md: Show the README.md file in the guest portal for better context.

[ ] Advanced Issue Filtering: Allow guests to view closed, in-progress, and assigned issues.

[ ] Guest Commenting: Allow guests to add comments to existing issues.

[ ] Admin Notifications: Notify admins via email when a guest creates a new issue.
