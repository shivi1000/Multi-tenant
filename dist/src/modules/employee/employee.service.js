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
exports.EmployeeService = void 0;
const common_1 = require("@nestjs/common");
const responses_1 = require("../../common/responses");
let EmployeeService = class EmployeeService {
    constructor() {
    }
    async createEmployee(createEmployeeDto, pool) {
        try {
            await pool.query(`INSERT INTO employees (employeename, employeeemail, employeemobile)
                 VALUES ($1,$2, $3)`, [createEmployeeDto.employeeName, createEmployeeDto.employeeEmail, createEmployeeDto.employeeMobile]);
            return [responses_1.RESPONSE_DATA.EMPLOYEE_CREATE, createEmployeeDto];
        }
        catch (error) {
            console.log("error", error);
            throw error;
        }
    }
    async getEmployeeById(employeeByIdDto, pool) {
        try {
            const result = await pool.query('SELECT * FROM employees WHERE employeeid = $1', [employeeByIdDto.employeeId]);
            return [responses_1.RESPONSE_DATA.EMPLOYEE_GET, result.rows[0]];
        }
        catch (error) {
            console.log("error", error);
            throw error;
        }
    }
    async updateEmployeeById(employeeByIdDto, updateEmployeeDto, pool) {
        try {
            const result = await pool.query(`UPDATE employees 
                 SET employeename = $1, employeeemail = $2, employeemobile = $3
                 WHERE employeeid = $4`, [updateEmployeeDto.employeeName, updateEmployeeDto.employeeEmail, updateEmployeeDto.employeeMobile, employeeByIdDto.employeeId]);
            return [responses_1.RESPONSE_DATA.EMPLOYEE_UPDATE, result.rows[0]];
        }
        catch (error) {
            console.log("error", error);
            throw error;
        }
    }
    async deleteEmployeeById(employeeByIdDto, pool) {
        try {
            await pool.query('DELETE FROM employees WHERE employeeid = $1', [employeeByIdDto.employeeId]);
            return [responses_1.RESPONSE_DATA.EMPLOYEE_DELETE, {}];
        }
        catch (error) {
            console.log("error", error);
            throw error;
        }
    }
};
exports.EmployeeService = EmployeeService;
exports.EmployeeService = EmployeeService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], EmployeeService);
//# sourceMappingURL=employee.service.js.map