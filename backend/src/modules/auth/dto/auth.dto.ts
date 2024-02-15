import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsEnum, IsNotEmpty, IsString } from 'class-validator'
import { UserType } from 'src/common/enums'
import { message } from 'src/utils/validation.messages'
// Login DTO
export class LoginDTO {
    @IsString({
        message: message('email').isString
    })
    @IsNotEmpty({
        message: message('email').isNotEmpty
    })
    @IsEmail()
    @ApiProperty()
    readonly email: string

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    readonly password: string
}

// Registration DTO
export class RegistrationDTO {
    @IsString({
        message: message('email').isString
    })
    @IsNotEmpty({
        message: message('email').isNotEmpty
    })
    @IsEmail()
    @ApiProperty()
    email: string

    @IsString({
        message: message('name').isString
    })
    @IsNotEmpty({
        message: message('name').isNotEmpty
    })
    @ApiProperty()
    name: string

    @IsString()
    @IsEnum(UserType, {
        message: 'userType must be either "User" or "Admin"'
    })
    @IsNotEmpty()
    @ApiProperty()
    userType: UserType

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    password: string

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    confirmPassword: string
}
