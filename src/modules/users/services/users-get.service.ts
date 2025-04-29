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
  async getAllUsers(page: number, limit: number, role: number) {
    const skip = (page - 1) * limit;

    let query = {};
    // If requesters are Admin (1), they are only allowed to see role: 0 and 1 users.
    if (role === 1) {
      query = { role: { $in: [0, 1] } };
    }

    const users = await this.userModel.find(query).skip(skip).limit(limit);
    return users;
  }
  ////////////////////////////////////////////////

  /////////////////////////////////////////////////
  //
  // GET USER BY ID
  // Parameters: id (user id)
  //
  ////////////////////////////////////////////////
  async getUserById(id: string) {
    // Find and return the user by ID
    const user = await this.userModel.findById(id).exec();
    if (!user) {
      return null;
    }
    return user;
  }
}
