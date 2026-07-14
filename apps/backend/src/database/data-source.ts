import 'dotenv/config';
import { DataSource } from 'typeorm';
import { ImageEntity } from '../images/entities/image.entity';

export default new DataSource({
    type: 'postgres',
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,

    entities: [ImageEntity],
    migrations: ['src/database/migrations/*{.ts,.js}'],

    synchronize: false,
});