import * as dotenv from 'dotenv';

import { DataSourceOptions } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

dotenv.config();

const DatabaseConfig = (): DataSourceOptions => ({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,

  logging: false,
  entities: ['./dist/**/*entity.{ts,js}'],
  migrations: ['src/database/migrations/*.{ts,js}'],
  synchronize: true,
  namingStrategy: new SnakeNamingStrategy(),
  cache: true,
});

export default DatabaseConfig;
