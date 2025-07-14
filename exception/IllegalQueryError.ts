export class IllegalQueryError extends Error {
  constructor(queryName: string, message?: string) {
    super(`${queryName} query is illegal : ${message ?? `${queryName} is not a valid query.`}`);
  }
}