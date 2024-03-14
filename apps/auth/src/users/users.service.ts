import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcryptjs'
import { CreateUserDto } from './dto/create-user.dto';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async create(createUserDto: CreateUserDto) {
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10)

    return this.usersRepository.create({...createUserDto, password: hashedPassword });
  }

  async verifyUser(email: string, password: string) {
    const user = await this.usersRepository.findOne({ email })
    const isValidPassword = await bcrypt.compare(password, user.password)

    if(!isValidPassword) {
      throw new UnauthorizedException('Credentials are not valid!')
    }

    return user
  }
}
