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

const specialOptionTextStyle = (platformName: string) => ({
  'text-warning': platformName === 'youtube'
})

const specialOptionBackgroundStyle = (platformName: string) => ({
  'bg-warning': platformName === 'youtube'
})
</script>

<template>
  <div class="flex flex-col items-center">
    <div class="relative flex overflow-hidden border border-selected rounded-lg w-72 py-1">
      <div
          class="absolute h-full w-[50%] top-0 bg-selected"
          :class="{...translateStyle, ...specialOptionBackgroundStyle(selectedPlatform!)}"
      />
      <div
          v-for="(platform, index) in platforms"
          class="flex-1 flex justify-center items-center gap-2 z-10 h-full"
          :class="specialOptionTextStyle(platform)"
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
  </div>
</template>

<style scoped>

</style>