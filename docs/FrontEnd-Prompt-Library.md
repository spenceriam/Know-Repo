Prompt Library for AI UI Generators (v0, Lovable, Bolt)
Here is a library of prompts, broken down by each component we'll need for the Know-Repo MVP. You can feed these directly into your UI generator of choice.

1. Overall App Layout & Header
Prompt:

"Create a responsive app shell using Next.js and Tailwind CSS. It should have a sticky top navigation header and a main content area.
The header should have a dark background (slate-900). On the left, display a simple logo with the text 'Know-Repo' in a bold, white font.
On the right, show a user avatar image. When clicked, the avatar should reveal a dropdown menu with two items: 'Dashboard' and 'Sign Out'."

2. Admin Dashboard - Empty State
Prompt:

"Design a component for an empty dashboard state, to be used when a new user has not added any repos yet.
The component should be centered on the page. It should feature a large, dashed-border container. Inside the container, display a plus icon, a bold headline that reads 'Add Your First Repo', and a muted paragraph below it that says 'Select a GitHub repository to create a shareable portal for your clients.'
Below the text, include a primary action button with a plus icon that says 'Add Repo'."

3. Admin Dashboard - Repo Card
Prompt:

"Create a responsive card component to display a single repository on the admin dashboard.
Use a dark-gray background (slate-800) with a subtle border and rounded corners. The card should have a slight glow or lift effect on hover.
It must display the full repository name (e.g., 'your-username/know-repo') in a bold, white font.
Below the name, show a small icon of an open issue next to a number, like '14 Open Issues'.
On the right side of the card, place two small, icon-only buttons: a 'Share' icon (link) and a 'Settings' icon (gear)."

4. "Add Repo" Modal
Prompt:

"Design a modal popup for 'Add Repo'. The modal should have a dark background with a title 'Select a Repository'.
Below the title, include a search input field to filter the list of repos.
The main content of the modal should be a scrollable list of repositories. Each row in the list should show the repository name. When a user hovers over a row, it should have a highlighted background.
The modal should have a 'Cancel' button in the footer."

5. Guest Portal - Email Capture Form
Prompt:

"Create a clean, minimalist, centered card for capturing a guest's email address.
It needs a prominent headline: 'Secure Portal Access'.
Below the headline, a short paragraph should explain: 'Please enter your email to receive a secure, one-time magic link to access this portal. No password required.'
Include a single, clearly labeled input field for an 'Email Address'.
Finish with a primary button that spans the width of the card, with the text 'Send Magic Link'."

6. Guest Portal - Issue List Item
Prompt:

"Design a component for a single row in an issue list. It should be a horizontal bar with a light-gray background on hover.
On the far left, display a status icon: a green circle with a checkmark for 'open' issues.
To the right of the icon, display the issue title in a semi-bold font. The title should be the main focus.
Below the title, in a smaller, muted font, display the issue number (e.g., '#142') and the text 'opened on August 4, 2025 by [username]'."

7. "Create New Issue" Modal
Prompt:

"Create a clean, user-friendly modal for submitting a new issue.
The modal title should be 'Create New Issue'.
It needs two form fields:

A single-line text input with a clear label for 'Title'.

A larger textarea with a label for 'Description'. The textarea should have a subtle border and provide enough space for detailed feedback.
In the modal footer, include a primary 'Submit Issue' button and a secondary 'Cancel' button."

How to Use These Prompts
Generate: Go to v0.dev (or your tool of choice) and use these prompts one by one to generate the foundational UI for each component.

Copy Code: Copy the generated JSX/TSX and Tailwind CSS code.

Create Files: Create the corresponding component files in your Next.js project (e.g., /components/dashboard/RepoCard.tsx).

Wire Up: Use Cursor or your IDE to import these components into your pages and connect them to the data and functions from Supabase (e.g., map over an array of repos to render multiple RepoCard components, add an onClick handler to the 'Share' button, etc.).
