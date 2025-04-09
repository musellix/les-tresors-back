import { Module } from '@nestjs/common';
import { KorriganController } from './korrigan.controller';
import { KorriganService } from './korrigan.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Korrigan } from './korrigan.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Korrigan])],
  controllers: [KorriganController],
  providers: [KorriganService]
})
export class KorriganModule {}
