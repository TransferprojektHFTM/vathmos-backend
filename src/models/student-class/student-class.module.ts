import { Module } from '@nestjs/common';
import { StudentClassService } from './student-class.service';
import { StudentClassController } from './student-class.controller';
import {JwtService} from "@nestjs/jwt";
import {GraphApiService} from "../../providers/graph-api.service";
import {UserAccessService} from "../../providers/user-access.service";
import {TypeOrmModule} from "@nestjs/typeorm";
import {Person} from "../person/entities/person.entity";
import {StudentClass} from "./entities/student-class.entity";
import {PersonService} from "../person/person.service";
import {PersonModule} from "../person/person.module";
import {ClientAccessService} from "../../providers/client-access.service";
import {RoleService} from "../role/role.service";

@Module({
  imports: [TypeOrmModule.forFeature([StudentClass]), TypeOrmModule.forFeature([Person]),PersonModule],
  controllers: [StudentClassController],
  providers: [StudentClassService, JwtService, GraphApiService, UserAccessService, PersonService, ClientAccessService, RoleService],
  exports:[TypeOrmModule.forFeature([StudentClass]), StudentClassService]
})
export class StudentClassModule {}
