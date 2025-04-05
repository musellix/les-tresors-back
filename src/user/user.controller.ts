import { Controller, Post, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.entity';
import { ConnectUserDto } from './dto/connect-user.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';

@ApiTags('Users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post("/signup")
  @ApiOperation({ summary: 'Create a new user' })
  @ApiBody({ type: CreateUserDto })
  @ApiResponse({ status: 201, description: 'User created successfully', type: User })
  @ApiResponse({ status: 400, description: 'Validation error' })
  async createUser(@Body() body: CreateUserDto): Promise<User> {
    return this.userService.createUser(body);
  }

  @Post("/signin")
  @ApiOperation({ summary: 'Sign in an existing user' })
  @ApiBody({ type: ConnectUserDto })
  @ApiResponse({ status: 200, description: 'User signed in successfully', type: User })
  @ApiResponse({ status: 400, description: 'Invalid credentials' })
  async signin(@Body() body: ConnectUserDto): Promise<User> {
    return this.userService.connectUser(body);
  }
}
