<script setup lang="ts">
import { toBack } from '~/composables/routing'
import type { RegisterDeviceDto } from '~/dto/device/RegisterDeviceDto'
import { registerDevice } from '~/api/DeviceRequests'
import { useDeviceStore } from '~/store/DeviceStore'

definePageMeta({
  middleware: ['require-auth', 'require-device-store-init']
})

useHead({
  title: '디바이스 등록'
})

const deviceStore = useDeviceStore()

const deviceId = ref('')

const priorityInputHelpMessage: Ref<string | undefined> = ref()

const deviceIdRegex = new RegExp('^[a-zA-Z0-9_\-]+$')

const isValidDeviceId = (deviceId: string) => {
  if(deviceId.length <= 0) {
    priorityInputHelpMessage.value = 'deviceId는 필수 항목입니다.'
    return false
  }

  if(deviceId.includes(' ')) {
    priorityInputHelpMessage.value = 'deviceId에는 공백이 포함될 수 없습니다.'
    return false
  }

  const result = deviceId.match(deviceIdRegex)
  if(result === null) {
    priorityInputHelpMessage.value = 'deviceId는 소문자와 대문자의 로마자, -와 _로만 이루어져 있어야 합니다.'
    return false
  }

  return true
}

const errorMessageStyleClass = computed(() => priorityInputHelpMessage.value !== undefined ? 'max-h-40 opacity-100 translate-y-0' : 'max-h-0 opacity-0 -translate-y-4')

const errorStyleClass = computed(() => ({ 'text-error': priorityInputHelpMessage.value !== undefined }))

const submitDevice = async () => {
  if(!isValidDeviceId(deviceId.value)) {
    return
  }

  const registerDto: RegisterDeviceDto = {
    deviceId: deviceId.value,
  }

  await spinnerController.withSpinner('디바이스 등록중입니다.', async () => {
    await registerDevice(registerDto)
    await deviceStore.refreshDevice()
  })

  await alertController.open({
    title: '디바이스 등록 완료!',
    content: [
      '디바이스 등록이 완료되었습니다.',
      '디바이스 목록으로 이동합니다.'
    ]
  })

  await navigateTo({ name: 'devices' })
}
</script>

<template>
  <section>
    <box class="sp-3 relative flex flex-col gap-4">
      <h2 class="text-4xl text-center font-blackHan">
        디바이스 등록
      </h2>
      <form
          class="flex flex-col items-center gap-2"
          @submit.prevent="submitDevice"
      >
        <fieldset class="border border-default rounded-md p-2 flex">
          <legend>디바이스 정보</legend>
          <label>
            device Id
            <br>
            <input-text
                :class="errorStyleClass"
                v-model="deviceId"
                required
            />
          </label>
        </fieldset>
        <button-neon type="submit">
          등록
        </button-neon>
      </form>
      <transition-slide
          v-show="priorityInputHelpMessage !== undefined"
          class="text-error"
          :class="errorMessageStyleClass"
      >
        {{priorityInputHelpMessage}}
      </transition-slide>
    </box>
    <div>
      <button-without-border
          class="hover:text-primary"
          title="뒤로가기"
          @click="toBack"
      >
        <svg-back/>
      </button-without-border>
    </div>
  </section>
</template>

<style scoped>

</style>