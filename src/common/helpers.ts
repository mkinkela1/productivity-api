export function isNotNullOrUndefined<T>(
  value: T | null | undefined,
): value is T {
  return value !== null && value !== undefined;
}

export function isNullOrUndefined<T>(
  value: T | null | undefined,
): value is null | undefined {
  return value === null || value === undefined;
}

export function isEmpty<T extends string | any[]>(
  value: T | null | undefined,
): boolean {
  return isNullOrUndefined(value) || value.length === 0;
}

export function isNotEmpty<T extends string>(
  value: T | null | undefined,
): boolean {
  return !isEmpty(value);
}
