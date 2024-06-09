import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as winston from 'winston';
var DatadogWinston = require('datadog-winston')

@Injectable()
export class LoggerService {
  private logger: winston.Logger;

  constructor(private configService: ConfigService) {
    console.log('LoggerService initialized');
    this.logger = winston.createLogger({
      level: 'info',
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
      ),
      transports: [
        new winston.transports.Console(),
        new DatadogWinston({
          apiKey: this.configService.get<any>('DD_API_KEY'),
          hostname: this.configService.get<string>('DD_TRACE_AGENT_HOSTNAME'),
          service: this.configService.get<string>('DD_SERVICE'),
          ddsource: 'nodejs',
          ddtags: this.configService.get<string>('DD_ENV'),
        }),
      ],
    });
  }

  log(message: string) {
    this.logger.info(message);
  }

  error(message: string) {
    this.logger.error(message);
  }

  warn(message: string) {
    this.logger.warn(message);
  }
}