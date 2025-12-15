import { IsString } from 'class-validator';

export class UpdateAuthDto {
  @IsString()
  name: string;

  @IsString()
  email: string;
}
