import type { ChannelId } from '~/types/Channel'
import type { LiveOpenDto, MinimalChannelDetail } from '~/dto/channel/MinimalChannelInfoDto'

export interface StreamOnNotification {
  notificationType: 'stream-on',
  channel: {
    channelId: ChannelId
    detail: Pick<MinimalChannelDetail, 'displayName'>
    liveState: Pick<LiveOpenDto, 'liveTitle'>
  }
}

export interface StreamOffNotification {
  notificationType: 'stream-off',
  channel: {
    channelId: ChannelId
    detail: Pick<MinimalChannelDetail, 'displayName'>
  }
}

export type NotificationInfo = StreamOnNotification | StreamOffNotification
