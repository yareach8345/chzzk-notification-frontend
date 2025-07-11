import type { UserDto } from '~/dto/auth/UserDto'

export interface AuthCheckDto {
  isAuthenticated: boolean
  user: UserDto | undefined
}