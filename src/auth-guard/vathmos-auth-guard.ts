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
import { ConfigService } from '@nestjs/config';
import { AppCustomLogger } from '../app.custom.logger';

type Authheader = {
  authorization: string;
};
export const IS_PUBLIC_KEY = 'isPublic';
export const ROLES_KEY = 'roles';

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
export const Roles = (...roles: string[]) => SetMetadata(ROLES_KEY, roles);

@Injectable()
export class VathmosAuthGuard implements CanActivate {
  static user: AzureAdUser;
  private readonly logger = new AppCustomLogger(VathmosAuthGuard.name);
  constructor(
    private jwtService: JwtService,
    private reflector: Reflector,
    private configService: ConfigService,
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
    this.isTokenExpired(token);

    if (!token) {
      return false;
    }

    const payload = this.jwtService.decode(token) as JwtPayload;

    VathmosAuthGuard.user = new AzureAdUser(payload);

    this.checkClientID(payload);
    this.checkTenantID(payload);
    this.checkEmail(payload);

    const roles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    try {
      if(roles === undefined) return true; //allow if no roles are defined
      this.checkRoles(VathmosAuthGuard.user, roles);
    }catch (e) {
      return false;
    }


    return true; // change to enable
  }

  private checkRoles(adUser: AzureAdUser, roles: string[]) {
    if (!roles.some((role) => adUser.roles.includes(role))) {
      this.logger.error(`User with id ${adUser.id} has no permission`);
      throw new UnauthorizedException('User has no permission');
    }
  }

  private checkClientID(payload: JwtPayload) {
    if (this.configService.get('CLIENT_ID') !== payload.aud) {
      this.logger.error('CLIENT_ID not matching');
      throw new UnauthorizedException('CLIENT_ID not matching');
    }
  }

  private checkTenantID(payload: JwtPayload) {
    if (this.configService.get('TENANT_ID') !== payload.tid) {
      this.logger.error('TENANT_ID not matching');
      throw new UnauthorizedException('TENANT_ID not matching');
    }
  }

  private checkEmail(payload: JwtPayload) {
    if (!payload.preferred_username.includes('@hftm.ch')) {
      this.logger.error('email not matching');
      throw new UnauthorizedException('email not matching');
    }
  }

  private isTokenExpired(accessToken: string): boolean {
    if (!accessToken) {
      throw new UnauthorizedException('Access token not found');
    }

    const decodedToken: any = this.jwtService.decode(accessToken) as JwtPayload;
    if (!decodedToken || typeof decodedToken.exp === 'undefined') {
      throw new UnauthorizedException('Access token not found');
    }

    const expirationDate = new Date(decodedToken.exp * 1000);
    const currentTime = new Date();

    if (expirationDate < currentTime) {
      throw new UnauthorizedException('Access token expired');
    }

    return expirationDate < currentTime;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const requestHeader: Authheader = request.headers as any;
    try {
      const [type, token] = requestHeader.authorization.split(' ');
      return type === 'Bearer' ? token : undefined;
    } catch (error) {
      this.logger.warn('required access token');
      throw new UnauthorizedException();
    }
  }
}
