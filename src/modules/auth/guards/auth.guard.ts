import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { Request } from 'express';

interface JwtPayload {
  first_name: string;
  last_name: string;
  email: string;
  id: string;
  role: number;
}

interface RequestWithUser extends Request {
  user: JwtPayload;
}

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<RequestWithUser>();
    const authHeader = request.headers.authorization;

    // Throw error if Authorization is not Berer Token
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException(
        'Authorization header missing or malformed',
      );
    }

    const token = authHeader.split(' ')[1];

    try {
      const jwtSecret = process.env.JWT_SECRET_KEY;

      //   JWT Error
      if (!jwtSecret) {
        throw new Error('JWT_SECRET_KEY not defined in environment');
      }

      //   Decode access token
      const decoded = jwt.verify(token, jwtSecret) as JwtPayload;
      request.user = decoded;

      return true;
    } catch (error) {
      console.warn(error);
      throw new UnauthorizedException('Invalid or expired token');
    }
  }
}
