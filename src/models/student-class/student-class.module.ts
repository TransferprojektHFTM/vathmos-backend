import { Module } from '@nestjs/common';
import { StudentClassService } from './student-class.service';
import { StudentClassController } from './student-class.controller';
import {JwtService} from "@nestjs/jwt";
import {GraphApiService} from "../../providers/graph-api.service";
import {UserAccessService} from "../../providers/user-access.service";
import {TypeOrmModule} from "@nestjs/typeorm";
import {Person} from "../person/entities/person.entity";
import {StudentClass} from "./entities/student-class.entity";

@Module({
  imports: [TypeOrmModule.forFeature([StudentClass])],
  controllers: [StudentClassController],
  providers: [StudentClassService, JwtService, GraphApiService, UserAccessService],
})
export class StudentClassModule {}
