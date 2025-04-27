import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../schemas/user.schema';

@Injectable()
export class UsersGetService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  ////////////////////////////////////////////////
  //
  // GET ALL USERS
  // Parameters: page, limit
  //
  ////////////////////////////////////////////////
  async getAllUsers(page: number, limit: number) {
    const skip = (page - 1) * limit;
    const users = await this.userModel.find().skip(skip).limit(limit);

    return users;
  }
}
