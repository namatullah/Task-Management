import { Injectable } from '@nestjs/common';
import { CreatePersonDetailDto } from './dto/create-person-detail.dto';
import { UpdatePersonDetailDto } from './dto/update-person-detail.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { PersonDetail } from './entities/person-detail.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PersonDetailsService {
  constructor(
    @InjectRepository(PersonDetail)
    private readonly personalDetalRepository: Repository<PersonDetail>,
  ) {}

  async create(createPersonDetailDto: CreatePersonDetailDto) {
    const newPersonalDetail = this.personalDetalRepository.create(
      createPersonDetailDto,
    );

    return await this.personalDetalRepository.save(newPersonalDetail);
  }

  async findAll() {
    return await this.personalDetalRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} personDetail`;
  }

  update(id: number, updatePersonDetailDto: UpdatePersonDetailDto) {
    return `This action updates a #${id} personDetail`;
  }

  async remove(id: number) {
    return await this.personalDetalRepository.delete(id);
  }
}
