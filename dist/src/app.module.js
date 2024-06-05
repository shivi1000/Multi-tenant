"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const core_1 = require("@nestjs/core");
const schedule_1 = require("@nestjs/schedule");
const configuration_1 = __importDefault(require("../config/configuration"));
const logger_module_1 = require("./logger/logger.module");
const db_module_1 = require("./providers/database/db.module");
const core_2 = require("@nestjs/core");
const exceptionFilter_1 = require("./filters/exceptionFilter");
const tenant_module_1 = require("./modules/tenant/tenant.module");
const connection_pool_module_1 = require("./providers/connection-pool/connection-pool.module");
const employee_module_1 = require("./modules/employee/employee.module");
const routes = [
    {
        path: '/tenant',
        module: tenant_module_1.TenantModule,
    },
    {
        path: '/',
        module: employee_module_1.EmployeeModule,
    },
];
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({ load: [configuration_1.default], isGlobal: true }),
            schedule_1.ScheduleModule.forRoot(),
            db_module_1.DatabaseModule,
            logger_module_1.LoggerModule,
            tenant_module_1.TenantModule,
            employee_module_1.EmployeeModule,
            connection_pool_module_1.ConnectionPoolModule,
            core_1.RouterModule.register(routes),
        ],
        providers: [
            {
                provide: core_2.APP_FILTER,
                useClass: exceptionFilter_1.AllExceptionsFilter,
            },
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map