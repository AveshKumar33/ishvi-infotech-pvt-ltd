import { Injectable, NotFoundException } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { Permission } from './entities/permission.entity';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';
import { handleException } from 'src/exceptions/exception-handler';

@Injectable()
export class PermissionService {
  constructor(private readonly dataSource: DataSource) { }

  private get repository() {
    return this.dataSource.getRepository(Permission);
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
