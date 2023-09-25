export function isString(test: unknown): test is string {
  return typeof test === 'string';
}

export function isConvertableNumber(test: unknown): test is string {
  return !isNaN(Number(test));
}
