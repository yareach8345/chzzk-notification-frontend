import { getMinimalChannels, getMinimalLiveState, updateChannel } from '~/api/ChannelRequest'
import type { LiveCloseDto, MinimalChannelInfoDto } from '~/dto/channel/MinimalChannelInfoDto'
import { channelIdToString, sortChannels } from '~/util/ChannelUtil'
import type { ChannelId, ChannelStateChangeCallback } from '~/types/Channel'
import { SseController } from '~/sse/SseController'
import { channelInfoUpdatedRegex, channelStateChangedRegex } from '~/constants/sse'
import { recordPayload, statePayload } from '~/types/Sse'
import { isEqual } from 'lodash'


export const useChannelStore = defineStore('channel-store', () => {
  const _channels = ref<MinimalChannelInfoDto[]>([])

  const _lastUpdatedAt = ref<string>('')

  const channelMap = computed(() => new Map(_channels.value.map(channel => ([channelIdToString(channel.channelId), channel]))))

  const _isChannelsLoaded = ref(false)

  const channelStateChangeCallbacks: ChannelStateChangeCallback[] = []

  const addChannelStateChangeCallback = (newCallback: ChannelStateChangeCallback) => {
    channelStateChangeCallbacks.push(newCallback)
  }

  const loadChannels = async () => {
    _channels.value = await getMinimalChannels()
    _isChannelsLoaded.value = true
  }

  const findChannelById = (channelId: ChannelId) => computed(() => channelMap.value.get(channelIdToString(channelId)))

  const channelUpdate = (channelId: ChannelId, update: Record<string, string | number>) => {
    _channels.value = _channels.value.map(channel => {
      if (isEqual(channel.channelId, channelId)) {
        let updateInfos = {
          detail: {},
          liveState: {}
        }

        Object.entries(update).forEach(([key, value]) => {
          if (key in channel.detail) {
            updateInfos.detail = {
              ...updateInfos.detail,
              [key]: value
            }
          }
          if (key in channel.liveState) {
            updateInfos.liveState = {
              ...updateInfos.liveState,
              [key]: value
            }
          }
        })

        return {
          channelId: channel.channelId,
          detail: {
            ...channel.detail,
            ...updateInfos.detail,
          },
          liveState: {
            ...channel.liveState,
            ...updateInfos.liveState,
          }
        }
      } else {
        return channel
      }
    })
  }

  const channelStateChanged = async (channelId: ChannelId, newState: boolean) => {
    const updatedChannelPromise = _channels.value.map(async channel => {
      if(isEqual(channel.channelId, channelId)) {
        if(newState) {
          return {
            ...channel,
            liveState: await getMinimalLiveState(channelId)
          }
        } else {
          const newLiveState: LiveCloseDto = {
            isOpen: false
          }
          return {
            ...channel,
            liveState: newLiveState,
          }
        }
      }
      return channel
    })

    _channels.value = await Promise.all(updatedChannelPromise)
  }

  if(import.meta.client) {
    const sseController = SseController.getInstance()

    sseController.addCallback(async (topic, payload) => {
      const infoRegexMatched = topic.match(channelInfoUpdatedRegex)

      if(topic === 'updated-at') {
        _lastUpdatedAt.value = payload
      }

      if(infoRegexMatched !== null && infoRegexMatched.groups !== undefined) {
        const platform = infoRegexMatched.groups['platform']
        const id = infoRegexMatched.groups['channelId']

        const channelId = {platform, id}
        const parsedPayload = recordPayload.parse(JSON.parse(payload))

        channelUpdate(channelId, parsedPayload)
        return
      }

      const stateRegexMatched = topic.match(channelStateChangedRegex)
      if(stateRegexMatched !== null && stateRegexMatched.groups !== undefined) {
        const platform = stateRegexMatched.groups['platform']
        const id = stateRegexMatched.groups['channelId']

        const channelId = {platform, id}

        switch(payload) {
          case 'open':
            await channelStateChanged(channelId, true)
            break
          case 'closed':
            await channelStateChanged(channelId, false)
            break
          case 'added':
            await loadChannels()
            break
          case 'deleted':
            await loadChannels()
            break
          default:
            console.warn('unknown channel state', payload)
            return
        }

        channelStateChangeCallbacks.forEach(f => f(payload))
      }
    })
  }

  return {
    channels: computed(() => sortChannels(_channels.value)),
    isChannelsLoaded: computed(() => _isChannelsLoaded.value),
    lastUpdatedAt: computed(() => _lastUpdatedAt.value),
    addChannelStateChangeCallback,
    findChannelById,
    loadChannels,
  }
})