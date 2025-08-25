export function parseCommaSeparatedString(value: string): string[] {
  const result: string[] = [];
  for (const part of value.split(",")) {
    const trimmed = part.trim();
    if (isNonEmptyString(trimmed)) {
      result.push(trimmed);
    }
  }
  return result;
}

/**
 * Check if the ruleId is a non-empty string.
 */
export function isNonEmptyString(maybeString?: unknown): maybeString is string {
  return typeof maybeString === "string" && maybeString !== "";
}
