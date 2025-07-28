export const channelEventRegex = new RegExp('channel/(?<platform>[^/]+)/(?<channelId>[^/]+)/(?<type>[^/]+)')

export const channelInfoUpdatedRegex = new RegExp('channel/(?<platform>[^/]+)/(?<channelId>[^/]+)/info-changed')

export const channelStateChangedRegex = new RegExp('channel/(?<platform>[^/]+)/(?<channelId>[^/]+)/state')

export const channelImageChangedRegex = new RegExp('channel/(?<platform>[^/]+)/(?<channelId>[^/]+)/image')