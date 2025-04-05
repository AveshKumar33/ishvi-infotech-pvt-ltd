import { HttpException, HttpStatus } from "@nestjs/common";

export class CustomException extends HttpException {
    constructor(message: string, status: HttpStatus, originalError?: Error) {
        super(
            {
                statusCode: status,
                message,
            },
            status,
        );

        if (originalError) {
            this.stack = originalError.stack;
        }
    }
}
