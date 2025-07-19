import type { ModalMessage } from '~/types/ModalMessage'

export interface Modal<T> {
  open: (message: ModalMessage) => Promise<T | undefined> | (T | undefined)
  close: () => Promise<void> | void
}