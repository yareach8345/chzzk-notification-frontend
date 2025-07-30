import type { DeviceDto } from '~/dto/device/DeviceDto'

export const useDeviceStore = defineStore("deviceStore", () => {
  let _devices: Ref<DeviceDto[] | null> | undefined

  let _refresh: (() => Promise<void>) | undefined

  const isInitialized = () => _devices !== undefined && _refresh !== undefined

  const setRefresh = (refresh: () => Promise<void>) => {
    _refresh = refresh
  }

  const refreshDevice = async () => {
    if(_refresh === undefined) {
      throw createError('device store에 refresh가 설정되지 않았습니다.')
    }
    await _refresh()
  }

  const setDevices = (devices: Ref<DeviceDto[] | null>) => {
    _devices = devices
  }

  const getDeviceById = (deviceId: string) => {
    if(_devices === undefined) {
      throw createError('device store가 초기화 되기 전 접근하고 있습니다.')
    }

    return computed(() => _devices?.value?.find(d => d.deviceId === deviceId))
  }

  return {
    devices: computed(() => _devices?.value),
    isInitialized,
    setDevices,
    getDeviceById,
    setRefresh,
    refreshDevice,
  }
})