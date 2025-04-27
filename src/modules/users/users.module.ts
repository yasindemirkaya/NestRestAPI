import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

// Controllers
import { UsersGetController } from './controllers/users-get.controller';

// Services
import { UsersGetService } from './services/users-get.service';

// Schemas
import { User, UserSchema } from './schemas/user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [UsersGetController],
  providers: [UsersGetService],
})
export class UsersModule {}
