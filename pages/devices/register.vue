<script setup lang="ts">
import { toBack } from '~/composables/routing'
import type { RegisterDeviceDto } from '~/dto/device/RegisterDeviceDto'
import { registerDevice } from '~/api/DeviceRequests'
import { useDeviceStore } from '~/store/DeviceStore'
import { FetchError } from 'ofetch'

definePageMeta({
  middleware: ['require-auth', 'require-device-store-init']
})

useHead({
  title: '디바이스 등록'
})

const deviceStore = useDeviceStore()

const deviceName = ref('')

const deviceId = ref('')

const description = ref('')

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
    deviceName: deviceName.value,
    description: description.value.length === 0 ? null : description.value,
  }

  const result = await spinnerController.withSpinner('디바이스 등록중입니다.', async () => {
    try {
      await registerDevice(registerDto)
      await deviceStore.refreshDevice()
      return {
        success: true
      }
    } catch (error) {
      return {
        success: false,
        error: error
      }
    }
  })

  if(result.success === false) {
    if(result.error instanceof FetchError) {
      priorityInputHelpMessage.value = result.error.data.message
    } else {
      throw result.error
    }
    return
  }

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
  <section class="max-sm:container">
    <box class="sp-3 relative flex flex-col gap-4">
      <h2 class="text-4xl text-center font-blackHan">
        디바이스 등록
      </h2>
      <form
          class="flex flex-col items-center gap-2"
          @submit.prevent="submitDevice"
      >
        <fieldset class="max-sm:w-full border border-default rounded-md p-2 flex flex-col gap-2">
          <legend>디바이스 정보</legend>
          <label>
            <required-field-name>device name</required-field-name>
            <br>
            <input-text
                class="w-full"
                v-model="deviceName"
                required
            />
          </label>
          <label>
            <required-field-name>device id</required-field-name>
            <br>
            <input-text
                class="w-full"
                :class="errorStyleClass"
                v-model="deviceId"
                required
            />
          </label>
          <label>
            description
            <br>
            <textarea
                class="w-full sm:w-96 bg-default border border-default rounded-lg p-1"
                v-model="description"
            ></textarea>
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