import {
  CanActivate,
  ExecutionContext,
  Injectable,
  SetMetadata,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { AzureAdUser, JwtPayload } from './models';

type Authheader = {
  authorization: string;
};
export const IS_PUBLIC_KEY = 'isPublic';

/**
 * Decorator to mark a route as public
 * @constructor
 */
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);

/**
 * Decorator to mark a route as protected by roles
 * "Student", "Dozent", "KursAdmin"
 * @param roles
 * @constructor
 */
export const Roles = (...roles: string[]) => SetMetadata('roles', roles);

@Injectable()
export class VathmosAuthGuard implements CanActivate {
  static user: AzureAdUser;
  constructor(
    private jwtService: JwtService,
    private reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);

    if (!token) {
      return false;
    }

    try {
      const payload = this.jwtService.decode(token) as JwtPayload;

      console.log(payload);
      VathmosAuthGuard.user = new AzureAdUser(payload);

      console.log(VathmosAuthGuard.user);

      const roles = this.reflector.get<string[]>('roles', context.getHandler());
      console.log(context.getHandler());
      // if (user.roles) {
      //   return user;
      // }
      return true; // change to enable
    } catch (error) {
      throw new UnauthorizedException();
    }
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const requestHeader: Authheader = request.headers as any;
    try {
      const [type, token] = requestHeader.authorization.split(' ');
      return type === 'Bearer' ? token : undefined;
    } catch (error) {
      console.log('no token');
      throw new UnauthorizedException();
    }
  }
}
