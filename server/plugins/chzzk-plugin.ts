import { ChzzkClient } from 'chzzk'

export default defineNitroPlugin((nitroApp) => {
  // 전역 컨택스트에 chzzk client 추가
  nitroApp.chzzkClient = new ChzzkClient()
})

declare module 'nitropack' {
  interface NitroApp {
    chzzkClient: ChzzkClient
  }
}