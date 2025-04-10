import { HttpException, HttpStatus } from "@nestjs/common";

// export class CustomException extends HttpException {
//     constructor(message: string, status: HttpStatus, originalError?: Error) {
//         super(
//             {
//                 statusCode: status,
//                 message,
//             },
//             status,
//         );

//         if (originalError) {
//             this.stack = originalError.stack;
//         }
//     }
// }
// import { HttpException, HttpStatus } from "@nestjs/common"

export class CustomException extends HttpException {
    constructor(message: string, status: HttpStatus = HttpStatus.INTERNAL_SERVER_ERROR) {
        super(message, status)
    }

    getResponse(): { message: string; status: number } {
        return {
            message: this.message,
            status: this.getStatus()
        }
    }
}
