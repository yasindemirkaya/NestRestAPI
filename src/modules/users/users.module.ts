import { Module } from '@nestjs/common';

// Controllers
import { UsersController } from './controllers/users-get.controller';

// Services
import { UsersGetService } from './services/users-get.service';

@Module({
  controllers: [UsersController],
  providers: [UsersGetService],
})
export class UsersModule {}
