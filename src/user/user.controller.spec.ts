import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.entity';
import { ConnectUserDto } from './dto/connect-user.dto';

describe('UserController', () => {
  let controller: UserController;
  let fakeUserService: Partial<UserService>;

  beforeEach(async () => {
    fakeUserService = {
      createUser: (fakeUserDto: CreateUserDto) => {
        return Promise.resolve({
          id: 1,
          username: fakeUserDto.username,
          email: fakeUserDto.email,
          password: fakeUserDto.password,
        } as User);
      },
      connectUser: ({email, password}: ConnectUserDto) => {
        return Promise.resolve({
          id: 1,
          email: email, 
          password: password,
        } as User);
      }
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserService,
          useValue: fakeUserService,
        }
      ],
    }).compile();

    controller = module.get<UserController>(UserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('signup return user', async () => {
    const user = await controller.createUser({ username: 'fakeuser', email: 'fakeuser@gmail.com', password: 'iamfakeuser' });
    expect(user.id).toEqual(1);
  })

  it('signin return user', async () => {
    const user = await controller.signin({ email: 'fakeuser@gmail.com', password: 'iamfakeuser' });
    expect(user.id).toEqual(1);
  })
});
