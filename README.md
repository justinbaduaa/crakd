# 🐣 Crakd

An AI-powered mock interview platform where users practice interviews through real-time voice conversations with an AI interviewer. Built with Next.js 15, Firebase, and VAPI for voice AI. The app generates personalized feedback using Google's Gemini model, scoring users across multiple competency areas.

## 📦 Technologies

- Next.js 15
- React 19
- TypeScript
- Firebase (Auth + Firestore)
- VAPI (Voice AI)
- Vercel AI SDK
- Google Gemini
- Tailwind CSS 4
- Radix UI
- React Hook Form
- Zod

## 🦄 Features

Here's what you can do with Crakd:

- **Create Custom Interviews**: Set up practice interviews for any role or industry. Specify the job title, tech stack, and interview type.

- **Voice Conversations**: Speak naturally with an AI interviewer. The conversation flows like a real interview with real-time speech recognition and responses.

- **Receive AI Feedback**: After each session, get detailed scores across five categories: Communication, Technical Knowledge, Problem Solving, Cultural Fit, and Confidence.

- **Track Your Progress**: View your interview history and see how you've improved over time. Each session is saved with its feedback.

- **Retake Interviews**: Practice the same interview multiple times to measure your improvement and refine your answers.

## 👩🏽‍🍳 The Process

I started by setting up the authentication system using Firebase Auth with server-side session management. I chose HTTP-only cookies over client-side tokens to prevent XSS attacks and keep the auth flow secure.

Next, I built the interview creation flow where users can specify their target role, select technologies, and choose an interview type. This data gets stored in Firestore and used to generate contextual questions.

The core challenge was integrating VAPI for the voice AI component. I created an Agent component that handles the entire call lifecycle: connecting to VAPI, managing speech events, capturing transcripts in real-time, and gracefully handling disconnections. The tricky part was managing the state transitions between inactive, connecting, active, and finished states while keeping the UI responsive.

For the feedback system, I used the Vercel AI SDK with Google Gemini. After each interview ends, the full transcript gets sent to Gemini with a structured prompt. I used `generateObject()` with a Zod schema to ensure the AI returns properly typed feedback with scores and recommendations.

I implemented Next.js 15 server actions throughout the app instead of traditional API routes. This kept sensitive operations server-side while maintaining type safety between client and server.

Finally, I added the dashboard where users can see their past interviews alongside community interviews they can practice with.

## 📚 What I Learned

Building this project taught me several important concepts:

### 🔐 Server-Side Session Management
I learned how Firebase Admin SDK creates secure session cookies and why HTTP-only cookies are important for security. Understanding the difference between client-side tokens and server-managed sessions was valuable.

### 🎙️ Real-Time Voice Event Handling
Working with VAPI's event system taught me about managing real-time audio streams. I had to handle events like `call-start`, `speech-start`, `speech-end`, and `message` while keeping the UI in sync.

### 🧠 Structured AI Outputs
Using `generateObject()` from the Vercel AI SDK showed me how to get reliable, typed responses from LLMs. Instead of parsing free-form text, the schema ensures the AI returns exactly what the app expects.

### ⚡ Next.js 15 Server Actions
Server actions simplified my code significantly. No more creating separate API routes for each operation. The `"use server"` directive makes it clear what runs on the server.

### 🔄 State Machine Thinking
Managing the call status (inactive, connecting, active, finished) taught me to think in terms of state machines. Each state has specific allowed transitions and UI representations.

## 💭 How It Could Be Improved

- Add more interview types like behavioral, case study, or coding interviews
- Implement a practice mode without voice for users who prefer typing
- Add interview templates from real companies
- Create a leaderboard or community features
- Add support for uploading resumes to personalize questions
- Implement spaced repetition for practicing weak areas
- Add video recording to review body language

## 🚦 Running the Project

To run the project in your local environment, follow these steps:

1. Clone the repository to your local machine.
2. Run `npm install` in the project directory to install the required dependencies.
3. Create a `.env.local` file with your Firebase, VAPI, and Google AI credentials.
4. Run `npm run dev` to start the development server.
5. Open [http://localhost:3000](http://localhost:3000) in your browser to view the app.

### Environment Variables Needed

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
