import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { RouterModule, Routes } from '@nestjs/core';
import { ScheduleModule } from '@nestjs/schedule';
import configuration from 'config/configuration';
import { LoggerModule } from './logger/logger.module';
import { DatabaseModule } from './providers/database/db.module';
import { APP_FILTER } from '@nestjs/core';
import { AllExceptionsFilter } from 'src/filters/exceptionFilter';
import { TenantModule } from './modules/tenant/tenant.module';
import { ConnectionPoolModule } from './providers/connection-pool/connection-pool.module';
import { EmployeeModule } from './modules/employee/employee.module';
import { LoggerService } from './configuration/logger.service';


// for routing path
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
    DatabaseModule,
    LoggerModule,
    TenantModule,
    EmployeeModule,
    ConnectionPoolModule,
    RouterModule.register(routes),
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
    LoggerService, 
  ],
  exports: [LoggerService], 
})
export class AppModule {}
