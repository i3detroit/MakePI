import { Injectable, Inject } from '@nestjs/common';
import { Repository, UpdateResult } from 'typeorm';
import { User } from '@make-pi/shared/database';
import { BcryptService } from '@make-pi/shared/bcrypt';
import { CreateUser, ReturnCreatedUser, UpdateUser } from './users.interface';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UsersService {
  private saltWorkFactor = this.configService.get<number>(
    'BCRYPT_SALT_WORK_FACTOR',
    11
  );

  constructor(
    @Inject('USER_REPOSITORY')
    private userRepository: Repository<User>,
    private bcryptService: BcryptService,
    private configService: ConfigService
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

  async create(data: CreateUser): Promise<ReturnCreatedUser> {
    const { email, password } = data;
    const salt = await this.bcryptService.genSalt(this.saltWorkFactor);
    const hash = await this.bcryptService.hash(password, salt);
    data.email = email.toLowerCase();
    data.password = hash;
    const result = await this.userRepository.insert(data);
    const [generatedMap] = result.generatedMaps;
    return {
      id: generatedMap.id,
      email: data.email,
      active: generatedMap.active,
    };
  }

  async update(id: string, data: UpdateUser): Promise<UpdateResult> {
    if (data.email) {
      data.email = data.email.toLowerCase();
    }
    if (data.password) {
      const salt = await this.bcryptService.genSalt(this.saltWorkFactor);
      const hash = await this.bcryptService.hash(data.password, salt);
      data.password = hash;
    }
    return await this.userRepository.update(id, data);
  }
}
