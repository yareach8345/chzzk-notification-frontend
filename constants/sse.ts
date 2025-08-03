export const channelEventRegex = new RegExp('channel/(?<platform>[^/]+)/(?<channelId>[^/]+)/(?<type>[^/]+)')

export const testEventRegex = new RegExp('test(?:/(?<testId>[^/]+))?')

export const channelRefreshEvent = 'refreshed-at'

export const channelInfoUpdatedRegex = new RegExp('channel/(?<platform>[^/]+)/(?<channelId>[^/]+)/info-changed')

export const channelStateChangedRegex = new RegExp('channel/(?<platform>[^/]+)/(?<channelId>[^/]+)/state')

export const channelImageChangedRegex = new RegExp('channel/(?<platform>[^/]+)/(?<channelId>[^/]+)/image')