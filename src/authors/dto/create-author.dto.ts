import { IsNotEmpty, IsOptional, IsString, IsEmail, IsArray } from 'class-validator';

export class CreateAuthorDto {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsOptional()
    @IsString()
    bio?: string;

    @IsOptional()
    @IsString()
    profile_picture?: string;

    @IsOptional()
    @IsEmail()
    email?: string;

    @IsOptional()
    @IsString()
    mobile?: string;

    @IsOptional()
    @IsArray()
    @IsString({ each: true }) // ensures each item in the array is a string
    contents?: string[];
}
