import type {
  ChannelEvents,
  ChannelImageChangeEvent,
  ChannelInfoChangeEvent,
  ChannelStateChangeEvent,
} from '~/types/Events'
import { SseController } from '~/sse/SseController'
import { channelEventRegex } from '~/constants/sse'
import type { ChannelId } from '~/types/Channel'
import { recordPayload } from '~/types/Sse'

export const useEventStore = defineStore("eventStore", () => {
  const _channelEvents = ref<ChannelEvents[]>([])

  const _observationStartTime = ref(new Date())

  const _lastUpdateTime = ref(new Date())

  // 테스트용 데이터 삽입
  // _channelEvents.value.push({
  //   type: 'state-change',
  //   channelId: {platform: 'test', id: 'test1'},
  //   timeOfEvent: new Date(),
  //   newState: 'open',
  // })
  //
  // _channelEvents.value.push({
  //   type: 'info-change',
  //   channelId: {platform: 'test', id: 'test2'},
  //   timeOfEvent: new Date(),
  //   changedInfos: {
  //     'prop1' : 'newValue1',
  //     'prop2' : 123
  //   }
  // })
  //
  // _channelEvents.value.push({
  //   type: 'image-change',
  //   channelId: {platform: 'test', id: 'test3'},
  //   timeOfEvent: new Date()
  // })

  const resetEvents = () => {
    _channelEvents.value = []
    _observationStartTime.value = new Date()
    _lastUpdateTime.value = new Date()
  }

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

        if(!success || error !== undefined || changedInfos === undefined) {
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
    resetEvents
  }
})