<script setup lang="ts">
import type { RouteLocationRaw } from '#vue-router'
import { useAuthInfoStore } from '~/store/AuthInfoStore'

interface Props {
  page: RouteLocationRaw | string
}

const { page } = defineProps<Props>()

const { isAuthenticated } = storeToRefs(useAuthInfoStore())

const disabled = computed(() => !isAuthenticated.value)

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
      :disabled="disabled"
  >
    <slot name="icon"/>
    <slot/>
  </neon-button>
</template>

<style scoped>

</style>