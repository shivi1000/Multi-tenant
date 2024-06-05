"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const pg_1 = require("pg");
const encryption_service_1 = require("../encrption/encryption.service");
const employee_1 = require("../../queryBuilder/employee");
let DatabaseService = class DatabaseService {
    constructor(configService, encryptionService, queries) {
        this.configService = configService;
        this.encryptionService = encryptionService;
        this.queries = queries;
        this.pool = new pg_1.Pool({
            host: this.configService.get('CMD_HOST'),
            port: this.configService.get('CMD_PORT'),
            user: this.configService.get('CMD_USER'),
            password: this.configService.get('CMD_PASSWORD'),
            database: this.configService.get('CMD_DATABASE'),
            connectionTimeoutMillis: this.configService.get('CMD_CONNECTION_TIMEOUT_MILLIS'),
            idleTimeoutMillis: this.configService.get('CMD_IDLE_TIMEOUT_MILLIS'),
            max: this.configService.get('CMD_MAX'),
            allowExitOnIdle: this.configService.get('CMD_ALLOW_EXIT_ON_IDLE'),
        });
    }
    async createTenantDatabase(tenantName) {
        const dbName = `tenant_${tenantName}`;
        const dbUsername = `user_${tenantName}`;
        const dbPassword = `pass_${tenantName}`;
        const database = this.configService.get('CMD_DATABASE');
        const encryptPassword = this.encryptionService.encrypt(dbPassword);
        try {
            await this.pool.query(`CREATE DATABASE "${dbName}"`);
            await this.pool.query(`CREATE USER "${dbUsername}" WITH PASSWORD '${dbPassword}'`);
            await this.pool.query(`GRANT ALL PRIVILEGES ON DATABASE "${database}" TO "${dbUsername}"`);
            await this.pool.query(`INSERT INTO tenants (tenantname, dbname, dbusername, dbpassword, dbhost, dbport)
                VALUES ($1, $2, $3, $4, $5, $6)`, [tenantName, dbName, dbUsername, encryptPassword, this.configService.get('CMD_HOST'), this.configService.get('CMD_PORT')]);
            console.log(`Tenant database '${dbName}' created successfully`);
            return { dbName, dbUsername };
        }
        catch (error) {
            console.error('Error creating tenant database >>>>>>>>>', error);
            throw error;
        }
    }
    async getTenantDetails(tenantId) {
        const result = await this.pool.query(`SELECT * FROM tenants WHERE tenantid = $1`, [tenantId]);
        return result.rows[0];
    }
};
exports.DatabaseService = DatabaseService;
exports.DatabaseService = DatabaseService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService, encryption_service_1.EncryptionService, employee_1.Queries])
], DatabaseService);
//# sourceMappingURL=db.service.js.map