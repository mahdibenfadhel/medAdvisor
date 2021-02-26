import { Injectable, NotAcceptableException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async get(id: string) {
    return this.userRepository.findOne(id);
  }

  async getByEmail(email: string) {
    return await this.userRepository
      .createQueryBuilder('users')
      .where('users.email = :email')
      .setParameter('email', email)
      .getOne();
  }

  async create(payload: any) {
    const user = await this.getByEmail(payload.email);

    if (user) {
      throw new NotAcceptableException(
        'User with provided email already created.',
      );
    }

    return await this.userRepository
      .createQueryBuilder('users')
      .where('users.email = :email')
      .setParameter('email', 'email')
      .getOne();
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }
  async deleteUser(id) {
    const user = await this.get(id);

    if (!user) {
      throw new NotAcceptableException(
        'no such user',
      );
    }
    await this.userRepository.softDelete(id);
    return { success: true };
  }


}
