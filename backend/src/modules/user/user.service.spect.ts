import { Test, TestingModule } from '@nestjs/testing'
import { UserService } from './user.service'
import { getRepositoryToken } from '@nestjs/typeorm'
import { User } from './entities/user.entity'
import { Request } from 'express'

describe('UserService', () => {
    let service: UserService

    const magazineRepository = {
        findAllUserSubscribedMagazine: jest.fn()
    }
    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                UserService,
                {
                    provide: getRepositoryToken(User),
                    useValue: magazineRepository
                }
            ]
        }).compile()

        service = module.get<UserService>(UserService)
    })

    it('should be defined', () => {
        expect(service).toBeDefined()
    })

    it('findAll => should return an array of users subscribed and un subscribed magazines', async () => {
        const mockUser = { id: 5 } // Set any desired user data
        const mockRequest = {
            user: mockUser
        } as unknown as Request
        //arrange
        const userSubscribeAndUnsubscribedMagazine = {
            name: 'string',
            email: 'piash.tanjin@gmail.com',
            id: 5,
            createdAt: '2024-02-13T09:05:11.196Z',
            magazineSubscriptions: [
                {
                    id: 1,
                    createdAt: '2024-02-14T10:57:26.858Z',
                    status: true,
                    subscriptionType: 'Monthly',
                    magazine: {
                        id: 6,
                        createdAt: '2024-02-14T09:15:08.672Z',
                        title: 'new',
                        description: 'idk',
                        publisherName: 'asdasd',
                        imagePath:
                            'Passport-dddae35ad2c348c8c34fde7abfe139be.pdf'
                    }
                },
                {
                    id: 9,
                    createdAt: '2024-02-14T22:29:47.726Z',
                    status: true,
                    subscriptionType: 'Monthly',
                    magazine: {
                        id: 1,
                        createdAt: '2024-02-14T08:51:36.940Z',
                        title: 'asdas',
                        description: 'asdasd',
                        publisherName: 'asdas',
                        imagePath: 'asd'
                    }
                }
            ]
        }
        const subscribeAndUnsubscribeMagazine = [
            userSubscribeAndUnsubscribedMagazine
        ]
        jest.spyOn(
            magazineRepository,
            'findAllUserSubscribedMagazine'
        ).mockReturnValue(subscribeAndUnsubscribeMagazine)

        //act
        const result = await service.findAllUserSubscribedMagazine(
            {
                limit: 1,
                page: 1
            },
            'createdAt',
            mockRequest as any,
            false
        )
        console.log(result)
        // assert
        // expect(result).toEqual(users)
        // expect(mockUserRepository.find).toBeCalled()
    })
})
