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
exports.EmployeeController = void 0;
const common_1 = require("@nestjs/common");
const httpResponse_1 = require("../../common/httpResponse");
const swagger_1 = require("@nestjs/swagger");
const employee_service_1 = require("./employee.service");
const employee_dto_1 = require("./dto/employee.dto");
let EmployeeController = class EmployeeController {
    constructor(employeeService, httpResponse) {
        this.employeeService = employeeService;
        this.httpResponse = httpResponse;
    }
    async createEmployee(createEmployeeDto, headerDto, res) {
        const [status, result] = await this.employeeService.createEmployee(createEmployeeDto, res.locals.tenantPool);
        return this.httpResponse.sendResponse(res, status, result);
    }
    async getEmployeeById(employeeByIdDto, headerDto, res) {
        const [status, result] = await this.employeeService.getEmployeeById(employeeByIdDto, res.locals.tenantPool);
        return this.httpResponse.sendResponse(res, status, result);
    }
    async updateEmployeeById(employeeByIdDto, updateEmployeeDto, headerDto, res) {
        const [status, result] = await this.employeeService.updateEmployeeById(employeeByIdDto, updateEmployeeDto, res.locals.tenantPool);
        return this.httpResponse.sendResponse(res, status, result);
    }
    async deleteEmployeeById(employeeByIdDto, headerDto, res) {
        const [status, result] = await this.employeeService.deleteEmployeeById(employeeByIdDto, res.locals.tenantPool);
        return this.httpResponse.sendResponse(res, status, result);
    }
};
exports.EmployeeController = EmployeeController;
__decorate([
    (0, common_1.Post)('/'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Headers)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [employee_dto_1.CreateEmployeeDto, employee_dto_1.HeaderDto, Object]),
    __metadata("design:returntype", Promise)
], EmployeeController.prototype, "createEmployee", null);
__decorate([
    (0, common_1.Get)('/'),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, common_1.Headers)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [employee_dto_1.EmployeeByIdDto, employee_dto_1.HeaderDto, Object]),
    __metadata("design:returntype", Promise)
], EmployeeController.prototype, "getEmployeeById", null);
__decorate([
    (0, common_1.Patch)('/'),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Headers)()),
    __param(3, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [employee_dto_1.EmployeeByIdDto, employee_dto_1.UpdateEmployeeDto, employee_dto_1.HeaderDto, Object]),
    __metadata("design:returntype", Promise)
], EmployeeController.prototype, "updateEmployeeById", null);
__decorate([
    (0, common_1.Delete)('/'),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, common_1.Headers)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [employee_dto_1.EmployeeByIdDto, employee_dto_1.HeaderDto, Object]),
    __metadata("design:returntype", Promise)
], EmployeeController.prototype, "deleteEmployeeById", null);
exports.EmployeeController = EmployeeController = __decorate([
    (0, swagger_1.ApiTags)('Employee'),
    (0, common_1.Controller)('/employee'),
    __metadata("design:paramtypes", [employee_service_1.EmployeeService, httpResponse_1.HttpResponse])
], EmployeeController);
//# sourceMappingURL=employee.controller.js.map