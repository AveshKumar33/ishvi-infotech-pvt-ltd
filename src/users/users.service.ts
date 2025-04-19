import { BadRequestException, Injectable, Logger, NotFoundException, OnModuleInit } from '@nestjs/common';
import { DataSource, QueryRunner, Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ConfigService } from '@nestjs/config';
import { handleException } from 'src/exceptions/exception-handler';
import * as bcrypt from 'bcrypt';
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

  async createUser(dto: CreateUserDto, queryRunner: QueryRunner): Promise<String> {
    try {
      let user = this.userRepository.create(dto);
      user = await queryRunner.manager.save(user);
      const { password, name, ...rest } = user
      return name
    } catch (error) {
      handleException(error, 'Error creating user');
      throw error;
    }
  }


  async findAll(): Promise<User[]> {
    return await this.userRepository.find({ relations: ['role'] });
  }

  async findOne(email: string): Promise<User> {
    try {
      const user = await this.userRepository.findOne({ where: { email }, relations: ['role'] });
      if (!user) throw new NotFoundException(`User with user name ${email} not found`);
      return user;
    } catch (error) {
      handleException(error, "Error in get user by id")
      throw error
    }
  }
  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const { email, name, role_id, password, profile_picture } = updateUserDto;
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const user = await queryRunner.manager.findOne(User, { where: { id } });
      if (!user) throw new NotFoundException(`User with ID ${id} not found`);

      if (email) user.email = email;
      if (name) user.name = name;
      if (profile_picture) user.profile_picture = profile_picture;

      if (password) {
        const salt = await bcrypt.genSalt();
        user.password = await bcrypt.hash(password, salt);
      }

      if (role_id) {
        const role = await queryRunner.manager.findOne(Role, { where: { id: role_id } });
        if (!role) throw new NotFoundException('Role not found');
        user.role = role;
      }

      const updatedUser = await queryRunner.manager.save(user);
      await queryRunner.commitTransaction();
      return updatedUser;

    } catch (error) {
      await queryRunner.rollbackTransaction();
      handleException(error, 'Error occurred while updating the user');
      throw error;

    } finally {
      await queryRunner.release();
    }
  }

  async remove(id: string): Promise<{ message: string }> {
    await this.findOne(id); // Ensure user exists
    await this.userRepository.delete(id);
    return { message: `User with ID ${id} deleted successfully` };
  }







}
