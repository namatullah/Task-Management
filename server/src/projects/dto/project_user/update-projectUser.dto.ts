import { PartialType } from '@nestjs/mapped-types';
import { CreateProjectUserDto } from './create-projectUser.dto';

export class UpdateProjectUserDto extends PartialType(CreateProjectUserDto) {}
