<script setup lang="ts">
import { useDeviceStore } from '~/store/DeviceStore'
import { getDeviceIdFromRoute } from '~/util/DeviceUtil'
import { alertController, confirmController, definePageMeta } from '#imports'
import { deleteDevice, regenerateSecretKey, toggleDeviceUsable } from '~/api/DeviceRequests'
import { FetchError } from 'ofetch'

definePageMeta({
  middleware: ['require-auth', 'require-device-store-init'],
})

const route = useRoute()

const deviceId = getDeviceIdFromRoute(route)

useHead({
  title: `${deviceId} 디바이스 정보`
})

const deviceStore = useDeviceStore()

const device = deviceStore.getDeviceById(deviceId)

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

const processDeleting = async () => {
  if(device.value === undefined) {
    throw createError('삭제하고자 하는 device가 undefined 상태입니다.')
  }

  const confirmResult = await confirmController.open({
    title: `디바이스를 삭제 하시겠습니까?`,
    content: [
      '이 작업은 되돌릴 수 없으며',
      '현재 이 디바이스의 id와 secret으로 서비스를 사용하고 있는 디바이스에 문제가 발생할 수 있습니다.',
      '정말로 진행 하시겠습니까?'
    ]
  })

  if(!confirmResult) {
    return
  }

  try{
    await deleteDevice(device.value.deviceId)
    await deviceStore.refreshDevice()
  } catch (error) {
    if(!(error instanceof FetchError)) {
      throw error
    }

    await alertController.open({
      title: '디바이스 삭제 중 문제가 발생 했습니다.',
      content: error.data.message ?? error.message,
    })
  }
}

const navigateToEditPage = () => {
  navigateTo({
    name: 'devices-deviceId-edit',
    params: { 'deviceId': deviceId },
  })
}
</script>

<template>
  <section>
    <box>
      <template v-if="device === undefined">
        <div class="text-center">
          {{deviceId}} 디바이스를 불러올 수 없음니다.<br>
          정보가 존재하지 않습니다.
        </div>
      </template>
      <template v-else>
        <h2 class="text-2xl font-bold text-center">
          {{device.deviceName}} 정보
        </h2>
        <div class="space-y-3">
          <field>
            <template #field-name>디바이스 id</template>
            <p>{{device.deviceId}}</p>
          </field>
          <field>
            <template #field-name>디바이스 명칭</template>
            <p>{{device.deviceName}}</p>
          </field>
          <field>
            <template #field-name>디바이스 설명</template>
            <p v-if="!!device.description">
              {{device.description}}
            </p>
            <p
                v-else
                class="text-stream-off"
            >
              작성 되어있지 않음
            </p>
          </field>
          <field>
            <template #field-name>secret key</template>
            <div>
              <blur>{{device.secretKey}}</blur>
              <button
                  class="border border-stream-off hover:border-warning rounded-md p-[2px] text-sm transition-colors duration-100"
                  @click="processRegenerateSecretKey"
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
                  class="border border-stream-off hover:border-warning rounded-md p-[2px] text-sm transition-colors duration-100"
                  @click="processToggleUsable"
              >toggle</button>
            </div>
          </field>
        </div>
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
      <button-without-border
          class="hover:text-primary"
          title="채널 정보 수정"
          @click="navigateToEditPage"
      >
        <svg-pencil/>
      </button-without-border>
      <button-without-border
          v-if="device !== undefined"
          class="hover:text-error"
          title="채널 삭제"
          @click="processDeleting"
      >
        <svg-delete/>
      </button-without-border>
    </div>
  </section>
</template>

<style scoped>

</style>