# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

```bash
# Install dependencies
bun install

# Build and type checking
bun run typecheck

# Linting and formatting
bun run lint          # ESLint with auto-fix
bun run format        # Biome format with write
bun run format:check  # Biome format check (GitHub reporter)

# Testing
bun test             # Run Vitest tests (includes type checking)
```

## Project Architecture

This is a TypeScript library demonstrating type-safe configuration flattening using the `gunshi` CLI framework. The architecture revolves around:

### Core Type System (`src/types.ts`)

- `FlattenObject<T>`: Advanced utility type that flattens nested objects into dot-notation keys
- `FlattenKeys<T>`: Helper type for extracting flattened property paths
- `PlainObjectLike`: Base constraint for objects that can be flattened
- Handles complex scenarios: optional properties, arrays (treated as terminal values), discriminated unions

### CLI Implementation (`src/cli.ts`)

- Uses `gunshi` framework for command-line interface
- `ExtractArgSchemaFromObject<T>`: Maps flattened object structure to CLI argument schemas
- Demonstrates type-safe CLI argument parsing with nested configuration objects
- Main command and `featureOne` subcommand showcase the flattening approach

### Configuration Schema (`src/config.ts`)

- Defines the `Config` type representing the application's configuration structure
- Serves as the source of truth for CLI argument extraction

### Entry Point (`src/index.ts`)

- Executable script using bun's shebang (`#!/usr/bin/env -S bun run --silent`)
- Passes command-line arguments to the CLI runner

### Utilities (`src/utils.ts`)

- `parseCommaSeparatedString()`: Custom parser for comma-separated CLI arguments
- `isNonEmptyString()`: Type guard utility

## Testing Strategy

- **Type Tests**: Comprehensive type-level testing using Vitest's `expectTypeOf()` in `types.test-d.ts`
- Tests cover: basic flattening, deep nesting, array handling, optional properties, discriminated unions
- Vitest configured with `typecheck.enabled: true` for integrated type checking

## Key Technical Patterns

1. **Type-Level Programming**: Extensive use of conditional types and mapped types for compile-time object flattening
2. **CLI-Config Mapping**: Type-safe bridge between nested configuration objects and flat CLI arguments
3. **Terminal Array Handling**: Arrays are preserved as-is rather than being flattened further
4. **Satisfies Pattern**: Uses `satisfies` to ensure CLI argument schemas match the expected type structure

## Dependencies

- **Runtime**: `gunshi` (CLI framework)
- **Dev**: Bun, TypeScript, Vitest (testing + type checking), ESLint (@virtual-live-lab/eslint-config), Biome (formatting)
- **Config**: Uses @virtual-live-lab shared configurations for TypeScript and ESLint
