import {
    Body,
    Controller,
    DefaultValuePipe,
    Get,
    HttpStatus,
    ParseBoolPipe,
    ParseIntPipe,
    Post,
    Query,
    Req,
    Request,
    UseGuards
} from '@nestjs/common'
import {
    ApiBearerAuth,
    ApiOperation,
    ApiQuery,
    ApiResponse
} from '@nestjs/swagger'
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard'
import { RoleGuard } from 'src/common/guards/roles.guard'
import { APIResponse } from 'src/common/interfaces'
import { UserService } from 'src/modules/user/user.service'
import { SubscribeMagazineDTO } from './dto/magazine-subscription.dto'

@UseGuards(JwtAuthGuard, RoleGuard)
@Controller('/users')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post('/subscriptions')
    @ApiBearerAuth()
    @ApiOperation({
        summary: 'Make subscription'
    })
    @ApiResponse({
        description: 'Something went wrong',
        status: HttpStatus.INTERNAL_SERVER_ERROR
    })
    @ApiResponse({
        description: 'subscription successful',
        status: HttpStatus.CREATED
    })
    async subscription(
        @Req() req,
        @Body() subscribeMagazineDto: SubscribeMagazineDTO
    ): Promise<APIResponse<any>> {
        return {
            statusCode: HttpStatus.CREATED,
            message: 'subscription done successfully',
            result: await this.userService.subscribeToMagazine(
                subscribeMagazineDto,
                req
            )
        }
    }

    @Post('/cancel-subscriptions')
    @ApiBearerAuth()
    @ApiOperation({
        summary: 'Cancel subscription '
    })
    @ApiResponse({
        description: 'Something went wrong',
        status: HttpStatus.INTERNAL_SERVER_ERROR
    })
    @ApiResponse({
        description: 'subscription canceled successful',
        status: HttpStatus.CREATED
    })
    async cancelSubscription(
        @Req() req,
        @Body() subscribeMagazineDto: SubscribeMagazineDTO
    ): Promise<APIResponse<any>> {
        return {
            statusCode: HttpStatus.CREATED,
            message: 'subscription cancel successfully',
            result: await this.userService.cancelSubscription(
                subscribeMagazineDto,
                req
            )
        }
    }

    @Get('/subscriptions')
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Find users all subscribed magazine' })
    @ApiResponse({ description: 'Bad Request', status: HttpStatus.BAD_REQUEST })
    @ApiResponse({
        description: 'Something went wrong',
        status: HttpStatus.INTERNAL_SERVER_ERROR
    })
    @ApiResponse({
        description:
            'found all user subscribed and unsubscribed magazine successful',
        status: HttpStatus.OK
    })
    @ApiQuery({
        name: 'limit',
        required: false,
        type: String,
        description: process.env.DEFAULT_PAGE_SIZE
    })
    async findAllUserSubscribedMagazine(
        @Request() req: Request,
        @Query('page', new DefaultValuePipe(1), ParseIntPipe) page = 1,
        @Query('limit', new DefaultValuePipe(3), ParseIntPipe)
        limit: number,
        @Query('orderBy', new DefaultValuePipe('createdAt'))
        orderBy = 'createdAt',
        @Query('desc', new DefaultValuePipe(true), ParseBoolPipe)
        desc = true
    ) {
        const result = await this.userService.findAllUserSubscribedMagazine(
            {
                page,
                limit,
                route: process.env.APP_URL + '/users/subscriptions'
            },
            orderBy,
            req,
            desc
        )

        return {
            status: HttpStatus.OK,
            message: 'Data found',
            result: result.items,
            meta: result.meta,
            links: result.links
        }
    }
}
