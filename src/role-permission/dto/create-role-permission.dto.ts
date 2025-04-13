import { IsNotEmpty, IsUUID } from 'class-validator';
export class CreateRolePermissionDto {


    @IsUUID()
    @IsNotEmpty()
    role_id: string;


    @IsUUID()
    @IsNotEmpty()
    permission_id: string;


}

