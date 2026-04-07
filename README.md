# Config-Driven Analytics Platform

A collection of **4 technical projects** showcasing advanced frontend engineering expertise.

---

## Projects

### 1. Type-Safe Form Engine ✅

**Advanced TypeScript**

- Conditional types with recursive inference
- Discriminated unions and mapped types
- Generic constraints and type predicates
- JSON schema → auto-typed React forms

**[View Project](type-safe-form-engine/)**

---

### 2. React Rendering Internals ✅

**React Fiber & Performance**

✅ Completed demo app with a 10,000-row list, filter bar, KPI cards, and chart placeholder.

- Shows baseline anti-patterns vs incremental optimizations:
	- stable keys
	- `useMemo` (derived values)
	- `useCallback` (stable handlers)
	- `React.memo` (including memoized rows)
	- context partitioning (filter vs selection)
- Profiler evidence (preview build):
	- Scenario A (typing): 336.1ms → 279.4ms
	- Scenario B (selection): 333.3ms → 263.8ms

**[View Project](react-rendering-internals/)**

---

### 3. Performance Profiling Tools 🚧

**Metrics & Monitoring**

- Custom performance hooks
- Runtime metrics collection
- Bottleneck identification
- Real User Monitoring (RUM)

---

### 4. Frontend Scaling Architecture 🚧

**System Design & Patterns**

- State management patterns
- Data fetching strategies
- Code splitting and caching
- Scalable frontend systems

---

## Quick Start

Type-Safe Form Engine:

```bash
cd type-safe-form-engine
npm install
npm run dev
```

React Rendering Internals (preview build for profiling):

```bash
cd react-rendering-internals
npm install
npm run build
npm run preview
```

## Tech Stack

- TypeScript 5.9 + React 19
- Vite + ESLint
- Performance APIs & Web Vitals

**Demonstrating comprehensive frontend engineering expertise.** 🚀
