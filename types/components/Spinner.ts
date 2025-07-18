export interface Spinner {
  open: (message: string | undefined) => void
  close: () => void
}