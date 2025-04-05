import {
    BadRequestException,
    ConflictException,
    ForbiddenException,
    HttpStatus,
    NotAcceptableException,
    NotFoundException,
    UnauthorizedException
} from "@nestjs/common"
import { CustomException } from "./custom.exception"

export const handleException = (error: any, message: string): never => {
    try {
        if (error instanceof ConflictException) {
            throw new CustomException(error.message, HttpStatus.CONFLICT)
        }

        if (error instanceof NotFoundException) {
            throw new CustomException(error.message, HttpStatus.NOT_FOUND)
        }

        if (error instanceof UnauthorizedException) {
            throw new CustomException(error.message, HttpStatus.UNAUTHORIZED)
        }

        if (error instanceof ForbiddenException) {
            throw new CustomException(error.message, HttpStatus.FORBIDDEN)
        }

        if (error instanceof BadRequestException) {
            throw new CustomException(error.message, HttpStatus.BAD_REQUEST)
        }

        if (error instanceof NotAcceptableException) {
            throw new CustomException(error.message, HttpStatus.NOT_ACCEPTABLE)
        }

        // Log the detailed error for debugging purposes
        console.log(message)
        console.error(error)

        // Throw a generic internal server error to the client
        throw new CustomException(error.message, HttpStatus.INTERNAL_SERVER_ERROR)
    } catch (catchedError) {
        console.error("Error caught in handleException:", catchedError)
        throw catchedError
    }
}