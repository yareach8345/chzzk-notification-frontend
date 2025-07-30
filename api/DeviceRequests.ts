import { getBackendUrl, getCookieHeader } from '~/util/ApiUtil'
import type { DeviceDto } from '~/dto/device/DeviceDto'
import type { RegisterDeviceDto } from '~/dto/device/RegisterDeviceDto'

export const fetchDevices = () => {
  const cookieHeader = getCookieHeader()
  const url = getBackendUrl('/devices')

  return useFetch<DeviceDto[]>(url, {
    method: 'GET',
    credentials: 'include',
    headers: {...cookieHeader}
  })
}

export const registerDevice = (registerDeviceDto: RegisterDeviceDto) => {
  const cookieHeader = getCookieHeader()
  const url = getBackendUrl('/devices')

  return $fetch<DeviceDto[]>(url, {
    method: 'POST',
    body: registerDeviceDto,
    credentials: 'include',
    headers: {...cookieHeader}
  })
}