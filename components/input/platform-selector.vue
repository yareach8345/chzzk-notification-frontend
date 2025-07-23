<script setup lang="ts">
import { platforms } from '~/constants/platforms'

interface Emits {
  (e: 'onChange', newValue: string): void
}

const emits = defineEmits<Emits>()

const selectedPlatform = defineModel<string>()

const selectedValueIndex = ref(0)

const onClickItem = (index: number) => {
  selectedValueIndex.value = index
  const newPlatform = platforms[selectedValueIndex.value]
  selectedPlatform.value = newPlatform
  emits('onChange', newPlatform)
}

const translateStyle = computed(() => ({'translate-x-[100%]' : selectedValueIndex.value === 1}))

const getPlatformIconPath = (platformName: string) => `/images/icons/platform/${platformName}.png`

const getImageAlt = (platformName: string) => `${platformName} 아이콘`
</script>

<template>
  <div class="relative flex overflow-hidden border border-default rounded-lg w-72 py-1">
    <div
        class="absolute h-full w-[50%] top-0 bg-stream-off"
        :class="translateStyle"
    />
    <div
        class="flex-1 flex justify-center items-center gap-2 z-10"
        v-for="(platform, index) in platforms"
        @click="() => onClickItem(index)"
    >
      <img
          class="h-6"
          :src="getPlatformIconPath(platform)"
          :alt="getImageAlt(platform)"
      />
      <p class="text-lg">
        {{platform}}
      </p>
    </div>
  </div>
</template>

<style scoped>

</style>