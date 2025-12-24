# 🎯 Crakd

> AI-powered mock interview platform with real-time voice conversations and intelligent feedback

![Next.js](https://img.shields.io/badge/Next.js-15-black?style=flat-square&logo=next.js)
![React](https://img.shields.io/badge/React-19-blue?style=flat-square&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)
![Firebase](https://img.shields.io/badge/Firebase-11-orange?style=flat-square&logo=firebase)
![TailwindCSS](https://img.shields.io/badge/Tailwind-4-38B2AC?style=flat-square&logo=tailwind-css)

<br/>

## 📋 Table of Contents

- [About](#-about)
- [Features](#-features)
- [Architecture](#-architecture)
- [Tech Stack](#-tech-stack)
- [Getting Started](#-getting-started)
- [Project Structure](#-project-structure)
- [Key Implementation Details](#-key-implementation-details)
- [Scripts](#-scripts)

<br/>

## 🎬 About

Crakd is a full-stack web application that leverages voice AI to simulate realistic interview experiences. Users can practice interviews for any role or industry, engage in natural voice conversations with an AI interviewer, and receive detailed performance analytics powered by Google's Gemini model.

### The Problem

Traditional interview prep lacks realistic practice. Reading questions and mentally rehearsing answers does not replicate the pressure of real-time conversation.

### The Solution

Crakd provides an immersive, voice-based interview simulation where users speak naturally with an AI interviewer, receive real-time transcription, and get comprehensive feedback scored across multiple competency areas.

<br/>

## ✨ Features

| Feature | Description |
|---------|-------------|
| 🎙️ **Voice AI Interviews** | Real-time voice conversations powered by VAPI with speech-to-text and text-to-speech |
| 🧠 **AI-Generated Feedback** | Structured performance analysis using Google Gemini with scoring across 5 categories |
| 🔐 **Secure Authentication** | Firebase Auth with server-side session management and HTTP-only cookies |
| 📊 **Progress Tracking** | Historical interview data stored in Firestore with retake capabilities |
| 🎨 **Modern UI** | Responsive design with dark/light mode support using Radix UI primitives |
| ⚡ **Server Actions** | Next.js 15 server actions for secure, type-safe data mutations |

<br/>

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                         Client (React 19)                        │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────────┐  │
│  │  Auth Forms │  │  Interview  │  │     Voice Agent         │  │
│  │  (Zod +     │  │  Dashboard  │  │  (VAPI Web SDK)         │  │
│  │  React Hook │  │             │  │                         │  │
│  │  Form)      │  │             │  │  • Real-time speech     │  │
│  └─────────────┘  └─────────────┘  │  • Transcript capture   │  │
│                                     └─────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                    Next.js 15 Server Actions                     │
│  ┌──────────────────────┐  ┌──────────────────────────────────┐ │
│  │    auth.action.ts    │  │       general.action.ts          │ │
│  │                      │  │                                  │ │
│  │  • signUp()          │  │  • createFeedback()              │ │
│  │  • signIn()          │  │  • getInterviewById()            │ │
│  │  • signOut()         │  │  • getFeedbackByInterviewId()    │ │
│  │  • getCurrentUser()  │  │  • getLatestInterviews()         │ │
│  │  • setSessionCookie()│  │  • getInterviewsByUserId()       │ │
│  └──────────────────────┘  └──────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────┘
                              │
          ┌───────────────────┼───────────────────┐
          ▼                   ▼                   ▼
┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐
│  Firebase Auth  │  │    Firestore    │  │   Google AI     │
│                 │  │                 │  │   (Gemini)      │
│  • Session      │  │  • users        │  │                 │
│    cookies      │  │  • interviews   │  │  • Feedback     │
│  • Admin SDK    │  │  • feedback     │  │    generation   │
└─────────────────┘  └─────────────────┘  └─────────────────┘
```

<br/>

## 🛠️ Tech Stack

### Frontend
| Technology | Purpose |
|------------|---------|
| **Next.js 15** | React framework with App Router, Server Components, and Turbopack |
| **React 19** | UI library with latest features including use() hook |
| **TypeScript 5** | Type safety and enhanced developer experience |
| **Tailwind CSS 4** | Utility-first styling with JIT compilation |
| **Radix UI** | Accessible, unstyled UI primitives (Tabs, Labels, Slots) |
| **React Hook Form + Zod** | Form state management with schema validation |

### Backend & Infrastructure
| Technology | Purpose |
|------------|---------|
| **Firebase Admin SDK** | Server-side authentication and database operations |
| **Firestore** | NoSQL document database for users, interviews, and feedback |
| **Next.js Server Actions** | Type-safe server mutations without API routes |

### AI & Voice
| Technology | Purpose |
|------------|---------|
| **VAPI** | Voice AI platform for real-time speech interactions |
| **Vercel AI SDK** | Unified interface for LLM providers |
| **Google Gemini** | Structured output generation for interview feedback |

<br/>

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- Firebase project with Firestore and Authentication enabled
- VAPI account
- Google AI API key

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/crakd.git
cd crakd

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
```

### Environment Variables

```env
# Firebase Client
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=

# Firebase Admin
FIREBASE_PROJECT_ID=
FIREBASE_CLIENT_EMAIL=
FIREBASE_PRIVATE_KEY=

# VAPI
NEXT_PUBLIC_VAPI_WEB_TOKEN=
NEXT_PUBLIC_VAPI_WORKFLOW_ID=

# Google AI
GOOGLE_GENERATIVE_AI_API_KEY=
```

### Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

<br/>

## 📁 Project Structure

```
crakd/
├── 📂 app/
│   ├── 📂 (auth)/              # Auth route group
│   │   ├── sign-in/
│   │   └── sign-up/
│   ├── 📂 (root)/              # Main app route group
│   │   ├── 📂 interview/
│   │   │   ├── page.tsx        # Interview creation
│   │   │   └── [id]/           # Dynamic interview routes
│   │   │       ├── page.tsx    # Interview session
│   │   │       └── feedback/   # Feedback display
│   │   ├── layout.tsx          # Authenticated layout
│   │   └── page.tsx            # Dashboard
│   ├── 📂 api/                 # API routes
│   ├── globals.css
│   └── layout.tsx              # Root layout
│
├── 📂 components/
│   ├── 📂 ui/                  # Radix-based UI components
│   ├── Agent.tsx               # Voice AI interview agent
│   ├── AuthForm.tsx            # Sign in/up form
│   ├── InterviewCard.tsx       # Interview display card
│   └── InterviewForm.tsx       # Interview creation form
│
├── 📂 firebase/
│   ├── admin.ts                # Firebase Admin SDK setup
│   └── client.ts               # Firebase Client SDK setup
│
├── 📂 lib/
│   ├── 📂 actions/
│   │   ├── auth.action.ts      # Authentication server actions
│   │   └── general.action.ts   # Interview/feedback server actions
│   ├── utils.ts                # Utility functions (cn, etc.)
│   └── vapi.sdk.ts             # VAPI SDK configuration
│
├── 📂 constants/               # App constants and schemas
├── 📂 types/                   # TypeScript type definitions
└── 📂 public/                  # Static assets
```

<br/>

## 🔍 Key Implementation Details

### Server-Side Session Management
Authentication uses Firebase Admin SDK to create secure HTTP-only session cookies, preventing XSS attacks while maintaining a seamless user experience.

```typescript
// Session cookie creation with 1-week expiry
const sessionCookie = await auth.createSessionCookie(idToken, {
  expiresIn: 60 * 60 * 24 * 7 * 1000,
});
```

### AI Feedback Generation
Interview transcripts are processed through Google Gemini using the Vercel AI SDK's `generateObject()` for structured, type-safe output.

```typescript
const { object } = await generateObject({
  model: google("gemini-2.0-flash-001"),
  schema: feedbackSchema,
  prompt: `Analyze this interview transcript...`,
});
```

### Real-Time Voice Handling
The Agent component manages VAPI events for speech detection, transcription, and call state with proper cleanup.

```typescript
useEffect(() => {
  vapi.on("call-start", onCallStart);
  vapi.on("message", onMessage);
  vapi.on("speech-start", onSpeechStart);
  // ... event handlers
  
  return () => {
    vapi.off("call-start", onCallStart);
    // ... cleanup
  };
}, []);
```

### Feedback Scoring Categories
Each interview is evaluated across five competency areas:
- 📢 **Communication Skills**: Clarity, articulation, structured responses
- 💡 **Technical Knowledge**: Understanding of role-specific concepts
- 🧩 **Problem Solving**: Analytical thinking and solution proposals
- 🤝 **Cultural & Role Fit**: Alignment with values and job requirements
- 💪 **Confidence & Clarity**: Engagement and response delivery

<br/>

## 📜 Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server with Turbopack |
| `npm run build` | Create production build |
| `npm run start` | Run production server |
| `npm run lint` | Run ESLint checks |

<br/>
