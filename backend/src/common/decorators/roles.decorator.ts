import { SetMetadata } from '@nestjs/common'
import { Roles } from '../enums'

export const ROLES_DECORATOR_KEY = 'UserRole'

export const UserRole = (...roles: Roles[]) =>
    SetMetadata(ROLES_DECORATOR_KEY, roles)
