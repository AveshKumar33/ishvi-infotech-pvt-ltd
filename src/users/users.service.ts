import { Injectable, Logger, NotFoundException, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cron, CronExpression } from '@nestjs/schedule';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as moment from 'moment-timezone';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UsersService implements OnModuleInit {
  private readonly logger = new Logger(UsersService.name);

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly configService: ConfigService
  ) { }

  async onModuleInit() {
    this.logger.log('Initializing Cron Jobs...');
  }

  @Cron(CronExpression.EVERY_30_SECONDS)
  async firstCronJob() {
    this.logger.log('First Cron Executed - Checking Second Job Execution Time');

    const scheduledTime = this.configService.get<string>('SECOND_CRON_TIME', '08:50:00'); // Fetch from .env

    const now = moment.utc().format('HH:mm:00'); // Current UTC time in HH:mm:ss format

    console.log(`Current Time: ${now} | Scheduled Second Cron Time: ${scheduledTime}`);

    if (now === scheduledTime) {
      this.logger.log('Triggering Second Cron Job at Scheduled Time');
      await this.secondCronJob();
    }
  }

  async secondCronJob() {
    this.logger.log('Second Cron Executed Successfully');
    console.log('Avesh - Second Cron Executed');
    // Your business logic here
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    this.logger.log('Creating new user...');
    const user = this.userRepository.create(createUserDto);
    return await this.userRepository.save(user);
  }

  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async findOne(id: number): Promise<any> {
    // const user = await this.userRepository.findOne({ where: { id } });
    // if (!user) throw new NotFoundException(`User with ID ${id} not found`);
    return;
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    await this.findOne(id); // Ensure user exists
    await this.userRepository.update(id, updateUserDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<{ message: string }> {
    await this.findOne(id); // Ensure user exists
    await this.userRepository.delete(id);
    return { message: `User with ID ${id} deleted successfully` };
  }
}
