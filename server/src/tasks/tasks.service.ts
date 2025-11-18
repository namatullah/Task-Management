import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Task, TaskPriority, TaskStatus } from './entities/task.entity';
import { Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task) private readonly taskRepository: Repository<Task>,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async create(createTaskDto: CreateTaskDto) {
    const user = await this.userRepository.findOneBy({
      id: createTaskDto.userId,
    });
    if (!user) throw new NotFoundException('user not found');
    const newTask = this.taskRepository.create({ ...createTaskDto, user });
    return await this.taskRepository.save(newTask);
  }

  async findAll() {
    return await this.taskRepository.find({
      where: {
        isArchived: false,
      },
      order: {
        createdAt: 'DESC',
      },
    });
  }

  async archived() {
    return await this.taskRepository.find({
      where: { isArchived: true },
      order: {
        createdAt: 'DESC',
      },
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} task`;
  }

  async update(id: number, updateTaskDto: UpdateTaskDto) {
    const task = await this.taskRepository.findOneBy({ id });
    if (!task) throw new NotFoundException('Task not found');

    if (updateTaskDto.title) task.title = updateTaskDto.title;
    if (updateTaskDto.description) task.description = updateTaskDto.description;
    if (updateTaskDto.startDate) task.startDate = updateTaskDto.startDate;
    if (updateTaskDto.endDate) task.endDate = updateTaskDto.endDate;

    if (updateTaskDto.userId) {
      const user = await this.userRepository.findOneBy({
        id: updateTaskDto.userId,
      });
      if (!user) throw new BadRequestException('Assigned user not found');
      task.user = user;
      task.userId = updateTaskDto.userId;
    }

    return await this.taskRepository.save(task);
  }

  async remove(id: number) {
    const task = await this.taskRepository.findOneBy({ id });
    if (!task) throw new NotFoundException('Task not found');

    return await this.taskRepository.remove(task);
  }
  async updateArchiveStatus(id: number) {
    const task = await this.taskRepository.findOneBy({ id });
    if (!task) throw new NotFoundException('Task not found');
    task.isArchived = !task.isArchived;
    return await this.taskRepository.save(task);
  }

  async updateProgress(id: number, progress: number) {
    const task = await this.taskRepository.findOneBy({ id });
    if (!task) throw new NotFoundException('Task not found');
    task.progress = progress;
    return await this.taskRepository.save(task);
  }

  async updatePriority(id: number, priority: TaskPriority) {
    const task = await this.taskRepository.findOneBy({ id });
    if (!task) throw new NotFoundException('Task not found');
    task.priority = priority;
    return await this.taskRepository.save(task);
  }

  async updateStatus(id: number, status: TaskStatus) {
    const task = await this.taskRepository.findOneBy({ id });
    if (!task) throw new NotFoundException('Task not found');
    task.status = status;
    return await this.taskRepository.save(task);
  }
}
