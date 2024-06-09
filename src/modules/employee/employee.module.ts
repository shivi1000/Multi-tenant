import { Module, MiddlewareConsumer, RequestMethod, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { HttpResponse } from 'src/common/httpResponse';
import { EntityModule } from 'src/entity/entity.module';
import { EmployeeService } from './employee.service';
import { EmployeeController } from './employee.controller';
import { TenantPoolMiddleware } from 'src/middlewares/tenantConnection.middleware';
import { ConnectionPoolService } from 'src/providers/connection-pool/connection-pool.service';
import { EncryptionService } from 'src/providers/encrption/encryption.service';
// import { Queries } from 'src/queryBuilder/employee';
import { TenantModule } from '../tenant/tenant.module';
import { Employee } from 'src/entity/employee.entity';
import { DatabaseModule } from 'src/providers/database/db.module';
// import { Tenant } from 'src/entity/tenant.entity';

@Module({
  imports: [
    ConfigModule.forRoot(),
    EntityModule,
    TypeOrmModule.forFeature([Employee]),
    forwardRef(() => TenantModule),
    DatabaseModule, // Use forwardRef to handle circular dependency if needed
  ],
  controllers: [EmployeeController],
  providers: [EmployeeService, HttpResponse, ConnectionPoolService, EncryptionService],
})
export class EmployeeModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(TenantPoolMiddleware)
      .forRoutes({ path: '/employee', method: RequestMethod.ALL });
  }
}
