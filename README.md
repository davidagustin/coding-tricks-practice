# JavaScript & TypeScript Tricks Practice

A LeetCode-like application for practicing advanced JavaScript and TypeScript patterns and techniques. Master destructuring, optional chaining, template literal types, discriminated unions, and more through hands-on coding challenges.

## Features

- 🎯 **12+ Practice Problems** covering essential JS/TS patterns
- 💻 **Interactive Code Editor** with syntax highlighting
- ✅ **Automated Test Runner** to verify your solutions
- 📚 **Detailed Explanations** with examples and hints
- 🎨 **Modern UI** with dark mode support
- 🚀 **Next.js & Vercel Ready** for easy deployment

## Topics Covered

- **JavaScript Basics**: Destructuring with defaults, nullish coalescing, optional chaining
- **Array Methods**: flatMap, Map for deduplication, Object.entries/fromEntries
- **Async/Promises**: Promise.race for timeouts, Promise.allSettled
- **TypeScript Advanced**: Template literal types, const assertions, satisfies operator, exhaustive switches, discriminated unions, conditional types

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

## Adding New Problems

Problems are defined in `lib/problems.ts`. Each problem includes:
- Title, difficulty, and category
- Description and examples
- Starter code template
- Solution code
- Test cases
- Hints

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
