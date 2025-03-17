import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserService } from './user.service';
import { User } from './user.entity';
import { ConflictException } from '@nestjs/common';

describe('UserService', () => {
  let service: UserService;
  let fakeUserRepository: Partial<Repository<User>>;

  beforeEach(async () => {
    fakeUserRepository = {
      findOne: jest.fn().mockImplementation(({ where: { username, email } }) => {
        if(username === 'fakeuser' || email === 'fakeuser@gmail.com') {
          return Promise.resolve({ 
            id: 1, 
            username: 'fakeuser', 
            email: 'fakeuser@gmail.com', 
            password: 'password', 
          } as User);
        } else {
          return null
        }
      }),
      save: jest.fn().mockImplementation((user: User) => {
          return Promise.resolve({ ...user, id: 1 });
      }),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User),
          useValue: fakeUserRepository,
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('createUser should return an exception on existing username', async () => {
    await expect(service.createUser({username:"fakeuser", email:"fakeuser2@gmail.com", password: "password"})).rejects.toThrow(ConflictException);
  });

  it('createUser should return an exception on existing email', async () => {
    await expect(service.createUser({username:"fakeuser2", email:"fakeuser@gmail.com", password: "password"})).rejects.toThrow(ConflictException)
  });

  it('createUser should return an user', async () => {
    const user = await service.createUser({username:"fakeuser2", email:"fakeuser2@gmail.com", password: "password"})
    expect(user).toEqual({ id: 1, username: 'fakeuser2', email: 'fakeuser2@gmail.com', password: 'password' });
  });

  it('connectUser should return an exception on invalid credentials', () => {
    //
  });

  it('connectUser should return an user', () => {
    //
  });



});
