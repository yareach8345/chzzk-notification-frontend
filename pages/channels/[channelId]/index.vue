<script setup lang="ts">
import { deleteChannel, getChannel, openChzzkChannelLivePage, openChzzkChannelPage } from '~/api/ChannelRequest'
import { processAsyncData } from '~/util/ApiUtil'
import { defaultChannelColor } from '~/constants/ChannelInfo'
import { getBackgroundColorStyle } from '~/util/ChannelUtil'
import { useChannelStore } from '~/store/ChannelStore'

definePageMeta({
  middleware: ['require-auth', 'require-channel-info']
})

const route = useRoute()

const channelStore = useChannelStore()

const channelId = Array.isArray(route.params.channelId) ? route.params.channelId[0] : route.params.channelId

const channel = await processAsyncData(getChannel(channelId))

useHead({
  title: `${channel.detail.displayName} 채널 상세정보`
})

const streamColor = channel.liveState.isOpen ? 'text-red-400' : 'text-chzzk-stream-off'

const backgroundColorStyle = getBackgroundColorStyle(channel)

const chzzkButtonTitle = `${channel.detail.displayName} 채널로 이동`

const navigateToChannelListPage = async () => {
  navigateTo({ name: 'channels' })
}

const navigateToEditPage = async () => {
  navigateTo({
    name: `channels-channelId-edit`,
    params: { channelId }
  })
}

const onDeleteButtonClick = async () => {
  // todo - confirm은 동기적이므로 별도의 모달 구현하기
  const confirmResult = confirm('정말로 채널을 삭제하시겠습니까?')
  if(!confirmResult) {
    return
  }


  await deleteChannel(channelId)
  // todo - alert은 동기적이므로 별도의 모달 구현하기
  alert('채널이 성공적으로 삭제 되었습니다.')
  await channelStore.loadChannels()
  await navigateToChannelListPage()
}
</script>

<template>
  <section>
    <box-gray>
      <div class="text-3xl text-center font-blackHan">{{channel.detail.displayName}}</div>
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
          <button-link
              class="flex items-center gap-2"
              @click="() => openChzzkChannelPage(channel.channelId)"
              :title="chzzkButtonTitle"
          >
            <img src="/image/chzzk_icon.png" alt="치지직 아이콘" class="w-6"/>
            Chzzk 열기
          </button-link>
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
                <th class="text-left">priority</th>
                <td class="px-2">:</td>
                <td>
                  <template v-if="!!channel.detail.priority">{{channel.detail.priority}}</template>
                  <span v-else class="opacity-70">undefined (설정되어 있지 않음)</span>
                </td>
              </tr>
              <tr>
                <th class="text-left">color</th>
                <td class="px-2">:</td>
                <td>
                  <div
                      class="inline-block mr-1 w-3 h-3 border border-white"
                      :style="backgroundColorStyle"
                  ></div>
                  <template v-if="!!channel.detail.color">{{channel.detail.color}}</template>
                  <template v-else>
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
            class="flex gap-3 my-1 items-center"
        >
          <div
              class="flex gap-3 my-1 items-center"
              :class="streamColor"
          >
            <svg-stream/>
            <p>Live {{channel.liveState.isOpen ? 'on!' : 'off...'}}</p>
          </div>
          <button-link
              v-if="channel.liveState.isOpen"
              class="flex items-center gap-2"
              @click="() => openChzzkChannelLivePage(channel.channelId)"
              :title="chzzkButtonTitle"
          >
            <img src="/image/chzzk_icon.png" alt="치지직 아이콘" class="w-6"/>
            라이브 열기
          </button-link>
        </div>
        <div v-if="channel.liveState.isOpen">
          <table>
            <tbody>
              <tr>
                <th class="text-left">Live Title</th>
                <td class="px-2">:</td>
                <td>{{channel.liveState.liveTitle}}</td>
              </tr>
              <tr>
                <th class="text-left">Category</th>
                <td class="px-2">:</td>
                <td>{{channel.liveState.category}}</td>
              </tr>
              <tr>
                <th class="text-left">Viewre</th>
                <td class="px-2">:</td>
                <td>{{channel.liveState.concurrentUserCount}}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </box-gray>
    <div class="w-full my-2 flex justify-start gap-2">
      <button-without-border
          class="hover:text-chzzk-neon-green"
          title="채널목록으로"
          @click="navigateToChannelListPage"
      >
        <svg-back/>
      </button-without-border>
      <button-without-border
          class="hover:text-chzzk-neon-green"
          title="채널 정보 수정"
          @click="navigateToEditPage"
      >
        <svg-pencil/>
      </button-without-border>
      <button-without-border
          class="hover:text-neon-red"
          title="채널 삭제"
          @click="onDeleteButtonClick"
      >
        <svg-delete/>
      </button-without-border>
    </div>
  </section>
</template>

<style scoped>

</style>