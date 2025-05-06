import {
  ExecutionContext,
  Injectable,
  CanActivate,
  UnauthorizedException,
} from '@nestjs/common';
import { UserRoleEnum } from 'src/modules/user/entities/user.entity';

@Injectable()
export class AuthorizationGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();

    const user = request.user;

    if (!user) {
      throw new UnauthorizedException('Missing or invalid token!');
    }

    if (user.role === UserRoleEnum.SUPER_ADMIN) {
      throw new UnauthorizedException(
        'You do not have admin privileges to access this resource.',
      );
    }

    return true;
  }
}
