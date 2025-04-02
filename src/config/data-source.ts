import * as dotenv from 'dotenv';
import * as path from 'path';
import { DataSource } from 'typeorm';

// Utilisation directe de process.cwd() pour CommonJS
const envFile = process.env.NODE_ENV === 'test' ? '.env.test' : '.env.development';
dotenv.config({ path: path.resolve(process.cwd(), envFile) });

if (!process.env.DB_NAME) {
  throw new Error('DB_NAME is not defined in the environment variables');
}

console.log( path.join(process.cwd(), 'dist/src/migrations/*{.ts,.js}') );

export const AppDataSource = new DataSource({
  type: 'sqlite',
  database: process.env.DB_NAME,
  entities: [path.join(process.cwd(), 'dist/src/itinerary/**/*.entity.js')],
  migrations: [path.join(process.cwd(), 'dist/src/migrations/*.js')],
  synchronize: false,
});