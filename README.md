# 🌲 The Wild Oasis — Customer Facing Website

[![Live Demo](https://img.shields.io/badge/Demo-Live%20Website-emerald?style=for-the-badge&logo=vercel)](https://the-wild-oasis-website-rouge-ten.vercel.app/)
[![Next.js](https://img.shields.io/badge/Next.js%2016-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React%2019-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS%20v4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)](https://supabase.com/)
[![Better Auth](https://img.shields.io/badge/Auth-Better%20Auth-blueviolet?style=for-the-badge)](https://better-auth.com/)

> **Welcome to paradise.** A luxurious boutique hotel booking application nestled in the heart of the Italian Dolomites. Built with Next.js 16 App Router, React 19, Supabase, and Tailwind CSS.

🔗 **Live Deployment:** [https://the-wild-oasis-website-rouge-ten.vercel.app/](https://the-wild-oasis-website-rouge-ten.vercel.app/)

---

## 📖 Table of Contents

- [Overview](#-overview)
- [Key Features](#-key-features)
- [Tech Stack](#-tech-stack)
- [Architecture & Engineering Highlights](#-architecture--engineering-highlights)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [Environment Variables](#-environment-variables)
- [Available Scripts](#-available-scripts)
- [License](#-license)

---

## 🌿 Overview

**The Wild Oasis** is a modern, full-stack cabin reservation web platform designed for luxury travelers. Guests can explore cozy cabins, filter by capacity, inspect amenities, verify real-time availability on an interactive calendar, and complete reservations. The application also provides an authenticated guest portal for viewing, modifying, or canceling reservations, as well as updating guest profile information.

---

## ✨ Key Features

### 🏡 Cabin Discovery & Exploration
- **Dynamic Catalog:** Browse luxury cabins with pricing, maximum capacity, high-resolution imagery, and descriptions.
- **Client-Side Capacity Filtering:** Filter cabins instantly by party size:
  - Small (1–3 guests)
  - Medium (4–7 guests)
  - Large (8–12 guests)
- **Deep-Linked Cabin Details:** Dedicated dynamic pages (`/cabins/[cabinId]`) with custom SEO metadata and statically pre-rendered routes via `generateStaticParams`.

### 📅 Booking Engine & Interactive Date Selection
- **Interactive Calendar:** Integrated custom date range picker (`react-day-picker` & `date-fns`) with automatic disabling of previously booked dates.
- **Live Price Calculation:** Dynamic price calculation based on cabin night rates, discount rates, and selected duration.
- **Reservation Submission:** Book stays through Next.js Server Actions with instant redirect to a custom confirmation page.

### 👤 Guest Account & Reservation Portal
- **Upcoming & Past Reservations:** Dedicated reservation feed showing stay status, check-in dates, and booked details.
- **Optimistic Deletion:** Instant visual feedback when deleting reservations via React 19's `useOptimistic` hook with background server synchronization.
- **Reservation Management:** Update guest counts and special request observations directly from the portal.
- **Profile Customization:** Update nationality, country flag (sourced dynamically from the REST Countries API), and national ID.

### 🔒 Modern Social Authentication
- **Better Auth Integration:** Secure Google OAuth authentication flow with session cookies.
- **Database Synchronization:** Automatic guest profile verification and guest ID synchronization with Supabase on sign-in.
- **Route Protection:** Protected account routes (`/account/*`) via route proxy / middleware redirection.

---

## 🛠️ Tech Stack

| Layer | Technology | Description |
| :--- | :--- | :--- |
| **Framework** | [Next.js 16](https://nextjs.org/) | App Router, Server Components (RSC), Server Actions, Streaming |
| **Library** | [React 19](https://react.dev/) | `useOptimistic`, Context API, Suspense boundaries |
| **Styling** | [Tailwind CSS v4](https://tailwindcss.com/) | Custom color palette, responsive design, `@tailwindcss/turbopack` |
| **Database** | [Supabase](https://supabase.com/) | PostgreSQL database and cloud storage for cabin assets |
| **Authentication** | [Better Auth](https://www.better-auth.com/) | Social OAuth (Google), custom session hooks & guest bridging |
| **Date Management**| [date-fns](https://date-fns.org/) & [React Day Picker](https://react-day-picker.js.org/) | Reservation calendar math and range picking |
| **Icons & Fonts** | [Heroicons](https://heroicons.com/) & Google Fonts | Josefin Sans typography and clean SVG iconography |
| **Deployment** | [Vercel](https://vercel.com/) | Continuous integration, edge hosting, and global CDN |

---

## 🏛️ Architecture & Engineering Highlights

- **React Server Components (RSC):** Minimizes client bundle size by fetching data directly on the server inside Server Components while rendering interactive components with `"use client"`.
- **Granular Streaming with Suspense:** Fallback spinners and skeleton screens keep navigation fast and smooth even while asynchronous data loads.
- **Optimistic UI (`useOptimistic`):** Deleting reservations feels instantaneous on the UI while mutation requests finish in the background.
- **On-Demand Cache Revalidation:** Uses `revalidatePath` inside Next.js Server Actions to keep the client cache fresh after database mutations.
- **Optimized Assets:** Images loaded via `next/image` with remote patterns, responsive sizing, and blur placeholders for superior Core Web Vitals.

---

## 📂 Project Structure

```text
the-wild-oasis-website/
├── app/
│   ├── _components/          # Shared UI components (Navigation, CabinCard, DateSelector, etc.)
│   ├── _lib/                 # Backend helpers, server actions, Supabase & Better Auth config
│   │   ├── actions.js        # Next.js Server Actions (booking, updating, deleting)
│   │   ├── auth.js           # Better Auth server configuration & Supabase guest hooks
│   │   ├── auth-client.js    # Client authentication hooks & methods
│   │   ├── data-service.js   # Supabase data access layer
│   │   └── supabase.js       # Supabase client instantiation
│   ├── _styles/              # Tailwind CSS styles & font imports
│   ├── about/                # About page route
│   ├── account/              # Protected guest portal routes (profile, reservations)
│   │   ├── profile/          # Profile editing page
│   │   └── reservations/     # Reservation list and reservation edit routes
│   ├── api/auth/[...all]/    # Better Auth route handlers
│   ├── cabins/               # Cabin catalog & individual cabin details
│   │   ├── [cabinId]/        # Dynamic cabin detail & booking page
│   │   └── thank-you/        # Reservation confirmation route
│   ├── login/                # Google sign-in page
│   ├── error.js              # Global error boundary
│   ├── layout.js             # Root application layout with navigation & reservation context
│   ├── loading.js            # Global page loading skeleton
│   ├── not-found.js          # Custom 404 page
│   └── page.js               # Landing page
├── public/                   # Static images, icons, and hero artwork
├── proxy.js                  # Route protection proxy / middleware
├── next.config.mjs           # Next.js & Turbopack configuration
├── tailwind.config.js        # Custom Tailwind design tokens
└── package.json              # Project dependencies & scripts
```

---

## 🚀 Getting Started

Follow these steps to run the project locally on your machine.

### Prerequisites

- **Node.js** (v20.x or later recommended)
- **npm**, **yarn**, or **pnpm**
- A [Supabase](https://supabase.com/) project with configured `cabins`, `guests`, and `bookings` tables
- A [Google Cloud Console](https://console.cloud.google.com/) project for OAuth credentials

### 1. Clone the repository

```bash
git clone https://github.com/your-username/the-wild-oasis-website.git
cd the-wild-oasis-website
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env.local` file in the root directory:

```env
# Supabase Configuration
SUPABASE_URL=https://your-supabase-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your-supabase-service-role-key

# Better Auth Configuration
BETTER_AUTH_URL=http://localhost:3000
BETTER_AUTH_SECRET=your-random-generated-secret

# Google OAuth Credentials
GOOGLE_CLIENT_ID=your-google-client-id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your-google-client-secret
```

### 4. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to explore the website.

---

## 🔑 Environment Variables

| Variable | Description |
| :--- | :--- |
| `SUPABASE_URL` | The REST endpoint URL of your Supabase database instance. |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase Service Role Key for server-side queries. |
| `BETTER_AUTH_URL` | Base URL of the app (e.g. `http://localhost:3000` or production domain). |
| `BETTER_AUTH_SECRET` | Secret key used to sign and encrypt auth session tokens. |
| `GOOGLE_CLIENT_ID` | OAuth 2.0 Client ID from Google Cloud Console. |
| `GOOGLE_CLIENT_SECRET` | OAuth 2.0 Client Secret from Google Cloud Console. |

---

## 📜 Available Scripts

- `npm run dev`: Starts the Next.js development server with Turbopack.
- `npm run build`: Creates an optimized production build of the application.
- `npm run start`: Starts the application in production mode.
- `npm run prod`: Runs build and starts the production server.
- `npm run lint`: Runs ESLint to check for code quality and style issues.

---

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).
