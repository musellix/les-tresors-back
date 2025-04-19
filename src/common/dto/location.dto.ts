import { IsLatitude, IsLongitude } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class LocationDto {
  @ApiProperty({ description: "Latitude of the location", example: 48.8566 })
  @IsLatitude()
  latitude: number;

  @ApiProperty({ description: "Longitude of the location", example: 2.3522 })
  @IsLongitude()
  longitude: number;
}