export const objectKeys = <T extends object>(obj: T) => Object.keys(obj) as (keyof T)[]
