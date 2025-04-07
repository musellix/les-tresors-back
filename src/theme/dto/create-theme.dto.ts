import { IsNotEmpty, IsString, IsUrl } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateThemeDto {

    @ApiProperty({ description: 'The korrigan of the theme', example: 'Queen Aman' })
    @IsNotEmpty()
    @IsString()
    korrigan: string;
 
    @ApiProperty({ description: "Estimated duration of the itinerary",example: "1 h"}) 
    @IsNotEmpty()
    @IsString()
    category: string;
  
    @ApiProperty({ description: 'URL of the picture of the korrigan', example: 'https://example.com/photo.jpg' })
    @IsUrl()
    pictureUrl: string;
}
