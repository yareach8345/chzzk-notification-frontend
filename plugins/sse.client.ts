import { createEventSource } from 'eventsource-client'
import { getBackendUrl } from '~/util/ApiUtil'
import { useChannelStore } from '~/store/ChannelStore'

export default defineNuxtPlugin(nuxtApp => {
  const store = useChannelStore()
  setTimeout(() => {
    console.log(store.channels)
  }, 1000)
  const es = createEventSource({
    url: getBackendUrl('/sse/connect'),
    credentials: 'include',
    onMessage: msg => {
      console.log(JSON.parse(msg.data))
    },
    onDisconnect: () => {
      console.log('[sse] sse connect disconnected')
    },
    onConnect: () => {
      console.log('[sse] sse connected!')
    }
  })
  es.connect()
})