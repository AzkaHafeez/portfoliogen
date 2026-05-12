# Portfolio Generator

A student-focused portfolio/CV builder that creates ATS-friendly, professional two-column portfolios in minutes. No design skills needed — just fill in the form and export.

## Features

### Guided 4-Step Wizard
- **Step 1 — Basics**: Name, summary, contact info, and up to 2 education entries (each with degree, institution, location, date range, grade, and relevant coursework)
- **Step 2 — Skills**: Programming languages, tools, and frameworks with quick-select buttons and custom entries
- **Step 3 — Projects**: Add 1–4 projects with role/subtitle, custom bullet points, impact statement, and tech stack
- **Step 4 — Extras**: Spoken languages with proficiency levels, achievements, certifications, and additional info (clubs, orgs)

### Two-Column CV Layout
Professional two-column design with blue-accented section headings:
- **Left column**: Name, summary, projects (with role, tech stack, bullets, impact), and educational background
- **Right column**: Contact info, skills (grouped), spoken languages, certifications, and additional information

### User-Written Bullets
Write your own project bullet points — no auto-generated fluff. The app provides gentle formatting cleanup and tips to start with action verbs.

### Live Preview
Real-time side-by-side preview as you type. See exactly how your CV will look before exporting.

### Export Options
- **Download PDF**: Opens a print-ready page — save as PDF from your browser
- **Download HTML**: Standalone HTML file you can host anywhere
- **Copy Text**: ATS-safe plain text for pasting into job applications
- **Auto-save**: All data persists in localStorage automatically

## Tech Stack

- **React 18 + Vite** — Fast development and hot module replacement
- **Tailwind CSS v4** — Utility-first styling
- **localStorage** — Client-side data persistence (no backend needed)

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
│   ├── StepBasics.jsx     # Personal info + education (up to 2 entries with coursework)
│   ├── StepTools.jsx      # Skills selection (languages, tools, frameworks)
│   ├── StepProjects.jsx   # Project entries (1-4 with bullets, role, impact)
│   ├── StepExtras.jsx     # Spoken languages, achievements, certs, additional info
│   └── Preview.jsx        # Live two-column CV preview
├── utils/
│   ├── bulletWriter.js    # Bullet formatting utilities
│   └── export.js          # HTML/PDF/text export with two-column layout
├── App.jsx                # Main wizard container with data model & migration
└── index.css              # Tailwind imports
```

## Data Model

The app stores all portfolio data in a single state object with auto-save to localStorage. Old data formats (flat education fields, problem/solution project fields) are automatically migrated on load.

---

*Built for students, by students*
