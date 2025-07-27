import { getMinimalChannels, getMinimalLiveState } from '~/api/ChannelRequest'
import type { LiveCloseDto, MinimalChannelInfoDto } from '~/dto/channel/MinimalChannelInfoDto'
import { channelIdToString, sortChannels } from '~/util/ChannelUtil'
import type { ChannelId, ChannelStateChangeCallback } from '~/types/Channel'
import { SseController } from '~/sse/SseController'
import { channelInfoUpdatedRegex, channelStateChangedRegex } from '~/constants/sse'
import { recordPayload } from '~/types/Sse'
import { isEqual } from 'lodash'
import { v4 } from 'uuid'


export const useChannelStore = defineStore('channel-store', () => {
  const _channels = ref<MinimalChannelInfoDto[]>([])

  const _sortedChannels = computed<MinimalChannelInfoDto[]>(() => sortChannels(_channels.value))

  const _lastUpdatedAt = ref<string>('')

  const _channelMap: ComputedRef<Map<string, MinimalChannelInfoDto>> = computed(() => new Map(_channels.value.map(channel => ([channelIdToString(channel.channelId), channel]))))

  const _isChannelsLoaded = ref(false)

  const _channelStateChangeCallbacks: Map<string, ChannelStateChangeCallback> = new Map()

  const addChannelStateChangeCallback = (newCallback: ChannelStateChangeCallback) => {
    const callbackKey = v4()
    _channelStateChangeCallbacks.set(callbackKey, newCallback)
    return callbackKey
  }

  const deleteChannelStateChangeCallback = (callbackKey: string) => {
    _channelStateChangeCallbacks.delete(callbackKey)
  }

  const loadChannels = async () => {
    _channels.value = await getMinimalChannels()
    _isChannelsLoaded.value = true
  }

  const findChannelById = (channelId: ChannelId) => computed(() => _channelMap.value.get(channelIdToString(channelId)))

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

        _channelStateChangeCallbacks.forEach(f => f(channelId, payload))
      }
    })
  }

  return {
    channels: _sortedChannels,
    isChannelsLoaded: computed(() => _isChannelsLoaded.value),
    lastUpdatedAt: computed(() => _lastUpdatedAt.value),
    addChannelStateChangeCallback,
    deleteChannelStateChangeCallback,
    findChannelById,
    loadChannels,
  }
})