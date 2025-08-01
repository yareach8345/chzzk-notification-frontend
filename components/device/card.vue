<script setup lang="ts">
import type { DeviceDto } from '~/dto/device/DeviceDto'

interface Props {
  device: DeviceDto
}

const { device } = defineProps<Props>()

const toDetailPage = async () => {
  await navigateTo({
    name: 'devices-deviceId',
    params: { 'deviceId': device.deviceId }
  })
}

const borderColorClass = computed(() => device.isUsable ? 'border-primary' : 'border-stream-off')
</script>

<template>
  <article
      class="border-2 rounded-md p-2 flex justify-start items-center auto-cols-fr text-lg gap-3"
      :class="borderColorClass"
      @click="toDetailPage"
  >
    <div>
      <svg-device/>
    </div>
    <div>
      <p class="font-bold">{{device.deviceName}}</p>
      <p class="text-stream-off">{{device.deviceId}}</p>
    </div>
  </article>
</template>

<style scoped>

</style>