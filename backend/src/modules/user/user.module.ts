import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { User } from 'src/modules/user/entities/user.entity'
import { UserController } from 'src/modules/user/user.controller'
import { UserService } from 'src/modules/user/user.service'
import { Magazine } from '../magazine/entities/magazine.entity'
import { UserMagazineSubscription } from './entities/user-magazine-subscription.entity'

@Module({
    imports: [
        TypeOrmModule.forFeature([User, Magazine, UserMagazineSubscription])
    ],
    controllers: [UserController],
    providers: [UserService],
    exports: [UserService]
})
export class UserModule {}
