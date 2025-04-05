import { IsEmail, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ConnectUserDto {
  @ApiProperty({ description: 'The email of the user', example: 'user@example.com' })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({ description: 'The password of the user', example: 'password123' })
  @IsNotEmpty()
  password: string;
}