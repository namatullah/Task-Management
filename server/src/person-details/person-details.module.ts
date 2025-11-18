import { Module } from '@nestjs/common';
import { PersonDetailsService } from './person-details.service';
import { PersonDetailsController } from './person-details.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PersonDetail } from './entities/person-detail.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PersonDetail])],
  controllers: [PersonDetailsController],
  providers: [PersonDetailsService],
})
export class PersonDetailsModule {}
