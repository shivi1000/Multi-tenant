import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EncryptionService } from '../encrption/encryption.service';
import { Tenant } from 'src/entity/tenant.entity';

@Injectable()
export class DatabaseService {
  constructor(
    private configService: ConfigService,
    private readonly encryptionService: EncryptionService,
    @InjectRepository(Tenant)
    private tenantRepository: Repository<Tenant>,
  ) {}

  async createTenantDatabase(tenantName: string) {
    const dbName = `tenant_${tenantName}`;
    const dbUsername = `user_${tenantName}`;
    const dbPassword = `pass_${tenantName}`;
    const encryptedPassword = this.encryptionService.encrypt(dbPassword);

    try {
      await this.tenantRepository.query(`CREATE DATABASE "${dbName}"`);
      await this.tenantRepository.query(`CREATE USER "${dbUsername}" WITH PASSWORD '${dbPassword}'`);
      await this.tenantRepository.query(`GRANT ALL PRIVILEGES ON DATABASE "${dbName}" TO "${dbUsername}"`);

      const tenant = this.tenantRepository.create({
        tenantname: tenantName,
        dbname: dbName,
        dbusername: dbUsername,
        dbpassword: encryptedPassword,
        dbhost: this.configService.get<string>('CMD_HOST'),
        dbport: this.configService.get<number>('CMD_PORT'),
      });

      await this.tenantRepository.insert(tenant);

      console.log(`Tenant database '${dbName}' created successfully`);
      return { dbName, dbUsername };
    } catch (error) {
      console.error('Error creating tenant database:', error);
      throw error;
    }
  }

  async getTenantDetails(tenantId: string) {
    return await this.tenantRepository.findOne({ where: { tenantid: tenantId } });
  }
}

