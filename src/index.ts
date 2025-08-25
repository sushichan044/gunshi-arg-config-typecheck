#!/usr/bin/env -S bun run --silent

import { run } from "./cli";

await run(process.argv.slice(2));
