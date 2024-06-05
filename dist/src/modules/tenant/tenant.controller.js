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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TenantController = void 0;
const common_1 = require("@nestjs/common");
const tenant_dto_1 = require("./dto/tenant.dto");
const tenant_service_1 = require("./tenant.service");
const httpResponse_1 = require("../../common/httpResponse");
const swagger_1 = require("@nestjs/swagger");
let TenantController = class TenantController {
    constructor(tenantService, httpResponse) {
        this.tenantService = tenantService;
        this.httpResponse = httpResponse;
    }
    async createTenant(createTenantDto, res) {
        const [status, result] = await this.tenantService.createTenant(createTenantDto);
        return this.httpResponse.sendResponse(res, status, result);
    }
};
exports.TenantController = TenantController;
__decorate([
    (0, common_1.Post)('create-tenant'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [tenant_dto_1.CreateTenantDto, Object]),
    __metadata("design:returntype", Promise)
], TenantController.prototype, "createTenant", null);
exports.TenantController = TenantController = __decorate([
    (0, swagger_1.ApiTags)('Tenant Creation'),
    (0, common_1.Controller)('/'),
    __metadata("design:paramtypes", [tenant_service_1.TenantService, httpResponse_1.HttpResponse])
], TenantController);
//# sourceMappingURL=tenant.controller.js.map