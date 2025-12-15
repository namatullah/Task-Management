import { IsBoolean, IsDate, IsNumber, IsString, IsUUID } from 'class-validator';
import { TaskPriority, TaskStatus } from '../entities/task.entity';
import { Type } from 'class-transformer';

export class CreateTaskDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @Type(() => Date)
  @IsDate()
  startDate: Date;

  @Type(() => Date)
  @IsDate()
  endDate: Date;

  @IsString()
  status: TaskStatus;

  @IsString()
  priority: TaskPriority;

  @IsNumber()
  progress: number;

  @IsBoolean()
  isArchived: boolean;

  @IsUUID()
  userId: string;

  @IsNumber()
  projectId: number;
}
