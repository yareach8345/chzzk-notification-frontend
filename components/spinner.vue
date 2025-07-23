<script setup lang="ts">
import {VueSpinnerRadio} from 'vue3-spinners'
import type { Spinner } from '~/types/components/Spinner'

const isOpen = ref(false)

let intervalController: NodeJS.Timeout | undefined = undefined

const dotCnt = ref(0)

const loadingMessage = computed(() => `loading${'.'.repeat(dotCnt.value)}`)

const userMessage: Ref<string| null> = ref(null)

watch([isOpen], (newValue) => {
  if(newValue) {
    intervalController = setInterval(() => {
      dotCnt.value = (dotCnt.value + 1) % 4
    }, 250)
  } else {
    intervalController?.close()
  }
})

const spinnerOpen = (message?: string) => {
  userMessage.value = message ?? null
  isOpen.value = true
}

const spinnerClose = () => {
  userMessage.value = null
  isOpen.value = false
}

defineExpose<Spinner>({
  open: spinnerOpen,
  close: spinnerClose,
})
</script>

<template>
<div
    class="h-full w-full absolute left-0 top-0 bg-default bg-opacity-50 flex items-center justify-center z-10"
    v-if="isOpen"
>
  <div class="flex flex-col items-center gap-2">
    <vue-spinner-radio
        class="w-14 h-14 text-primary"
    />
    <p class="font-bold">{{loadingMessage}}</p>
    <p v-if="userMessage !== null">{{userMessage}}</p>
  </div>
</div>
</template>