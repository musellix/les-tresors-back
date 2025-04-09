import { IsNotEmpty, IsString, IsUrl } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { IsStringOrEmpty } from "src/common/validators/is-string-or-empty.validator";

export class CreateKorriganDto {

    @ApiProperty({ description: 'The name of the korrigan', example: 'Queen Aman' })
    @IsNotEmpty()
    @IsString()
    name: string;
 
    @ApiProperty({ description: "the theme of the korrigan",example: "Histoire"}) 
    @IsStringOrEmpty()
    @IsString()
    theme: string;
}
