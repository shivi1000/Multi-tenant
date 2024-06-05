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
exports.ConnectionPoolService = void 0;
const common_1 = require("@nestjs/common");
const pg_1 = require("pg");
const db_service_1 = require("../database/db.service");
const encryption_service_1 = require("../encrption/encryption.service");
const config_1 = require("@nestjs/config");
const employee_1 = require("../../queryBuilder/employee");
let ConnectionPoolService = class ConnectionPoolService {
    constructor(configService, databaseService, encryptionService, queries) {
        this.configService = configService;
        this.databaseService = databaseService;
        this.encryptionService = encryptionService;
        this.queries = queries;
        this.pools = new Map();
    }
    async getTenantConnection(tenantId) {
        try {
            if (!this.pools.has(tenantId)) {
                const tenantDetails = await this.databaseService.getTenantDetails(tenantId);
                if (!tenantDetails) {
                    throw new Error(`tenant Details ${tenantId} not found`);
                }
                const decryptPassword = this.encryptionService.decrypt(tenantDetails.dbpassword);
                console.log("Creating a Connection Pool >>>>>>>>>>>>>>>>>>>>>>>>>>");
                const pool = new pg_1.Pool({
                    host: tenantDetails.dbhost,
                    port: tenantDetails.dbport,
                    user: tenantDetails.dbusername,
                    password: decryptPassword,
                    database: tenantDetails.dbname,
                    connectionTimeoutMillis: this.configService.get('TENANT_CONNECTION_TIMEOUT_MILLIS'),
                    idleTimeoutMillis: this.configService.get('TENANT_IDLE_TIMEOUT_MILLIS'),
                    max: this.configService.get('TENANT_MAX'),
                    allowExitOnIdle: this.configService.get('TENANT_ALLOW_EXIT_ON_IDLE'),
                });
                await this.queries.createEmployeesTable(pool);
                this.pools.set(tenantId, pool);
            }
            const tenantPool = this.pools.get(tenantId);
            if (!tenantPool) {
                throw new Error(`Connection pool for tenant ${tenantId} not found`);
            }
            return tenantPool;
        }
        catch (error) {
            throw error;
        }
    }
};
exports.ConnectionPoolService = ConnectionPoolService;
exports.ConnectionPoolService = ConnectionPoolService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService, db_service_1.DatabaseService, encryption_service_1.EncryptionService, employee_1.Queries])
], ConnectionPoolService);
//# sourceMappingURL=connection-pool.service.js.map