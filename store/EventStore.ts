import type {
  ChannelEvent,
  ChannelImageChangeEvent,
  ChannelInfoChangeEvent,
  ChannelStateChangeEvent,
} from '~/types/ChannelEvent'
import { SseController } from '~/sse/SseController'
import { channelEventRegex } from '~/constants/sse'
import type { ChannelId } from '~/types/Channel'
import { recordPayload } from '~/types/Sse'

export const useEventStore = defineStore("eventStore", () => {
  const _channelEvents = ref<ChannelEvent[]>([])

  const _observationStartTime = ref(new Date())

  const _lastUpdateTime = ref(new Date())

  if(import.meta.client) {
    const sseController = SseController.getInstance()
    sseController.addCallback((topic, payload) => {
      const regexMatched = topic.match(channelEventRegex)

      if(regexMatched === null || regexMatched.groups === undefined) {
        return
      }

      const timeOfEvent = new Date()

      const platform = regexMatched.groups['platform']
      const id = regexMatched.groups['channelId']
      const channelId: ChannelId =  { platform, id }

      if(regexMatched.groups.type === 'state') {
        const newEvent: ChannelStateChangeEvent = {
          type: 'state-change',
          channelId,
          newState: payload,
          timeOfEvent
        }

        _channelEvents.value.push(newEvent)
      }

      if(regexMatched.groups.type === 'image') {
        const newEvent: ChannelImageChangeEvent = {
          type: 'image-change',
          channelId,
          timeOfEvent
        }

        _channelEvents.value.push(newEvent)
      }

      if(regexMatched.groups.type === 'info-changed') {
        const { data: changedInfos, success, error } = recordPayload.safeParse(JSON.parse(payload))

        if(success === false || error !== undefined || changedInfos === undefined) {
          throw error
        }

        const newEvent: ChannelInfoChangeEvent = {
          type: 'info-change',
          channelId,
          timeOfEvent,
          changedInfos
        }

        _channelEvents.value.push(newEvent)
      }
      _lastUpdateTime.value = timeOfEvent
    })
  }

  return {
    channelEvents: computed(() => _channelEvents.value),
    observationStartTime: computed(() => _observationStartTime.value),
    lastUpdateTime: computed(() => _lastUpdateTime.value),
  }
})