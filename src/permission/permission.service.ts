import { Injectable, NotFoundException } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { Permission } from './entities/permission.entity';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';
import { handleException } from 'src/exceptions/exception-handler';
import { MODULE_LIST } from './free-module';

@Injectable()
export class PermissionService {
  constructor(private readonly dataSource: DataSource) { }

  private get repository() {
    return this.dataSource.getRepository(Permission);
  }




  async seedPermissions() {
    const permissionRepo = this.dataSource.getRepository(Permission);

    for (const item of MODULE_LIST) {
      const existing = await permissionRepo.findOne({ where: { name: item.name } });

      if (!existing) {
        const permission = permissionRepo.create({
          name: item.name,
          alias_name: item.alias_name,
          display_name: item.display_name,
          description: item.description,
          type: item.category,
          version: 'v1', // or dynamically based on your logic
          status: !!item.status,
          is_enabled: true,
          release_date: new Date(), // You can also use a fixed release date
        });

        await permissionRepo.save(permission);
        console.log(`✅ Created permission: ${item.name}`);
      } else {
        console.log(`⚠️ Skipped existing permission: ${item.name}`);
      }
    }
  }


  async create(createPermissionDto: CreatePermissionDto): Promise<Permission> {
    try {
      const permission = this.repository.create(createPermissionDto);
      return await this.repository.save(permission);
    } catch (error) {
      handleException(error, 'Error creating permission');
      throw error
    }
  }

  async findAll(): Promise<Permission[]> {
    return await this.repository.find();
  }

  async findOne(id: string): Promise<Permission> {
    const permission = await this.repository.findOne({ where: { id } });
    if (!permission) {
      throw new NotFoundException(`Permission with ID ${id} not found`);
    }
    return permission;
  }

  async update(id: string, updateDto: UpdatePermissionDto): Promise<Permission> {
    const permission = await this.findOne(id);
    this.repository.merge(permission, updateDto);
    return await this.repository.save(permission);
  }

  async remove(id: string): Promise<{ message: string }> {
    await this.findOne(id);
    await this.repository.delete(id);
    return { message: `Permission with ID ${id} deleted successfully` };
  }
}
