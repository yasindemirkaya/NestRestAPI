import { Controller, Get, Query } from '@nestjs/common';
import { UsersGetService } from '../services/users-get.service';

@Controller('users')
export class UsersGetController {
  constructor(private readonly usersGetService: UsersGetService) {}

  @Get()
  async getAllUsers(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ) {
    return await this.usersGetService.getAllUsers(page, limit);
  }
}
