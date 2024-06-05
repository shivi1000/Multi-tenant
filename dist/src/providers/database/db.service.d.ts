import { ConfigService } from '@nestjs/config';
import { EncryptionService } from '../encrption/encryption.service';
import { Queries } from 'src/queryBuilder/employee';
export declare class DatabaseService {
    private configService;
    private readonly encryptionService;
    private readonly queries;
    private pool;
    constructor(configService: ConfigService, encryptionService: EncryptionService, queries: Queries);
    createTenantDatabase(tenantName: string): Promise<{
        dbName: string;
        dbUsername: string;
    }>;
    getTenantDetails(tenantId: string): Promise<any>;
}
