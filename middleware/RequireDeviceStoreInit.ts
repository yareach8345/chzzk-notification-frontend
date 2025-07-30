import { useDeviceStore } from '~/store/DeviceStore'
import { fetchDevices } from '~/api/DeviceRequests'

export default defineNuxtRouteMiddleware(async () => {
  const deviceStore = useDeviceStore()

  if(!deviceStore.isInitialized()) {
    const { data, refresh, error } = await fetchDevices()

    if(error.value !== null) {
      throw error.value
    }

    deviceStore.setDevices(data)
    deviceStore.setRefresh(refresh)
  }
})