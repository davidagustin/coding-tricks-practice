# JavaScript & TypeScript Tricks Practice

A LeetCode-like application for practicing advanced JavaScript and TypeScript patterns and techniques. Master destructuring, optional chaining, template literal types, discriminated unions, and more through hands-on coding challenges.

## Features

- 🎯 **56 Practice Problems** covering essential JS/TS patterns
- 💻 **Interactive Code Editor** with syntax highlighting (Monaco Editor)
- ✅ **Automated Test Runner** to verify your solutions
- 📚 **Enhanced Descriptions** with in-depth explanations, importance, and practical applications
- 🎨 **Modern UI** with dark mode support and smooth animations
- 🚀 **Next.js & Vercel Ready** for easy deployment

## Topics Covered

### JavaScript Basics
- Destructuring with defaults, nullish coalescing, optional chaining
- Array methods: reduce, map, filter, find, some, every
- Object manipulation: Object.entries, Object.fromEntries
- Spread operator patterns and tricks

### Async/Promises
- Promise.race for timeouts
- Promise.all vs Promise.allSettled
- Promise chaining and error handling
- Async/await patterns
- Abort Controller
- Retry patterns

### Advanced JavaScript
- Proxy API and traps
- WeakMap & WeakSet (with enhanced explanations)
- Symbol usage
- Reflect API
- Object.freeze & Object.seal
- Property descriptors
- Generator functions
- Tagged template literals

### TypeScript Basics
- Basic types and annotations
- Interfaces and type aliases
- Generics
- Union & intersection types
- Optional & readonly modifiers
- Type guards
- Enums

### TypeScript Advanced
- Conditional types
- Mapped types
- Infer keyword
- Branded types
- Template literal types

### Functional Programming
- Currying (with enhanced explanations)
- Memoization (with enhanced explanations)
- Pipe & Compose (with enhanced explanations)
- Debounce & Throttle (with enhanced explanations)

## Getting Started

First, install dependencies:

```bash
npm install
```

Then, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

## Project Structure

```
├── app/
│   ├── page.tsx              # Home page
│   ├── problems/
│   │   ├── page.tsx          # Problems list
│   │   └── [id]/
│   │       └── page.tsx      # Individual problem page
│   └── layout.tsx            # Root layout
├── components/
│   ├── CodeEditor.tsx        # Code editor component
│   ├── TestResults.tsx       # Test results display
│   └── ProblemDescription.tsx # Problem description
├── lib/
│   ├── problems.ts           # Problem definitions
│   └── test-runner.ts        # Test execution logic
└── package.json
```

## How It Works

1. **Browse Problems**: Visit `/problems` to see all available challenges
2. **Select a Problem**: Click on any problem to start practicing
3. **Write Code**: Use the code editor to implement your solution
4. **Run Tests**: Click "Run Tests" to verify your solution
5. **View Solution**: Click "Show Solution" to see the reference implementation

## Problem Format

Problems are defined in `lib/problems.ts`. Each problem includes:
- **Title, difficulty, and category**
- **Enhanced Description** with:
  - In-Depth Explanation of the concept
  - Importance and why it matters
  - Usefulness & Practical Applications
- **Examples** with input/output and explanations
- **Starter code template** to begin with
- **Solution code** for reference
- **Comprehensive test cases** to verify solutions
- **Hints** to guide problem-solving

Many problems now feature enhanced descriptions that provide deeper context about why these patterns matter and how they're used in real-world applications.

## Deployment

This project is ready to deploy on Vercel:

1. Push your code to GitHub
2. Import the repository on [Vercel](https://vercel.com)
3. Deploy with zero configuration

The app is fully compatible with Vercel's serverless functions and edge runtime.

## Technologies Used

- **Next.js 16** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **React 19** - UI library

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [JavaScript MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
