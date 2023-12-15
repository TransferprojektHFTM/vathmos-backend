import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import qs from 'qs';
import axios from 'axios';
import {AuthAccessService, AuthEnvironment} from "./auth-access.service";
import {JwtService} from "@nestjs/jwt";

@Injectable()
export class ClientAccessService extends AuthAccessService {
  private readonly logger = new Logger(ClientAccessService.name);
  private accessToken = '';
  private tenantId = '';
  private clientId = '';
  private clientSecret = '';
  private tokenEndpoint = '';

  constructor(private readonly configService: ConfigService) {
    super(new JwtService({}));
    this.tenantId = this.configService.get(AuthEnvironment.TENANT_ID);
    this.clientId = this.configService.get(AuthEnvironment.CLIENT_ID);
    this.clientSecret = this.configService.get(AuthEnvironment.CLIENT_SECRET);
  }

  async getAccessToken(): Promise<string> {
    if (!this.accessToken || this.isTokenExpired(this.accessToken)) {

      this.tokenEndpoint = `https://login.microsoftonline.com/${this.tenantId}/oauth2/v2.0/token`;

      if (!this.checkEnvVariables()) {
        throw new Error('Error while empty ENV variables');
      }


      try {
        const response = await axios(this.getAxiosConfig());
        this.logger.log('Successfully retrieved access token');
        this.accessToken = response.data.access_token;
      } catch (error) {
        console.log(error)
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
    const variableNames = [AuthEnvironment.TENANT_ID,
      AuthEnvironment.CLIENT_ID,
      AuthEnvironment.CLIENT_SECRET,
    ];
    const variables = [this.tenantId, this.clientId, this.clientSecret];
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
      grant_type: 'client_credentials',
      client_id: this.clientId,
      client_secret: this.clientSecret,
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
