import 'dotenv/config'; // Ensures .env is loaded
import { DataSource } from 'typeorm';
import { join } from 'path';

// Log environment variables to check if they are being loaded
console.log('MYSQL_HOST:', process.env.MYSQL_HOST);
console.log('MYSQL_USER:', process.env.MYSQL_USER);
console.log('MYSQL_PASSWORD:', process.env.MYSQL_PASSWORD ? '***' : 'NOT SET');
console.log('MYSQL_DATABASE:', process.env.MYSQL_DATABASE);

export const connectionSource = new DataSource({
    type: 'mysql',
    host: process.env.MYSQL_HOST || 'localhost',
    port: Number(process.env.MYSQL_PORT) || 3306,
    username: process.env.MYSQL_USER || 'root',
    password: process.env.MYSQL_PASSWORD || 'your_password',
    database: process.env.MYSQL_DATABASE || 'ishvi_infotech_pvt_ltd',
    synchronize: false,
    logging: true,
    migrationsTransactionMode: 'all',
    migrationsTableName: 'typeorm_migrations',
    migrations: [join(__dirname, '../../../database/migrations/*{.ts,.js}')],
    entities: [join(__dirname, '../../../**/*.entity{.ts,.js}')],
    migrationsRun: false,
});
