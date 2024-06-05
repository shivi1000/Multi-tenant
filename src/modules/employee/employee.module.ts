import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HttpResponse } from 'src/common/httpResponse';
import { EntityModule } from 'src/entity/entity.module';
import { DatabaseService } from 'src/providers/database/db.service';
import { TenantPoolMiddleware } from 'src/middlewares/tenantConnection.middleware';
import { EmployeeService } from './employee.service';
import { EmployeeController } from './employee.controller';
import { ConnectionPoolService } from 'src/providers/connection-pool/connection-pool.service';
import { EncryptionService } from 'src/providers/encrption/encryption.service';
import { Queries } from 'src/queryBuilder/employee';

@Module({
  imports: [ConfigModule.forRoot(), EntityModule],
  controllers: [EmployeeController],
  providers: [EmployeeService, HttpResponse, DatabaseService, ConnectionPoolService, EncryptionService, Queries],
})
export class EmployeeModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(TenantPoolMiddleware)
      .forRoutes({ path: '/employee', method: RequestMethod.ALL });
  }
}
