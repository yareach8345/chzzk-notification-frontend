import { getBackendUrl, getCookieHeader } from '~/util/ApiUtil'
import type { DeviceDto } from '~/dto/device/DeviceDto'

export const fetchDevices = async () => {
  const cookieHeader = getCookieHeader()
  const url = getBackendUrl('/devices')

  return await useFetch<DeviceDto[]>(url, {
    method: 'GET',
    credentials: 'include',
    headers: { ...cookieHeader }
  })
}