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
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TaskPriority, TaskStatus } from './entities/task.entity';
import { PaginationDto } from './dto/pagination.dto';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  create(@Body() createTaskDto: CreateTaskDto) {
    // console.log('receved DTO:', createTaskDto);
    // console.log(
    //   'type ot date:',
    //   typeof createTaskDto.startDate,
    //   typeof createTaskDto.endDate,
    // );
    // console.log(createTaskDto.startDate instanceof Date);
    return this.tasksService.create(createTaskDto);
  }

  @Get()
  findAll(@Query() paginationDto: PaginationDto) {
    return this.tasksService.findAll(paginationDto);
  }
  @Get('archived')
  archived() {
    return this.tasksService.archived();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tasksService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: number | string,
    @Body() updateTaskDto: UpdateTaskDto,
  ) {
    return this.tasksService.update(+id, updateTaskDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tasksService.remove(+id);
  }

  @Patch(':id/archive')
  updateArchiveStatus(@Param('id') id: string) {
    return this.tasksService.updateArchiveStatus(+id);
  }

  @Patch(':id/progress')
  updateProgress(@Param('id') id: string, @Body('progress') progress: number) {
    return this.tasksService.updateProgress(+id, progress);
  }

  @Patch(':id/priority')
  updatePriority(
    @Param('id') id: string,
    @Body('priority') priority: TaskPriority,
  ) {
    return this.tasksService.updatePriority(+id, priority);
  }

  @Patch(':id/status')
  updateStatus(@Param('id') id: string, @Body('status') status: TaskStatus) {
    return this.tasksService.updateStatus(+id, status);
  }
}
