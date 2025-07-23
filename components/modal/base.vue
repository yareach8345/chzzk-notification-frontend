<script setup lang="ts">
import type { Modal } from '~/types/components/Modal'
import type { ModalMessage } from '~/types/ModalMessage'

const isOpen = ref(false)

const modalMessage: Ref<{ title: string, content: string[] } | null> = ref(null)

const closeModal = () => {
  isOpen.value = false
}

const openModal = (message: ModalMessage): void => {
  modalMessage.value = {
    title: message.title,
    content: Array.isArray(message.content) ? message.content : [message.content]
  }

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
      class="absolute left-0 top-0 w-full h-full z-30 bg-default bg-opacity-50 flex items-center justify-center"
      @click.prevent="closeModal"
  >
    <div class="border-4 rounded-lg p-4 bg-default flex flex-col gap-2">
      <div v-if="modalMessage !== null" >
        <h3 class="text-xl">{{modalMessage.title}}</h3>
        <p v-for="content in modalMessage.content">{{content}}</p>
      </div>
      <div v-else>
        <h3 class="text-xl">확인되지 않은 에러</h3>
        <p>modalMessage가 null입니다.</p>
        <p>개발자에게 문의하세요.</p>
      </div>
      <slot :closeModal="closeModal" :openModal="openModal"/>
    </div>
  </div>
</template>