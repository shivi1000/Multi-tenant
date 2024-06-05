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
exports.TenantPoolMiddleware = void 0;
const common_1 = require("@nestjs/common");
const connection_pool_service_1 = require("../providers/connection-pool/connection-pool.service");
let TenantPoolMiddleware = class TenantPoolMiddleware {
    constructor(connectionPoolService) {
        this.connectionPoolService = connectionPoolService;
    }
    async use(req, res, next) {
        try {
            if (!req.headers.tenantid) {
                throw new common_1.UnauthorizedException(`tenantId not found`);
            }
            const tenantConnection = await this.connectionPoolService.getTenantConnection(req.headers["tenantid"]);
            if (!tenantConnection) {
                throw new common_1.UnauthorizedException(`No connection found for tenantId ${req.headers.tenantid}`);
            }
            res.locals.tenantPool = tenantConnection;
            next();
        }
        catch (error) {
            console.log("error", error);
            throw new common_1.UnauthorizedException(error);
        }
    }
};
exports.TenantPoolMiddleware = TenantPoolMiddleware;
exports.TenantPoolMiddleware = TenantPoolMiddleware = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [connection_pool_service_1.ConnectionPoolService])
], TenantPoolMiddleware);
//# sourceMappingURL=tenantConnection.middleware.js.map