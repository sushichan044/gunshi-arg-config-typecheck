# Gunshi Arg Config Typecheck

A proof of concept for automatically generating CLI argument schemas from nested configuration objects using TypeScript's advanced type system.

## Overview

Combines with the Gunshi CLI framework to achieve type-safe mapping from object types to flat CLI arguments.

## Core Technology

### `FlattenObject<T>` Type

Flattens nested objects using dot notation:

```typescript
type Config = {
  root: string;
  featureOne: {
    exclude: string[];
    include: string[];
  };
};

// Automatically converts to:
// {
//   "root": string;
//   "featureOne.exclude": string[];
//   "featureOne.include": string[];
// }
```

### CLI Argument Schema Generation

```typescript
type ExtractArgSchemaFromObject<TObj> = {
  [K in keyof FlattenObject<TObj>]: ArgSchema;
};

// Usage example
const args = {
  root: { default: process.cwd(), type: "string" },
  "featureOne.exclude": { parse: parseCommaSeparatedString, type: "custom" },
  "featureOne.include": { parse: parseCommaSeparatedString, type: "custom" },
} satisfies ExtractArgSchemaFromObject<Config>;
```

## Usage

```bash
# Install dependencies
bun install

# Run
./src/index.ts
./src/index.ts featureOne --featureOne.exclude="*.test.ts" --featureOne.include="src/**"

# Type check
bun run typecheck

# Run tests
bun test
```

## Features

- **Type-level Programming**: Flattens object structures at compile time
- **Terminal Array Handling**: Arrays are treated as terminal values without recursive flattening
- **Type Safety**: Guarantees complete correspondence between CLI arguments and object types
- **Satisfies Pattern**: Statically verifies type conformance of schema definitions
