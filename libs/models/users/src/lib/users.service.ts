import { Injectable, Inject } from '@nestjs/common';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { Role, User } from '@make-pi/shared/database';
import { BcryptService } from '@make-pi/shared/bcrypt';
import { CreateUser, ReturnCreatedUser, UpdateUser } from './users.interface';
import { ConfigService } from '@nestjs/config';
import { AppRoles } from '@make-pi/roles';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {
  private saltWorkFactor = this.configService.get<number>(
    'BCRYPT_SALT_WORK_FACTOR',
    11
  );

  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(Role)
    private rolesRepository: Repository<Role>,
    private bcryptService: BcryptService,
    private configService: ConfigService
  ) {}

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  findByActive(active: boolean): Promise<User[]> {
    return this.usersRepository.find({ active });
  }

  findOneById(id: string): Promise<User> {
    return this.usersRepository.findOne(id, { relations: ['roles'] });
  }

  findOneByEmail(email: string): Promise<User> {
    return this.usersRepository.findOne(
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
    const result = await this.usersRepository.insert(data);
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
    return await this.usersRepository.update(id, data);
  }

  async delete(id: string): Promise<void> {
    await this.usersRepository.delete({ id });
  }

  async addRole(id: string, appRole: AppRoles) {
    const user = await this.usersRepository.findOne(id);
    const role = new Role();
    role.role = appRole;
    role.user = user;
    return await this.rolesRepository.save(role);
  }

  async removeRole(id: string, appRole: AppRoles): Promise<DeleteResult> {
    const user = await this.usersRepository.findOne(id, {
      relations: ['roles'],
    });
    const [role] = user.roles.filter((n) => n.role === appRole);
    return this.rolesRepository.delete(role);
  }
}
