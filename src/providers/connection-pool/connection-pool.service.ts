import { Injectable } from '@nestjs/common';
import { DataSource, DataSourceOptions } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { DatabaseService } from '../database/db.service';
import { EncryptionService } from '../encrption/encryption.service';
import { Employee } from 'src/entity/employee.entity';

@Injectable()
export class ConnectionPoolService {
  constructor(
    private configService: ConfigService,
    private readonly databaseService: DatabaseService,
    private readonly encryptionService: EncryptionService,
  ) {}

  private dataSources: Map<string, DataSource> = new Map();

  async getTenantConnection(tenantId: string): Promise<DataSource> {
    try {
      if (!this.dataSources.has(tenantId)) {
        const tenantDetails = await this.databaseService.getTenantDetails(tenantId);
        if (!tenantDetails) {
          throw new Error(`Tenant details for ${tenantId} not found`);
        }

        const decryptPassword = this.encryptionService.decrypt(tenantDetails.dbpassword);

        console.log("Creating a Connection Pool >>>>>>>>>>>>>>>>>>>>>>>>>>");

        const dataSourceOptions: DataSourceOptions = {
          type: 'postgres',
          host: tenantDetails.dbhost,
          port: tenantDetails.dbport,
          username: tenantDetails.dbusername,
          password: decryptPassword,
          database: tenantDetails.dbname,
          logging: true,
          entities: [Employee],
        };

        const dataSource = new DataSource(dataSourceOptions);
        await dataSource.initialize();

        this.dataSources.set(tenantId, dataSource);
      }

      const tenantDataSource = this.dataSources.get(tenantId);
      if (!tenantDataSource) {
        throw new Error(`Connection pool for tenant ${tenantId} not found`);
      }
      await this.createEmployeesTable(tenantDataSource);
      return tenantDataSource;
    } catch (error) {
      throw error;
    }
  }

  async createEmployeesTable(dataSource: DataSource): Promise<void> {
    const queryRunner = dataSource.createQueryRunner();
    await queryRunner.connect();

    try {
      await queryRunner.query(`
        CREATE TABLE IF NOT EXISTS employees (
          employeeId SERIAL PRIMARY KEY, 
          employeeName VARCHAR(100) NOT NULL,
          employeeEmail VARCHAR(100) NOT NULL,
          employeeMobile VARCHAR(100) NOT NULL
        )
      `);
    } finally {
      await queryRunner.release();
    }
  }
}
