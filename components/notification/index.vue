<script setup lang="ts">
import type { NotificationInfo } from '~/types/Notification'

const liveChannel = {
  "channelId": {
    "id": "268a1d78fb536d86b610da77d1a3d8de",
    "platform": "chzzk"
  },
  "detail": {
    "displayName": "벨라랑 놀자",
    "followerCount": 238,
    "priority": 6,
    "color": "#bf4981"
  },
  "liveState": {
    "isOpen": true,
    "liveTitle": "[V/신입]산나비 1일차",
    "concurrentUserCount": 3,
    "category": "Sannabi"
  }
}

const notificationInfos: Ref<NotificationInfo[]> = ref([])

const showNotification = (notificationInfo: NotificationInfo) => {
  if(import.meta.client) {
    notificationInfos.value.push(notificationInfo)

    setTimeout(() => {
      notificationInfos.value.shift()
    }, 2000)
  }
}

if(import.meta.client) {
  setInterval(() => {
    showNotification({
      notificationType: 'stream-on',
      channel: liveChannel
    })
    setTimeout(() => {
      showNotification({
        notificationType: 'stream-off',
        channel: liveChannel
      })
    }, 1000)
  }, 4000)
}
</script>

<template>
  <div class="absolute z-50 right-0 top-0 w-96">
    <template v-for="notificationInfo in notificationInfos">
      <notification-stream-on
          v-if="notificationInfo.notificationType === 'stream-on'"
          :channel="notificationInfo.channel"
      />
      <notification-stream-off
          v-else-if="notificationInfo.notificationType === 'stream-off'"
          :channel="notificationInfo.channel"
      />
    </template>
  </div>
</template>

<style scoped>

</style>