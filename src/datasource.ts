import { DataSource } from 'typeorm';
import { Poll, PollOption } from './entities/entities';
import * as process from 'process';

const dbhost = process.env.DB_HOST!;
export const AppDataSource = new DataSource({
    type: 'postgres',
    host: dbhost,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: [Poll, PollOption],
    synchronize: false,
    logging: true
  });