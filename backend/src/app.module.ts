import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { ServeStaticModule } from '@nestjs/serve-static/dist/serve-static.module'
import { TypeOrmModule } from '@nestjs/typeorm'
import { join } from 'path'
import { typeOrmAsyncConfig } from 'src/config/typeorm.config'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { AuthModule } from './modules/auth/auth.module'
import { MagazineModule } from './modules/magazine/magazine.module'
import { UserModule } from './modules/user/user.module'

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: ['.env'],
            isGlobal: true,
            cache: true
        }),
        ServeStaticModule.forRoot({
            rootPath: join(__dirname, '../uploads'), // added ../ to get one folder back
            serveRoot: '/public/' //last slash was important
        }),
        TypeOrmModule.forRootAsync(typeOrmAsyncConfig),
        AuthModule,
        UserModule,
        MagazineModule
    ],
    controllers: [AppController],
    providers: [AppService],
    exports: [TypeOrmModule]
})
export class AppModule {}
