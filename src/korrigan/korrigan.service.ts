import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Korrigan } from './korrigan.entity';
import { CreateKorriganDto } from './dto/create-korrigan.dto';

@Injectable()
export class KorriganService {

    constructor(
        @InjectRepository(Korrigan)
        private korriganRepository: Repository<Korrigan>,
    ) {}

    /**
     * Creates a new korrigan in the database.
     * @param createKorriganDto - The data transfer object containing the details of the korrigan to create.
     * @returns The newly created korrigan.
     */
    async createKorrigan(createKorriganDto: CreateKorriganDto): Promise<Korrigan> {
        const korrigan = this.korriganRepository.create(createKorriganDto);
        return this.korriganRepository.save(korrigan);
    }

}
