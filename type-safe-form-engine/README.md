# Type-Safe Form Engine

**Dynamic JSON schema → React form with full TypeScript type inference.**

Build type-safe forms directly from schema definitions. Form values are automatically typed at compile time with zero runtime assertions.

## Features

- ✅ **Full type inference** — No manual typing needed
- ✅ **Nested objects** — Recursive type support
- ✅ **Auto-inferred validation** — From field metadata
- ✅ **Conditional visibility** — Show/hide fields based on values
- ✅ **Format validators** — Email, URL, date, custom patterns
- ✅ **Advanced TypeScript** — Conditional types, discriminated unions, mapped types

## Quick Start

```bash
npm install
npm run dev
```

Opens at `http://localhost:5173`

## Example

```typescript
const userSchema = {
  type: "object",
  fields: {
    name: { type: "string", required: true, minLength: 2 },
    email: { type: "string", format: "email" },
    age: { type: "number", min: 18, max: 120 },
  },
} as const;

// Form values are automatically typed!
<DynamicForm<typeof userSchema>
  schema={userSchema}
  onSubmit={(values) => {
    // values: { name: string; email?: string; age?: number }
  }}
/>
```

## TypeScript Patterns

- Conditional types with recursive inference
- Discriminated unions with exhaustive narrowing
- Mapped types for metadata extraction
- Generic constraints and type predicates
- Recursive type operations

## Project Structure

```
src/
├── types/field.ts           # Type system & inference
├── components/              # Form components
├── hooks/                   # useFormState, useFormValidation
├── utils/                   # Validators, guards, visibility
└── schema/predefined.ts     # 5 example schemas
```

## Build & Commands

```bash
npm run build
npm run lint
```

## Tech Stack

- React 19.2 + TypeScript 5.9
- Vite + ESLint
- CSS Grid responsive layout
