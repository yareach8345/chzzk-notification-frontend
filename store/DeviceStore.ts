import type { DeviceDto } from '~/dto/device/DeviceDto'
import { some } from 'lodash'

export const useDeviceStore = defineStore("deviceStore", () => {
  const _devices: Ref<DeviceDto[] | undefined> = ref()

  const setDevices = (devices: DeviceDto[]) => {
    _devices.value = devices
  }

  const setDevice = (device: DeviceDto) => {
    if(_devices.value === undefined) {
      throw createError('device store가 초기화 되기 전 접근하고 있습니다.')
    }

    const exists = some(_devices.value, { 'deviceId' : device.deviceId })

    if(!exists) {
      throw createError(`'${device.deviceId}' id의 device가 존재하지 않습니다.`)
    }

    _devices.value = _devices.value.map(d => d.deviceId === device.deviceId ? device : d)
  }

  const getDeviceById = (deviceId: string) => {
    if(_devices.value === undefined) {
      throw createError('device store가 초기화 되기 전 접근하고 있습니다.')
    }

    return computed(() => _devices.value?.find(d => d.deviceId === deviceId))
  }

  return {
    devices: computed(() => _devices.value),
    setDevices,
    setDevice,
    getDeviceById,
  }
})