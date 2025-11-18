import { IsNumber, IsString } from 'class-validator';

export class CreatePersonDetailDto {
  @IsString()
  name: string;

  @IsString()
  lastName: string;

  @IsString()
  fatherName: string;

  @IsString()
  gender: string;

  @IsNumber()
  age: Number;
}
