import { Controller, Post, Body, Res } from '@nestjs/common';
import { Response } from 'express';
import { CreateTenantDto } from './dto/tenant.dto';
import { TenantService } from './tenant.service';
import { HttpResponse } from 'src/common/httpResponse';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Tenant Creation')
@Controller('/')
export class TenantController {
    constructor(private readonly tenantService: TenantService, private readonly httpResponse: HttpResponse) {}

    @Post('create-tenant')
    async createTenant(@Body() createTenantDto: CreateTenantDto, @Res() res: Response) {
        const [status, result] = await this.tenantService.createTenant(createTenantDto);
        return this.httpResponse.sendResponse(res, status, result);
    }
}

