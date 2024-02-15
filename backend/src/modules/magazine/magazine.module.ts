import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { User } from '../user/entities/user.entity'
import { Magazine } from './entities/magazine.entity'
import { MagazineController } from './magazine.controller'
import { MagazineService } from './magazine.service'

@Module({
    imports: [TypeOrmModule.forFeature([User, Magazine])],
    controllers: [MagazineController],
    providers: [MagazineService]
})
export class MagazineModule {}
