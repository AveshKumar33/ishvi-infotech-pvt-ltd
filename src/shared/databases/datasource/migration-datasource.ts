import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { join } from 'path';

// ✅ Create a new ConfigService instance
const configService = new ConfigService();

console.log('MYSQL_HOST:', configService.get<string>('MYSQL_HOST'));
console.log('MYSQL_USER:', configService.get<string>('MYSQL_USER'));
console.log('MYSQL_PASSWORD:', configService.get<string>('MYSQL_PASSWORD') ? '***' : 'NOT SET');
console.log('MYSQL_DATABASE:', configService.get<string>('MYSQL_DATABASE'));

export const connectionSource = new DataSource({
    type: 'mysql',
    host: configService.get<string>('MYSQL_HOST', 'localhost'),
    port: configService.get<number>('MYSQL_PORT', 3306),
    username: configService.get<string>('MYSQL_USER', 'root'),
    password: configService.get<string>('MYSQL_PASSWORD', 'your_password'),
    database: configService.get<string>('MYSQL_DATABASE', 'ishvi_infotech_pvt_ltd'),
    synchronize: false,
    logging: true,
    migrationsTransactionMode: 'all',
    migrations: [join(__dirname, '../../../database/migrations/*{.ts,.js}')],
    migrationsTableName: 'typeorm_migrations',
    entities: [join(__dirname, '../../../**/*.entity{.ts,.js}')],
    migrationsRun: false,
});
