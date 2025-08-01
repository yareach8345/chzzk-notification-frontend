<script setup lang="ts">
import { toBack } from '~/composables/routing'
import type { RegisterDeviceDto } from '~/dto/device/RegisterDeviceDto'
import { registerDevice } from '~/api/DeviceRequests'
import { useDeviceStore } from '~/store/DeviceStore'
import { FetchError } from 'ofetch'
import { isValidDeviceId } from '~/util/DeviceUtil'
import type { Input } from '~/types/components/Input'

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

const deviceIdInputRef = ref<Input | undefined>()

const submitDevice = async () => {
  const validResult = isValidDeviceId(deviceId.value)

  if(validResult !== true) {
    deviceIdInputRef.value?.showError(validResult)
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

      return true
    } catch (error) {
      if(!(error instanceof FetchError)) {
        throw error
      }

      return error
    }
  })

  if(result !== true) {
    await alertController.open({
      title: '디바이스 등록 실패',
      content: [ result.data.message ?? result.message ]
    })

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
                ref="deviceIdInputRef"
                class="w-full"
                v-model="deviceId"
                required
            />
          </label>
          <label>
            description
            <br>
            <textarea
                class="w-full sm:w-96 bg-default border border-default rounded-lg p-1"
                placeholder="디바이스의 설명을 입력하세요."
                v-model="description"
            ></textarea>
          </label>
        </fieldset>
        <button-neon type="submit">
          등록
        </button-neon>
      </form>
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