import { CreateTenantDto } from './dto/tenant.dto';
import { DatabaseService } from 'src/providers/database/db.service';
export declare class TenantService {
    private readonly databaseService;
    constructor(databaseService: DatabaseService);
    createTenant(createTenantDto: CreateTenantDto): Promise<any[]>;
}
