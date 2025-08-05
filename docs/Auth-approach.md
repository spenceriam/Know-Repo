How the GitHub Auth Setup Works
It's essentially a three-step process:

Step 1: Register Your App with GitHub
You go to your GitHub account settings.

You navigate to Developer settings > OAuth Apps > New OAuth App.

You fill out a simple form:

Application name: Know-Repo

Homepage URL: Your production URL (e.g., https://knowrepo.com)

Authorization callback URL: This is the most important part. Supabase provides you with a specific URL to paste here. It will look something like https://[your-project-ref].supabase.co/auth/v1/callback.

GitHub then gives you a Client ID and a Client Secret. These are like the username and password for your application itself.

Step 2: Configure Supabase
You go to your Supabase project dashboard.

You navigate to Authentication > Providers.

You find GitHub in the list and click to enable it.

You securely paste the Client ID and Client Secret you got from GitHub in Step 1 into the fields in Supabase.

You click "Save".

Step 3: Use it in Your Code
This is the best part. Because you've done the setup, the code becomes incredibly simple.

In the Next.js frontend, you'll have a "Sign in with GitHub" button that calls a single function, exactly as described in the PRD:

JavaScript

await supabase.auth.signInWithOAuth({
  provider: 'github',
  options: {
    scopes: 'repo read:user user:email', // Asking for permission to read repos
  },
});
Supabase and GitHub handle the entire complex security handshake (the OAuth flow) behind the scenes. The user is redirected to GitHub, clicks "Authorize," and is sent back to your app, securely logged in.

Auth for Your Two User Types
To be crystal clear, this is how we'll handle your two different user personas:

For Admins (Developers): They will only use the "Sign in with GitHub" button. This is fast, secure, and gives us the necessary token to act on their behalf.

For Guests (Clients/Stakeholders): They will only use the "Magic Link" with their email. We intentionally do not show them a GitHub login button. This maintains the core value proposition of the app: keeping the experience dead-simple and GitHub-free for them.
