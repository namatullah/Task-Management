import { IsString } from 'class-validator';
import { Role } from 'src/users/entities/user.entity';

export class CreateAuthDto {
  @IsString()
  name: string;

  @IsString()
  email: string;

  @IsString()
  password: string;

  @IsString()
  role: Role;
}
