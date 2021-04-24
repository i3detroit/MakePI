import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from '@make-pi/shared/database';

@Injectable()
export class UsersService {
  constructor(
    @Inject('USER_REPOSITORY')
    private userRepository: Repository<User>
  ) {}

  findAll(): Promise<User[]> {
    return this.userRepository.find();
  }
}
