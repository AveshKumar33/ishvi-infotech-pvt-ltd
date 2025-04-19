import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateUserDto {
    @IsOptional()
    @IsString()
    email: string;

    @IsString()
    @IsNotEmpty()
    name: string;

    @IsOptional()
    @IsString()
    profile_picture?: string;

    @IsString()
    @IsOptional()
    password: string;

    @IsOptional()
    @IsString()
    role_id: string;
}

