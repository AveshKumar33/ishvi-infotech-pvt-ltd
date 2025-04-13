import { Injectable, NotFoundException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { handleException } from 'src/exceptions/exception-handler';
import { DataSource } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Role } from 'src/roles/entities/role.entity';
import { SignUpDto } from './dto/sign-up.dto';
import { SignInDto } from './dto/sign-in.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private readonly dataSource: DataSource,

  ) {
  }



  async signup(dto: SignUpDto): Promise<String> {
    const { email, name, role_id, password, profile_picture } = dto
    const queryRunner = this.dataSource.createQueryRunner()

    try {
      await queryRunner.connect()
      await queryRunner.startTransaction()

      const saltOrRounds = await bcrypt.genSalt();
      const hash = await bcrypt.hash(password, saltOrRounds);

      const roleInfo = await this.dataSource.getRepository(Role).findOne({ where: { id: role_id } })
      if (!roleInfo) throw new NotFoundException("Role Not Found")
      console.log('Creating new user...');
      let userName = this.usersService.createUser({ email, name, profile_picture, password: hash, role: roleInfo }, queryRunner);
      await queryRunner.commitTransaction()
      return `user ${userName} Sign-up successfully`;
    } catch (error) {
      await queryRunner.rollbackTransaction()
      handleException(error, 'Error creating user');
      throw error; // 👈 satisfies TS (this will never run if handleException throws)
    } finally {
      await queryRunner.release()
    }
  }

  async login(payload: SignInDto) {
    const { email, password } = payload;

    try {
      const user = await this.usersService.findOne(email);
      if (!user) {
        return { message: 'Invalid credentials: User not found' };
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return { message: 'Invalid credentials: Password incorrect' };
      }

      const { password: _, ...userWithoutPassword } = user;
      const tokenPayload = { sub: user.id, email: user.email };

      return {
        message: 'Login successful',
        access_token: this.jwtService.sign(tokenPayload),
        user: userWithoutPassword,
      };

    } catch (error) {
      console.error('Login error:', error);
      throw new Error('An unexpected error occurred during login.');
    }
  }



}
