import { Injectable, Logger } from '@nestjs/common';
import * as winston from 'winston';
import { format } from 'winston';
import DailyRotateFile = require('winston-daily-rotate-file');

export class AppCustomLogger extends Logger {
  private logger: winston.Logger;
  context: string = 'AppCustomLogger';
  transport: DailyRotateFile;

  constructor(context?: string) {
    super();
    this.context = context;
    this.createLogger(context);
    this.onRotate();
  }
  log(message: string) {
    super.log(message);
    this.logger.info(message);
  }
  error(message: string, trace?: string) {
    super.error(message, trace);
    this.logger.error(message, { trace });
  }
  warn(message: string) {
    super.warn(message);
    this.logger.warn(message);
  }
  debug(message: string) {
    super.debug(message);
    this.logger.debug(message);
  }
  verbose(message: string) {
    super.log(message);
    this.logger.verbose(message);
  }

  private createLogger(context?: string) {
    const { combine, timestamp, label, printf } = format;
    const customFormat = printf(({ level, message, label, timestamp }) => {
      return `${timestamp} [${label}] ${level}: ${message}`;
    });

    const timezoned = () => {
      return new Date().toLocaleString('de-de', {
        timeZone: 'Europe/Zurich',
      });
    };

    this.logger = winston.createLogger({
      level: 'info', // Set the log level
      format: combine(
        label({ label: context }),
        format.timestamp({ format: timezoned }),
        customFormat,
      ),
      transports: [
        (this.transport = new DailyRotateFile({
          filename: 'logs/vathmos-%DATE%.log',
          datePattern: 'YYYY-MM-DD',
          zippedArchive: true,
          maxSize: '2m',
          maxFiles: '30d',
        })),
        new winston.transports.File({
          filename: 'logs/error.log',
          level: 'error',
        }),
      ],
    });
  }
  private onRotate() {
    const logger = this.logger;
    this.transport.on('rotate', function (oldFilename, newFilename) {
      return logger.log('info', 'Rotating log files');
    });
  }
}
