import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { ROLES_DECORATOR_KEY } from '../decorators/roles.decorator'
import { Roles } from '../enums'

@Injectable()
export class RoleGuard implements CanActivate {
    constructor(private reflector: Reflector) {}

    canActivate(context: ExecutionContext): boolean {
        const roles = this.reflector.getAllAndOverride<Roles>(
            ROLES_DECORATOR_KEY,
            [context.getHandler(), context.getClass()]
        )
        if (!roles) return true
        const request = context.switchToHttp().getRequest()
        const userRole = request.user?.userType
        return roles.indexOf(userRole) > -1
    }
}
