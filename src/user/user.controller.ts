import { Controller, Post, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './create-user.dto';
import { User } from './user.entity';
import { ConnectUserDto } from './connect-user.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post("/signup")
  async createUser(@Body() body: CreateUserDto): Promise<User> {
    return this.userService.createUser(body);
  }

  @Post("/signin")
  async signin(@Body() body: ConnectUserDto): Promise<User> {
      return this.userService.connectUser(body);
  }
}
