import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from '@make-pi/shared/database';
import { BcryptService } from '@make-pi/shared/bcrypt';
import { CreateUser, ReturnCreatedUser } from './users.interface';
import * as moment from 'moment';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UsersService {
  private saltWorkFactor = this.configService.get<number>(
    'BCRYPT_SALT_WORK_FACTOR',
    11
  );
  private maxLoginAttempts = this.configService.get<number>(
    'MAX_LOGIN_ATTEMPTS',
    10
  );
  private lockTime = this.configService.get<number>('LOCK_TIME', 60);

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

  async increaseLoginAttempts(id: string): Promise<void> {
    const user = await this.userRepository.findOne(id);

    if (user.lockUntil && moment(user.lockUntil).isBefore(moment())) {
      const payload = { loginAttempts: 1, lockUntil: null };
      await this.userRepository.update(id, payload);
      return;
    }

    const payload = {
      loginAttempts: user.loginAttempts + 1,
      lockUntil: null,
    };

    if (payload.loginAttempts >= this.maxLoginAttempts) {
      payload.lockUntil = moment().add(this.lockTime, 'seconds').toISOString();
    }

    await this.userRepository.update(id, payload);
  }

  async resetLoginAttempts(id: string): Promise<void> {
    await this.userRepository.update(id, { loginAttempts: 0, lockUntil: null });
  }
}
