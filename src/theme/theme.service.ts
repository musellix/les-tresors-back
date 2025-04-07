import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Theme } from './theme.entity';
import { CreateThemeDto } from './dto/create-theme.dto';

@Injectable()
export class ThemeService {

    constructor(
        @InjectRepository(Theme)
        private themeRepository: Repository<Theme>,
    ) {}

    /**
     * Creates a new theme in the database.
     * @param createThemeDto - The data transfer object containing the details of the theme to create.
     * @returns The newly created theme.
     */
    async createTheme(createThemeDto: CreateThemeDto): Promise<Theme> {
        const theme = this.themeRepository.create(createThemeDto);
        return this.themeRepository.save(theme);
    }

}
