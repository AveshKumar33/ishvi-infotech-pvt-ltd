import { IsString, IsEmail, IsOptional, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    role_id: string;


    @IsString()
    @IsNotEmpty()
    password: string;

    @IsString()
    @IsOptional()
    profile_picture: string;

}

