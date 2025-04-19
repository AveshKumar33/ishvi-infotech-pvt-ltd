import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateRolePermissionDto } from './dto/create-role-permission.dto';
import { UpdateRolePermissionDto } from './dto/update-role-permission.dto';
import { handleException } from 'src/exceptions/exception-handler';
import { DataSource, In, Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { Role } from 'src/roles/entities/role.entity';
import { Permission } from 'src/permission/entities/permission.entity';
import { RolePermission } from './entities/role-permission.entity';

@Injectable()
export class RolePermissionService {
  private readonly rolePermissionRepository: Repository<RolePermission>

  constructor(
    private readonly dataSource: DataSource,
    private readonly configService: ConfigService
  ) {
    this.rolePermissionRepository = this.dataSource.getRepository(RolePermission);

  }


  async create(dto: CreateRolePermissionDto) {
    const { role_id, permission_id } = dto
    const queryRunner = this.dataSource.createQueryRunner()

    try {
      await queryRunner.connect()
      await queryRunner.startTransaction()
      const roleInfo = await queryRunner.manager.getRepository(Role).findOne({ where: { id: role_id } })
      if (!roleInfo) throw new NotFoundException("Role Not Found")
      const permissionInfo = await queryRunner.manager.getRepository(Permission).findOne({ where: { id: permission_id } })
      if (!permissionInfo) throw new NotFoundException("Permission Not Found")
      let user = this.rolePermissionRepository.create({ name: permissionInfo.name, role: roleInfo, permission: permissionInfo });
      user = await queryRunner.manager.save(user);
      await queryRunner.commitTransaction()

      return `Permission Alloted to user successfully`;
    } catch (error) {
      await queryRunner.rollbackTransaction()
      handleException(error, 'Error creating user');
      throw error;
    } finally {
      await queryRunner.release()
    }
  }

  findAll() {
    return `This action returns all rolePermission`;
  }

  findOne(id: number) {
    return `This action returns a #${id} rolePermission`;
  }

  update(id: number, updateRolePermissionDto: UpdateRolePermissionDto) {
    return `This action updates a #${id} rolePermission`;
  }

  remove(id: number) {
    return `This action removes a #${id} rolePermission`;
  }
  async getPermission(role: string, permission: string) {
    try {
      const rolePermission = await this.rolePermissionRepository.findOne({
        where: {
          role: { id: role },
          permission: { id: permission },
        },
        relations: ['role', 'permission'],
      });

      if (!rolePermission) {
        return `No permission '${permission}' found for role '${role}'.`;
      }

      return rolePermission;
    } catch (error) {
      // Handle or log the error
      throw new Error(`Failed to get permission: ${error.message}`);
    }
  }
  async getPermissions(role: string, permissions: string[]) {
    try {
      const rolePermissions = await this.rolePermissionRepository.find({
        where: {
          role: { id: role },
          permission: { id: In(permissions) },
        },
        relations: ['role', 'permission'],
      });

      if (!rolePermissions || rolePermissions.length === 0) {
        return `No permissions found for role '${role}'.`;
      }

      return rolePermissions;
    } catch (error) {
      throw new Error(`Failed to get permissions: ${error.message}`);
    }
  }

}
