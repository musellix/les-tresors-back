import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ description: 'The email of the user', example: 'user@example.com' })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({ description: 'The password of the user', example: 'password123' })
  @IsNotEmpty()
  password: string;

  @ApiProperty({ description: 'The username of the user', example: 'john_doe' })
  @IsNotEmpty()
  @IsString()
  username: string;
}