# HARSHANTH R — AI & Data Science Portfolio

[![Deploy to GitHub Pages](https://github.com/harshanth0112/portfolio/actions/workflows/deploy.yml/badge.svg)](https://github.com/harshanth0112/portfolio/actions/workflows/deploy.yml)
[![Live Demo](https://img.shields.io/badge/Live-Demo-brightgreen?style=flat&logo=github)](https://harshanth0112.github.io/portfolio/)
[![React](https://img.shields.io/badge/React-18.3-61DAFB?style=flat&logo=react)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=flat&logo=tailwind-css)](https://tailwindcss.com/)
[![Vite](https://img.shields.io/badge/Vite-6.1-646CFF?style=flat&logo=vite)](https://vitejs.dev/)

A modern, high-performance personal portfolio for **Harshanth R** (AI & Data Science Engineer, Class of 2026). Built with an editorial dark-aesthetic design system, dynamic GitHub repository synchronization, verified credentials viewer, and an integrated Admin Control Panel.

🔗 **Live Website:** [https://harshanth0112.github.io/portfolio/](https://harshanth0112.github.io/portfolio/)

---

## ✨ Features

- **🎨 Editorial Dark Aesthetic:** Custom typography (`Bebas Neue`, `DM Sans`, `JetBrains Mono`), glassmorphic overlays, vibrant neon lime accents (`#C8FF00`), and fluid micro-interactions.
- **⚡ Dynamic GitHub Project Sync:** Automatically fetches public repositories from GitHub with intelligent fallback to curated featured projects.
- **🔐 Built-in Admin CMS Panel:**
  - Password-protected dashboard (`🔒 Admin` button in the footer).
  - Edit profile bio, metrics, technical skills, projects, and certifications in real time.
  - **1-Click Direct GitHub Sync:** Commits and pushes configuration changes directly to the repository via the GitHub Contents API.
- **📜 Verified Certificate Lightbox:** Full-screen modal credential inspector with category filtering, search, and external proof verification.
- **📨 Contact Form with EmailJS:** Direct client-side message delivery with feedback toasts and interactive confetti effects.
- **🖱️ Interactive Custom Cursor & Scroll Indicator:** Smooth trailing ring pointer with hover detection and live reading progress indicator.
- **🚀 Fully Automated CI/CD:** GitHub Actions deployment pipeline targeting GitHub Pages with Node 24 runtime and asset caching.

---

## 🛠️ Tech Stack

| Domain | Technology |
| :--- | :--- |
| **Framework** | [React 18](https://react.dev/) |
| **Build Tool** | [Vite 6](https://vitejs.dev/) |
| **Styling** | [Tailwind CSS 3.4](https://tailwindcss.com/) + Custom Design Tokens |
| **Icons** | [Lucide React](https://lucide.dev/) |
| **Effects** | Canvas Confetti |
| **Email Service** | [EmailJS SDK](https://www.emailjs.com/) |
| **Deployment** | [GitHub Pages](https://pages.github.com/) via GitHub Actions |

---

## 📁 Project Structure

```
portfolio/
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Pages CI/CD workflow
├── public/
│   ├── pdftoimage/             # Certificate preview images
│   └── Picsart_...jpg          # Static image assets
├── src/
│   ├── assets/
│   │   └── avatar.jpg          # Vite-bundled hero portrait image
│   ├── components/
│   │   ├── AboutSection.jsx    # Bio & metrics section
│   │   ├── AdminPanel.jsx      # Content management modal
│   │   ├── CertificateModal.jsx# Lightbox certificate viewer
│   │   ├── CertificationsSection.jsx # Categorized certificates grid
│   │   ├── ContactSection.jsx  # Interactive contact form
│   │   ├── CustomCursor.jsx    # Dual-ring cursor tracker
│   │   ├── Footer.jsx          # Footer & admin entry point
│   │   ├── HeroSection.jsx     # Hero headline & portrait
│   │   ├── MarqueeTicker.jsx   # Infinite looping tech ticker
│   │   ├── Navbar.jsx          # Responsive fixed navigation bar
│   │   ├── ProjectsSection.jsx # Featured & dynamic GitHub projects
│   │   ├── ScrollProgressBar.jsx # Reading progress bar
│   │   ├── SkillsSection.jsx   # Technical skills grouped by stack
│   │   └── SplashScreen.jsx    # Intro loading animation
│   ├── data/
│   │   └── portfolioData.js    # Single source of truth for portfolio content
│   ├── hooks/
│   │   └── useGitHubProjects.js# Hook for fetching GitHub repositories
│   ├── utils/
│   │   ├── assetHelper.js      # Vite base path asset resolver
│   │   └── githubAdminSync.js  # GitHub Contents API commit client
│   ├── App.jsx                 # Main application layout
│   ├── index.css               # Global Tailwind directives & custom CSS
│   └── main.jsx                # React root entry point
├── .env.example                # Template for environment variables
├── package.json                # Project dependencies & scripts
├── tailwind.config.js          # Tailwind theme & design tokens
└── vite.config.js              # Vite configuration (base: '/portfolio/')
```

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18.0.0 or higher recommended)
- `npm` (v9.0.0 or higher)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/harshanth0112/portfolio.git
   cd portfolio
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure Environment Variables:**
   Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```
   Fill in your secret values:
   ```env
   # Admin Control Panel Master Password
   VITE_ADMIN_PASSWORD=your_secure_password_here

   # EmailJS Contact Form Service
   VITE_EMAILJS_PUBLIC_KEY=your_emailjs_public_key
   VITE_EMAILJS_SERVICE_ID=your_emailjs_service_id
   VITE_EMAILJS_TEMPLATE_ID=your_emailjs_template_id

   # GitHub Personal Access Token (for direct 1-click admin commits)
   VITE_GITHUB_TOKEN=your_github_personal_access_token
   ```

4. **Start the local development server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:5173/portfolio/](http://localhost:5173/portfolio/) in your browser.

5. **Build for production:**
   ```bash
   npm run build
   ```

---

## 🔐 Admin Control Panel

To access the integrated content manager:
1. Scroll down to the **Footer** on the live or local website.
2. Click the discrete **`🔒 Admin`** button.
3. Enter your configured `VITE_ADMIN_PASSWORD`.
4. Update any section (*Profile, Skills, Projects, Certifications*).
5. Head to the **GitHub Sync** tab and click **`Commit & Push Directly to GitHub`** to push updates straight to your repository without opening an editor.

---

## 🚢 Continuous Deployment (GitHub Actions)

Every push to the `main` branch automatically triggers the `.github/workflows/deploy.yml` workflow:
1. Checks out repository code.
2. Sets up Node.js with caching.
3. Injects GitHub Repository Secrets into the build step.
4. Builds production assets using `npm run build`.
5. Publishes output to GitHub Pages.

### Required GitHub Repository Secrets
Under **Settings > Secrets and variables > Actions**, configure:
- `VITE_ADMIN_PASSWORD`
- `VITE_EMAILJS_PUBLIC_KEY`
- `VITE_EMAILJS_SERVICE_ID`
- `VITE_EMAILJS_TEMPLATE_ID`
- `VITE_GITHUB_TOKEN` *(Personal Access Token with `repo` scope)*

---

## 📄 License

This project is licensed under the MIT License — feel free to customize and use it for your own portfolio.

---

© 2026 **Harshanth R** · AI & Data Science · Trichy, India
