import { CreateEmployeeDto, EmployeeByIdDto, UpdateEmployeeDto } from './dto/employee.dto';
import { Pool } from 'pg';
export declare class EmployeeService {
    constructor();
    createEmployee(createEmployeeDto: CreateEmployeeDto, pool: Pool): Promise<(CreateEmployeeDto | {
        statusCode: import("@nestjs/common").HttpStatus;
        message: string;
    })[]>;
    getEmployeeById(employeeByIdDto: EmployeeByIdDto, pool: Pool): Promise<any[]>;
    updateEmployeeById(employeeByIdDto: EmployeeByIdDto, updateEmployeeDto: UpdateEmployeeDto, pool: Pool): Promise<any[]>;
    deleteEmployeeById(employeeByIdDto: EmployeeByIdDto, pool: Pool): Promise<{}[]>;
}
