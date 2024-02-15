import {
    BadRequestException,
    Inject,
    Injectable,
    UnauthorizedException
} from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { UserService } from 'src/modules/user/user.service'
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    @Inject(UserService)
    private readonly userService: UserService

    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: process.env.APP_SECRET,
            ignoreExpiration: true
        })
    }

    async validate(payload: any) {
        if (!payload.sub) throw new UnauthorizedException('Access unauthorized')
        const user = await this.userService.findOneByUuid(payload.sub)
        if (!user) throw new BadRequestException('Can not find user')
        return user
    }
}
