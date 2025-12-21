import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { CreateProjectUserDto } from './dto/project_user/create-projectUser.dto';
import { UpdateProjectUserDto } from './dto/project_user/update-projectUser.dto';
import { ProjectStatus } from './entities/project.entity';

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

  @Patch(':id/status')
  updateStatus(@Param('id') id: string, @Body('status') status: ProjectStatus) {
    return this.projectsService.updateStatus(+id, status);
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

  @Delete('member/:memberId')
  removeMember(@Param('memberId') memberId: number) {
    return this.projectsService.removeMember(memberId);
  }

  @Patch('member/:id')
  updateMember(
    @Param('id') id: string,
    @Body() updateProjectUserDto: UpdateProjectUserDto,
  ) {
    return this.projectsService.updateMember(+id, updateProjectUserDto);
  }

  @Get(':id/stepper')
  fetchStepper(@Param('id') id: string) {
    return this.projectsService.fetchStepper(+id);
  }

  @Post(':id/stepper')
  changeStepper(
    @Param('id') id: number | string,
    @Body() data: { activeIndex: number; doneIndex: number },
  ) {
    return this.projectsService.changeStepper(
      +id,
      data.activeIndex,
      data.doneIndex,
    );
  }
}
