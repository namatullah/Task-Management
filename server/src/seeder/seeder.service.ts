import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Role, User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';

@Injectable()
export class SeederService {
  private readonly logger = new Logger(SeederService.name);

  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>,
    private readonly usersService: UsersService,
  ) {}

  async seed() {
    const defaultEmail = 'admin@systam.com';

    let user = await this.userRepo.findOne({ where: { email: defaultEmail } });

    if (!user) {
      user = await this.usersService.create({
        firstName: 'admin',
        lastName: 'admin',
        email: defaultEmail,
        password: 'admin1234',
        role: Role.ADMIN,
      });
      this.logger.log('DEFAULT ADMIN USER CREATED.');
    } else {
      this.logger.log('DEFAUILT ADMIN USER ALREADY EXIST.');
    }
  }
}
