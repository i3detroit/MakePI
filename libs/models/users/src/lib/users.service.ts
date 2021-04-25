import { Injectable, Inject } from '@nestjs/common';
import { InsertResult, Repository, UpdateResult } from 'typeorm';
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

  findByActive(active: boolean): Promise<User[]> {
    return this.userRepository.find({ active });
  }

  findOneById(id: string): Promise<User> {
    return this.userRepository.findOne(id);
  }

  findOneByEmail(email: string): Promise<User> {
    return this.userRepository.findOne({ email: email.toLowerCase() });
  }

  create(data: User): Promise<InsertResult> {
    return this.userRepository.insert(data);
  }

  update(id: number, data: User): Promise<UpdateResult> {
    return this.userRepository.update(id, data);
  }
}
