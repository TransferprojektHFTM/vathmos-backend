import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {AuthAccessService, AuthEnvironment} from './auth-access.service';
import axios from 'axios';
import {JwtService} from "@nestjs/jwt";
@Injectable()
export class UserAccessService extends AuthAccessService {
  private readonly logger = new Logger(UserAccessService.name);
  private accessToken = '';
  private tenantId = '';
  private clientId = '';
  private clientSecret = '';
  private tokenEndpoint = '';
  private userName = '';
  private password = '';


  constructor(private readonly configService: ConfigService) {
    super(new JwtService({}));
    this.tenantId = this.configService.get(AuthEnvironment.TENANT_ID);
    this.clientId = this.configService.get(AuthEnvironment.CLIENT_ID);
    this.clientSecret = this.configService.get(AuthEnvironment.CLIENT_SECRET);
    this.tokenEndpoint = `https://login.microsoftonline.com/${this.tenantId}/oauth2/v2.0/token`;
    this.userName = this.configService.get(AuthEnvironment.USER_NAME);
    this.password = this.configService.get(AuthEnvironment.USER_PW);
  }

  async getAccessToken(): Promise<string> {
    if (!this.accessToken || this.isTokenExpired(this.accessToken)) {

      if (!this.checkEnvVariables()) {
        throw new Error('Error while empty ENV variables');
      }

      try {
        const response = await axios(this.getAxiosConfig());
        this.logger.log('Successfully retrieved access token');
        this.accessToken = response.data.access_token;
      } catch (error) {
        // Handle error
        this.logger.error('Error while retrieving access token');
        throw new Error('Error while retrieving access token');
      }
    }

    return this.accessToken;
  }

  /**
   * Checks if all environment variables are set
   * @private
   */
  private checkEnvVariables(): boolean {
    const variableNames = [
      AuthEnvironment.USER_NAME, AuthEnvironment.USER_PW, AuthEnvironment.TENANT_ID,
      AuthEnvironment.CLIENT_ID, AuthEnvironment.CLIENT_SECRET,
    ];
    const variables = [this.userName, this.password, this.tenantId, this.clientId, this.clientSecret];
    const emptyVariables: string[] = [];

    variableNames.forEach((name, index) => {
      if (!variables[index]) {
        emptyVariables.push(name);
      }
    });
    if (emptyVariables.length > 0) {
      this.logger.error(
          'Undefined or Empty ENV variables, check .env file: ' +
          emptyVariables.join(', '),
      );
        return false;
    }
    return true;
  }

  private getAuthData(): any {
    return  {
      grant_type: 'password',
      client_id: this.clientId,
      client_secret: this.clientSecret,
      userName: this.userName,
      password: this.password,
      scope: 'https://graph.microsoft.com/.default',
    };
  }

  private getAxiosConfig(): any {
    return {
      method: 'post',
      url: this.tokenEndpoint,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        SdkVersion: 'nest-js-v1.0.0',
        Cookie:
            'fpc=AkQE13zTvTRAq56R-rBfUDjdHYPbAQAAANFoetcOAAAA; x-ms-gateway-slice=estsfd; stsservicecookie=estsfd',
      },
      data: this.getAuthData(),
    }
  }
}
