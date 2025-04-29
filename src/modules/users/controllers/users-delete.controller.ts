import { Controller, Delete, Param, UseGuards, Req } from '@nestjs/common';
import { UsersGetService } from '../services/users-get.service';
import { UsersDeleteService } from '../services/users-delete.service';
import { AuthGuard } from '../../auth/guards/auth.guard';
import { RolesGuard } from '../../auth/guards/roles.guard';
import { JwtRole } from 'src/common/enums/jwt-role.enum';
import { Request } from 'express';

interface User {
  role: JwtRole;
  id: string;
}

@Controller('users')
export class UsersDeleteController {
  constructor(
    private readonly usersGetService: UsersGetService,
    private readonly usersDeleteService: UsersDeleteService,
  ) {}

  ////////////////////////////////////////////////////
  // DELETE USER (Private)
  // Authorization and Authentication needed.
  ////////////////////////////////////////////////////
  @UseGuards(AuthGuard, RolesGuard)
  @Delete(':id')
  async deleteUser(
    @Param('id') id: string,
    @Req() request: Request & { user: User },
  ) {
    const role = request.user.role;

    // Find use to delete
    const userToDelete = await this.usersGetService.getUserById(id);

    // If there is no user, return error
    if (!userToDelete) {
      return {
        code: 0,
        message: 'User not found.',
        data: null,
      };
    }

    // Admin are not allowed to delete Super Admin (2) accounts.
    if (role === JwtRole.ADMIN && userToDelete.role === 2) {
      return {
        code: 0,
        message: 'Permission denied: Admins cannot delete Super Admin profiles',
        data: null,
      };
    }

    // Role (0) Users cannot delete anyone else but themselves
    if (role === JwtRole.USER && id !== request.user.id) {
      return {
        code: 0,
        message: 'Permission denied: You can only delete your own account',
        data: null,
      };
    }

    try {
      const result = await this.usersDeleteService.deleteUser(id);

      if (result) {
        return {
          code: 1,
          message: 'User deleted successfully.',
          data: true,
        };
      }
    } catch (error) {
      console.warn(error);
      return {
        code: 0,
        message: 'Error occurred while deleting user.',
        data: null,
      };
    }
  }
}
