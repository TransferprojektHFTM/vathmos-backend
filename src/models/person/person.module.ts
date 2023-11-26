import { Module } from '@nestjs/common';
import { PersonService } from './person.service';
import { PersonController } from './person.controller';
import { JwtService } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Person } from './entities/person.entity';
import { GraphApiService } from '../../providers/graph-api.service';
import { UserAccessService } from '../../providers/user-access.service';

@Module({
  imports: [TypeOrmModule.forFeature([Person])],
  controllers: [PersonController],
  providers: [PersonService, JwtService, GraphApiService, UserAccessService],
  exports: [TypeOrmModule.forFeature([Person]), PersonService]
})
export class PersonModule {}
