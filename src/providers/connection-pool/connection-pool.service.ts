import { Injectable } from "@nestjs/common";
import { Pool } from "pg";
import { DatabaseService } from "../database/db.service";
import { EncryptionService } from "../encrption/encryption.service";
import { ConfigService } from "@nestjs/config";
import { Queries } from "src/queryBuilder/employee";

@Injectable()
export class ConnectionPoolService {
  constructor(private configService: ConfigService, private readonly databaseService: DatabaseService, private readonly encryptionService: EncryptionService, private readonly queries: Queries) {}
  private pools: Map<string, Pool> = new Map();

  async getTenantConnection(tenantId: string): Promise<Pool> {
    try {
      if (!this.pools.has(tenantId)) {
        const tenantDetails = await this.databaseService.getTenantDetails(tenantId);
        if (!tenantDetails) {
          throw new Error(`tenant Details ${tenantId} not found`);
        }

        const decryptPassword = this.encryptionService.decrypt(tenantDetails.dbpassword);

        // To show reuseability 
        // when everytime a new connection is added to the map, it will print this log
        // If connection is already in the map, it will just fetch, nothing will be logged

        console.log("Creating a Connection Pool >>>>>>>>>>>>>>>>>>>>>>>>>>");  

        const pool = new Pool({
          host: tenantDetails.dbhost,
          port: tenantDetails.dbport,
          user: tenantDetails.dbusername,
          password: decryptPassword,
          database: tenantDetails.dbname,
          connectionTimeoutMillis: this.configService.get<number>('TENANT_CONNECTION_TIMEOUT_MILLIS'),
          idleTimeoutMillis: this.configService.get<number>('TENANT_IDLE_TIMEOUT_MILLIS'),
          max: this.configService.get<number>('TENANT_MAX'),
          allowExitOnIdle: this.configService.get<boolean>('TENANT_ALLOW_EXIT_ON_IDLE'),
          
        });

        await this.queries.createEmployeesTable(pool);

        this.pools.set(tenantId, pool);
      }
      const tenantPool = this.pools.get(tenantId);
      if (!tenantPool) {
        throw new Error(`Connection pool for tenant ${tenantId} not found`);
      }
      return tenantPool;
    } catch (error) {
      throw error;
    }
  }
}
