<script setup lang="ts">
import { getChannel, openChzzkChannelPage } from '~/api/ChannelRequest'
import { processAsyncData } from '~/util/ApiUtil'
import { defaultChannelColor } from '~/constants/ChannelInfo'
import { getBackgroundColorStyle } from '~/util/ChannelUtil'

definePageMeta({
  middleware: ['require-auth', 'require-channel-info']
})

const route = useRoute()
const channelId = Array.isArray(route.params.channelId) ? route.params.channelId[0] : route.params.channelId

const channel = await processAsyncData(getChannel(channelId))

useHead({
  title: `${channel.detail.displayName} 채널 상세정보`
})

const streamColor = channel.liveState.isOpen ? 'text-red-400' : 'text-chzzk-stream-off'

const backgroundColorStyle = getBackgroundColorStyle(channel)
</script>

<template>
  <section>
    <div class="text-3xl">{{channel.detail.displayName}}</div>
    <box-gray>
      <section>
        <div class="flex justify-between items-center">
          <div class="flex items-center gap-3">
            <channel-profile :channel="channel" class="w-16"/>
            <div class="flex-0 truncate">
              <h2 class="text-2xl">{{channel.detail.displayName}}</h2>
              <p class="text-sm opacity-80">{{channel.channelId}}</p>
            </div>
          </div>
          <channel-state
              class="flex-shrink-0"
              :channel="channel"
          />
        </div>
        <div class="flex">
          <button-without-border
              class="flex items-center gap-2"
              @click="() => openChzzkChannelPage(channel.channelId)"
          >
            <img src="/image/chzzk_icon.png" alt="치지직 아이콘" class="w-6"/>
            Chzzk 열기
          </button-without-border>
        </div>
      </section>
      <hr class="mb-4"/>
      <section class="flex flex-col gap-4">
        <h3 class="text-xl">채널 정보</h3>
        <div>
          <h4 class="text-lg">채널 소개</h4>
          {{channel.detail.channelDescription}}
        </div>
        <div>
          <h4 class="text-lg">팔로워 수</h4>
          {{channel.detail.followerCount}}
        </div>
        <div>
          <h4 class="text-lg">설정 정보</h4>
          <table>
            <tbody>
              <tr>
                <th class="font-normal text-left">priority</th>
                <td class="px-2">:</td>
                <td>
                  <template v-if="!!channel.detail.priority">{{channel.detail.priority}}</template>
                  <span v-else class="opacity-70">undefined (설정되어 있지 않음)</span>
                </td>
              </tr>
              <tr>
                <th class="font-normal text-left">color</th>
                <td class="px-2">:</td>
                <td>
                  <template v-if="!!channel.detail.color">{{channel.detail.color}}</template>
                  <template v-else>
                    <div
                        class="inline-block mr-1 w-3 h-3 border border-white"
                        :style="backgroundColorStyle"
                    ></div>
                    <span class="opacity-70">{{defaultChannelColor}}(기본값)</span>
                  </template>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
      <hr class="my-4"/>
      <section>
        <h4 class="text-lg">라이브 정보</h4>
        <div
            class="flex gap-3"
            :class="streamColor"
        >
          <svg-stream/>
          <p>Live {{channel.liveState.isOpen ? 'on!' : 'off...'}}</p>
        </div>
        <div v-if="channel.liveState.isOpen">
          <p>
            {{channel.liveState.liveTitle}}
          </p>
          <p>
            {{channel.liveState.category}}
          </p>
          <p>
            {{channel.liveState.concurrentUserCount}}
          </p>
        </div>
      </section>
    </box-gray>
  </section>
</template>

<style scoped>

</style>