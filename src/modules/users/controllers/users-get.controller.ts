import { Controller, Get } from '@nestjs/common';
import { UsersGetService } from '../services/users-get.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersGetService: UsersGetService) {}

  @Get()
  getAllUsers() {
    return this.usersGetService.getAllUsers();
  }
}
