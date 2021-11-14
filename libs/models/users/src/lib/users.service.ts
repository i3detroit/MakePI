import { Injectable, Inject } from '@nestjs/common';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { Role, User } from '@make-pi/shared/database';
import { BcryptService } from '@make-pi/shared/bcrypt';
import { CreateUser, ReturnCreatedUser, UpdateUser } from './users.interface';
import { ConfigService } from '@nestjs/config';
import { AppRoles } from '@make-pi/roles';

@Injectable()
export class UsersService {
  private saltWorkFactor = this.configService.get<number>(
    'BCRYPT_SALT_WORK_FACTOR',
    11
  );

  constructor(
    @Inject('USER_REPOSITORY')
    private userRepository: Repository<User>,
    @Inject('ROLE_REPOSITORY')
    private roleRepository: Repository<Role>,
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
    return this.userRepository.findOne(id, { relations: ['roles'] });
  }

  findOneByEmail(email: string): Promise<User> {
    return this.userRepository.findOne(
      { email: email.toLowerCase() },
      { relations: ['roles'] }
    );
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

  async addRole(id: string, appRole: AppRoles) {
    const user = await this.userRepository.findOne(id);
    const role = new Role();
    role.role = appRole;
    role.user = user;
    return await this.roleRepository.save(role);
  }

  async removeRole(id: string, appRole: AppRoles): Promise<DeleteResult> {
    const user = await this.userRepository.findOne(id, {
      relations: ['roles'],
    });
    const [role] = user.roles.filter((n) => n.role === appRole);
    return this.roleRepository.delete(role);
  }
}
