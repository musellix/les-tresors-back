import { IsArray, IsEnum, IsInt, IsNotEmpty, IsOptional, IsString, IsUrl, Max, Min } from "class-validator";
import { CacheType } from "./itinerary.entity";
import { Type } from "class-transformer";
import { CreateStepDto } from "../step/create-step.dto";

export class CreateItineraryDto {
    @IsNotEmpty()
    @IsString()
    title: string;

    @IsString()
    theme: string;
  
    @IsEnum(CacheType)
    typeOfCache: CacheType;
  
    @IsInt()
    @Min(1)
    @Max(5)
    difficulty: number;
  
    @IsString()
    duration: string;
  
    @IsString()
    accessibility: string;
  
    @IsOptional()
    @IsUrl()
    photoUrl?: string;

    @IsArray()
    @Type(() => CreateStepDto)
    steps: CreateStepDto[];
}
