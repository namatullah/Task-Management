import { IsString } from 'class-validator';
import { ProjectStatus } from '../entities/project.entity';

export class UpdateProjectDto {
  @IsString()
  status: ProjectStatus;
}
