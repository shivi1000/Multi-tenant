import { Injectable } from '@nestjs/common';
import { CreateTenantDto } from './dto/tenant.dto';
import { DatabaseService } from 'src/providers/database/db.service';
import { RESPONSE_DATA } from 'src/common/responses';
import { LoggerService } from 'src/configuration/logger.service';
// import { MetricsService } from 'src/configuration/metrics';

@Injectable()
export class TenantService {
    constructor(private readonly databaseService: DatabaseService,private readonly logger: LoggerService) {}

    async createTenant(createTenantDto: CreateTenantDto) {
        try {
            // this.metricsService.incrementCounter('tenant.create.attempt');
            this.logger.log(`Creating tenant: ${createTenantDto.tenantName}`);
            const result = await this.databaseService.createTenantDatabase(createTenantDto.tenantName);
            this.logger.log(`Tenant created successfully: ${result}`);
            // this.metricsService.incrementCounter('tenant.create.success');
            return [RESPONSE_DATA.SUCCESS, result];
        } catch (error) {
            this.logger.error(`Error creating tenant: ${error.message}`);
            // this.metricsService.incrementCounter('tenant.create.error');
            throw error;
        }
    }
}
