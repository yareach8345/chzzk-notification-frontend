import type { RouteLocationNormalizedGeneric } from '#vue-router'

export const getDeviceIdFromRoute = (route: RouteLocationNormalizedGeneric): string => {
  return Array.isArray(route.params.deviceId) ? route.params.deviceId[0] : route.params.deviceId
}
