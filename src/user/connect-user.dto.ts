import { IsEmail, IsNotEmpty } from 'class-validator';

export class ConnectUserDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;
}
