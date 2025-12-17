import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { PaginationDto } from 'src/dto/pagination.dto';
import { Project } from './entities/project.entity';
import { CreateProjectUserDto } from './dto/project_user/create-projectUser.dto';

@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Post()
  create(@Body() createProjectDto: CreateProjectDto) {
    return this.projectsService.create(createProjectDto);
  }

  @Get()
  findAll() {
    return this.projectsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.projectsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProjectDto: UpdateProjectDto) {
    return this.projectsService.update(+id, updateProjectDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.projectsService.remove(+id);
  }

  @Post(':id/member')
  addMemberToProject(
    @Param('id') id: number | string,
    @Body() createProjectUserDto: CreateProjectUserDto,
  ) {
    return this.projectsService.addMemberToProject(+id, createProjectUserDto);
  }

  @Get(':id/member')
  getMemberOfProject(@Param('id') id: number | string) {
    return this.projectsService.getMemberOfProject(+id);
  }
}
