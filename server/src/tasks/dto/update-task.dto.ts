import { IsDate, IsString, IsUUID } from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateTaskDto {
  @IsString()
  title?: string;

  @IsString()
  description?: string;

  @Type(() => Date)
  @IsDate()
  startDate?: Date;

  @Type(() => Date)
  @IsDate()
  endDate?: Date;

  @IsUUID()
  userId?: string;
}
