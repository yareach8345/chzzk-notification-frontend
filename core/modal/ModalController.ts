import type { ModalMessage } from '~/types/ModalMessage'
import type { Modal } from '~/types/components/Modal'

export class ModalController<T> implements Modal<T> {
  private modal: Modal<T> | null = null

  register = (modal: Modal<T>): void => {
    this.modal = modal
  }

  close = (): Promise<void> | void => {
    if(this.modal === null) {
      console.error('모달 컴포넌트가 등록되어있지 않습니다.')
    }
    this.modal?.close()
  }

  open = (message: ModalMessage): Promise<T | undefined> | (T | undefined) => {
    if(this.modal === null) {
      console.error('모달 컴포넌트가 등록되어있지 않습니다.')
    }
    return this.modal?.open(message)
  }
}