<div align="center">

<!-- Hero Section -->
<img src="https://capsule-render.vercel.app/api?type=waving&color=gradient&customColorList=6,11,20&height=180&section=header&text=JS%20%2F%20TS%20Mastery&fontSize=42&fontColor=fff&animation=twinkling&fontAlignY=32&desc=Master%20JavaScript%20%26%20TypeScript%20Through%20Practice&descSize=18&descAlignY=52"/>

<br/>

<p>
  <strong>A LeetCode-style coding platform with 155+ challenges across 19 categories</strong>
</p>

<p>
  <a href="#-quick-start">Quick Start</a> •
  <a href="#-features">Features</a> •
  <a href="#-problem-categories">Categories</a> •
  <a href="#-tech-stack">Tech Stack</a> •
  <a href="#-contributing">Contributing</a>
</p>

<br/>

<!-- Badges -->
<p>
  <img src="https://img.shields.io/badge/Next.js-16.1-000000?style=for-the-badge&logo=next.js&logoColor=white" alt="Next.js"/>
  <img src="https://img.shields.io/badge/React-19.2-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React"/>
  <img src="https://img.shields.io/badge/TypeScript-5.9-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript"/>
  <img src="https://img.shields.io/badge/Tailwind-4.0-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="Tailwind CSS"/>
</p>

<br/>

<!-- Stats Cards -->
<table>
<tr>
<td align="center"><h3>155+</h3><sub>Problems</sub></td>
<td align="center"><h3>19</h3><sub>Categories</sub></td>
<td align="center"><h3>40+</h3><sub>Test Files</sub></td>
<td align="center"><h3>140K+</h3><sub>Lines of Code</sub></td>
</tr>
</table>

</div>

<br/>

---

<br/>

## What is This?

A **production-grade learning platform** for mastering JavaScript and TypeScript through hands-on coding challenges. Think LeetCode, but focused entirely on JS/TS fundamentals, patterns, and best practices.

Built with the latest technologies and following modern development practices, this platform offers:

- **Real coding environment** powered by Monaco Editor (the engine behind VS Code)
- **Instant feedback** with automated test runners and detailed error reporting
- **Progress tracking** to monitor your learning journey
- **Beautiful UI** with dark/light themes and responsive design

<br/>

---

<br/>

## Features

<table>
<tr>
<td width="50%" valign="top">

### Code Editor

- Monaco Editor integration (VS Code engine)
- Syntax highlighting for JS & TS
- Real-time code validation
- Auto-completion & IntelliSense
- Multiple themes support

</td>
<td width="50%" valign="top">

### Test Runner

- Sandboxed code execution
- Comprehensive test validation
- Detailed error reporting
- Stack traces for debugging
- Performance timing

</td>
</tr>
<tr>
<td width="50%" valign="top">

### Progress System

- Persistent localStorage progress
- Streak tracking
- Filter by difficulty/category
- Completion statistics
- Real-time dashboard

</td>
<td width="50%" valign="top">

### Modern UI/UX

- Responsive design
- Dark/Light themes
- System preference detection
- Smooth animations
- WCAG 2.1 AA accessible

</td>
</tr>
</table>

<br/>

---

<br/>

## Quick Start

```bash
# Clone the repository
git clone https://github.com/davidagustin/coding-tricks-practice.git

# Navigate to project
cd coding-tricks-practice

# Install dependencies
npm install

# Start development server
npm run dev
```

