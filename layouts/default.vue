<script setup lang="ts">
import { closeSidebarKey } from '~/constants/sidebar'
import type { Spinner } from '~/types/components/Spinner'
import type { Modal } from '~/types/components/Modal'
import type { Notificator } from '~/types/components/Notificator'
import { useChannelStore } from '~/store/ChannelStore'
import { notificatorController } from '~/composables/notificatorController'
import type { NotificationInfo } from '~/types/Notification'
import { channelIdToString } from '~/util/ChannelUtil'

const isSidebarOpen = ref(false)

const isSidebarToggle = () => {
  isSidebarOpen.value = !isSidebarOpen.value
}

provide(closeSidebarKey, () => {
  isSidebarOpen.value = false
})

const sidebarOpenButtonTitle = computed(() => `사이드바 ${isSidebarOpen.value ? '닫기' : '열기'}`)

const openGithubFrontendRepository = () => {
  window.open('https://github.com/yareach8345/chzzk-notification-frontend', '_blank')
}

const openGithubBackendRepository = () => {
  window.open('https://github.com/yareach8345/chzzk-notification-backend', '_blank')
}

//spinner, modal 설정
const spinnerRef: Ref<Spinner | null>  = ref(null)

const alertRef: Ref<Modal<void> | null> = ref(null)

const confirmRef: Ref<Modal<boolean> | null> = ref(null)

const notificatorRef: Ref<Notificator | null> = ref(null)

onMounted(() => {
  if(spinnerRef.value === null) {
    throw createError({ message: 'spinnerRef의 값이 null 입니다. 스피너를 등록 할 수 없습니다.' })
  }

  spinnerController.register(spinnerRef.value)

  if(alertRef.value === null) {
    throw createError({ message: 'alertRef의 값이 null 입니다. 스피너를 등록 할 수 없습니다.' })
  }

  alertController.register(alertRef.value)

  if(confirmRef.value === null) {
    throw createError({ message: 'confirmRef의 값이 null 입니다. 스피너를 등록 할 수 없습니다.' })
  }

  confirmController.register(confirmRef.value)

  if(notificatorRef.value === null) {
    throw createError({ message: 'NotificationRef의 값이 null 입니다. 알림을 등록 할 수 없습니다.'})
  }

  notificatorController.register(notificatorRef.value)
})

//알림 설정
const { addChannelStateChangeCallback, deleteChannelStateChangeCallback, findChannelById } = useChannelStore()
const callbackKey = addChannelStateChangeCallback((channelId, newState) => {
  if(newState === 'open' || newState === 'closed') {
    const channel = findChannelById(channelId).value
    if(channel === undefined) {
      throw createError({ message: '방송 상태가 변경된 채널의 검색결과가 undefine. channelId : ${channelIdToString(channelId)}d' })
    }

    if(newState === 'closed') {
      if(channel.liveState.isOpen !== false) {
        throw createError(`에러가 발생 했습니다. 알림과 방송의 상태가 일치하지 않습니다. channelId : ${channelIdToString(channelId)}`)
      }
      const notificationInfo: NotificationInfo = {
        notificationType: 'stream-off',
        channel
      }
      notificatorController.showNotification(notificationInfo)
    } else {
      if(channel.liveState.isOpen !== true) {
        throw createError('에러가 발생 했습니다. 알림과 방송의 상태가 일치하지 않습니다. channelId : ${channelIdToString(channelId)}.')
      }
      const notificationInfo: NotificationInfo = {
        notificationType: 'stream-on',
        channel: {
          ...channel,
          liveState: channel.liveState
        }
      }
      notificatorController.showNotification(notificationInfo)
    }
  }
})

onUnmounted(() => {
  deleteChannelStateChangeCallback(callbackKey)
})
</script>

<template>
  <div class="relative bg-default text-default min-h-svh flex flex-col p-2 sm:p-4">
    <notificator ref="notificatorRef"/>
    <spinner ref="spinnerRef"/>
    <modal-alert ref="alertRef"/>
    <modal-confirm ref="confirmRef"/>
    <header class="flex w-full sm:justify-center items-center">
      <div class="sm:absolute sm:left-0">
        <button-neon
            class="flex border-none"
            @click="isSidebarToggle"
            :title="sidebarOpenButtonTitle"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-align-justify-icon lucide-align-justify"><path d="M3 12h18"/><path d="M3 18h18"/><path d="M3 6h18"/></svg>
        </button-neon>
      </div>
      <div class="flex justify-center items-center max-sm:flex-1">
        <img src="/images/icons/platform/chzzk.png" alt="치지직 로고" class="h-14"/>
        <h1 class="font-blackHan leading-none relative top-[2px] text-center text-4xl text-primary">
          Chzzk Notification
        </h1>
      </div>
    </header>
    <main class="relative flex-1 flex flex-col justify-center items-center">
      <sidebar
          class="absolute top-0 -left-4 transition-transform duration-300 ease-in-out"
          :class="{
            '-translate-x-full': !isSidebarOpen,
            'translate-x-0': isSidebarOpen
          }"
      />
      <slot></slot>
    </main>
    <footer class="flex justify-center items-center flex-col">
      <div> made by - yareach </div>
      <div class="flex justify-center">
        <button-neon
            class="flex m-4"
            @click="openGithubBackendRepository"
            title="깃헙 백엔드 레포지토리로 이동"
        >
          <svg-github/>
          <span>Backend Repository</span>
        </button-neon>
        <button-neon
            class="flex m-4"
            @click="openGithubFrontendRepository"
            title="깃헙 프론트 레포지토리로 이동"
        >
          <svg-github/>
          <span>Frontend Repository</span>
        </button-neon>
      </div>
    </footer>
  </div>
</template>

<style scoped>

</style>