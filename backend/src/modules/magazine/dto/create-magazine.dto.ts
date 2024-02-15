import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString } from 'class-validator'
import { message } from 'src/utils/validation.messages'

export class CreateMagazineDTO {
    @IsString()
    @IsNotEmpty({
        message: message('title').isNotEmpty
    })
    @ApiProperty()
    readonly title: string

    @IsString()
    @IsNotEmpty({
        message: message('description').isNotEmpty
    })
    @ApiProperty()
    readonly description: string

    @ApiProperty({ type: 'string', format: 'binary' })
    file: Express.Multer.File
}
