import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcryptjs';
import { User, UserDocument } from '../schemas/user.schema';
import { RegisterDto } from '../dtos/register.dto';

@Injectable()
export class UsersPostService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  ////////////////////////////////////////////////
  //
  // REGISTER
  // Parameters: first_name, last_name, passwsord, email, phone
  //
  ////////////////////////////////////////////////
  async register(registerDto: RegisterDto) {
    try {
      // Check if the email already exists in the database
      const existingUser = await this.userModel.findOne({
        email: registerDto.email,
      });
      if (existingUser) {
        return {
          code: 0,
          message:
            'Email is already in use. Please use a different email address.',
          data: null,
        };
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(registerDto.password, 10);

      // Create the user document
      const user = new this.userModel({
        ...registerDto,
        password: hashedPassword,
        is_active: true,
        is_verified: false,
        role: 0,
        created_at: new Date(),
        updated_at: new Date(),
      });

      // Save the user to the database
      await user.save();

      // Return the created user in the standardized response format
      return {
        code: 1,
        message: 'The account is created successfully.',
        data: {
          id: user._id,
          first_name: user.first_name,
          last_name: user.last_name,
          email: user.email,
        },
      };
    } catch (error) {
      console.warn(error);
      return {
        code: 0,
        message: 'An error occured when creating the account.',
        data: null,
      };
    }
  }
}
