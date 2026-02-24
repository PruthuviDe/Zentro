# ☁️ Zentro - Cloud Task Tracker

A modern, full-stack cloud-native task management application built to demonstrate real-world cloud technology integration. Clean architecture, production-quality code, and a professional UI.

![Tech Stack](https://img.shields.io/badge/Next.js-15-black?logo=next.js) ![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript) ![Supabase](https://img.shields.io/badge/Supabase-Database%20%26%20Auth-green?logo=supabase) ![Railway](https://img.shields.io/badge/Railway-API%20Host-purple?logo=railway) ![Firebase](https://img.shields.io/badge/Firebase-Analytics-orange?logo=firebase)

---

## 🏗️ Architecture Overview

```
┌──────────────┐     ┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│   Vercel     │     │  Supabase    │     │   Railway    │     │  Firebase    │
│  (Frontend)  │────▶│ (Auth + DB)  │     │  (API)       │     │ (Analytics)  │
│  Next.js App │     │  PostgreSQL  │     │  Express.js  │     │  Events      │
└──────────────┘     │  Realtime    │     └──────────────┘     └──────────────┘
                     │  RLS         │
                     └──────────────┘
```

| Service      | Role                          | Technology                    |
| ------------ | ----------------------------- | ----------------------------- |
| **Vercel**   | Frontend hosting              | Next.js 15, TypeScript, Tailwind CSS, shadcn/ui |
| **Supabase** | Authentication + Database     | PostgreSQL, Auth, Realtime, Row-Level Security |
| **Railway**  | Backend API service           | Node.js, Express, TypeScript  |
| **Firebase** | Analytics tracking            | Firebase Analytics            |

---

## 📁 Project Structure

```
Zentro/
├── zentro-app/                  # Next.js Frontend (Vercel)
│   ├── app/
│   │   ├── page.tsx            # Landing page
│   │   ├── layout.tsx          # Root layout
│   │   ├── login/page.tsx      # Login page
│   │   ├── signup/page.tsx     # Signup page
│   │   ├── dashboard/page.tsx  # Protected dashboard
│   │   ├── architecture/page.tsx # Architecture explainer
│   │   └── auth/callback/route.ts # Auth callback handler
│   ├── components/
│   │   ├── ui/                 # shadcn/ui components
│   │   ├── dashboard-header.tsx
│   │   ├── stats-cards.tsx
│   │   ├── task-list.tsx
│   │   ├── task-item.tsx
│   │   ├── create-task-dialog.tsx
│   │   └── suggestion-card.tsx
│   ├── lib/
│   │   ├── supabase/
│   │   │   ├── client.ts       # Browser Supabase client
│   │   │   ├── server.ts       # Server Supabase client
│   │   │   └── middleware.ts   # Session management
│   │   ├── firebase.ts         # Firebase Analytics
│   │   └── utils.ts            # Utility helpers
│   ├── services/
│   │   ├── task-service.ts     # Task CRUD operations
│   │   └── suggestion-service.ts # Railway API calls
│   ├── types/
│   │   └── index.ts            # TypeScript type definitions
│   ├── supabase/
│   │   └── schema.sql          # Database schema + RLS policies
│   └── middleware.ts           # Next.js middleware (auth guard)
│
├── zentro-api/                  # Express Backend (Railway)
│   ├── src/
│   │   ├── index.ts            # Server entry point
│   │   └── routes/
│   │       └── suggestion.ts   # Productivity suggestion endpoint
│   ├── railway.json            # Railway deployment config
│   └── tsconfig.json
│
└── README.md                    # This file
```

---

## ✨ Features

- **Authentication** — Email/password signup & login via Supabase Auth
- **Protected Routes** — Middleware-based route protection
- **Dashboard** — Stats cards showing total, completed, and pending tasks
- **Task Management** — Create, toggle complete, and delete tasks
- **Realtime Updates** — Instant UI updates via Supabase Realtime subscriptions
- **Productivity Suggestions** — Smart tips from the Railway backend API
- **Analytics Tracking** — Firebase tracks login, task creation, completion, and page views
- **Architecture Page** — Visual diagram explaining the cloud architecture
- **Responsive Design** — Works on desktop and mobile
- **Modern UI** — shadcn/ui components with Tailwind CSS

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm
- A [Supabase](https://supabase.com) account (free tier works)
- A [Firebase](https://firebase.google.com) project (for Analytics)
- (Optional) [Railway](https://railway.app) account for backend deployment

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd Zentro
```

### 2. Setup Supabase

1. Create a new project at [supabase.com](https://supabase.com)
2. Go to **SQL Editor** and run the contents of `zentro-app/supabase/schema.sql`
3. Go to **Project Settings → API** and copy your:
   - Project URL
   - Anon/public key
4. Go to **Database → Replication** and ensure the `tasks` table has Realtime enabled

### 3. Setup Firebase Analytics

1. Create a project at [Firebase Console](https://console.firebase.google.com)
2. Add a web app to your project
3. Enable Google Analytics for the project
4. Copy the Firebase configuration values

### 4. Configure Frontend Environment

```bash
cd zentro-app
cp .env.example .env.local
```

Edit `.env.local` with your actual values:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
NEXT_PUBLIC_API_URL=http://localhost:3001
NEXT_PUBLIC_FIREBASE_API_KEY=your-api-key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
NEXT_PUBLIC_FIREBASE_APP_ID=your-app-id
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=G-XXXXXXXXXX
```

### 5. Start the Frontend

```bash
cd zentro-app
npm install
npm run dev
```

The frontend runs at **http://localhost:3000**

### 6. Start the Backend API

```bash
cd zentro-api
npm install
npm run dev
```

The API runs at **http://localhost:3001**

---

## 🗄️ Database Schema

```sql
CREATE TABLE tasks (
  id          UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id     UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  title       TEXT NOT NULL,
  description TEXT,
  completed   BOOLEAN DEFAULT FALSE NOT NULL,
  created_at  TIMESTAMPTZ DEFAULT now() NOT NULL
);
```

**Row-Level Security Policies:**
- Users can only SELECT, INSERT, UPDATE, DELETE their own tasks
- Enforced at the database level via `auth.uid() = user_id`

---

## 🌐 Deployment

### Frontend → Vercel

1. Push `zentro-app` to a Git repository
2. Import to [Vercel](https://vercel.com)
3. Set the **Root Directory** to `zentro-app`
4. Add all environment variables from `.env.local`
5. Deploy!

### Backend → Railway

1. Push `zentro-api` to a Git repository
2. Create a new project on [Railway](https://railway.app)
3. Connect your repository and set root directory to `zentro-api`
4. Add environment variables:
   - `PORT` — Railway sets this automatically
   - `FRONTEND_URL` — Your Vercel deployment URL
5. Deploy!
6. Update `NEXT_PUBLIC_API_URL` in Vercel with your Railway URL

---

## 🔥 Analytics Events Tracked

| Event              | Trigger                       |
| ------------------ | ----------------------------- |
| `user_login`       | User signs in                 |
| `dashboard_viewed` | Dashboard page loads          |
| `task_created`     | New task is created           |
| `task_completed`   | Task is marked as complete    |
| `page_view`        | Any page navigation           |

---

## 🛠️ Tech Stack Details

| Technology      | Version | Purpose                          |
| --------------- | ------- | -------------------------------- |
| Next.js         | 15      | React framework (App Router)     |
| TypeScript      | 5       | Type safety                      |
| Tailwind CSS    | 4       | Utility-first styling            |
| shadcn/ui       | latest  | Accessible UI components         |
| Supabase        | latest  | Auth, PostgreSQL, Realtime       |
| Express         | 5       | Backend API framework            |
| Firebase        | latest  | Analytics                        |
| Lucide React    | latest  | Icon library                     |

---

## 📄 License

This project is for educational and portfolio demonstration purposes.