import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';
import * as path from 'path';

// Chargement des variables d'environnement en fonction de l'environnement 
const envFile = process.env.NODE_ENV === 'test' ? '.env.test' : '.env.development';
dotenv.config({ path: path.resolve(process.cwd(), envFile) });

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'sqlite',
  database: process.env.DB_NAME,
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  synchronize: true,  // Ne pas utiliser en production
};
