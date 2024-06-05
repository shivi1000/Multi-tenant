"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TenantModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const httpResponse_1 = require("../../common/httpResponse");
const entity_module_1 = require("../../entity/entity.module");
const tenant_service_1 = require("./tenant.service");
const tenant_controller_1 = require("./tenant.controller");
const db_service_1 = require("../../providers/database/db.service");
const encryption_service_1 = require("../../providers/encrption/encryption.service");
const employee_1 = require("../../queryBuilder/employee");
let TenantModule = class TenantModule {
};
exports.TenantModule = TenantModule;
exports.TenantModule = TenantModule = __decorate([
    (0, common_1.Module)({
        imports: [config_1.ConfigModule.forRoot(), entity_module_1.EntityModule],
        controllers: [tenant_controller_1.TenantController],
        providers: [tenant_service_1.TenantService, httpResponse_1.HttpResponse, db_service_1.DatabaseService, encryption_service_1.EncryptionService, employee_1.Queries],
    })
], TenantModule);
//# sourceMappingURL=tenant.module.js.map