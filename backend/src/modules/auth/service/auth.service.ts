import {
    BadRequestException,
    HttpException,
    HttpStatus,
    Injectable,
    NotFoundException
} from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { InjectRepository } from '@nestjs/typeorm'
import * as bcrypt from 'bcrypt'
import { UserType } from 'src/common/enums'
import { User } from 'src/modules/user/entities/user.entity'
import { Repository } from 'typeorm'
import { LoginDTO, RegistrationDTO } from '../dto/auth.dto'

// import { JwtService } from './jwt.service'

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        private readonly jwtService: JwtService
    ) {}

    /**
     * REGISTRATION
     *
     * @param   {RegistrationDTO}  registrationDto  [registrationDto description]
     *
     * @return  {RegisteredUser}                            [return description]
     */
    public async registration(
        registrationDto: RegistrationDTO
    ): Promise<RegisteredUser> {
        if (registrationDto.password != registrationDto.confirmPassword) {
            throw new HttpException(
                'Password Mismatched',
                HttpStatus.BAD_REQUEST
            )
        }
        const previousData = await this.userRepository.findOne({
            where: {
                email: registrationDto.email
            }
        })

        if (previousData) {
            throw new HttpException('Email already exists', HttpStatus.CONFLICT)
        }

        try {
            const userData = new User(
                registrationDto.name,
                registrationDto.email,
                registrationDto.password,
                registrationDto.userType
            )
            const { password, ...data } =
                await this.userRepository.save(userData)
            if (!data) throw new BadRequestException('User registration failed')
            return data
        } catch (error) {
            console.log(error)
            throw new HttpException(
                'An error occurred while registering a user',
                HttpStatus.BAD_REQUEST
            )
        }
    }

    /**
     * REGISTRATION
     *
     * @param   {LoginDTO}  LoginDTO
     *
     * @return  {User}
     */
    public async Login(loginDTO: LoginDTO): Promise<User> {
        const user = await this.findUser(loginDTO.email)
        if (!user) {
            throw new NotFoundException('User is not registered')
        } else if (user.userType !== 'User' && user.userType !== 'Admin') {
            throw new NotFoundException('User is neither User nor Admin')
        }
        if (!this.isPasswordValid(loginDTO.password, user.password)) {
            throw new BadRequestException('Invalid password')
        }
        return await this.sign(user)
    }

    //use select attribute
    async findAdmin(email: string): Promise<User | undefined> {
        return await this.userRepository.findOne({
            where: { email: email, userType: UserType.Admin }
        })
    }

    async findUser(email: string): Promise<User | undefined> {
        return await this.userRepository.findOne({
            where: { email: email }
        })
    }

    private sign(user: any) {
        const accessToken = this.jwtService.sign({
            sub: user.uuid
        })
        console.log('accessToken', accessToken)
        return {
            ...user,
            accessToken
        }
    }

    // Validate User's password
    public isPasswordValid(password: string, userPassword: string): boolean {
        return bcrypt.compareSync(password, userPassword)
    }
}
