import {
    Controller,
    DefaultValuePipe,
    Delete,
    Get,
    HttpStatus,
    Param,
    ParseBoolPipe,
    ParseIntPipe,
    Patch,
    Post,
    Query,
    Request,
    UseGuards,
    UseInterceptors
} from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import {
    ApiBearerAuth,
    ApiBody,
    ApiConsumes,
    ApiOperation,
    ApiQuery,
    ApiResponse
} from '@nestjs/swagger'
import { UserRole } from 'src/common/decorators/roles.decorator'
import { Roles } from 'src/common/enums'
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard'
import { RoleGuard } from 'src/common/guards/roles.guard'
import { fileStorage } from 'src/utils/app.utils'
import { CreateMagazineDTO } from './dto/create-magazine.dto'
import { MagazineService } from './magazine.service'
import { Magazine } from './entities/magazine.entity'
import { APIResponse } from 'src/common/interfaces'

@Controller('magazine')
export class MagazineController {
    constructor(private readonly magazineService: MagazineService) {}

    @Post()
    @UseGuards(JwtAuthGuard, RoleGuard)
    @UserRole(Roles.Admin)
    @ApiConsumes('multipart/form-data')
    @ApiBearerAuth()
    @ApiOperation({
        summary: 'Magazine create'
    })
    @ApiResponse({
        description: 'Something went wrong',
        status: HttpStatus.INTERNAL_SERVER_ERROR
    })
    @ApiResponse({
        description: 'Magazine created successful',
        status: HttpStatus.CREATED
    })
    @ApiBody({
        type: CreateMagazineDTO
    })
    @UseInterceptors(FileInterceptor('file', { storage: fileStorage }))
    async create(@Request() req: Request) {
        return {
            statusCode: HttpStatus.CREATED,
            message: 'Magazine created successfully',
            result: await this.magazineService.create(req)
        }
    }

    @Get('/admin')
    @UseGuards(JwtAuthGuard, RoleGuard)
    @UserRole(Roles.Admin)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'find all the magazines for admin' })
    @ApiResponse({ description: 'Bad Request', status: HttpStatus.BAD_REQUEST })
    @ApiResponse({
        description: 'Something went wrong',
        status: HttpStatus.INTERNAL_SERVER_ERROR
    })
    @ApiResponse({
        description: 'found all magazines for admin successful',
        status: HttpStatus.OK
    })
    @ApiQuery({
        name: 'limit',
        required: false,
        type: String,
        description: process.env.DEFAULT_PAGE_SIZE
    })
    async findAllMagazineForAdmin(
        @Query('page', new DefaultValuePipe(1), ParseIntPipe) page = 1,
        @Query('limit', new DefaultValuePipe(3), ParseIntPipe)
        limit: number,
        @Query('orderBy', new DefaultValuePipe('createdAt'))
        orderBy = 'createdAt',
        @Query('desc', new DefaultValuePipe(true), ParseBoolPipe)
        desc = true
    ): Promise<any> {
        const result = await this.magazineService.findAllMagazineAdminPaginated(
            {
                page,
                limit,
                route: process.env.APP_URL + '/magazine/admin'
            },
            orderBy,
            desc
        )

        return {
            statusCode: HttpStatus.OK,
            message: 'Data found',
            result: result.items,
            meta: result.meta,
            links: result.links
        }
    }

    @Get('/user')
    @ApiOperation({ summary: 'find all the magazines for users' })
    @ApiResponse({ description: 'Bad Request', status: HttpStatus.BAD_REQUEST })
    @ApiResponse({
        description: 'Something went wrong',
        status: HttpStatus.INTERNAL_SERVER_ERROR
    })
    @ApiResponse({
        description: 'found all magazines for user successful',
        status: HttpStatus.OK
    })
    @ApiQuery({
        name: 'limit',
        required: false,
        type: String,
        description: process.env.DEFAULT_PAGE_SIZE
    })
    async findAllMagazineForUser(
        @Query('page', new DefaultValuePipe(1), ParseIntPipe) page = 1,
        @Query('limit', new DefaultValuePipe(3), ParseIntPipe)
        limit: number,
        @Query('orderBy', new DefaultValuePipe('createdAt'))
        orderBy = 'createdAt',
        @Query('desc', new DefaultValuePipe(true), ParseBoolPipe)
        desc = true
    ): Promise<any> {
        const result = await this.magazineService.findAllMagazineUserPaginated(
            {
                page,
                limit,
                route: process.env.APP_URL + '/magazine/user'
            },
            orderBy,
            desc
        )

        return {
            statusCode: HttpStatus.OK,
            message: 'Data found',
            result: result.items,
            meta: result.meta,
            links: result.links
        }
    }

    @Get('/admin/:id')
    @UseGuards(JwtAuthGuard, RoleGuard)
    @UserRole(Roles.Admin)
    @ApiBearerAuth()
    @ApiOperation({
        summary: 'Get details of a specific magazine for admin'
    })
    @ApiResponse({
        description: 'Something went wrong',
        status: HttpStatus.INTERNAL_SERVER_ERROR
    })
    @ApiResponse({
        description: 'found magazine details successful',
        status: HttpStatus.OK
    })
    async findOneForAdmin(
        @Param('id') id: string
    ): Promise<APIResponse<Magazine>> {
        return {
            statusCode: HttpStatus.OK,
            message: 'Data found',
            result: await this.magazineService.findOneMagazineForAdmin(+id)
        }
    }

    @Get('/user/:id')
    @UseGuards(JwtAuthGuard, RoleGuard)
    @ApiBearerAuth()
    @ApiOperation({
        summary: 'Get details of a specific magazine for user'
    })
    @ApiResponse({
        description: 'Something went wrong',
        status: HttpStatus.INTERNAL_SERVER_ERROR
    })
    @ApiResponse({
        description: 'found magazine details successful',
        status: HttpStatus.OK
    })
    async findOneForUser(
        @Param('id') id: string
    ): Promise<APIResponse<Magazine>> {
        return {
            statusCode: HttpStatus.OK,
            message: 'Data found',
            result: await this.magazineService.findOneMagazineForUser(+id)
        }
    }

    @Patch(':id')
    @UseGuards(JwtAuthGuard, RoleGuard)
    @UserRole(Roles.Admin)
    @ApiBearerAuth()
    @ApiOperation({
        summary: 'Magazine update'
    })
    @ApiResponse({
        description: 'Something went wrong',
        status: HttpStatus.INTERNAL_SERVER_ERROR
    })
    @ApiResponse({
        description: 'Magazine updated successful',
        status: HttpStatus.OK
    })
    @ApiBody({
        type: CreateMagazineDTO
    })
    async update(
        @Param('id') id: string,
        @Request() req: Request
    ): Promise<APIResponse<Magazine>> {
        return {
            statusCode: HttpStatus.OK,
            message: 'Updated successfully',
            result: await this.magazineService.update(+id, req)
        }
    }

    @Delete(':id')
    @UseGuards(JwtAuthGuard, RoleGuard)
    @UserRole(Roles.Admin)
    @ApiBearerAuth()
    @ApiOperation({
        summary: 'Magazine delete'
    })
    @ApiResponse({
        description: 'Something went wrong',
        status: HttpStatus.INTERNAL_SERVER_ERROR
    })
    @ApiResponse({
        description: 'Magazine deleted successful',
        status: HttpStatus.OK
    })
    async remove(@Param('id') id: string): Promise<any> {
        return {
            statusCode: HttpStatus.OK,
            message: 'magazine soft deleted successful',
            result: await this.magazineService.remove(+id)
        }
    }
}
