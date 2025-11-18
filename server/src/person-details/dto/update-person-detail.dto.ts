import { PartialType } from '@nestjs/mapped-types';
import { CreatePersonDetailDto } from './create-person-detail.dto';

export class UpdatePersonDetailDto extends PartialType(CreatePersonDetailDto) {}
