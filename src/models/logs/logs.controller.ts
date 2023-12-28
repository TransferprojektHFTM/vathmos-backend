import {Controller, Get, Query} from '@nestjs/common';
import { LogsService } from './logs.service';
import {ApiQuery, ApiTags} from "@nestjs/swagger";
import {isBoolean} from "class-validator";
import {Role} from "../role/entities/role.entity";
import {Roles} from "../../auth-guard/vathmos-auth-guard";

@ApiTags('Vathmos Logs')
@Roles('KursAdmin')
@Controller('logs')
export class LogsController {
  constructor(private readonly logsService: LogsService) {}

  @ApiQuery({
    name: 'date',
    required: false,
    type: String,
    description: 'Date to search only for last 30 days. Use format YYYY-MM-DD or empty for today.',
  })
  @Get()
  readLogs(@Query('date') date: string) {
    return this.logsService.readLogs(date);
  }

  @Get('/error')
  readErrorLog() {
    return this.logsService.readErrorLog();
  }

}
