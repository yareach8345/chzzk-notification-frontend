import type { DeviceDto } from '~/dto/device/DeviceDto'

export type UpdateDeviceDto = Omit<DeviceDto, 'secretKey' | 'isUsable'>