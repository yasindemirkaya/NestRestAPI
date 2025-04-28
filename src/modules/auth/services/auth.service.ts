import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as jwt from 'jsonwebtoken';
import { User, UserDocument } from '../../users/schemas/user.schema';
import { AuthDto } from '../dtos/auth.dto';
import { validateUser } from '../helpers/auth.helpers';

@Injectable()
export class AuthService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  ////////////////////////////////////////////////
  //
  // LOGIN
  // Parameters: email, password
  //
  ////////////////////////////////////////////////
  async login(authDto: AuthDto) {
    // Find User
    const user = await this.userModel.findOne({ email: authDto.email });

    // If no user, return 0
    if (!user) {
      return {
        code: 0,
        message: 'Invalid credentials.',
        data: null,
      };
    }

    // Validate Password
    const isValid = await validateUser(user, authDto.password);

    // If password is not validateUser, return 0
    if (!isValid) {
      return {
        code: 0,
        message: 'Invalid password.',
        data: null,
      };
    }

    // Create Token
    const payload = {
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      sub: user._id,
      role: user.role,
    };

    const jwtSecretKey = process.env.JWT_SECRET_KEY;
    if (!jwtSecretKey) {
      throw new Error('JWT_SECRET_KEY is not defined in .env file');
    }

    const token = jwt.sign(payload, jwtSecretKey, {
      expiresIn: '1h',
    });

    // Return 1
    return {
      code: 1,
      message: 'Login successful.',
      data: { token: token },
    };
  }
}
