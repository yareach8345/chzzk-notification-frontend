import type { DeviceDto } from '~/dto/device/DeviceDto'

export type RegisterDeviceDto = Omit<DeviceDto, 'secretKey' | 'isUsable'>