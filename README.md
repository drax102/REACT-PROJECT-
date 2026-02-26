# API Fusion - React Router + API Integration Project

A comprehensive React application designed as an educational project demonstrating the power of modern front-end development, routing, and live API integrations.

## Features

- **React Router Integration**: Seamless Single Page Application (SPA) navigation across multiple pages: Home, About, Contact, Products, Weather, and Recipes.
- **Live APIs Integrated (Minimum 3 Required)**:
  1. **Weather App**: Uses OpenWeather API to display current temperature, conditions, and icons.
  2. **E-Commerce Products**: Uses Fake Store API to fetch, search, and filter premium product mockups.
  3. **Food Recipe App**: Uses TheMealDB API to search for global dishes and present detailed ingredients and instructions.
- **Styling**: Bootstrap 5 bundled with custom premium glassmorphism dark mode CSS rules.
- **Hooks Mastered**: Extensive usage of `useState` and `useEffect`.
- **Axios HTTP Client**: Clean and efficient promised-based HTTP requests for managing API loading and error states.

## Getting Started

1. **Install dependencies**:
   ```bash
   npm install
   ```
2. **Setup Environment Variables**:
   In the root directory, there is a `.env` file containing a placeholder Demo OpenWeather API key. If you face rate limits, you can replace it with your own free key generated at https://openweathermap.org/.
3. **Run the local dev server**:
   ```bash
   npm run dev
   ```

## Submission Guide

### 1. Upload to GitHub
- Open terminal and initialize git:
  ```bash
  git init
  git add .
  git commit -m "Initialize React project with 3 APIs"
  ```
- Go to GitHub, create a new empty repository.
- Push your local code to the GitHub repository:
  ```bash
  git branch -M main
  git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPOSITORY.git
  git push -u origin main
  ```

### 2. Deploy to Netlify / Vercel

**Deploying to Netlify:**
- Login to Netlify.
- Click "Add new site" -> "Import an existing project".
- Connect your GitHub account and select your repository.
- Build command: `npm run build`
- Publish directory: `dist`
- Click `Deploy site`.

**Deploying to Vercel:**
- Login to Vercel.
- Click "Add New..." -> "Project".
- Connect your GitHub account and import your repository.
- The default React/Vite settings will populate automatically (Build: `npm run build`, Output: `dist`).
- Click `Deploy`.

> **Note on Router & Deployments:** 
> Vercel and Netlify need to be configured for SPA routing so they don't throw 404s when hard-refreshing pages like `/about`. For Vite, this is usually handled out-of-the-box by Vercel, but for Netlify you might want to create a `public/_redirects` file with the following:
> `/* /index.html 200`

Good luck with your submission!
