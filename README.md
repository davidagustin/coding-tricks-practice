# JavaScript & TypeScript Tricks Practice

A LeetCode-like application for practicing advanced JavaScript and TypeScript patterns and techniques. Master destructuring, optional chaining, template literal types, discriminated unions, and more through hands-on coding challenges.

## ✨ Features

- 🎯 **56+ Practice Problems** covering essential JS/TS patterns
- 💻 **Interactive Code Editor** with syntax highlighting (Monaco Editor)
- ✅ **Automated Test Runner** to verify your solutions
- 📚 **Enhanced Descriptions** with in-depth explanations, importance, and practical applications
- 🎨 **Modern UI** with dark mode support and smooth animations
- 🚀 **Next.js & Vercel Ready** for easy deployment

## 🚀 Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

### Testing

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage

# Test specific agent's problems (1-4)
npm run test:agent 1

# Test a specific problem
npm run test:agent 1 reduce-grouping

# Test all problems
npm run test:agent all
```

## 📁 Project Structure

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
│   ├── ProblemDescription.tsx # Problem description
│   └── ErrorHandler.tsx      # Error handling component
├── lib/
│   ├── problems.ts           # Problem definitions (56 problems)
│   └── test-runner.ts        # Test execution logic
├── scripts/
│   └── test-problems.ts      # Script to test problems by agent
└── __tests__/                # Test files
```

## 🎯 Topics Covered

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
- WeakMap & WeakSet
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
- Currying
- Memoization
- Pipe & compose
- Debounce & throttle

## 📖 How It Works

1. **Browse Problems**: Visit `/problems` to see all available challenges
2. **Select a Problem**: Click on any problem to start practicing
3. **Write Code**: Use the code editor to implement your solution
4. **Run Tests**: Click "Run Tests" to verify your solution
5. **View Solution**: Click "Show Solution" to see the reference implementation

## 🔧 Adding New Problems

Problems are defined in `lib/problems.ts`. Each problem includes:

```typescript
{
  id: 'unique-problem-id',
  title: 'Problem Title',
  difficulty: 'easy' | 'medium' | 'hard',
  category: 'Category Name',
  description: 'Problem description with markdown support',
  examples: [
    {
      input: 'Code example',
      output: 'Expected output',
      explanation: 'Optional explanation'
    }
  ],
  starterCode: 'Initial code template',
  solution: 'Reference solution',
  testCases: [
    {
      input: [...],
      expectedOutput: {...},
      description: 'Optional description'
    }
  ],
  hints: ['Hint 1', 'Hint 2', ...]
}
```

## 👥 Agent Review System

The 56 problems are split into 4 equal groups for parallel review:

### Agent 1: Problems 1-14
Array Methods & Promises Basics
- `reduce-grouping`, `map-deduplication`, `object-entries`
- `promise-race-timeout`, `promise-allsettled`, `find-vs-filter`
- `array-chaining`, `reduce-right`, `some-every`, `array-from`
- `partition-pattern`, `chunk-arrays`, `promise-all-vs-allsettled`, `async-generators`

### Agent 2: Problems 15-28
Promises Advanced & TypeScript Basics
- `abort-controller`, `retry-pattern`, `promise-chaining`
- `error-boundaries`, `promise-constructor`, `async-await-error`
- `promise-race-first`, `promise-finally`
- `basic-typescript-types`, `interfaces`, `type-aliases`
- `generics-basic`, `union-intersection`, `optional-readonly`

### Agent 3: Problems 29-42
Advanced JavaScript Features
- `type-guards`, `enums`, `proxy-api`, `weakmap-weakset`
- `symbol-usage`, `reflect-api`, `object-freeze-seal`
- `property-descriptors`, `computed-property-names`
- `spread-operator-patterns`, `spread-operator-tricks`
- `short-circuit-evaluation`, `tagged-template-literals`, `reduce-patterns`

### Agent 4: Problems 43-56
Functional Programming & Advanced TypeScript
- `array-from-tricks`, `sort-comparators`, `string-padding`
- `currying`, `memoization`, `pipe-compose`, `debounce-throttle`
- `mapped-types`, `conditional-types`, `infer-keyword`
- `branded-types`, `proxy-traps`, `generator-functions`, `weak-collections`

### Review Checklist

For each problem, agents should verify:

- ✅ **Runtime Errors**: Code executes without errors
- ✅ **Code Review**: Solution is correct and follows best practices
- ✅ **Logic Verification**: Solution logic is sound
- ✅ **Research**: Solution uses appropriate patterns
- ✅ **Documentation**: All findings documented

## 🚢 Deployment

This project is ready to deploy on Vercel:

1. Push your code to GitHub
2. Import the repository on [Vercel](https://vercel.com)
3. Deploy with zero configuration

The app is fully compatible with Vercel's serverless functions and edge runtime.

## 🛠️ Technologies Used

- **Next.js 16** - React framework with App Router
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **React 19** - UI library
- **Monaco Editor** - Code editor component
- **Jest** - Testing framework

## 📚 Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [JavaScript MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
- [React Documentation](https://react.dev)

## 📝 License

This project is open source and available for learning purposes.
