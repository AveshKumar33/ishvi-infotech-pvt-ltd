import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmOptionsFactory, TypeOrmModuleOptions } from '@nestjs/typeorm';

@Injectable()
export class MysqlConfigService implements TypeOrmOptionsFactory {
    constructor(@Inject(ConfigService) private readonly configService: ConfigService) { }

    createTypeOrmOptions(): TypeOrmModuleOptions {
        console.log('connecting to mysql');
        return {
            type: 'mysql',
            host: this.configService.get<string>('MYSQL_HOST', 'localhost'),
            port: Number(this.configService.get<number>('MYSQL_PORT', 3306)),
            username: this.configService.get<string>('MYSQL_USER', 'root'),
            password: this.configService.get<string>('MYSQL_PASSWORD', 'root'),
            database: this.configService.get<string>('MYSQL_DATABASE', 'test'),
            autoLoadEntities: true, // ✅ Automatically load entity classes
            synchronize: false, // ⚠️ Disable in production
        };
    }
}

