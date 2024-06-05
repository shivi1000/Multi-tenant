import { Pool } from "pg";
import { DatabaseService } from "../database/db.service";
import { EncryptionService } from "../encrption/encryption.service";
import { ConfigService } from "@nestjs/config";
import { Queries } from "src/queryBuilder/employee";
export declare class ConnectionPoolService {
    private configService;
    private readonly databaseService;
    private readonly encryptionService;
    private readonly queries;
    constructor(configService: ConfigService, databaseService: DatabaseService, encryptionService: EncryptionService, queries: Queries);
    private pools;
    getTenantConnection(tenantId: string): Promise<Pool>;
}
