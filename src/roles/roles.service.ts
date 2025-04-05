import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Role } from './entities/role.entity';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { handleException } from 'src/exceptions/exception-handler';

@Injectable()
export class RolesService implements OnModuleInit {
  private readonly logger = new Logger(RolesService.name);
  private roleRepository: Repository<Role>;

  constructor(private readonly dataSource: DataSource) {
    this.roleRepository = this.dataSource.getRepository(Role);
  }

  onModuleInit() {
    this.logger.log('RolesService initialized');
  }

  async create(createRoleDto: CreateRoleDto): Promise<Role> {
    try {
      console.log('role is comming');

      const role = this.roleRepository.create(createRoleDto);
      return await this.roleRepository.save(role);
    } catch (error) {
      handleException(error, 'Error creating role');
      throw error

    }
  }

  async findAll(): Promise<Role[]> {
    try {
      return await this.roleRepository.find({
        relations: ['users', 'role_permissions'],
      });
    } catch (error) {
      handleException(error, 'Error fetching all roles');
      throw error

    }
  }

  async findOne(id: string): Promise<Role> {
    try {
      const role = await this.roleRepository.findOne({
        where: { id },
        relations: ['users', 'role_permissions'],
      });

      if (!role) {
        throw new Error(`Role with ID ${id} not found`);
      }

      return role;
    } catch (error) {
      handleException(error, `Error fetching role by ID ${id}`);
      throw error

    }
  }

  async update(id: string, updateRoleDto: UpdateRoleDto): Promise<Role> {
    try {
      await this.findOne(id); // Ensures role exists
      await this.roleRepository.update(id, updateRoleDto);
      return this.findOne(id);
    } catch (error) {
      handleException(error, `Error updating role with ID ${id}`);
      throw error

    }
  }

  async remove(id: string): Promise<{ message: string }> {
    try {
      const role = await this.findOne(id);
      await this.roleRepository.delete(id);
      return { message: `Role '${role.name}' deleted successfully.` };
    } catch (error) {
      handleException(error, `Error deleting role with ID ${id}`);
      throw error
    }
  }
}
