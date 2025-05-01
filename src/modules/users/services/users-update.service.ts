import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcryptjs';
import { User, UserDocument } from '../schemas/user.schema';
import { UpdateUserDto } from '../dtos/update-user.dto';

@Injectable()
export class UsersUpdateService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  ////////////////////////////////////////////////
  //
  // UPDATE USER
  // Parameters: first_name, last_name, password, mobile, role, is_active, is_verified
  //
  ////////////////////////////////////////////////
  async updateUser(
    targetUserId: string,
    updateUserDto: UpdateUserDto,
    requesterId: string,
    requesterRole: number,
  ) {
    try {
      // Find target user
      const targetUser = await this.userModel.findById(targetUserId);

      // If target user cannot be NotFoundError, return 0
      if (!targetUser) {
        return {
          code: 0,
          message: 'User not found.',
          data: null,
        };
      }

      // Role (0) requesters are only allowed to update their own account
      if (requesterRole === 0 && requesterId !== targetUserId) {
        return {
          code: 0,
          message: 'You can only update your own account.',
          data: null,
        };
      }

      // Role (1) Admin requesters are only allowed to update Role 0 and Role 1 users
      if (requesterRole === 1) {
        if (requesterId !== targetUserId && targetUser.role === 2) {
          return {
            code: 0,
            message: 'Admins cannot update Super Admin accounts.',
            data: null,
          };
        }
      }

      // Hash password if needed
      if (updateUserDto.password) {
        updateUserDto.password = await bcrypt.hash(updateUserDto.password, 10);
      }

      Object.assign(targetUser, updateUserDto, { updated_at: new Date() });

      // Save updated data for the account
      await targetUser.save();

      // Return success
      return {
        code: 1,
        message: 'User updated successfully.',
        data: {
          id: targetUser._id,
          first_name: targetUser.first_name,
          last_name: targetUser.last_name,
          email: targetUser.email,
        },
      };
    } catch (error) {
      console.warn(error);
      return {
        code: 0,
        message: 'Error occurred while updating user.',
        data: null,
      };
    }
  }
}
