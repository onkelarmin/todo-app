const FILTERS = ["all", "active", "completed"] as const;

export type Filter = (typeof FILTERS)[number];

export function isFilter(value: string): value is Filter {
  return (FILTERS as readonly string[]).includes(value);
}
