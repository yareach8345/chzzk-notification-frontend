<script setup lang="ts">
import { toBack } from '~/composables/routing'
import { useDeviceStore } from '~/store/DeviceStore'

definePageMeta({
  middleware: ['require-auth', 'require-device-store-init']
})

useHead({
  title: '디바이스 목록'
})

const deviceStore = useDeviceStore()

const refreshDevices = async () => {
  await spinnerController.withSpinner('디바이스 정보를 다시 불러옵니다.', async () => {
    await deviceStore.refreshDevice()
  })
}

const navigateToRegisterPage = async () => {
  await navigateTo({name: 'devices-register'})
}
</script>

<template>
  <section>
    <box class="p-3 relative flex flex-col gap-4">
      <h2 class="text-4xl text-center font-blackHan">
        디바이스 목록
      </h2>
      <div class="grid md:grid-cols-2 gap-2">
        <device-card
            v-for="device in deviceStore.devices"
            :device="device"
        />
      </div>
    </box>
    <div>
      <button-without-border
          class="hover:text-primary"
          title="뒤로가기"
          @click="toBack"
      >
        <svg-back/>
      </button-without-border>
      <button-without-border
          class="hover:text-primary"
          title="디바이스 다시 불러오기"
          @click="refreshDevices"
      >
        <svg-refresh/>
      </button-without-border>
      <button-without-border
          class="hover:text-primary"
          title="디바이스 등록하기"
          @click="navigateToRegisterPage"
      >
        <svg-square-plus/>
      </button-without-border>
    </div>
  </section>
</template>

<style scoped>

</style>