import { Body, Controller, Post } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Theme } from './theme.entity';
import { CreateThemeDto } from './dto/create-theme.dto';
import { ThemeService } from './theme.service';

@Controller('theme')
export class ThemeController {

    constructor(private readonly themeService: ThemeService) {}

    @Post('/create')
    @ApiOperation({ summary: 'Create a theme' })
    @ApiBody({ type: CreateThemeDto })
    @ApiResponse({ status: 201, description: 'Theme created successfully', type: Theme })
    @ApiResponse({ status: 400, description: 'Validation error' })
    async createTheme(@Body() body: CreateThemeDto): Promise<Theme> {
        return this.themeService.createTheme(body);
    }

}





