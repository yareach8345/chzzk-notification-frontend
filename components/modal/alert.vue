<script setup lang="ts">
interface Props {
  onButtonClick?: () => void | Promise<void>;
}

const { onButtonClick } = defineProps<Props>();

const isOpen = defineModel<boolean>('isOpen', { required: true })

const closeModal = async () => {
  if(onButtonClick) {
    await onButtonClick()
  }

  isOpen.value = false
}
</script>

<template>
  <div
      v-if="isOpen"
      class="absolute left-0 top-0 w-full h-full z-30 bg-chzzk-black bg-opacity-50 flex items-center justify-center"
      @click.prevent="closeModal"
  >
    <div class="border-4 rounded-lg p-4 bg-chzzk-black flex flex-col gap-2">
      <slot/>
      <div class="flex gap-4 justify-center">
        <button-neon
            title="확인"
            @click="closeModal"
        >
          확인
        </button-neon>
      </div>
    </div>
  </div>
</template>