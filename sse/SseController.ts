import { createEventSource, type EventSourceClient, type EventSourceOptions } from 'eventsource-client'
import { type EventSourceCallback, sseMessageData } from '~/types/Sse'
import { RuntimeException } from '@poppinss/exception'

export class SseController {
  static instance: SseController | undefined = undefined

  static getInstance = () => {
    if(this.instance === undefined) {
      throw new RuntimeException('SseController가 초기화 되기 전 호출 되었습니다.')
    }

    return this.instance
  }

  static init = (options: Pick<EventSourceOptions, 'url' | 'credentials'>) => {
    if(this.instance !== undefined) {
      throw new RuntimeException('SseController가 이미 초기화 된 상태입니다.')
    }

    this.instance = new SseController(options)
    console.log('[sse] SseController가 성공적으로 초기화 되었습니다.')

    return this.instance
  }

  private sseClient: EventSourceClient | undefined

  private readonly callbacks: EventSourceCallback[] = []

  private constructor (private readonly options: Pick<EventSourceOptions, 'url' | 'credentials'>) {}

  connect = () => {
    console.log('[sse] try connect sse')

    if(this.sseClient === undefined) {
      this.sseClient = createEventSource({
        ...this.options,
        onMessage: message => {
          const parsedData = JSON.parse(message.data)
          const { success, data, error } = sseMessageData.safeParse(parsedData)

          if(!success || data === undefined) {
            throw error
          }

          this.callbacks.forEach(f => f(data.topic, data.payload))
        },
        onDisconnect: () => {
          console.log('[sse] disconnect')
        },
        onConnect: () => {
          console.log('[sse] connect')
        }
      })
    } else {
      this.sseClient.connect()
    }
  }

  disconnect = () => {
    console.log('[sse] try disconnect sse')
    this.sseClient?.close()
  }

  addCallback = (callback: EventSourceCallback) => {
    console.log('[sse] add callback')
    this.callbacks.push(callback)
  }
}