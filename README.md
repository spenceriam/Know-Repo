# Know-Repo

A secure guest portal system that allows repository owners to share their GitHub repositories with guests who can view and create issues without needing a GitHub account.

## 🚀 **MVP Status: COMPLETE**

The Know-Repo MVP is now fully implemented with all core features:

### ✅ **Completed Features**

#### **Phase 1: Setup & Admin Core**
- ✅ **Task 1**: Initial Project & Auth Setup
  - Next.js 14 with TypeScript and App Router
  - Supabase integration with database schema
  - GitHub OAuth authentication for admins
  - Beautiful landing page with MagicUI components

- ✅ **Task 2**: Admin Dashboard & Adding Repos
  - Admin dashboard with repository management
  - GitHub repository fetching via Octokit.js
  - "Add Repo" modal with searchable dropdown
  - Project cards with shareable portal URLs

#### **Phase 2: Guest Portal & Launch Prep**
- ✅ **Task 3**: Guest Portal & Magic Link Auth
  - Dynamic guest portal routes (`/portal/[shareable_link_id]`)
  - Magic link authentication for guests
  - Secure email-based access without GitHub accounts

- ✅ **Task 4**: Guest Issue Viewing & Creation
  - View existing GitHub issues in the portal
  - Create new issues directly from the portal
  - Issue cards with expandable content and labels
  - Real-time issue creation via GitHub API

- ✅ **Task 5**: Final Polish & Deployment
  - Custom 404 and error pages
  - Loading states and error handling
  - Enhanced accessibility and UX
  - Deployment-ready configuration

## 🛠 **Tech Stack**

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Backend/Database**: Supabase (Auth, Database, Edge Functions)
- **GitHub API**: Octokit.js
- **Authentication**: GitHub OAuth, Supabase Auth Helpers, Magic Link
- **UI Components**: Radix UI, Lucide React, MagicUI
- **Deployment**: Vercel

## 📋 **Prerequisites**

1. **Node.js** (v18 or higher)
2. **Supabase Account** - [Sign up here](https://supabase.com)
3. **GitHub Account** - For OAuth setup
4. **Vercel Account** - For deployment (optional)

## 🚀 **Quick Start**

### 1. Supabase Setup

1. Create a new Supabase project
2. Run the SQL schema from `supabase/schema.sql` in your Supabase SQL editor
3. Enable GitHub OAuth in Authentication > Providers
4. Copy your Supabase URL and anon key

### 2. GitHub OAuth App Setup

1. Go to GitHub Settings > Developer settings > OAuth Apps
2. Create a new OAuth App with:
   - **Homepage URL**: `http://localhost:3000` (dev) or your production URL
   - **Authorization callback URL**: `http://localhost:3000/auth/callback` (dev) or your production callback URL
3. Copy the Client ID and Client Secret to Supabase GitHub provider settings

### 3. Environment Variables

Create a `.env.local` file based on `env.example`:

```bash
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# Next.js
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_nextauth_secret
```

### 4. Run Locally

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Visit `http://localhost:3000` to see the application.

## 🏗 **Project Structure**

```
src/
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   ├── auth/              # Authentication pages
│   ├── dashboard/         # Admin dashboard
│   ├── portal/            # Guest portal
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── dashboard/         # Admin dashboard components
│   ├── portal/           # Guest portal components
│   └── ui/               # Reusable UI components
├── lib/                  # Utility libraries
│   └── supabase.ts       # Supabase client
└── types/                # TypeScript types
```

## 🔐 **Authentication Flows**

### **Admin Flow**
1. Admin signs in with GitHub OAuth
2. GitHub `provider_token` is stored securely in Supabase
3. Admin can add repositories and generate shareable links
4. Admin manages portal access and views

### **Guest Flow**
1. Guest receives a portal link (e.g., `/portal/abc123`)
2. Guest enters email address for magic link authentication
3. Guest receives email with secure access link
4. Guest can view and create issues without GitHub account

## 🗄 **Database Schema**

### **profiles** table
- `id` (UUID, Primary Key)
- `github_username` (Text)
- `avatar_url` (Text)
- `github_provider_token` (Text, encrypted)
- `created_at` (Timestamp)
- `updated_at` (Timestamp)

### **projects** table
- `id` (UUID, Primary Key)
- `user_id` (UUID, Foreign Key to profiles)
- `project_name` (Text)
- `github_repo_fullname` (Text)
- `shareable_link_id` (Text, unique)
- `created_at` (Timestamp)
- `updated_at` (Timestamp)

### **guests** table
- `id` (UUID, Primary Key)
- `project_id` (UUID, Foreign Key to projects)
- `guest_email` (Text)
- `created_at` (Timestamp)

## 🚀 **Deployment**

### **Vercel Deployment**

1. **Connect Repository**
   ```bash
   # Install Vercel CLI
   npm i -g vercel
   
   # Deploy
   vercel
   ```

2. **Environment Variables**
   - Add all environment variables in Vercel dashboard
   - Update GitHub OAuth callback URLs to production domain

3. **Domain Setup**
   - Configure custom domain in Vercel dashboard
   - Update GitHub OAuth app with production URLs

### **Manual Deployment**

1. **Build the application**
   ```bash
   npm run build
   ```

2. **Deploy to your preferred platform**
   - Vercel (recommended)
   - Netlify
   - Railway
   - AWS Amplify

## 🎯 **Usage**

### **For Repository Owners (Admins)**
1. Sign in with GitHub at `/auth/signin`
2. Add repositories from your GitHub account
3. Share the generated portal links with guests
4. Monitor issue activity through the dashboard

### **For Guests**
1. Click on a shared portal link
2. Enter your email address
3. Check your email for the magic link
4. View and create issues without a GitHub account

## 🧪 **Development**

### **Code Conventions**
- **TypeScript**: Strict mode enabled
- **Components**: Functional components with hooks
- **Styling**: Tailwind CSS with custom utilities
- **State Management**: React hooks (useState, useReducer)
- **API**: Next.js API routes with proper error handling

### **Testing**
```bash
# Run linting
npm run lint

# Type checking
npx tsc --noEmit
```

## 🤝 **Contributing**

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'feat: add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 **License**

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🗺 **Roadmap**

### **V1.1 Enhancements (Post-MVP)**
- [ ] **Task 6**: Enhance Guest Portal with README
  - Display repository README in guest portal
  - Markdown rendering with syntax highlighting
  - File tree navigation

- [ ] **Task 7**: Advanced Issue Filtering
  - Filter issues by labels, assignees, dates
  - Search functionality
  - Issue templates

### **Future Features**
- [ ] Issue comments and discussions
- [ ] Pull request viewing
- [ ] Repository analytics
- [ ] Team collaboration features
- [ ] Advanced security options
- [ ] API rate limiting and caching

## 🆘 **Support**

For support, please:
1. Check the [documentation](docs/)
2. Review existing issues
3. Create a new issue with detailed information

---

**Built with ❤️ using Next.js, Supabase, and Tailwind CSS**
