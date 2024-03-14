import { Injectable, UnauthorizedException, UnprocessableEntityException } from '@nestjs/common';
import * as bcrypt from 'bcryptjs'
import { CreateUserDto } from './dto/create-user.dto';
import { UsersRepository } from './users.repository';
import { GetUserDto } from './dto/get-user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async create(createUserDto: CreateUserDto) {
    await this.validateCreateUserDto(createUserDto)
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10)

    return this.usersRepository.create({...createUserDto, password: hashedPassword });
  }

  private async validateCreateUserDto(createUserDto: CreateUserDto) {
    try {
      await this.usersRepository.findOne({ email: createUserDto.email })
    } catch (error) {
      return 
    }
    throw new UnprocessableEntityException('Email already exists')
  }

  async verifyUser(email: string, password: string) {
    const user = await this.usersRepository.findOne({ email })
    const isValidPassword = await bcrypt.compare(password, user.password)

    if(!isValidPassword) {
      throw new UnauthorizedException('Credentials are not valid!')
    }

    return user
  }

  async getUser(getUserDto: GetUserDto) {
    return await this.usersRepository.findOne(getUserDto)
  }
}
