import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';
import * as path from 'path';

// Chargement des variables d'environnement en fonction de l'environnement 
const envFile = process.env.NODE_ENV === 'test' ? '.env.test' : '.env.development';
dotenv.config({ path: path.resolve(process.cwd(), envFile) });

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  url: process.env.DATABASE_URL,
  autoLoadEntities: true,
  synchronize: true, // 🔥 à mettre false en prod
  ssl: {
    rejectUnauthorized: false,
  },
};
