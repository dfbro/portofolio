# Next.js & ShadCN Portfolio Starter

This is a comprehensive portfolio template built with modern web technologies, designed to be easily customizable and deployed. It features a clean, responsive design and a secure, built-in admin panel for managing your portfolio content without touching the code.

This project was bootstrapped in [Firebase Studio](https://firebase.google.com/studio).

![A screenshot of the portfolio homepage, showing the hero section with a profile picture, name, and description.](https://storage.googleapis.com/stabl-media/readmes/portfolio-template-v2.png)

## Features

- **Modern Tech Stack**: Built with [Next.js](https://nextjs.org/) (App Router), [React](https://react.dev/), and [TypeScript](https://www.typescriptlang.org/).
- **Beautiful UI**: Styled with [Tailwind CSS](https://tailwindcss.com/) and pre-built components from [ShadCN UI](https://ui.shadcn.com/).
- **Content Management**: Includes a password-protected admin dashboard to dynamically manage your skills, projects, achievements, and CTF write-ups.
- **Fully Responsive**: A mobile-first design that looks great on all devices, from desktops to smartphones.
- **SEO Optimized**: Leverages Next.js server-side rendering for better search engine visibility.
- **Easy to Customize**: Environment variables allow for easy updates to your name, email, social links, and more.

---

## Getting Started

Follow these instructions to get the project up and running on your local machine for development and testing.

### 1. Clone the Repository

First, clone the repository to your local machine using Git:

```bash
git clone <your-repository-url>
cd <repository-folder>
```

### 2. Install Dependencies

Install the project dependencies using `npm`:

```bash
npm install
```

### 3. Set Up Environment Variables (Required)

The project uses environment variables to store sensitive information and configuration details.

1.  Create a new file named `.env` in the root of your project by copying the example file:
    ```bash
    cp .example.env .env
    ```

2.  Open the `.env` file and fill in the values. **This is a critical step.**

    ```env
    # --- Admin Panel ---
    # Set a strong, unique password to access the admin dashboard at /admin
    SECRET_PASS="your-secret-admin-password"

    # --- Public Portfolio Details ---
    # Your name, displayed throughout the portfolio
    NEXT_PUBLIC_PORTFOLIO_NAME="Your Name"
    # Your contact email address
    NEXT_PUBLIC_EMAIL="your.email@example.com"
    # URL to your profile picture (e.g., from GitHub, LinkedIn, or an image host)
    NEXT_PUBLIC_PROFILE_PICTURE_URL="https://your-image-url.com/profile.jpg"

    # --- Social Media Links ---
    NEXT_PUBLIC_GITHUB_URL="https://github.com/your-username"
    NEXT_PUBLIC_LINKEDIN_URL="https://linkedin.com/in/your-profile"
    NEXT_PUBLIC_TWITTER_URL="https://twitter.com/your-handle"

    # --- Deployment Configuration ---
    # The public-facing hostname of your app (e.g., myportfolio.com or localhost:9002)
    APP_HOSTNAME="localhost:9002"
    # Set to "true" if your app is served over HTTPS
    APP_SSL="false"
    ```

### 4. Run the Development Server

You're all set! Start the development server by running:

```bash
npm run dev
```

The application will be available at `http://localhost:9002`.

- To view the portfolio, go to `http://localhost:9002`.
- To access the admin panel, go to `http://localhost:9002/admin` and enter the `SECRET_PASS` you set.

## Available Scripts

- **`npm run dev`**: Starts the development server with hot-reloading.
- **`npm run build`**: Creates an optimized production build of the application.
- **`npm run start`**: Starts the production server (requires `npm run build` to be run first).
- **`npm run lint`**: Lints the codebase for potential errors.
- **`npm run typecheck`**: Runs the TypeScript compiler to check for type errors.
