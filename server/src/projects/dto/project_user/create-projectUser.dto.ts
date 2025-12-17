import { IsBoolean, IsUUID } from 'class-validator';

export class CreateProjectUserDto {
  @IsUUID()
  userId: string;

  @IsBoolean()
  isAdmin: boolean;
}
