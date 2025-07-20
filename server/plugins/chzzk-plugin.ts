import { ChzzkClient } from 'chzzk'

export default defineNitroPlugin((nitroApp) => {
  console.log("[server] 치지직 클라이언트가 등록 되었습니다.")
  // 전역 컨택스트에 chzzk client 추가
  nitroApp.chzzkClient = new ChzzkClient()
})

declare module 'nitropack' {
  interface NitroApp {
    chzzkClient: ChzzkClient
  }
}