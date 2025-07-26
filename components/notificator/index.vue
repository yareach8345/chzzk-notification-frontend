<script setup lang="ts">
import type { Notificator } from '~/types/components/Notificator'
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

defineExpose<Notificator>({
  showNotification,
})
</script>

<template>
  <div class="absolute z-50 right-0 top-0 w-96">
    <template v-for="notificationInfo in notificationInfos">
      <notificator-stream-on
          v-if="notificationInfo.notificationType === 'stream-on'"
          :channel="notificationInfo.channel"
      />
      <notificator-stream-off
          v-else-if="notificationInfo.notificationType === 'stream-off'"
          :channel="notificationInfo.channel"
      />
    </template>
  </div>
</template>

<style scoped>

</style>