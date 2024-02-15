import { Test, TestingModule } from '@nestjs/testing'
import { UserController } from './user.controller'
import { UserService } from './user.service'
import { SubscribeMagazineDTO } from './dto/magazine-subscription.dto'

describe('UserController', () => {
    const req = {} as any // Mock the request object
    const subscribeMagazineDto = { magazineId: 1 } as SubscribeMagazineDTO // Mock the DTO object
    const mockUsersService = {
        subscription: jest
            .fn()
            .mockResolvedValueOnce({ req, subscribeMagazineDto })
    }
    let userController: UserController

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [UserController],
            providers: [
                UserService,
                {
                    provide: UserService,
                    useValue: mockUsersService
                }
            ]
        }).compile()

        userController = module.get<UserController>(UserController)
    })
    it('user controller should be defined', () => {
        expect(userController).toBeDefined()
    })
})
