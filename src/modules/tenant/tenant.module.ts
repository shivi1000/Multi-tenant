import { Module, forwardRef } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HttpResponse } from 'src/common/httpResponse';
import { EntityModule } from 'src/entity/entity.module';
import { TenantService } from './tenant.service';
import { TenantController } from './tenant.controller';
import { DatabaseService } from 'src/providers/database/db.service';
import { EncryptionService } from 'src/providers/encrption/encryption.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tenant } from 'src/entity/tenant.entity';
import { DatabaseModule } from 'src/providers/database/db.module';

@Module({
  exports: [TypeOrmModule],
  imports: [ConfigModule.forRoot(), EntityModule, TypeOrmModule.forFeature([Tenant]), forwardRef(() => DatabaseModule),],
  controllers: [TenantController],
  providers: [TenantService, HttpResponse, DatabaseService, EncryptionService],
})
export class TenantModule {
}
