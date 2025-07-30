<script setup lang="ts">
import type { DeviceDto } from '~/dto/device/DeviceDto'

interface Props {
  device: DeviceDto
}

const { device } = defineProps<Props>()

const isSecretKeyBlur = ref(true)

const blurClass = computed(() => ({ 'blur-sm': isSecretKeyBlur.value }))

const deactivateBlur = () => {
  isSecretKeyBlur.value = false
}
</script>

<template>
  <box-primary class="flex justify-start items-center auto-cols-fr text-lg gap-3">
    <div>
      <svg-device/>
    </div>
    <div>
      <p class="font-bold">{{device.deviceId}}</p>
      <p
          class="text-sm"
          :class="blurClass"
          @click.stop="deactivateBlur"
      >
        {{device.secretKey}}
      </p>
    </div>
  </box-primary>
</template>

<style scoped>

</style>