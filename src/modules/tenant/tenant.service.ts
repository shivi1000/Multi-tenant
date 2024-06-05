import { Injectable } from '@nestjs/common';
import { CreateTenantDto } from './dto/tenant.dto';
import { DatabaseService } from 'src/providers/database/db.service';
import { RESPONSE_DATA } from 'src/common/responses';

@Injectable()
export class TenantService {
    constructor(private readonly databaseService: DatabaseService, ) {
      }

      async createTenant(createTenantDto: CreateTenantDto) {
        try {
            const result = await this.databaseService.createTenantDatabase(createTenantDto.tenantName);
            return [RESPONSE_DATA.SUCCESS, result];
        } catch (error) {
            return [RESPONSE_DATA.ERROR, error];
        }
    }
}

  

