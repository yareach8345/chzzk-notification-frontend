<script setup lang="ts">
import type { ChannelInfoChangeEvent } from '~/types/ChannelEvent'

interface Props {
  event: Pick<ChannelInfoChangeEvent, 'changedInfos'>
}

const { event } = defineProps<Props>()
</script>

<template>
  <div>
    <table class="border-separate border-spacing-x-2 border-spacing-y-1">
      <thead>
        <tr>
          <th>index</th>
          <th>property</th>
          <th>value</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(value, key, index) in event.changedInfos" :key="key">
          <td>{{index}}</td>
          <td>{{key}}</td>
          <td>{{value}}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>

</style>