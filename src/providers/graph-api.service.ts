import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { AppCustomLogger } from '../app.custom.logger';
import { AzureAdPersonDto } from '../models/person/dto/azure-ad-person.dto';
import { ConfigService } from '@nestjs/config';
import { StudentClass } from '../models/student-class/entities/student-class.entity';
import { Person } from '../models/person/entities/person.entity';

@Injectable()
export class GraphApiService {
  private readonly logger = new AppCustomLogger(GraphApiService.name);
  private readonly mainUrl = 'https://graph.microsoft.com/v1.0';
  private servciePrinzipalID = '';

  constructor(private configService: ConfigService) {}

  getUserList(token: string): Promise<AzureAdPersonDto[]> {
    return new Promise(async (resolve, reject) => {
      const url = `${this.mainUrl}/users?$count=true`;
      let allUsers: AzureAdPersonDto[] = [];
      let nextLink = url;

      while (nextLink != '') {
        try {
          const config = this.getAxiosConfig('GET', nextLink, token);
          const response = await axios.request(config);
          allUsers = allUsers.concat(response.data.value);

          // Überprüfe, ob es einen nächsten Link gibt
          if (response.data['@odata.nextLink']) {
            nextLink = response.data['@odata.nextLink'];
          } else {
            nextLink = ''; // Setze nextLink auf null, um die Schleife zu beenden
          }
        } catch (error) {
          reject(error);
        }
      }
      this.logger.log('Count of Persons at hftm: ' + allUsers.length);
      resolve(allUsers);
    });
  }

  getClasses(token: string): Promise<AzureAdPersonDto[]> {
    return new Promise(async (resolve, reject) => {
      const url = `${this.mainUrl}/groups?$count=true`;
      let allClassses = [];
      let nextLink = url;

      while (nextLink != '') {
        try {
          const config = this.getAxiosConfig('GET', nextLink, token);
          const response = await axios.request(config);
          allClassses = allClassses.concat(response.data.value);

          // Überprüfe, ob es einen nächsten Link gibt
          if (response.data['@odata.nextLink']) {
            nextLink = response.data['@odata.nextLink'];
          } else {
            nextLink = ''; // Setze nextLink auf null, um die Schleife zu beenden
          }
        } catch (error) {
          reject(error);
        }
      }
      this.logger.log(
        'Count of Groups or Classes at hftm: ' + allClassses.length,
      );
      resolve(allClassses);
    });
  }
  async getVathmosAppServicePrincipals(token: string) {
    const url = `${
      this.mainUrl
    }/servicePrincipals(appId=\'${this.configService.get<string>(
      'CLIENT_ID',
    )}\')`;
    const config = this.getAxiosConfig('GET', url, token);

    await axios
      .request(config)
      .then((response) => {
        this.servciePrinzipalID = response.data.id;
      })
      .catch((error) => {
        this.logger.error(error);
        this.logger.error(error.response.data.message);
      });

    await Promise.resolve();
  }

  async addedUserOrGroupToVathmosApp(
    token: string,
    studentClass: StudentClass,
    appRoleId: string,
  ) {
    const url = `${this.mainUrl}/servicePrincipals/${this.servciePrinzipalID}/appRoleAssignments`;
    const config = this.getAxiosConfig('POST', url, token);

    config['data'] = {
      principalId: studentClass.oid,
      resourceId: this.servciePrinzipalID,
      appRoleId: appRoleId,
    };

    await axios
      .request(config)
      .then((response) => {
        this.logger.log(
          `${response.data.principalType} ${response.data.principalDisplayName} has been assigned to the app role`,
        );
      })
      .catch((error) => {
        this.logger.error(
          `${studentClass.name} can't be assigned to a Group with hidden membership`,
        );
        this.logger.error(error);
        this.logger.error(error.response.data.error.message);
      });
  }

  async getCurrentAppRoleAssignments(token: string) {
    if (this.servciePrinzipalID === '') {
      await this.getVathmosAppServicePrincipals(token);
    }
    const url = `${this.mainUrl}/servicePrincipals/${this.servciePrinzipalID}/appRoleAssignedTo`;
    const config = this.getAxiosConfig('GET', url, token);
    return await axios
      .request(config)
      .then((response) => {
        return response.data.value;
      })
      .catch((error) => {
        this.logger.error(error);
        this.logger.error(error.response.data.error.message);
      });
  }

  getGroupMembers(
    token: string,
    studentClass: StudentClass,
  ): Promise<AzureAdPersonDto[]> {
    return new Promise(async (resolve, reject) => {
      const url = `${this.mainUrl}/groups/${studentClass.oid}/members?$count=true`;
      let allUsers: AzureAdPersonDto[] = [];
      let nextLink = url;

      while (nextLink != '') {
        try {
          const config = this.getAxiosConfig('GET', nextLink, token);
          const response = await axios.request(config);
          allUsers = allUsers.concat(response.data.value);

          // Überprüfe, ob es einen nächsten Link gibt
          if (response.data['@odata.nextLink']) {
            nextLink = response.data['@odata.nextLink'];
          } else {
            nextLink = ''; // Set nextLink to null to exit the loop
          }
        } catch (error) {
          reject(error);
        }
      }
      this.logger.log(
        `Count of Persons at hftm into Class ${studentClass.name}: ` +
          allUsers.length,
      );
      resolve(allUsers);
    });
  }

  async meGetMemberOf(token: string, oid: string) {
    const url = `${this.mainUrl}/users/${oid}/memberOf`;
    const config = this.getAxiosConfig('GET', url, token);
    return await axios
      .request(config)
      .then((response) => {
        this.logger.log(`Get all Groups of ${oid}`);
        return response.data.value;
      })
      .catch((error) => {
        this.logger.error(error);
        this.logger.error(error.response.data.error.message);
      });
  }

  private getAxiosConfig(method: string, nextLinkOrUrl: string, token: string) {
    return {
      method: method,
      url: nextLinkOrUrl,
      headers: {
        'Content-Type': `application/json`,
        Authorization: 'Bearer ' + token,
      },
    };
  }

  async getUserPicture(token: string, person: Person) {
    const url = `${this.mainUrl}/users/${person.oid}/photo/$value`;
    const config = {
      method: 'GET',
      url: url,
      headers: {
        'Content-Type': 'application/octet-stream',
        Authorization: 'Bearer ' + token,
      },
    };
    return await axios
      .request(config)
      .then((response) => {
        return response.data;
      })
      .catch(() => {
        //has no picture
      });
  }
}
