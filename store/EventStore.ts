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

  //test
  _channelEvents.value.push({
    type: 'info-change',
    channelId: { platform: 'chzzk', id: '85c8393903d36e694eee9c43e783beda' },
    timeOfEvent: new Date(),
    changedInfos: {
      title: 'wow'
    }
  })

  if(import.meta.client) {
    const sseController = SseController.getInstance()
    sseController.addCallback((topic, payload) => {
      console.group()
      console.log(`in callback ${topic}`)
      const regexMatched = topic.match(channelEventRegex)
      console.dir(regexMatched)

      if(regexMatched === null || regexMatched.groups === undefined) {
        console.log('null???')
        console.groupEnd()
        return
      }
      console.log(regexMatched.groups)

      const timeOfEvent = new Date()

      const platform = regexMatched.groups['platform']
      const id = regexMatched.groups['channelId']
      const channelId: ChannelId =  { platform, id }

      if(regexMatched.groups.type === 'state') {
        console.log('state')
        const newEvent: ChannelStateChangeEvent = {
          type: 'state-change',
          channelId,
          newState: payload,
          timeOfEvent
        }

        _channelEvents.value.push(newEvent)
      }

      if(regexMatched.groups.type === 'image') {
        console.log('image')
        const newEvent: ChannelImageChangeEvent = {
          type: 'image-change',
          channelId,
          timeOfEvent
        }

        _channelEvents.value.push(newEvent)
      }

      if(regexMatched.groups.type === 'info-changed') {
        console.log('info-changed!')
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
      console.groupEnd()
    })
  }

  return {
    channelEvents: computed(() => _channelEvents.value),
  }
})