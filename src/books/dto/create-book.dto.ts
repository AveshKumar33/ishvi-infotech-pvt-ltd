import {
    IsNotEmpty,
    IsOptional,
    IsString,
    IsNumber,
    IsBoolean,
    IsMongoId,
    IsArray
} from 'class-validator';

export class CreateBookDto {
    @IsNotEmpty()
    @IsString()
    title: string;

    @IsOptional()
    @IsString()
    description?: string;

    @IsNotEmpty()
    @IsNumber()
    price: number;

    @IsOptional()
    @IsString()
    cover_image?: string;

    @IsOptional()
    @IsNumber()
    stock?: number;

    @IsOptional()
    @IsString()
    ISBN?: string;

    @IsOptional()
    @IsString()
    code?: string;

    @IsOptional()
    @IsString()
    sample_pdf?: string;

    @IsOptional()
    @IsBoolean()
    status?: boolean;

    @IsNotEmpty()
    @IsMongoId()
    author: string;

    @IsNotEmpty()
    @IsMongoId()
    language: string;

    @IsNotEmpty()
    @IsMongoId()
    semester: string;

    @IsArray()
    @IsMongoId({ each: true })
    courses: string[];
}
