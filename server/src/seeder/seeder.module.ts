import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { SeederService } from './seeder.service';
import { UsersService } from 'src/users/users.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [SeederService, UsersService],
  exports: [SeederService],
})
export class SeederModule {}
