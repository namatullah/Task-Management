import { IsString } from 'class-validator';
import { Role } from 'src/users/entities/user.entity';

export class UpdateAuthDto {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsString()
  email: string;

  @IsString()
  role: Role;
}
