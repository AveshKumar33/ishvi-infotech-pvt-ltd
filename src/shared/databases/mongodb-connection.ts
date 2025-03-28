import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MongooseModuleOptions, MongooseOptionsFactory } from '@nestjs/mongoose';

@Injectable()
export class MongooseConfigService implements MongooseOptionsFactory {
    constructor(@Inject(ConfigService) private readonly configService: ConfigService) { }

    createMongooseOptions(): MongooseModuleOptions {
        const username = this.configService.get<string>('MONGODB_DATABASE_USER');
        const databasename = this.configService.get<string>('MONGODB_DATABASE_NAME');
        const password = this.configService.get<string>('MONGODB_DATABASE_PASSWORD');
        const host = this.configService.get<string>('MONGODB_DATABASE_HOST');

        if (!username || !password || !databasename) {
            throw new Error('Missing database credentials in environment variables');
        }

        const uri = `mongodb+srv://${username}:${password}@${host}/${databasename}?retryWrites=true&w=majority&appName=Cluster0`;
        console.log('Connecting to MongoDB...', uri?.slice(0, 30));

        return { uri };
    }
}

