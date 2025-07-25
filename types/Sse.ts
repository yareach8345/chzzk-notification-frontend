import { z } from 'zod/v4'

export type EventSourceCallback = (topic: string, payload: string) => void

export const sseMessageData = z.object({
  topic: z.string(),
  payload: z.string(),
})

export const recordPayload = z.record(z.string(), z.string().or(z.number()))

export const statePayload = z.literal('open').or(z.string('closed')).or(z.string('added')).or(z.string('deleted'))