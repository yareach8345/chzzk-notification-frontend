<script setup lang="ts">
import type { Modal } from '~/types/components/Modal'

const isOpen = ref(false)

const closeModal = () => {
  isOpen.value = false
}

const openModal = () => {
  isOpen.value = true
}

defineExpose<Modal<void>>({
  open: openModal,
  close: closeModal,
})
</script>

<template>
  <div
      v-if="isOpen"
      class="absolute left-0 top-0 w-full h-full z-30 bg-chzzk-black bg-opacity-50 flex items-center justify-center"
      @click.prevent="closeModal"
  >
    <div class="border-4 rounded-lg p-4 bg-chzzk-black flex flex-col gap-2">
      <slot :closeModal="closeModal" :openModal="openModal"/>
    </div>
  </div>
</template>