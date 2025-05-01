import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';

// Controllers
import { UsersGetController } from './controllers/users-get.controller';
import { UsersPostController } from './controllers/users-post.controller';
import { UsersUpdateController } from './controllers/users-update.controller';
import { UsersDeleteController } from './controllers/users-delete.controller';

// Services
import { UsersGetService } from './services/users-get.service';
import { UsersPostService } from './services/users-post.service';
import { UsersUpdateService } from './services/users-update.service';
import { UsersDeleteService } from './services/users-delete.service';

// Schemas
import { User, UserSchema } from './schemas/user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    JwtModule.register({
      secret: process.env.JWT_SECRET_KEY,
      signOptions: { expiresIn: '60s' },
    }),
  ],
  controllers: [UsersGetController, UsersPostController, UsersUpdateController, UsersDeleteController],
  providers: [UsersGetService, UsersPostService, UsersUpdateService, UsersDeleteService],
})
export class UsersModule {}
