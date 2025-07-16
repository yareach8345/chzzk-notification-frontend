<script setup lang="ts">
interface Props {
  onConfirm?: () => void | Promise<void>
  onCancel?: () => void | Promise<void>
}

const { onConfirm, onCancel } = defineProps<Props>()

const isOpen = defineModel<boolean>('isOpen', { required: true })

const closeModal = () => {
  isOpen.value = false
}

const processingCancel = async () => {
  if(!!onCancel) {
    onCancel()
  }

  closeModal()
}

const processingConfirm = async () => {
  if(!!onConfirm) {
    await onConfirm()
  }

  closeModal()
}
</script>

<template>
  <div
      v-if="isOpen"
      class="absolute left-0 top-0 w-full h-full z-30 bg-chzzk-black bg-opacity-50 flex items-center justify-center"
      @click.prevent="processingCancel"
  >
    <div class="border-4 rounded-lg p-4 bg-chzzk-black flex flex-col gap-2">
      <slot/>
      <div class="flex gap-4 justify-center">
        <button
            class="border-4 border-white hover:border-neon-blue hover:text-neon-blue rounded-lg transition-colors duration-500 ease-in-out p-2"
            title="확인"
            @click="processingConfirm"
        >
          확인
        </button>
        <button
            class="border-4 border-white hover:border-neon-red hover:text-neon-red rounded-lg transition-colors duration-500 ease-in-out p-2"
            title="취소"
            @click="processingCancel"
        >
          취소
        </button>
      </div>
    </div>
  </div>
</template>