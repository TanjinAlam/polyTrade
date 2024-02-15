import { BadRequestException, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import {
    IPaginationOptions,
    Pagination,
    paginate
} from 'nestjs-typeorm-paginate'
import { FindOptionsOrder, Repository } from 'typeorm'
import { User } from '../user/entities/user.entity'
import { Magazine } from './entities/magazine.entity'
@Injectable()
export class MagazineService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        @InjectRepository(Magazine)
        private readonly magazineRepository: Repository<Magazine>
    ) {}

    /**
     *  Create Magazine
     *
     * @param   {CreateMagazineDTO}
     *
     * @return  {Magazine} object
     */
    async create(req: Request) {
        const userData = await this.userRepository.findOne({
            where: {
                id: req['user'].id
            }
        })
        const magazine = new Magazine()
        magazine.title = req.body['title']
        magazine.description = req.body['description']
        magazine.publisherName = userData.name
        magazine.imagePath = `${process.env.APP_URL.replace('/api', '')}/public/${req['file'].filename}`
        const createdMagazine = await this.magazineRepository.save(magazine)
        return createdMagazine
    }

    /**
     *  Get All Magazine
     *
     * @param   {IPaginationOptions, orderBy , desc }
     *
     * @return  {paginate<Magazine>} list
     */
    async findAllMagazineAdminPaginated(
        options: IPaginationOptions,
        orderBy: string,
        desc: boolean
    ): Promise<Pagination<Magazine>> {
        const orderByQueries = ['title', 'createdAt']
        if (orderByQueries.indexOf(orderBy) === -1) {
            orderBy = 'createdAt'
        }

        const orderByCondition: FindOptionsOrder<Magazine> = {
            [orderBy]: desc ? 'DESC' : 'ASC'
        }

        const query = {
            withDeleted: true,
            order: orderByCondition
        }

        return paginate<Magazine>(this.magazineRepository, options, query)
    }

    /**
     *  Get All Magazine
     *
     * @param   {IPaginationOptions, orderBy , desc }
     *
     * @return  {paginate<Magazine>} list
     */
    async findAllMagazineUserPaginated(
        options: IPaginationOptions,
        orderBy: string,
        desc: boolean
    ): Promise<Pagination<Magazine>> {
        const orderByQueries = ['title', 'createdAt']
        if (orderByQueries.indexOf(orderBy) === -1) {
            orderBy = 'createdAt'
        }

        const orderByCondition: FindOptionsOrder<Magazine> = {
            [orderBy]: desc ? 'DESC' : 'ASC'
        }

        return paginate<Magazine>(this.magazineRepository, options, {
            order: orderByCondition
        })
    }

    /**
     *  Get Magazine
     *
     * @param   {ID}
     *
     * @return  {Magazine} object
     *
     */
    async findOneMagazineForAdmin(id: number): Promise<Magazine> {
        const magazineDetail = this.magazineRepository.findOne({
            where: {
                id: id
            }
        })
        if (!magazineDetail)
            throw new BadRequestException('Could not found magazine')
        return magazineDetail
    }

    /**
     *  Get Magazine
     *
     * @param   {ID}
     *
     * @return  {Magazine} object
     *
     */
    async findOneMagazineForUser(id: number): Promise<Magazine> {
        const magazineDetail = this.magazineRepository.findOne({
            where: {
                id: id,
                deletedAt: null
            }
        })
        if (!magazineDetail)
            throw new BadRequestException('Could not found magazine')
        return magazineDetail
    }

    /**
     *  Update Magazine
     *
     * @param   {ID, Request}
     *
     * @return  {Magazine} object
     *
     */
    async update(id: number, req: Request): Promise<Magazine> {
        const previousData = await this.magazineRepository.findOne({
            where: {
                id: id
            }
        })
        previousData.title = req.body['title'] ?? previousData.title
        previousData.description =
            req.body['description'] ?? previousData.description
        const magazineUpdated = await this.magazineRepository.save(previousData)

        if (!magazineUpdated)
            throw new BadRequestException('Could not update magazine')
        return magazineUpdated
    }

    /**
     *  Remove Magazine
     *
     * @param   {ID}
     *
     * @return {UpdateResult} Object
     *
     */
    async remove(id: number): Promise<any> {
        const isDelete = await this.magazineRepository.softDelete(id)
        console.log(isDelete)
        if (isDelete.affected === 0)
            throw new BadRequestException('Could not delete magazine')
        return isDelete
    }
}
