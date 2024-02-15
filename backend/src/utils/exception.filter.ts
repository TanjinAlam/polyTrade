import {
    ArgumentsHost,
    Catch,
    ExceptionFilter,
    HttpException,
    HttpStatus
} from '@nestjs/common'
import { Response } from 'express'

@Catch()
export class HttpExceptionsFilter implements ExceptionFilter {
    catch(exception: any, host: ArgumentsHost) {
        const ctx = host.switchToHttp()
        const response = ctx.getResponse<Response>()
        // const request = ctx.getRequest<Request>()
        const status =
            exception instanceof HttpException
                ? exception.getStatus()
                : HttpStatus.INTERNAL_SERVER_ERROR

        let message = 'An unknown error occurred'

        if (exception.response && exception.response.message.length) {
            console.log(exception.response.message)
            message = exception.response.message
                .map(
                    (str: string) => str.charAt(0).toUpperCase() + str.slice(1)
                ) // Capitalize first letter
                .join('. ')
        } else {
            message = exception.message
        }
        response.status(status).json({
            statusCode: status,
            message: message
        })
    }
}
