import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Role, User } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { CreateAuthDto } from 'src/auth/dto/create-auth.dto';
import { UpdateAuthDto } from 'src/auth/dto/update-auth.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly repo: Repository<User>,
  ) {}

  async create(createAuthDto: CreateAuthDto) {
    const password = await bcrypt.hash(createAuthDto.password, 10);
    createAuthDto.password = password;
    const user = this.repo.create(createAuthDto);
    return this.repo.save(user);
  }

  async findByEmail(email: string) {
    return this.repo.findOneBy({ email });
  }

  async validatePassword(user: User, plain: string) {
    return bcrypt.compare(plain, user.password);
  }

  async findAll() {
    return await this.repo.find();
  }

  async changeStatus(id: string) {
    const user = await this.repo.findOneBy({ id });
    if (!user) throw new NotFoundException('User not found');
    user.isActive = !user.isActive;
    return await this.repo.save(user);
  }

  async changeRole(id: string, role: Role) {
    const user = await this.repo.findOneBy({ id });
    if (!user) throw new NotFoundException('User not found');
    user.role = role;
    return await this.repo.save(user);
  }

  async changePassword(id: string, password: string) {
    const user = await this.repo.findOneBy({ id });
    if (!user) throw new NotFoundException('User not found');
    const newPassword = await bcrypt.hash(password, 10);
    user.password = newPassword;
    return await this.repo.save(user);
  }

  async updateUser(id: string, updateAuthDto: UpdateAuthDto) {
    const user = await this.repo.findOneBy({ id });
    if (!user) throw new NotFoundException('User not found');
    user.firstName = updateAuthDto.firstName;
    user.lastName = updateAuthDto.lastName;
    user.email = updateAuthDto.email;
    return await this.repo.save(user);
  }
}
