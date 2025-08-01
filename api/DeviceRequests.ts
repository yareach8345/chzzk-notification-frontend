import { getBackendUrl, getCookieHeader } from '~/util/ApiUtil'
import type { DeviceDto } from '~/dto/device/DeviceDto'
import type { RegisterDeviceDto } from '~/dto/device/RegisterDeviceDto'
import type { SetUsableDto } from '~/dto/device/SetUsableDto'

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

export const toggleDeviceUsable = (deviceId: string, newUsable: boolean) => {
  const cookieHeader = getCookieHeader()
  const url = getBackendUrl(`/devices/${deviceId}/usable`)

  const dto: SetUsableDto = {
    newUsable: newUsable,
  }

  return $fetch<DeviceDto[]>(url, {
    method: 'PATCH',
    body: dto,
    credentials: 'include',
    headers: {...cookieHeader}
  })
}

export const regenerateSecretKey = (deviceId: string) => {
  const cookieHeader = getCookieHeader()
  const url = getBackendUrl(`/devices/${deviceId}/secret-key`)

  return $fetch<DeviceDto[]>(url, {
    method: 'PATCH',
    credentials: 'include',
    headers: {...cookieHeader}
  })
}

export const deleteDevice = (deviceId: string) => {
  const cookieHeader = getCookieHeader()
  const url = getBackendUrl(`/devices/${deviceId}`)

  return $fetch<DeviceDto[]>(url, {
    method: 'DELETE',
    credentials: 'include',
    headers: {...cookieHeader}
  })
}