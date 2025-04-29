import { Controller, Get, Query, UseGuards, Req } from '@nestjs/common';
import { UsersGetService } from '../services/users-get.service';
import { AuthGuard } from '../../auth/guards/auth.guard';
import { RolesGuard } from '../../auth/guards/roles.guard';
import { Roles } from '../../auth/decorators/roles.decorator';
import { JwtRole } from 'src/common/enums/jwt-role.enum';
import { Request } from 'express';

interface User {
  role: JwtRole;
}

@Controller('users')
export class UsersGetController {
  constructor(private readonly usersGetService: UsersGetService) {}

  // GET ALL USERS (Private)
  // Authorization and Authentication needed.
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(JwtRole.ADMIN, JwtRole.SUPER_ADMIN)
  @Get()
  async getAllUsers(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
    @Req() request: Request & { user: User },
  ) {
    const role = request.user.role;
    return await this.usersGetService.getAllUsers(page, limit, role);
  }
}
