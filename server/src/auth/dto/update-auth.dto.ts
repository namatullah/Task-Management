import { IsString } from 'class-validator';

export class UpdateAuthDto {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsString()
  email: string;
}
