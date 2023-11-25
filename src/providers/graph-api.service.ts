import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { AppCustomLogger } from '../app.custom.logger';
import { AzureAdPersonDto } from '../models/person/dto/azure-ad-person.dto';

@Injectable()
export class GraphApiService {
  private readonly logger = new AppCustomLogger(GraphApiService.name);

  getUserList(token: string): Promise<AzureAdPersonDto[]> {
    return new Promise(async (resolve, reject) => {
      const url = 'https://graph.microsoft.com/v1.0/users?$count=true';
      let allUsers: AzureAdPersonDto[] = [];
      let nextLink = url;

      while (nextLink != '') {
        try {
          const config = {
            method: 'get',
            url: nextLink,
            headers: {
              Authorization: 'Bearer ' + token,
            },
          };
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
      const url = 'https://graph.microsoft.com/v1.0/groups?$count=true';
      let allClassses=  [];
      let nextLink = url;

      while (nextLink != '') {
        try {
          const config = {
            method: 'get',
            url: nextLink,
            headers: {
              Authorization: 'Bearer ' + token,
            },
          };
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
      this.logger.log('Count of Groups or Classes at hftm: ' + allClassses.length);
      resolve(allClassses);
    });
  }
}
