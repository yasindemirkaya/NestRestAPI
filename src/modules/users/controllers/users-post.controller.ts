import { Controller, Post, Body } from '@nestjs/common';
import { UsersPostService } from '../services/users-post.service';
import { RegisterDto } from '../dtos/register.dto';

@Controller('users')
export class UsersPostController {
  constructor(private readonly usersPostService: UsersPostService) {}

  // REGISTER USER (Public)
  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    return this.usersPostService.register(registerDto);
  }
}
