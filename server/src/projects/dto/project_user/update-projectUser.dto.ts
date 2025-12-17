import { IsBoolean } from "class-validator";

export class UpdateProjectUserDto {
  @IsBoolean()
  isAdmin: boolean;
}
