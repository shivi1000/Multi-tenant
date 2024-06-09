import { Controller, Post, Body, Res } from '@nestjs/common';
import { Response } from 'express';
import { CreateTenantDto } from './dto/tenant.dto';
import { TenantService } from './tenant.service';
import { HttpResponse } from 'src/common/httpResponse';
import { ApiTags } from '@nestjs/swagger';
import { LoggerService } from 'src/configuration/logger.service';
// import { MetricsService } from 'src/configuration/metrics';
import { RESPONSE_DATA } from 'src/common/responses';

@ApiTags('Tenant Creation')
@Controller('/')
export class TenantController {
    constructor(private readonly tenantService: TenantService, private readonly httpResponse: HttpResponse, private readonly logger: LoggerService) {}

    @Post('create-tenant')
    async createTenant(@Body() createTenantDto: CreateTenantDto, @Res() res: Response) {
        try {
            // this.metricsService.incrementCounter('tenant.create.attempt');
            const [status, result] = await this.tenantService.createTenant(createTenantDto);
            this.logger.log(`Tenant creation status: ${status}`);
            if (status === RESPONSE_DATA.SUCCESS) {
                // this.metricsService.incrementCounter('tenant.create.success'); 
            } else {
                // this.metricsService.incrementCounter('tenant.create.error'); 
            }
            return this.httpResponse.sendResponse(res, status, result);
        } catch (error) {
            this.logger.error(`Error creating tenant: ${error.message}`);
            // this.metricsService.incrementCounter('tenant.create.error'); 
        }
    }
}
