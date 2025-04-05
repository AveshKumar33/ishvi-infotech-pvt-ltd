import { BadRequestException, Injectable, Logger, NotFoundException, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ConfigService } from '@nestjs/config';
import { handleException } from 'src/exceptions/exception-handler';
import { Role } from 'src/roles/entities/role.entity';

@Injectable()
export class UsersService implements OnModuleInit {
  private readonly logger = new Logger(UsersService.name);
  private readonly userRepository: Repository<User>

  constructor(
    private readonly dataSource: DataSource,
    private readonly configService: ConfigService
  ) {
    this.userRepository = this.dataSource.getRepository(User);

  }

  async onModuleInit() {
    this.logger.log('UsersService initialized...');
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    try {
      const { email, name, role_id, password, profile_picture } = createUserDto
      const roleInfo = await this.dataSource.getRepository(Role).findOne({ where: { id: role_id } })
      if (!roleInfo) throw new NotFoundException("Role Not Found")
      console.log('Creating new user...');
      let user = this.userRepository.create({ email, name, password, role: roleInfo });
      user = await this.userRepository.save(user);
      return user;
    } catch (error) {
      handleException(error, 'Error creating user');
      throw error; // 👈 satisfies TS (this will never run if handleException throws)
    }
  }


  async findAll(): Promise<User[]> {
    return await this.userRepository.find({ relations: ['role'] });
  }

  async findOne(id: string): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id }, relations: ['role'] });
    if (!user) throw new NotFoundException(`User with ID ${id} not found`);
    return user;
  }
  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) throw new NotFoundException(`User with ID ${id} not found`);

    const updated = this.userRepository.merge(user, updateUserDto);
    return await this.userRepository.save(updated);
  }

  async remove(id: string): Promise<{ message: string }> {
    await this.findOne(id); // Ensure user exists
    await this.userRepository.delete(id);
    return { message: `User with ID ${id} deleted successfully` };
  }
}
