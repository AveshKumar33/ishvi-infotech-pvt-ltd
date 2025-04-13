import { Role } from 'src/roles/entities/role.entity'
export class CreateUserDto {
    email: string
    name: string
    profile_picture: string
    password: string
    role: Role
}

