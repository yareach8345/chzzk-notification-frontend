import { youtube } from '@googleapis/youtube'
import { YoutubeService } from '~/server/service/youtube'

export default defineNitroPlugin((nitroApp) => {
  console.log("[server] youtube 서비스가 등록 되었습니다.")
  const youtubeClient = youtube({
    version: 'v3',
    auth: process.env.YOUTUBE_API_KEY
  })

  nitroApp.youtube = new YoutubeService(youtubeClient)
})

declare module 'nitropack' {
  interface NitroApp {
    youtube: YoutubeService
  }
}