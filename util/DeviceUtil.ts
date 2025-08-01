import type { RouteLocationNormalizedGeneric } from '#vue-router'
import { deviceIdRegex } from '~/constants/device'

export const getDeviceIdFromRoute = (route: RouteLocationNormalizedGeneric): string => {
  return Array.isArray(route.params.deviceId) ? route.params.deviceId[0] : route.params.deviceId
}

export const isValidDeviceId = (deviceId: string) => {
  if(deviceId.length <= 0) {
    return 'deviceId는 필수 항목입니다.'
  }

  if(deviceId.includes(' ')) {
    return 'deviceId에는 공백이 포함될 수 없습니다.'
  }

  const result = deviceId.match(deviceIdRegex)
  if(result === null) {
    return 'deviceId는 소문자와 대문자의 로마자, -와 _로만 이루어져 있어야 합니다.'
  }

  return true
}