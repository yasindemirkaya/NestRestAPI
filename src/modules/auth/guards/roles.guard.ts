import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { JwtPayload } from '../interfaces/jwt-payload.interface';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private jwtService: JwtService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.get<number[]>(
      'roles',
      context.getHandler(),
    );

    // If there is no need for role control, return true.
    if (!requiredRoles) {
      return true;
    }

    const request = context.switchToHttp().getRequest<Request>();
    const authHeader = request.headers.authorization;

    // If there is no auth header, throw UnauthorizedException
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException(
        'Authorization header missing or malformed',
      );
    }

    const token = authHeader.split(' ')[1];
    let user: JwtPayload;

    try {
      //   Verify token
      user = await this.jwtService.verifyAsync(token);
    } catch (error) {
      console.warn(error);
      throw new UnauthorizedException('Invalid or expired token');
    }

    // Invalid token
    if (!user) {
      throw new UnauthorizedException('Invalid token');
    }

    // Check for access based on user's role
    const hasRole = requiredRoles.includes(user.role);

    // If user has no access, throw ForbiddenException
    if (!hasRole) {
      throw new ForbiddenException('Access denied');
    }

    request.user = user;
    return true;
  }
}
