import { Module } from '@nestjs/common';
import { PersonService } from './person.service';
import { PersonController } from './person.controller';
import { JwtService } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Person } from './entities/person.entity';
import { GraphApiService } from '../../providers/graph-api.service';
import { UserAccessService } from '../../providers/user-access.service';
import { RoleService } from '../role/role.service';
import { RoleModule } from '../role/role.module';
import { Role } from '../role/entities/role.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Person]),
    TypeOrmModule.forFeature([Role]),
    RoleModule,
  ],
  controllers: [PersonController],
  providers: [
    PersonService,
    JwtService,
    GraphApiService,
    UserAccessService,
    RoleService,
  ],
  exports: [TypeOrmModule.forFeature([Person]), PersonService],
})
export class PersonModule {}
