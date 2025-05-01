import { Controller, Put, Param, Body, Req, UseGuards } from '@nestjs/common';
import { UsersUpdateService } from '../services/users-update.service';
import { UpdateUserDto } from '../dtos/update-user.dto';
import { AuthGuard } from '../../auth/guards/auth.guard';
import { RolesGuard } from '../../auth/guards/roles.guard';
import { JwtRole } from 'src/common/enums/jwt-role.enum';

interface User {
  role: JwtRole;
  id: string;
}

@Controller('users')
@UseGuards(AuthGuard, RolesGuard)
export class UsersUpdateController {
  constructor(private readonly usersUpdateService: UsersUpdateService) {}

  @Put(':id')
  async updateUser(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
    @Req() request: Request & { user: User },
  ) {
    const requesterId = request.user.id;
    const requesterRole = request.user.role;

    return this.usersUpdateService.updateUser(
      id,
      updateUserDto,
      requesterId,
      requesterRole,
    );
  }
}
