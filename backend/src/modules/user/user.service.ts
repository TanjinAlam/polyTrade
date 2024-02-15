import { BadRequestException, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import {
    IPaginationOptions,
    Pagination,
    paginate
} from 'nestjs-typeorm-paginate'
import { User } from './entities/user.entity'
import { FindOptionsOrder, Repository } from 'typeorm'
import { Magazine } from '../magazine/entities/magazine.entity'
import { SubscribeMagazineDTO } from './dto/magazine-subscription.dto'
import { UserMagazineSubscription } from './entities/user-magazine-subscription.entity'
import {
    MagazineSelectedAttribute,
    UserMagazineSubscriptionSelectedAttribute,
    UserSelectedAttribute
} from 'src/common/entities/selected-attributes'

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        @InjectRepository(Magazine)
        private readonly magazineRepository: Repository<Magazine>,
        @InjectRepository(UserMagazineSubscription)
        private readonly userMagazineSubscription: Repository<UserMagazineSubscription>
    ) {}

    /**
     *  Find All Subscribed Magazine
     *
     * @param   {IPaginationOptions, orderBy , desc, req}
     *
     * @return  {Magazines} list
     */
    async findAllUserSubscribedMagazine(
        options: IPaginationOptions,
        orderBy: string,
        req: Request,
        desc: boolean
    ): Promise<Pagination<User>> {
        const orderByQueries = ['createdAt']
        if (orderByQueries.indexOf(orderBy) === -1) {
            orderBy = 'createdAt'
        }

        const orderByCondition: FindOptionsOrder<User> = {
            [orderBy]: desc ? 'DESC' : 'ASC'
        }

        const query = {
            select: {
                ...UserSelectedAttribute,
                magazineSubscriptions: {
                    ...UserMagazineSubscriptionSelectedAttribute,
                    magazine: MagazineSelectedAttribute
                }
            },
            where: {
                magazineSubscriptions: {
                    user: {
                        id: req['user'].id
                    }
                }
            },
            relations: [
                'magazineSubscriptions',
                'magazineSubscriptions.magazine'
            ],
            order: orderByCondition
        }
        return await paginate<User>(this.userRepository, options, query)
    }

    /**
     *  Find All Subscribed Magazine
     *
     * @param   {SubscribeMagazineDTO, Request}
     *
     * @return  {Magazine}
     */
    async subscribeToMagazine(
        subscribeMagazineDTO: SubscribeMagazineDTO,
        req: Request
    ): Promise<UserMagazineSubscription> {
        const magazine = await this.magazineRepository.findOne({
            where: {
                id: subscribeMagazineDTO.magazineId,
                deletedAt: null
            }
        })
        if (!magazine) throw new BadRequestException('Magazine not found')
        const previouslySubscribed =
            await this.userMagazineSubscription.findOne({
                where: {
                    user: {
                        id: req['user'].id
                    },
                    magazine: {
                        id: subscribeMagazineDTO.magazineId
                    }
                }
            })
        if (previouslySubscribed) {
            previouslySubscribed.status = true
            return await this.userMagazineSubscription.save(
                previouslySubscribed
            )
        } else {
            const user = await this.userRepository.findOne({
                where: { id: req['user'].id }
            })

            const subscribingMagazine = new UserMagazineSubscription()
            subscribingMagazine.user = user
            subscribingMagazine.magazine = magazine
            const magazineCreated =
                await this.userMagazineSubscription.save(subscribingMagazine)
            if (!magazineCreated)
                throw new BadRequestException('Could not subscribe to magazine')
            return magazineCreated
        }
    }

    /**
     *  Cancel Subscription
     *
     * @param   {SubscribeMagazineDTO, Request}
     *
     * @return  {Magazine}
     */
    async cancelSubscription(
        subscribeMagazineDTO: SubscribeMagazineDTO,
        req: Request
    ): Promise<UserMagazineSubscription> {
        const isSubscribed = await this.userMagazineSubscription.findOne({
            where: {
                status: true,
                user: {
                    id: req['user'].id
                },
                magazine: {
                    id: subscribeMagazineDTO.magazineId
                }
            }
        })

        if (!isSubscribed) {
            throw new BadRequestException(
                'Magazine is not subscribed by the user'
            )
        }

        isSubscribed.status = false
        const subscriptionCanceled =
            await this.userMagazineSubscription.save(isSubscribed)

        if (!subscriptionCanceled)
            throw new BadRequestException(
                'Could not cancel subscribe to magazine'
            )
        return subscriptionCanceled
    }

    /**
     *  Find User By UUID
     *
     * @param   {uuid}
     *
     * @return  {User} object
     *
     */
    async findOneByUuid(uuid: string): Promise<User | undefined> {
        return await this.userRepository.findOne({
            where: { uuid: uuid }
        })
    }
}
