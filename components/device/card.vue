<script setup lang="ts">
import type { DeviceDto } from '~/dto/device/DeviceDto'

interface Props {
  device: DeviceDto
}

const { device } = defineProps<Props>()
</script>

<template>
  <box-primary class="flex justify-start items-center auto-cols-fr text-lg gap-3">
    <div>
      <svg-device/>
    </div>
    <div>
      <p class="font-bold">{{device.deviceName}}</p>
      <p class="text-stream-off">{{device.deviceId}}</p>
    </div>
  </box-primary>
</template>

<style scoped>

</style>