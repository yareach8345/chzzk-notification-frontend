import { useChannelStore } from '~/store/ChannelStore'

export default defineNuxtRouteMiddleware(async () => {
  const channelStore = useChannelStore()

  if(!channelStore.isChannelsLoaded) {
    await channelStore.loadChannels()
  }
})