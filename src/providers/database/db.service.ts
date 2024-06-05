import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Pool } from 'pg';
import { EncryptionService } from '../encrption/encryption.service';
import { Queries } from 'src/queryBuilder/employee';

@Injectable()
export class DatabaseService {
    private pool: Pool;

    constructor(private configService: ConfigService, private readonly encryptionService: EncryptionService, private readonly queries: Queries) {
            this.pool = new Pool({
                host: this.configService.get<string>('CMD_HOST'),
                port: this.configService.get<number>('CMD_PORT'),
                user: this.configService.get<string>('CMD_USER'),
                password: this.configService.get<string>('CMD_PASSWORD'),
                database: this.configService.get<string>('CMD_DATABASE'),
                connectionTimeoutMillis: this.configService.get<number>('CMD_CONNECTION_TIMEOUT_MILLIS'),
                idleTimeoutMillis: this.configService.get<number>('CMD_IDLE_TIMEOUT_MILLIS'),
                max: this.configService.get<number>('CMD_MAX'),
                allowExitOnIdle: this.configService.get<boolean>('CMD_ALLOW_EXIT_ON_IDLE'),


            });
    }

    async  createTenantDatabase(tenantName: string) {
        const dbName = `tenant_${tenantName}`;
        const dbUsername = `user_${tenantName}`;
        const dbPassword = `pass_${tenantName}`;
        const database = this.configService.get<string>('CMD_DATABASE')

        const encryptPassword = this.encryptionService.encrypt(dbPassword);
        
        try {
            await this.pool.query(`CREATE DATABASE "${dbName}"`);           // this.pool is the master connection (cmd)
            await this.pool.query(`CREATE USER "${dbUsername}" WITH PASSWORD '${dbPassword}'`);
            await this.pool.query(`GRANT ALL PRIVILEGES ON DATABASE "${database}" TO "${dbUsername}"`);
            // await this.pool.query(`REVOKE ALL PRIVILEGES ON TABLE tenants FROM "${dbName}"`)
            await this.pool.query(
                `INSERT INTO tenants (tenantname, dbname, dbusername, dbpassword, dbhost, dbport)
                VALUES ($1, $2, $3, $4, $5, $6)`,
                [tenantName, dbName, dbUsername, encryptPassword, this.configService.get<string>('CMD_HOST'), this.configService.get<number>('CMD_PORT')]
            );

            console.log(`Tenant database '${dbName}' created successfully`);
            return { dbName, dbUsername };
        } catch (error) {
            console.error('Error creating tenant database >>>>>>>>>', error);
            throw error;
        }
        
    }

    async getTenantDetails(tenantId: string) {
        const result = await this.pool.query(`SELECT * FROM tenants WHERE tenantid = $1`, [tenantId]);
        return result.rows[0];
    }
}


