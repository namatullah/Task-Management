import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { CreateAuthDto } from 'src/auth/dto/create-auth.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly repo: Repository<User>,
  ) {}

  async create(createAuthDto: CreateAuthDto) {
    console.log('data', createAuthDto);
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

  async remove(id: string) {
    console.log(id);
    const user = await this.repo.findOneBy({ id: id });
    console.log(user);

    if (!user) throw new NotFoundException('User not found');

    return await this.repo.remove(user);
  }
}
