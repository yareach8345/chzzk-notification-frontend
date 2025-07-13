<script setup lang="ts">
import type { RouteLocationRaw } from '#vue-router'

interface Props {
  page: RouteLocationRaw | string
}

const { page } = defineProps<Props>()

const route: RouteLocationRaw = typeof(page) !== 'string'
  ? page
  : { name: page, }

const onClick = () => {
  navigateTo(route)
}
</script>

<template>
  <neon-button
      class="flex gap-3 border-none rounded-none w-full"
      @click="onClick"
  >
    <slot name="icon"/>
    <slot/>
  </neon-button>
</template>

<style scoped>

</style>