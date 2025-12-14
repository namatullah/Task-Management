import { IsNumber, IsUUID } from 'class-validator';

export class CreateMemberDto {
  @IsUUID()
  userId: string;

  @IsNumber()
  projectId: number;
}
