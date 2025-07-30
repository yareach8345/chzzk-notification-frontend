import type {
  Events,
  ChannelImageChangeEvent,
  ChannelInfoChangeEvent,
  ChannelStateChangeEvent,
  TestEvent,
} from '~/types/Events'
import { SseController } from '~/sse/SseController'
import { channelEventRegex, testEventRegex } from '~/constants/sse'
import type { ChannelId } from '~/types/Channel'
import { recordPayload } from '~/types/Sse'

export const useEventStore = defineStore("eventStore", () => {
  const _channelEvents = ref<Events[]>([])

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
      const channelEventRegexMatched = topic.match(channelEventRegex)

      const testEventRegexMatched = topic.match(testEventRegex)

      if(channelEventRegexMatched === null && testEventRegexMatched === null) {
        return
      }

      const timeOfEvent = new Date()

      if(channelEventRegexMatched !== null && channelEventRegexMatched.groups !== undefined) {
        const platform = channelEventRegexMatched.groups['platform']
        const id = channelEventRegexMatched.groups['channelId']
        const channelId: ChannelId =  { platform, id }

        const channelEventBase = {
          channelId,
          timeOfEvent,
        }

        if(channelEventRegexMatched.groups.type === 'state') {
          const newEvent: ChannelStateChangeEvent = {
            type: 'state-change',
            newState: payload,
            ...channelEventBase,
          }

          _channelEvents.value.push(newEvent)
        }

        if(channelEventRegexMatched.groups.type === 'image') {
          const newEvent: ChannelImageChangeEvent = {
            type: 'image-change',
            ...channelEventBase,
          }

          _channelEvents.value.push(newEvent)
        }

        if(channelEventRegexMatched.groups.type === 'info-changed') {
          const { data: changedInfos, success, error } = recordPayload.safeParse(JSON.parse(payload))

          if(!success || error !== undefined || changedInfos === undefined) {
            throw error
          }

          const newEvent: ChannelInfoChangeEvent = {
            type: 'info-change',
            changedInfos,
            ...channelEventBase
          }

          _channelEvents.value.push(newEvent)
        }
      }

      if(testEventRegexMatched !== null && testEventRegexMatched.groups !== undefined) {
        const testMessage: TestEvent = {
          type: 'test',
          content: payload,
          testId: testEventRegexMatched.groups['testId'],
          timeOfEvent
        }

        _channelEvents.value.push(testMessage)
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