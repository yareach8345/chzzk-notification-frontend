<script setup lang="ts">
import type { Modal } from '~/types/components/Modal'
import type { ModalMessage } from '~/types/ModalMessage'

const modalRef = ref<Modal<void> | undefined>(undefined)

let closer: ((result: boolean) => void) | undefined = undefined

const closeModal = (result: boolean) => {
  if(closer !== undefined) {
    closer(result)
    closer = undefined
  }
  modalRef.value?.close()
}

const processingCancel = async () => {
  closeModal(false)
}

const processingConfirm = async () => {
  closeModal(true)
}

const openConfirm = (message: ModalMessage) => {
  if(modalRef.value === undefined) {
    throw createError({
      message: '알 수 없는 에러 발생 Modal base를 불러올 수 없습니다'
    })
  }

  modalRef.value.open(message)

  return new Promise<boolean>((res) => {
    closer = (result: boolean) => {
      res(result)
    }
  })
}

defineExpose<Modal<boolean>>({
  close: processingCancel,
  open: openConfirm,
})
</script>

<template>
  <modal-base ref="modalRef">
    <div class="flex gap-4 justify-center">
      <button
          class="border-4 border-white hover:border-yes hover:text-yes rounded-lg transition-colors duration-500 ease-in-out p-2"
          title="확인"
          @click="processingConfirm"
      >
        확인
      </button>
      <button
          class="border-4 border-white hover:border-no hover:text-no rounded-lg transition-colors duration-500 ease-in-out p-2"
          title="취소"
          @click="processingCancel"
      >
        취소
      </button>
    </div>
  </modal-base>
</template>