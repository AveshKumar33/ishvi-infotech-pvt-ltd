import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MongooseConfigService } from './shared/databases/mongodb-connection';
import { MysqlConfigService } from './shared/databases/mysql-connection';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EnumModule } from './enum/enum.module';
import { UsersModule } from './users/users.module';
import { ScheduleModule } from '@nestjs/schedule';
import { RolesModule } from './roles/roles.module';
import { PermissionModule } from './permission/permission.module';
import { RolePermissionModule } from './role-permission/role-permission.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.env/.stage.local.env`,
      /** Load multiple .env files */
      // envFilePath: ['.env', '.env.local'], 

      isGlobal: true,
      ignoreEnvFile: false, // Change to `true` in production
    }),
    ScheduleModule.forRoot(),

    // ✅ MongoDB Connection
    MongooseModule.forRootAsync({
      useClass: MongooseConfigService,
    }),

    // ✅ MySQL Connection
    TypeOrmModule.forRootAsync({
      useClass: MysqlConfigService,
    }),

    EnumModule,
    UsersModule,
    RolesModule,
    PermissionModule,
    RolePermissionModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
