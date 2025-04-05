import { ExceptionFilter, Catch, ArgumentsHost, HttpStatus, HttpException, BadRequestException, Logger } from "@nestjs/common"
import { CustomException } from "./custom.exception"

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
    catch(exception: any, host: ArgumentsHost) {
        const context = host.switchToHttp()
        const response = context.getResponse()
        const request = context.getRequest()
        const status = exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR

        const err = Object.getOwnPropertyDescriptors(exception)
        const name = err?.name?.value || "Error"
        const logger = new Logger(name)
        logger.error(exception)

        const message = this.extractErrorMessage(exception)

        response.status(status).json({
            success: false,
            statusCode: status,
            timestamp: new Date().toISOString(),
            path: request.url,
            message: status === 403 ? "Permission denied." : status === 500 ? "Something went wrong." : message
        })
    }

    private extractErrorMessage(exception: any): string {
        if (exception instanceof CustomException) {
            const response = exception.getResponse() as any;
            return response.message;
        }

        if (exception instanceof BadRequestException) {
            const response = exception.getResponse() as any;
            if (typeof response.message === 'string') return response.message;
            if (Array.isArray(response.message)) return response.message[0];
        }

        return `${exception}`;
    }

}