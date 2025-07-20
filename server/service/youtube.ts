import { youtube_v3 } from '@googleapis/youtube'
import { ChannelSearchResultDto } from '~/dto/channel/ChannelSearchResultDto'
import Schema$SearchResult = youtube_v3.Schema$SearchResult

export class YoutubeService {
  constructor(private readonly youtubeClient: youtube_v3.Youtube) {}

  async searchChannel(keyword: string) {
    const response = await this.youtubeClient.search.list({
      q: keyword,
      part: ['snippet'],
      maxResults: 1,
    })

    if (!response.data || !response.data.items) {
      throw createError({
        status: 500,
        message: '채널 검색에 실패 했습니다.'
      })
    }

    return response.data.items
  }

  async fetchLiveId(channelId: string) {
    const response = await this.youtubeClient.search.list({
      channelId: channelId,
      eventType: 'live',
      type: ['video'],
      part: ['id'],
      maxResults: 1
    })

    if (
      !response.data ||
      !response.data.items
    ) {
      throw createError({
        status: 500,
        message: `라이브의 id를 가져오는대 실패 했습니다.(channelId: ${channelId}) 요청에 실패 했습니다.`
      })
    }

    if(
      response.data.items.length === 0 ||
      !response.data.items[0].id ||
      !response.data.items[0].id.videoId
    ) {
      return undefined
    }

    return response.data.items[0].id.videoId
  }

  getChannelImageUrl = (channel: Schema$SearchResult) => {
    const thumbnails = channel.snippet?.thumbnails

    return thumbnails?.high?.url ||
      thumbnails?.medium?.url ||
      thumbnails?.default?.url ||
      undefined
  }

  getChannelDetail = (channel: Schema$SearchResult, channelId: string) => {
    const channelDescription = channel.snippet?.description ?? ''

    const channelImageUrl = this.getChannelImageUrl(channel)

    const displayName = channel.snippet?.title
    if(!displayName) {
      throw createError({
        status: 500,
        message: `채널명 파싱 실패. ${channelId} 채널의 snippet.title 필드 값이 null입니다.`
      })
    }

    return {
      channelDescription,
      displayName,
      channelImageUrl,
    }
  }

  getLiveState = async (channelId: string) => {
    const liveId = await this.fetchLiveId(channelId)

    return {
      isOpen: liveId !== undefined,
      liveId: liveId,
    }
  }

  getChannelInfo = async (channel: Schema$SearchResult): Promise<ChannelSearchResultDto> => {
    if(!channel.id || !channel.id.channelId) {
      throw createError({
        status: 500,
        message: '알 수 없는 에러 검색된 채널 id를 불러올 수 없습니다.'
      })
    }

    const channelId = channel.id.channelId

    return {
      channelId: {platform: 'youtube', id: channelId},
      detail: this.getChannelDetail(channel, channelId),
      liveState: await this.getLiveState(channelId)
    }
  }

  async search(keyword: string): Promise<ChannelSearchResultDto[]> {
    const channels = await this.searchChannel(keyword)

    return Promise.all(channels.map(this.getChannelInfo))
  }
}