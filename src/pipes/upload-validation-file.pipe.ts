import { PipeTransform, Injectable, BadRequestException } from "@nestjs/common"
import { extname } from "path"

@Injectable()
export class UploadFileValidationPipe implements PipeTransform<any> {
    readonly allowedExtensions = [".jpg", ".jpeg", ".png", ".gif", ".pdf", ".doc", ".docx", ".csv", ".txt", ".xlsx", ".webp"]
    readonly maxSizeInBytes = 1024 * 1024 * 5 // 5MB

    transform(file: Express.Multer.File) {
        if (!file) return

        // Check the file extension
        const fileExt = extname(file.originalname).toLowerCase()
        if (!this.allowedExtensions.includes(fileExt)) {
            throw new BadRequestException("Invalid file extension. Only JPG, JPEG, PNG, GIF, pdf, doc, docx, txt, xlsx ,webp files are allowed.")
        }

        // Check the file size
        if (file.size > this.maxSizeInBytes) {
            throw new BadRequestException("File size exceeds the allowed limit 5MB")
        }

        return file
    }
}