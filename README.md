# Know-Repo MVP

A simple, secure web portal that allows non-technical stakeholders to view and create issues in GitHub repositories without requiring GitHub accounts.

## 🚀 Features

- **Admin Dashboard**: GitHub OAuth authentication for repository owners
- **Repository Management**: Add and manage which repositories are accessible to guests
- **Guest Portal**: Magic link authentication for non-technical users
- **Issue Management**: View and create issues through a simple interface
- **Secure**: Row Level Security (RLS) policies protect data access

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Backend**: Supabase (Auth, Database, Edge Functions)
- **GitHub API**: Octokit.js
- **UI Components**: Radix UI + Lucide React

## 📋 Prerequisites

- Node.js 18+ 
- npm or yarn
- Supabase account
- GitHub account

## 🚀 Quick Start

### 1. Clone and Install

```bash
git clone <repository-url>
cd know-repo
npm install
```

### 2. Set up Supabase

1. Create a new Supabase project at [supabase.com](https://supabase.com)
2. Go to your project dashboard
3. Navigate to **SQL Editor** and run the schema from `supabase/schema.sql`
4. Go to **Authentication > Providers > GitHub** and enable GitHub OAuth
5. Add your GitHub OAuth App credentials (see GitHub setup below)

### 3. Set up GitHub OAuth App

1. Go to [GitHub Developer Settings](https://github.com/settings/developers)
2. Click **New OAuth App**
3. Fill in the details:
   - **Application name**: Know-Repo
   - **Homepage URL**: `http://localhost:3000` (development)
   - **Authorization callback URL**: `https://[your-project-ref].supabase.co/auth/v1/callback`
4. Copy the **Client ID** and **Client Secret**
5. Add these to your Supabase project under **Authentication > Providers > GitHub**

### 4. Environment Variables

Create a `.env.local` file in the root directory:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# Next.js
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_nextauth_secret
```

### 5. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the application.

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   ├── auth/              # Authentication pages
│   ├── dashboard/         # Admin dashboard
│   └── portal/            # Guest portal
├── components/            # React components
│   ├── dashboard/         # Dashboard components
│   └── ui/               # UI components
└── lib/                  # Utilities and configurations
    └── supabase.ts       # Supabase client
```

## 🔐 Authentication Flow

### Admin Flow
1. Admin signs in with GitHub OAuth
2. GitHub token is stored securely in Supabase
3. Admin can add repositories to create guest portals
4. Admin receives shareable links for each portal

### Guest Flow
1. Guest receives a portal link
2. Guest enters email for magic link authentication
3. Guest can view and create issues in the repository
4. No GitHub account required

## 🗄️ Database Schema

### Tables
- **profiles**: User profiles with GitHub tokens
- **projects**: Repository portals created by admins
- **guests**: Guest access tracking

### Security
- Row Level Security (RLS) policies protect data
- GitHub tokens are encrypted
- Guest access is controlled by shareable links

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy!

### Environment Variables for Production

```env
NEXT_PUBLIC_SUPABASE_URL=your_production_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_production_supabase_anon_key
NEXTAUTH_URL=https://your-domain.vercel.app
NEXTAUTH_SECRET=your_production_secret
```

## 🔧 Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

### Code Conventions

- **File Naming**: Use `kebab-case` for files and `PascalCase` for React components
- **Error Handling**: Wrap all API calls in try-catch blocks
- **Security**: Never expose tokens on the client side
- **Components**: Decompose UI into small, reusable components

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

If you encounter any issues:

1. Check the [Supabase documentation](https://supabase.com/docs)
2. Review the [Next.js documentation](https://nextjs.org/docs)
3. Open an issue in this repository

## 🗺️ Roadmap

- [ ] README rendering in guest portals
- [ ] Advanced issue filtering
- [ ] Issue templates
- [ ] Email notifications
- [ ] Team collaboration features
- [ ] Mobile app
