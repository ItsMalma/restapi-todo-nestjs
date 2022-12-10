import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { JsonWebTokenError } from 'jsonwebtoken';

@Injectable()
export class JwtGuard extends AuthGuard('jwt') {
  handleRequest<TUser = any>(
    err: any,
    user: any,
    info: any,
    context: ExecutionContext,
    status?: any,
  ): TUser {
    if (info) {
      if (info instanceof JsonWebTokenError) {
        throw new UnauthorizedException('invalid token');
      }
      throw new UnauthorizedException(info.message);
    }
    if (err) throw err;
    if (!user) throw new UnauthorizedException('user not found');
    return user;
  }
}
