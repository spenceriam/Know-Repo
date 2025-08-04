```mermaid
graph TD
    A[Start: Unauthenticated Admin] --> B{Lands on Homepage};
    B --> C[Clicks "Sign in with GitHub"];
    C --> D[Redirects to GitHub OAuth];
    D --> E{Authorizes App};
    E --> F[Redirects back to /dashboard];
    F --> G{Are any repos added?};
    G -- No --> H[Prompts "Add Repo"];
    G -- Yes --> I[Displays list of Added Repos];
    H --> J[Clicks "Add Repo"];
    J --> K[Selects a Repo from their list];
    K --> L[Repo is added to dashboard];
    L --> I;
    I --> M[Clicks "Share" on a Repo Card];
    M --> N[Copies unique portal URL to clipboard];
    N --> O[End: Sends URL to Guest];
```
