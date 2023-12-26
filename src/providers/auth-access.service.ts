import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

export const enum AuthEnvironment {
  USER_NAME = 'USER_NAME',
  USER_PW = 'USER_PW',
  TENANT_ID = 'TENANT_ID',
  CLIENT_ID = 'CLIENT_ID',
  CLIENT_SECRET = 'CLIENT_SECRET',
}

@Injectable()
export abstract class AuthAccessService {
  protected abstract getAccessToken(): Promise<string>;

  constructor(public jwtService: JwtService) {}

  protected isTokenExpired(accessToken: string): boolean {
    if (!accessToken) {
      return true;
    }

    const decodedToken: any = this.jwtService.decode(accessToken);
    if (!decodedToken || typeof decodedToken.exp === 'undefined') {
      return true;
    }

    const expirationDate = new Date(decodedToken.exp * 1000);
    const currentTime = new Date();

    return expirationDate < currentTime;
  }
}
