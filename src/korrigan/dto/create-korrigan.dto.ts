import { IsNotEmpty, IsString, IsUrl } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { IsStringOrNull } from "src/common/validators/is-string-or-null.validator";

export class CreateKorriganDto {

    @ApiProperty({ description: 'The name of the korrigan', example: 'Queen Aman' })
    @IsNotEmpty()
    @IsString()
    name: string;
 
    @ApiProperty({ description: "the theme of the korrigan", example: "Histoire"}) 
    @IsStringOrNull()
    @IsString()
    theme: string;
}
