<script setup lang="ts">
import type { Notificator } from '~/types/components/Notificator'
import type { NotificationInfo } from '~/types/Notification'

const notificationInfos: Ref<NotificationInfo[]> = ref([])

const streamOnChannels = computed(() => notificationInfos.value.filter(n => n.notificationType === 'stream-on').map(n => n.channel))

const streamOffChannels = computed(() => notificationInfos.value.filter(n => n.notificationType === 'stream-off').map(n => n.channel))

const notificationType = getNotificationType()

const showNotification = (notificationInfo: NotificationInfo) => {
  if(import.meta.client) {
    notificationInfos.value.push(notificationInfo)

    setTimeout(() => {
      notificationInfos.value.shift()
    }, 2000)
  }
}

defineExpose<Notificator>({
  showNotification,
})
</script>

<template>
  <template v-if="notificationType === 'right-top'">
    <div class="absolute z-50 right-0 top-0 w-96">
      <template v-for="notificationInfo in notificationInfos">
        <notificator-left-top-stream-on
            v-if="notificationInfo.notificationType === 'stream-on'"
            :channel="notificationInfo.channel"
        />
        <notificator-left-top-stream-off
            v-else-if="notificationInfo.notificationType === 'stream-off'"
            :channel="notificationInfo.channel"
        />
      </template>
    </div>
  </template>
  <template v-else-if="notificationType === 'under'">
    <div class="fixed z-50 bottom-0 right-0 w-screen">
      <notificator-under-stream-on
          v-show="streamOnChannels.length > 0"
          :channels="streamOnChannels"
      ></notificator-under-stream-on>
      <notificator-under-stream-off
          v-show="streamOffChannels.length > 0"
          :channels="streamOffChannels"
      ></notificator-under-stream-off>
    </div>
  </template>
</template>

<style scoped>

</style>