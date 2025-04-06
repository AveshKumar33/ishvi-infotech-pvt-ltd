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
import { AuthorsModule } from './authors/authors.module';
import { CoursesModule } from './courses/courses.module';
import { BooksModule } from './books/books.module';
import { SemestersModule } from './semesters/semesters.module';
import { LanguagesModule } from './languages/languages.module';


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
    AuthorsModule,
    CoursesModule,
    BooksModule,
    SemestersModule,
    LanguagesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
