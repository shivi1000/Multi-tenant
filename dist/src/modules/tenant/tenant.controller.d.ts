import { Response } from 'express';
import { CreateTenantDto } from './dto/tenant.dto';
import { TenantService } from './tenant.service';
import { HttpResponse } from 'src/common/httpResponse';
export declare class TenantController {
    private readonly tenantService;
    private readonly httpResponse;
    constructor(tenantService: TenantService, httpResponse: HttpResponse);
    createTenant(createTenantDto: CreateTenantDto, res: Response): Promise<void>;
}
