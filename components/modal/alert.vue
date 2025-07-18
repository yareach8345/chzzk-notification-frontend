<script setup lang="ts">
import type { Modal } from '~/types/Modal'

const modalRef: Ref<Modal<void> | undefined> = ref(undefined)

let closer: (() => void) | undefined = undefined

const closeAlert = async () => {
  if(modalRef.value === undefined) {
    return
  }

  modalRef.value.close()

  if(closer !== undefined) {
    closer()
    closer = undefined
  }
}

const openAlert = () => {
  if(modalRef.value === undefined) {
    throw createError({
      message: '알 수 없는 에러 발생 Modal base를 불러올 수 없습니다'
    })
  }

  modalRef.value.open()

  return new Promise<void>((res) => {
    closer = () => {
      res()
    }
  })
}

defineExpose<Modal<void>>({
  open: openAlert,
  close: closeAlert
})
</script>

<template>
  <modal-base ref="modalRef">
    <slot/>
    <div class="flex gap-4 justify-center">
      <button-neon
          title="확인"
          @click="closeAlert"
      >
        확인
      </button-neon>
    </div>
  </modal-base>
</template>