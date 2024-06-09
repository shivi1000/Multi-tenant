import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { RouterModule, Routes } from '@nestjs/core';
import { ScheduleModule } from '@nestjs/schedule';
import { TypeOrmModule } from '@nestjs/typeorm';
import configuration from 'config/configuration';
import { LoggerModule } from './logger/logger.module';
import { DatabaseModule } from './providers/database/db.module';
import { APP_FILTER } from '@nestjs/core';
import { AllExceptionsFilter } from 'src/filters/exceptionFilter';
import { TenantModule } from './modules/tenant/tenant.module';
import { ConnectionPoolModule } from './providers/connection-pool/connection-pool.module';
import { EmployeeModule } from './modules/employee/employee.module';
import { Tenant } from './entity/tenant.entity';

// Routing paths
const routes: Routes = [
  {
    path: '/tenant',
    module: TenantModule,
  },
  {
    path: '/',
    module: EmployeeModule,
  },
];
@Module({
  imports: [
    ConfigModule.forRoot({ load: [configuration], isGlobal: true }),
    ScheduleModule.forRoot(),
    LoggerModule,
    TenantModule,
    EmployeeModule,
    ConnectionPoolModule,
    RouterModule.register(routes),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('CMD_HOST'),
        port: configService.get<number>('CMD_PORT'),
        username: configService.get<string>('CMD_USER'),
        password: configService.get<string>('CMD_PASSWORD'),
        database: configService.get<string>('CMD_DATABASE'),
        entities: [Tenant], // Registering the Tenant entity
        logging: ['error', 'migration', 'query', 'warn'],
        logger: 'advanced-console',
            }),
    }),
    TypeOrmModule.forFeature([Tenant]), // Registering the Tenant entity
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
  ],
})
export class AppModule {}
