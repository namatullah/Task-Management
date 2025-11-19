import { Body, Controller, Delete, Get, Param, Patch } from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateAuthDto } from 'src/auth/dto/update-auth.dto';
import { Role } from './entities/user.entity';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Patch(':id/edit')
  updateUser(@Param('id') id: string, @Body() updateAuthDto: UpdateAuthDto) {
    return this.usersService.updateUser(id, updateAuthDto);
  }

  @Patch(':id/status')
  changeStatus(@Param('id') id: string) {
    return this.usersService.changeStatus(id);
  }

  @Patch(':id/role')
  changeRole(@Param('id') id: string, @Body('role') role: Role) {
    return this.usersService.changeRole(id, role);
  }

  @Patch(':id/changePassword')
  changePassword(@Param('id') id: string, @Body('password') password: string) {
    return this.usersService.changePassword(id, password);
  }

  
}
