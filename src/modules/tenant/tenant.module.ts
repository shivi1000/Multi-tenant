import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HttpResponse } from 'src/common/httpResponse';
import { EntityModule } from 'src/entity/entity.module';
import { TenantService } from './tenant.service';
import { TenantController } from './tenant.controller';
import { DatabaseService } from 'src/providers/database/db.service';
import { EncryptionService } from 'src/providers/encrption/encryption.service';
import { Queries } from 'src/queryBuilder/employee';
import { LoggerService } from 'src/configuration/logger.service';
// import { MetricsService } from 'src/configuration/metrics';

@Module({
  imports: [ConfigModule.forRoot(), EntityModule],
  controllers: [TenantController],
  providers: [TenantService, HttpResponse, DatabaseService, EncryptionService, Queries, LoggerService],
})
export class TenantModule {
}
