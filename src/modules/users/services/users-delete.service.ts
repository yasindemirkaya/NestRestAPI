import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../schemas/user.schema';

@Injectable()
export class UsersDeleteService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  ////////////////////////////////////////////////
  //
  // DELETE USER
  // Parameters: id
  //
  ////////////////////////////////////////////////
  async deleteUser(id: string) {
    const user = await this.userModel.findById(id);

    if (!user) {
      return {
        code: 0,
        message: `User with id ${id} not found`,
        data: false,
      };
    }

    // Delete user
    await this.userModel.deleteOne({ _id: id });

    return {
      code: 1,
      message: 'User is deleted successfully',
      data: true,
    };
  }
}
