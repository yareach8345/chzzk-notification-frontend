<script setup lang="ts">
import { useDeviceStore } from '~/store/DeviceStore'
import { getDeviceIdFromRoute, isValidDeviceId } from '~/util/DeviceUtil'
import { alertController, confirmController, definePageMeta } from '#imports'
import { regenerateSecretKey, toggleDeviceUsable, updateDevice } from '~/api/DeviceRequests'
import { FetchError } from 'ofetch'
import type { UpdateDeviceDto } from '~/dto/device/UpdateDeviceDto'
import type { Input } from '~/types/components/Input'

definePageMeta({
  middleware: ['require-auth', 'require-device-store-init'],
})

const route = useRoute()

const deviceId = getDeviceIdFromRoute(route)

const deviceStore = useDeviceStore()

const device = deviceStore.getDeviceById(deviceId)

if(device.value === undefined) {
  throw createError(`${deviceId}의 디바이스를 찾을 수 없습니다.`)
}

const deviceUpdateDto = reactive<UpdateDeviceDto>({
  deviceId: device.value.deviceId,
  deviceName: device.value.deviceName,
  description: device.value.description,
})

const deviceIdInputRef = ref<Input | undefined>()

const processUpdateDto = async () => {
  const validResult = isValidDeviceId(deviceUpdateDto.deviceId)

  if(typeof validResult === 'string') {
    deviceIdInputRef.value?.showError(validResult)
    return
  }

  await spinnerController.withSpinner('업데이트 진행중', async () => {
    try {
      await updateDevice(deviceId, deviceUpdateDto)
      await deviceStore.refreshDevice()
    } catch (error) {
      if(!(error instanceof FetchError)) {
        throw error
      }

      deviceIdInputRef.value?.showError(error.data.message ?? error.message)

      await alertController.open({
        title: '디바이스 업데이트 중 문제가 발생 했습니다.',
        content: error.data.message ?? error.message,
      })
    }
  })
}

const usableColorStyle = computed( () => device.value?.isUsable ? 'before:text-green-500' : 'before:text-red-500' )

const processToggleUsable = async () => {
  if(device.value === undefined) {
    throw createError('갱신하고자 하는 device가 undefined 상태입니다.')
  }

  const confirmResult = await confirmController.open({
    title: `디바이스 상태를 ${device.value.isUsable ? '사용불가' : '사용가능'} 상태로 변경하시겠습니까?`,
    content: [
      device.value.isUsable
          ? '상태를 변경하시면 해당 디바이스의 id와 secret키로 백엔드 서버에 접근할 수 있게 됩니다.'
          : '상태를 변경하시면 해당 id로 사용하던 디바이스의 동작에 문제가 생길 수 있습니다.',
      '정말로 진행 하시겠습니까?'
    ]
  })

  if(!confirmResult) {
    return
  }

  try{
    await toggleDeviceUsable(device.value.deviceId, !device.value.isUsable)
    await deviceStore.refreshDevice()
  } catch (error) {
    if(!(error instanceof FetchError)) {
      throw error
    }

    await alertController.open({
      title: '디바이스 상태 변경 중 문제가 발생 했습니다.',
      content: error.data.message ?? error.message,
    })
  }
}

const processRegenerateSecretKey = async () => {
  if(device.value === undefined) {
    throw createError('갱신하고자 하는 device가 undefined 상태입니다.')
  }

  const confirmResult = await confirmController.open({
    title: `디바이스의 secret key를 변경하시겠습니까?`,
    content: [
      '현재 이 디바이스의 id와 secret으로 서비스를 사용하고 있는 디바이스에 문제가 발생할 수 있습니다.',
      '정말로 진행 하시겠습니까?'
    ]
  })

  if(!confirmResult) {
    return
  }

  try{
    await regenerateSecretKey(device.value.deviceId)
    await deviceStore.refreshDevice()
  } catch (error) {
    if(!(error instanceof FetchError)) {
      throw error
    }

    await alertController.open({
      title: '시크릿키 변경 중 문제가 발생 했습니다.',
      content: error.data.message ?? error.message,
    })
  }
}
</script>

<template>
  <section>
    <box>
      <template v-if="device === undefined">
        <div class="text-center">
          {{deviceId}} 디바이스 수정 페이지를 열 수 없음니다.<br>
          정보가 존재하지 않습니다.
        </div>
      </template>
      <template v-else>
        <h2 class="text-2xl font-bold text-center">
          {{device.deviceName}} 정보
        </h2>
        <form @submit.prevent="processUpdateDto">
          <div class="space-y-3">
            <field>
              <template #field-name>디바이스 id</template>
              <input-text
                  v-model="deviceUpdateDto.deviceId"
                  ref="deviceIdInputRef"
                  required
              />
            </field>
            <field>
              <template #field-name>디바이스 명칭</template>
              <input-text
                  v-model="deviceUpdateDto.deviceName"
                  required
              />
            </field>
            <field>
              <template #field-name>디바이스 설명</template>
              <textarea
                  class="w-full sm:w-96 bg-default border border-default rounded-lg p-1"
                  placeholder="디바이스의 설명을 입력하세요."
                  v-model="deviceUpdateDto.description"
              ></textarea>
            </field>
            <field>
              <template #field-name>secret key</template>
              <div>
                <blur>{{device.secretKey}}</blur>
                <button
                    class="border border-stream-off enabled:hover:border-warning rounded-md p-[2px] text-sm transition-colors duration-100 disabled:text-stream-off"
                    @click="processRegenerateSecretKey"
                    disabled
                >reset</button>
              </div>
            </field>
            <field>
              <template #field-name>사용가능 여부</template>
              <div>
                <p
                    class="before:content-['●'] before:pr-1"
                    :class="usableColorStyle"
                >
                  {{device.isUsable ? '사용가능' : '사용불가'}}
                </p>
                <button
                    class="border border-stream-off enabled:hover:border-warning rounded-md p-[2px] text-sm transition-colors duration-100 disabled:text-stream-off"
                    @click="processToggleUsable"
                    disabled
                >toggle</button>
              </div>
              <div class="text-center">
                <button-without-border submit>업데이트</button-without-border>
              </div>
            </field>
          </div>
        </form>
      </template>
    </box>
    <div class="w-full my-2 flex justify-start gap-2">
      <button-without-border
          class="hover:text-primary"
          title="돌아가기"
          @click="toBack"
      >
        <svg-back/>
      </button-without-border>
    </div>
  </section>
</template>

<style scoped>

</style>