import { Test, TestingModule } from '@nestjs/testing'
import { getRepositoryToken } from '@nestjs/typeorm'
import { v4 as uuidv4 } from 'uuid' // Importing the uuidv4 function from the uuid library

import { User } from './entities/user.entity'
import { UserService } from './user.service'
import { Magazine } from '../magazine/entities/magazine.entity'
import { UserMagazineSubscription } from './entities/user-magazine-subscription.entity'
import { UserType } from 'src/common/enums'

class MagazineRepositoryMock {}
class UserMagazineRepositoryMock {}
export class userRepositoryMock {
    findOne = jest.fn()
}
describe('UserService', () => {
    let userService: UserService
    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                UserService,
                {
                    provide: getRepositoryToken(User),
                    useClass: userRepositoryMock
                },
                {
                    provide: getRepositoryToken(Magazine),
                    useClass: MagazineRepositoryMock
                },
                {
                    provide: getRepositoryToken(UserMagazineSubscription),
                    useClass: UserMagazineRepositoryMock
                }
            ]
        }).compile()

        userService = module.get<UserService>(UserService)
    })
    it('user service should be defined', () => {
        expect(userService).toBeDefined()
    })

    describe('find registered user by uuid', () => {
        it('find user by UUID', async () => {
            const user = new User(
                'piash',
                'piash.tanjin@gmail.com',
                '123456',
                UserType.User
            )
            ;(userService as any).userRepository.findOne.mockResolvedValueOnce(
                user
            )
            const foundUser = await userService.findOneByUuid(user.uuid)
            expect(foundUser).toEqual(user)
        })
        it('should return undefined if user not found', async () => {
            const randomUuid = uuidv4()
            ;(userService as any).userRepository.findOne.mockResolvedValueOnce(
                undefined
            )
            const foundUser = await userService.findOneByUuid(randomUuid)
            expect(foundUser).toBeUndefined()
        })
    })
})
