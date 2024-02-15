import { Body, Controller, HttpStatus, Inject, Post } from '@nestjs/common'
import { ApiOperation, ApiResponse } from '@nestjs/swagger'
import { APIResponse } from 'src/common/interfaces'
import { User } from '../user/entities/user.entity'
import { LoginDTO, RegistrationDTO } from './dto/auth.dto'
import { AuthService } from './service/auth.service'

@Controller('auth')
export class AuthController {
    @Inject(AuthService)
    private readonly authService: AuthService

    @Post('registration')
    @ApiOperation({
        summary: 'Registration Endpoint'
    })
    @ApiResponse({
        description: 'Something went wrong',
        status: HttpStatus.BAD_REQUEST
    })
    @ApiResponse({
        description: 'Registration successful',
        status: HttpStatus.CREATED
    })
    async registration(
        @Body() registrationDto: RegistrationDTO
    ): Promise<APIResponse<RegisteredUser>> {
        return {
            statusCode: HttpStatus.CREATED,
            message: 'Registration done successfully',
            result: await this.authService.registration(registrationDto)
        }
    }

    @Post('login')
    @ApiOperation({
        summary: 'Login'
    })
    @ApiResponse({
        description: 'Something went wrong',
        status: HttpStatus.BAD_REQUEST
    })
    @ApiResponse({
        description: 'Login successful',
        status: HttpStatus.OK
    })
    async login(@Body() loginRequestDto: LoginDTO): Promise<APIResponse<User>> {
        return {
            statusCode: HttpStatus.OK,
            message: 'Logged in successful',
            result: await this.authService.Login(loginRequestDto)
        }
    }
}
