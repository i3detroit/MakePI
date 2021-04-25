import { Injectable, Inject } from '@nestjs/common';
import { InsertResult, Repository } from 'typeorm';
import { User } from '@make-pi/shared/database';
import { BcryptService } from '@make-pi/shared/bcrypt';
import { CreateUser } from './users.interface';

@Injectable()
export class UsersService {
  constructor(
    @Inject('USER_REPOSITORY')
    private userRepository: Repository<User>,
    private bcryptService: BcryptService
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

  async create(data: CreateUser): Promise<InsertResult> {
    const { email, password } = data;
    const rounds = Number(process.env.BCRYPT_SALT_WORK_FACTOR) || 11;
    const salt = await this.bcryptService.genSalt(rounds);
    const hash = await this.bcryptService.hash(password, salt);
    data.email = email.toLowerCase();
    data.password = hash;
    return this.userRepository.insert(data);
  }
}
