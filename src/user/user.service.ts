import { ConflictException, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './create-user.dto';

@Injectable()
export class UserService {

  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    // Vérifiez si un utilisateur avec le même username existe déjà
    const existingUserByUsername = await this.userRepository.findOne({ where: { username: createUserDto.username } });
    if (existingUserByUsername) {
      throw new ConflictException('Username already exists');
    }
    
    // Vérifiez si un utilisateur avec le même email existe déjà
    const existingUserByEmail = await this.userRepository.findOne({ where: { email: createUserDto.email } });
    if (existingUserByEmail) {
      throw new ConflictException('Email already exists');
    }

    const user = new User();
    user.username = createUserDto.username;
    user.email = createUserDto.email;
    user.password = createUserDto.password;  // TODO hacher le mot de passe
    return this.userRepository.save(user);
  }
}
