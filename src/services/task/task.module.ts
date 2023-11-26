import { Module } from '@nestjs/common';
import {PersonService} from "../../models/person/person.service";
import {StudentClassService} from "../../models/student-class/student-class.service";
import {GraphApiService} from "../../providers/graph-api.service";
import {UserAccessService} from "../../providers/user-access.service";
import {PersonModule} from "../../models/person/person.module";
import {StudentClassModule} from "../../models/student-class/student-class.module";
import {TestDatabaseModule} from "../../config/database/mysql/test-database-module";

@Module({
    imports: [ PersonModule, StudentClassModule],
    providers:[PersonService, StudentClassService, GraphApiService, UserAccessService],
})
export class TaskModule {}
