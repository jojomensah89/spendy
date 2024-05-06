export enum TransactionType {
  income = "income",
  expense = "expense",
}

export enum Timeframe {
  month = "month",
  year = "year",
}
export type Period = { year: number; month: number };
