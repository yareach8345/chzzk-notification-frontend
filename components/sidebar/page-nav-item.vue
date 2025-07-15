<script setup lang="ts">
import type { RouteLocationRaw } from '#vue-router'
import { useAuthInfoStore } from '~/store/AuthInfoStore'
import { closeSidebarKey } from '~/constants/sidebar'

interface Props {
  page: RouteLocationRaw | string
}

const { page } = defineProps<Props>()

const { isAuthenticated } = storeToRefs(useAuthInfoStore())

const disabled = computed(() => !isAuthenticated.value)

const closeSidebar = inject(closeSidebarKey)

const route: RouteLocationRaw = typeof(page) !== 'string'
  ? page
  : { name: page, }

const onClick = () => {
  if(closeSidebar) {
    closeSidebar()
  }
  navigateTo(route)
}
</script>

<template>
  <button-without-border
      class="flex gap-3 w-full"
      @click="onClick"
      :disabled="disabled"
  >
    <slot name="icon"/>
    <slot/>
  </button-without-border>
</template>

<style scoped>

</style>