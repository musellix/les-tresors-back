import { IsArray, IsEnum, IsInt, IsNotEmpty, IsOptional, IsString, IsUrl, Max, Min, ValidateNested } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { CacheType } from "../itinerary.entity";
import { Type } from "class-transformer";
import { UpdateStepDto } from "src/itinerary/step/dto/update-step.dto";

export class UpdateItineraryDto {
    @ApiProperty({ description: "The ID of the itinerary to update", example: 1 })
    @IsNotEmpty()
    @IsInt()
    id: number;

    @ApiProperty({ description: "The title of the itinerary", example: "A bicyclette avec Louison" })
    @IsNotEmpty()
    @IsString()
    title: string;

    @ApiProperty({ description: "The theme of the itinerary", example: 1 })
    @IsInt()
    themeId: number;
  
    @ApiProperty({ description: "Type of cache used", enum: CacheType, example: "Multicache" })
    @IsEnum(CacheType)
    typeOfCache: CacheType;
  
    @ApiProperty({ description: "Difficulty level (1-5)", minimum: 1, maximum: 5, example: 2 }) 
    @IsInt()
    @Min(1)
    @Max(5)
    difficulty: number;
  
    @ApiProperty({ description: "Estimated duration of the itinerary",example: "1 h"}) 
    @IsString()
    duration: string;
  
    @ApiProperty({ description: "Accessibility information", example: "tous" })
    @IsString()
    accessibility: string;
  
    @ApiProperty({ description: "Optional photo URL", required: false, example: "https://example.com/photo.jpg" })
    @IsOptional()
    @IsUrl()
    photoUrl?: string;

    @ApiProperty({ type: [UpdateStepDto], description: "List of steps for the itinerary" })
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => UpdateStepDto)
    steps: UpdateStepDto[];
}
