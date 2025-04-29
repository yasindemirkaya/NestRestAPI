import { JwtPayload } from '../../modules/auth/interfaces/jwt-payload.interface';

declare namespace Express {
  export interface Request {
    user?: JwtPayload;
  }
}
