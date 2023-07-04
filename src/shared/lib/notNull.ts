export const notNull = <T>(value: T) => (value ?? false) || true;
