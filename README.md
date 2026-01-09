<div align="center">

# JavaScript & TypeScript Mastery Platform

### A comprehensive, production-grade learning platform for mastering modern JavaScript and TypeScript

[![Next.js](https://img.shields.io/badge/Next.js-16.1-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.2-61DAFB?style=for-the-badge&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)

<br />

[Live Demo](#) · [Report Bug](https://github.com/davidagustin/coding-tricks-practice/issues) · [Request Feature](https://github.com/davidagustin/coding-tricks-practice/issues)

<br />

<img src="https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/rainbow.png" alt="separator" width="100%">

</div>

<br />

## Overview

A **LeetCode-style** interactive coding platform built from the ground up, featuring **155+ hands-on coding challenges** across **19 categories**. This full-stack application demonstrates expertise in modern web development, software architecture, and best practices.

<br />

<div align="center">

| Metric | Value |
|--------|-------|
| **Total Problems** | 155+ |
| **Categories** | 19 |
| **Test Files** | 40+ |
| **Lines of Code** | 140,000+ |
| **Components** | 11 |

</div>

<br />

## Key Features

<table>
<tr>
<td width="50%">

### Interactive Code Editor
- Monaco Editor (VS Code engine) integration
- Syntax highlighting for JavaScript & TypeScript
- Real-time code validation
- Auto-completion and IntelliSense

</td>
<td width="50%">

### Automated Test Runner
- Sandboxed code execution environment
- Comprehensive test case validation
- Detailed error reporting with stack traces
- Performance timing for solutions

</td>
</tr>
<tr>
<td width="50%">

### Modern UI/UX
- Responsive design for all devices
- Dark/Light theme with system preference detection
- Smooth animations and transitions
- Accessibility-first approach (WCAG compliant)

</td>
<td width="50%">

### Progress Tracking
- Persistent progress with localStorage
- Streak tracking system
- Filter by difficulty, category, and completion status
- Real-time statistics dashboard

</td>
</tr>
</table>

<br />

## Tech Stack

<div align="center">

### Frontend
![Next.js](https://img.shields.io/badge/Next.js_16-000000?style=flat-square&logo=next.js&logoColor=white)
![React](https://img.shields.io/badge/React_19-61DAFB?style=flat-square&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript_5.9-3178C6?style=flat-square&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS_4-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white)

### Editor & Testing
![Monaco Editor](https://img.shields.io/badge/Monaco_Editor-007ACC?style=flat-square&logo=visual-studio-code&logoColor=white)
![Jest](https://img.shields.io/badge/Jest-C21325?style=flat-square&logo=jest&logoColor=white)
![Testing Library](https://img.shields.io/badge/Testing_Library-E33332?style=flat-square&logo=testing-library&logoColor=white)

### Tooling
![ESLint](https://img.shields.io/badge/ESLint-4B32C3?style=flat-square&logo=eslint&logoColor=white)
![Biome](https://img.shields.io/badge/Biome-60A5FA?style=flat-square&logo=biome&logoColor=white)
![Husky](https://img.shields.io/badge/Husky-000000?style=flat-square&logo=git&logoColor=white)

</div>

<br />

## Architecture Highlights

```
┌─────────────────────────────────────────────────────────────────┐
│                         Next.js App Router                       │
├─────────────────────────────────────────────────────────────────┤
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────────┐  │
│  │   Pages     │  │  Components │  │    Context Providers    │  │
│  │  ─────────  │  │  ─────────  │  │    ─────────────────    │  │
│  │  • Home     │  │  • CodeEditor│  │  • ThemeProvider       │  │
│  │  • Problems │  │  • TestResults│ │  • ProgressProvider    │  │
│  │  • [id]     │  │  • Navbar    │  │                        │  │
│  └─────────────┘  └─────────────┘  └─────────────────────────┘  │
├─────────────────────────────────────────────────────────────────┤
│  ┌─────────────────────────────────────────────────────────────┐│
│  │                    Test Runner Engine                        ││
│  │  • Sandboxed execution  • Security validation                ││
│  │  • Deep equality checks • Timeout protection                 ││
│  └─────────────────────────────────────────────────────────────┘│
├─────────────────────────────────────────────────────────────────┤
│  ┌─────────────────────────────────────────────────────────────┐│
│  │               Problem Library (155+ Problems)                ││
│  │  19 Categories • 3 Difficulty Levels • Test Cases            ││
│  └─────────────────────────────────────────────────────────────┘│
└─────────────────────────────────────────────────────────────────┘
```

<br />

## Problem Categories

<div align="center">

| Category | Description |
|----------|-------------|
| **JavaScript Basics** | Fundamentals, operators, control flow |
| **Array Methods** | map, filter, reduce, find, and more |
| **Async/Promises** | Promises, async/await, error handling |
| **TypeScript Basics** | Types, interfaces, generics |
| **TypeScript Advanced** | Conditional types, mapped types, infer |
| **Functional Programming** | Currying, composition, memoization |
| **ES6+ Features** | Destructuring, spread, template literals |
| **Design Patterns** | Factory, singleton, observer, decorator |
| **Data Structures** | Sets, Maps, WeakMap, WeakSet |
| **Algorithms** | Sorting, searching, recursion |
| **DOM/Browser** | Events, storage, intersection observer |
| **Performance** | Optimization, debounce, throttle |
| **Testing Patterns** | Mocks, stubs, TDD practices |
| **Error Handling** | Try/catch, custom errors, boundaries |
| **Regular Expressions** | Patterns, lookahead, validation |
| **String Methods** | Manipulation, formatting, parsing |
| **Object Methods** | Keys, values, entries, freeze |
| **Date & Time** | Formatting, timezones, calculations |
| **Numbers & Math** | Precision, formatting, BigInt |

</div>

<br />

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/davidagustin/coding-tricks-practice.git

# Navigate to the project
cd coding-tricks-practice

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

<br />

## Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server

# Testing
npm test             # Run all tests
npm run test:watch   # Run tests in watch mode
npm run test:coverage # Run tests with coverage report

# Code Quality
npm run lint         # Run ESLint
npm run format       # Format code with Biome
```

<br />

## Project Structure

```
├── app/                          # Next.js App Router
│   ├── page.tsx                  # Home page with statistics
│   ├── layout.tsx                # Root layout with providers
│   ├── error.tsx                 # Global error boundary
│   ├── loading.tsx               # Loading skeleton
│   ├── not-found.tsx             # 404 page
│   └── problems/
│       ├── page.tsx              # Problems list with filtering
│       ├── error.tsx             # Problems error boundary
│       └── [id]/
│           ├── page.tsx          # Problem detail page
│           ├── error.tsx         # Problem error boundary
│           └── not-found.tsx     # Problem not found page
│
├── components/                   # React components
│   ├── CodeEditor.tsx            # Monaco Editor wrapper
│   ├── TestResults.tsx           # Test results display
│   ├── ProblemDescription.tsx    # Problem info with tabs
│   ├── ProblemTable.tsx          # Problems list table
│   ├── FilterSidebar.tsx         # Filter controls
│   ├── Navbar.tsx                # Navigation with settings
│   ├── ThemeToggle.tsx           # Dark/light mode toggle
│   ├── ThemeProvider.tsx         # Theme context provider
│   ├── ProgressProvider.tsx      # Progress tracking context
│   └── ErrorBoundary.tsx         # Error boundary component
│
├── lib/                          # Core libraries
│   ├── problems/                 # 155+ problem definitions
│   │   ├── index.ts              # Problem exports
│   │   └── [problem-name].ts     # Individual problems
│   ├── problems.ts               # Problem utilities
│   ├── test-runner.ts            # Sandboxed test execution
│   └── constants.ts              # App constants
│
├── __tests__/                    # Test suites (40+ files)
│   ├── app/                      # Page tests
│   ├── components/               # Component tests
│   └── lib/                      # Library tests
│
└── stories/                      # Storybook stories
```

<br />

## Security Features

- **Sandboxed Code Execution**: User code runs in an isolated environment
- **Input Sanitization**: All inputs validated and sanitized with DOMPurify
- **Function Name Validation**: Prevents code injection attacks
- **Timeout Protection**: Prevents infinite loops and resource exhaustion
- **XSS Prevention**: Content Security Policy compliant

<br />

## Performance Optimizations

- **React.memo** for expensive component renders
- **useCallback/useMemo** for stable references
- **Code splitting** with Next.js dynamic imports
- **Optimized re-renders** with proper key management
- **Efficient filtering** with single-pass algorithms
- **Lazy loading** for Monaco Editor

<br />

## Accessibility

- **WCAG 2.1 AA** compliant
- Keyboard navigation support
- Screen reader announcements with `aria-live`
- Proper focus management
- Color contrast ratios maintained
- Semantic HTML structure

<br />

## Deployment

### Vercel (Recommended)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/davidagustin/coding-tricks-practice)

The application is optimized for Vercel's edge network with:
- Automatic HTTPS
- Global CDN distribution
- Zero-config deployment
- Preview deployments for PRs

<br />

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<br />

## License

This project is open source and available under the [MIT License](LICENSE).

<br />

---

<div align="center">

**Built with passion for learning and teaching JavaScript & TypeScript**

<br />

[![GitHub stars](https://img.shields.io/github/stars/davidagustin/coding-tricks-practice?style=social)](https://github.com/davidagustin/coding-tricks-practice)

</div>
