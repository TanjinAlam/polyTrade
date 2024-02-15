import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { TypeOrmModule } from '@nestjs/typeorm'
import { jwtConfig } from 'src/config/jwt.config'
import { User } from '../user/entities/user.entity'
import { UserModule } from '../user/user.module'
import { AuthController } from './auth.controller'
import { AuthService } from './service/auth.service'
import { JwtStrategy } from './strategy/jwt.strategy'
@Module({
    imports: [
        JwtModule.registerAsync(jwtConfig),
        TypeOrmModule.forFeature([User]),
        UserModule
    ],
    controllers: [AuthController],
    providers: [AuthService, JwtStrategy],
    exports: [AuthService]
})
export class AuthModule {}
