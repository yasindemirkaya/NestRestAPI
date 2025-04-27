import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../schemas/user.schema';

@Injectable()
export class UsersGetService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  // GET ALL USERS
  async getAllUsers() {
    const users = await this.userModel.find();
    return users;
  }
}
