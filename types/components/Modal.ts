export interface Modal<T> {
  open: () => Promise<T> | T
  close: () => Promise<void> | void
}