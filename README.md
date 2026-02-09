# Portfolio Generator

A student-focused portfolio builder that creates ATS-friendly, one-page portfolios in minutes. No design paralysis. No "what should I write?" stress.

## Features

### Guided Input (Form Wizard)
- **Step 1 - Basics**: Name, degree, university, email, GitHub, LinkedIn
- **Step 2 - Courses**: Select from common CS courses or add custom ones
- **Step 3 - Skills**: Languages, tools, and frameworks with grouped buttons
- **Step 4 - Projects**: Add 1-3 projects with problem/solution descriptions

### Auto-Written Bullets (Killer Feature)
The app automatically rewrites casual project descriptions into professional, recruiter-ready bullets.

**Example:**
- User input: *"Made a todo app using React and Firebase"*
- Generated: 
  - *Built a React-based task management application with real-time Firebase integration*
  - *Implemented using React, Firebase with real-time data synchronization*

### Live Preview
Real-time preview as you type. Clean, black & white, single-column layout optimized for ATS systems.

### Export Options
- **Download HTML**: Get a standalone HTML file to host anywhere
- **Copy Text**: ATS-safe plain text for pasting into applications
- **Auto-save**: Data persists in localStorage

## Tech Stack

- **React + Vite** - Fast development and builds
- **Tailwind CSS** - Minimal, utility-first styling
- **Plain JS** - Bullet rewriting with pattern matching (no ML needed)
- **localStorage** - Client-side persistence

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## Project Structure

```
src/
├── components/
│   ├── StepBasics.jsx    # Personal info form
│   ├── StepCourses.jsx   # Course selection
│   ├── StepTools.jsx     # Skills/tech stack
│   ├── StepProjects.jsx  # Project entries
│   └── Preview.jsx       # Live portfolio preview
├── utils/
│   ├── bulletWriter.js   # Auto bullet generation
│   └── export.js         # HTML/text export utilities
├── App.jsx               # Main wizard container
└── index.css             # Tailwind imports
```

## Why This Project Stands Out

- **UX thinking** - Progressive disclosure, no overwhelming forms
- **Real user pain awareness** - Solves actual student portfolio struggles
- **Text transformation logic** - Pattern matching and text enhancement
- **Product sense** - Opinionated design choices that reduce decision fatigue

---

*Built for students, by students*