Open **[http://localhost:3000](http://localhost:3000)** and start coding!

<br/>

<details>
<summary><strong>All Available Scripts</strong></summary>

<br/>

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm test` | Run all tests |
| `npm run test:watch` | Run tests in watch mode |
| `npm run test:coverage` | Generate coverage report |
| `npm run lint` | Run ESLint |
| `npm run format` | Format with Biome |

</details>

<br/>

---

<br/>

## Problem Categories

<div align="center">

| | Category | Topics |
|:---:|----------|--------|
| 📘 | **JavaScript Basics** | Fundamentals, operators, control flow |
| 📦 | **Array Methods** | map, filter, reduce, find, every, some |
| ⏳ | **Async/Promises** | Promises, async/await, error handling |
| 🔷 | **TypeScript Basics** | Types, interfaces, generics |
| 🔶 | **TypeScript Advanced** | Conditional types, mapped types, infer |
| 🧮 | **Functional Programming** | Currying, composition, memoization |
| ✨ | **ES6+ Features** | Destructuring, spread, modules |
| 🏗️ | **Design Patterns** | Factory, singleton, observer, decorator |
| 🗃️ | **Data Structures** | Sets, Maps, WeakMap, WeakSet |
| 🔍 | **Algorithms** | Sorting, searching, recursion |
| 🌐 | **DOM/Browser** | Events, storage, observers |
| ⚡ | **Performance** | Optimization, debounce, throttle |
| 🧪 | **Testing Patterns** | Mocks, stubs, TDD practices |
| 🚨 | **Error Handling** | Try/catch, custom errors |
| 🔤 | **Regular Expressions** | Patterns, lookahead, validation |
| 📝 | **String Methods** | Manipulation, formatting, parsing |
| 🔑 | **Object Methods** | Keys, values, entries, freeze |
| 📅 | **Date & Time** | Formatting, timezones, calculations |
| 🔢 | **Numbers & Math** | Precision, formatting, BigInt |

</div>

<br/>

---

<br/>

## Tech Stack

<div align="center">

### Core Framework
<p>
<img src="https://skillicons.dev/icons?i=nextjs,react,typescript,tailwind" />
</p>

### Development Tools
<p>
<img src="https://skillicons.dev/icons?i=vscode,jest,git,vercel" />
</p>

</div>

<br/>

<details>
<summary><strong>Full Technology Breakdown</strong></summary>

<br/>

**Frontend**
- Next.js 16 (App Router)
- React 19
- TypeScript 5.9
- Tailwind CSS 4.0

**Editor**
- Monaco Editor
- Custom syntax highlighting
- IntelliSense integration

**Testing**
- Jest
- React Testing Library
- 40+ test suites

**Quality**
- ESLint
- Biome
- Husky pre-commit hooks

**Deployment**
- Vercel optimized
- Edge-ready
- Global CDN

</details>

<br/>

---

<br/>

## Architecture

```
coding-tricks-practice/
├── app/                          # Next.js App Router
│   ├── page.tsx                  # Home with stats
│   ├── layout.tsx                # Root layout
│   ├── problems/
│   │   ├── page.tsx              # Problems list
│   │   └── [id]/page.tsx         # Problem detail
│
├── components/                   # React Components
│   ├── CodeEditor.tsx            # Monaco wrapper
│   ├── TestResults.tsx           # Test display
│   ├── ProblemTable.tsx          # Problems list
│   ├── FilterSidebar.tsx         # Filters
│   ├── Navbar.tsx                # Navigation
│   └── ThemeToggle.tsx           # Theme switcher
│
├── lib/                          # Core Logic
│   ├── problems/                 # 155+ problems
│   ├── test-runner.ts            # Sandboxed execution
│   └── constants.ts              # App constants
│
└── __tests__/                    # Test Suites
    ├── app/                      # Page tests
    ├── components/               # Component tests
    └── lib/                      # Library tests
```

<br/>

---

<br/>

## Security & Performance

<table>
<tr>
<td width="50%" valign="top">

### Security

- Sandboxed code execution
- Input sanitization (DOMPurify)
- Function name validation
- Timeout protection
- XSS prevention (CSP compliant)

</td>
<td width="50%" valign="top">

### Performance

- React.memo optimization
- useCallback/useMemo hooks
- Dynamic code splitting
- Lazy-loaded Monaco Editor
- Efficient filtering algorithms

</td>
</tr>
</table>

<br/>

---

<br/>

## Deployment

<div align="center">

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/davidagustin/coding-tricks-practice)

</div>

Optimized for Vercel with automatic HTTPS, global CDN, and zero-config deployment.

<br/>

---

<br/>

## Contributing

Contributions are welcome! Here's how you can help:

1. **Fork** the repository
2. **Create** your feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

<br/>

---

<br/>

## License

This project is open source under the [MIT License](LICENSE).

<br/>

---

<div align="center">

<br/>

**Built for developers who want to master JavaScript & TypeScript**

<br/>

<a href="https://github.com/davidagustin/coding-tricks-practice">
  <img src="https://img.shields.io/github/stars/davidagustin/coding-tricks-practice?style=for-the-badge&logo=github&color=yellow" alt="GitHub Stars"/>
</a>

<br/>
<br/>

<img src="https://capsule-render.vercel.app/api?type=waving&color=gradient&customColorList=6,11,20&height=100&section=footer"/>

</div>
