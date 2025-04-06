import {
    IsNotEmpty,
    IsOptional,
    IsString,
} from 'class-validator';
export class CreateCourseDto {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsString()
    cose: string;

    @IsOptional()
    @IsString()
    description?: string;

}
