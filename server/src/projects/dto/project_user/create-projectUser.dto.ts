import { IsBoolean, IsNumber, IsString, IsUUID } from 'class-validator';

export class CreateProjectUserDto {
  @IsUUID()
  userId: string;

  @IsBoolean()
  isAdmin: boolean;
}
