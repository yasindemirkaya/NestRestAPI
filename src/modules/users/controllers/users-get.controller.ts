import { Controller, Get, Query, UseGuards, Req, Param } from '@nestjs/common';
import { UsersGetService } from '../services/users-get.service';
import { AuthGuard } from '../../auth/guards/auth.guard';
import { RolesGuard } from '../../auth/guards/roles.guard';
import { Roles } from '../../auth/decorators/roles.decorator';
import { JwtRole } from 'src/common/enums/jwt-role.enum';
import { Request } from 'express';

interface User {
  role: JwtRole;
  id: string;
}

@Controller('users')
export class UsersGetController {
  constructor(private readonly usersGetService: UsersGetService) {}

  ////////////////////////////////////////////////////
  // GET ALL USERS (Private)
  // Authorization and Authentication needed.
  ////////////////////////////////////////////////////
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(JwtRole.ADMIN, JwtRole.SUPER_ADMIN)
  @Get()
  async getAllUsers(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
    @Req() request: Request & { user: User },
  ) {
    const role = request.user.role;

    // Fetch the users
    const users = await this.usersGetService.getAllUsers(page, limit, role);
    // Response
    return {
      code: 1,
      message: 'Users fetched successfully.',
      data: users,
      page: page,
      limit: limit,
    };
  }

  ////////////////////////////////////////////////////
  // GET USER BY ID (Private)
  // Authorization and Authentication needed.
  ////////////////////////////////////////////////////
  @UseGuards(AuthGuard, RolesGuard)
  @Get(':id')
  async getUserById(
    @Param('id') id: string, // id parametre olarak alınıyor
    @Req() request: Request & { user: User },
  ) {
    const role = request.user.role;
    const requesterId = request.user.id;

    // Role (0) Users are only allowed to view their own data
    if (role === JwtRole.USER && id !== requesterId) {
      return {
        code: 0,
        message: 'Permission denied: You can only view your own profile',
        data: null,
      };
    }

    // Role (1) Admin cannot view role 2 users
    if (
      role === JwtRole.ADMIN &&
      (await this.usersGetService.getUserById(id))?.role ===
        Number(JwtRole.SUPER_ADMIN)
    ) {
      return {
        code: 0,
        message: 'Permission denied: Admins cannot view Super Admin profiles',
        data: null,
      };
    }

    // Find user with the requested ID
    const user = await this.usersGetService.getUserById(id);

    // If there is no user, return error
    if (!user) {
      return {
        code: 0,
        message: 'User not found.',
        data: null, // false yerine null döndürüyoruz
      };
    }

    // Return success
    return {
      code: 1,
      message: 'User fetched successfully',
      data: user,
    };
  }
}
