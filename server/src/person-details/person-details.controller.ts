import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PersonDetailsService } from './person-details.service';
import { CreatePersonDetailDto } from './dto/create-person-detail.dto';
import { UpdatePersonDetailDto } from './dto/update-person-detail.dto';

@Controller('person-details')
export class PersonDetailsController {
  constructor(private readonly personDetailsService: PersonDetailsService) {}

  @Post()
  create(@Body() createPersonDetailDto: CreatePersonDetailDto) {
    return this.personDetailsService.create(createPersonDetailDto);
  }

  @Get()
  findAll() {
    return this.personDetailsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.personDetailsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePersonDetailDto: UpdatePersonDetailDto) {
    return this.personDetailsService.update(+id, updatePersonDetailDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.personDetailsService.remove(+id);
  }
}
