<script setup lang="ts">
import type { Notification } from '~/types/components/Notification'
import type { NotificationInfo } from '~/types/Notification'

const notificationInfos: Ref<NotificationInfo[]> = ref([])

const showNotification = (notificationInfo: NotificationInfo) => {
  if(import.meta.client) {
    notificationInfos.value.push(notificationInfo)

    setTimeout(() => {
      notificationInfos.value.shift()
    }, 2000)
  }
}

defineExpose<Notification>({
  showNotification,
})
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