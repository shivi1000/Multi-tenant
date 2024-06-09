import { Injectable } from '@nestjs/common';
import { CreateEmployeeDto, EmployeeByIdDto, UpdateEmployeeDto } from './dto/employee.dto';
import { Pool } from 'pg';
import { RESPONSE_DATA } from 'src/common/responses';
import { LoggerService } from 'src/configuration/logger.service';
// import { MetricsService } from 'src/configuration/metrics';

@Injectable()
export class EmployeeService {
    constructor(private readonly logger: LoggerService) {}

    async createEmployee(createEmployeeDto: CreateEmployeeDto, pool: Pool) {
        // this.metricsService.incrementCounter('employee.create.attempt'); 
        try {
            this.logger.log(`Creating employee: ${createEmployeeDto.employeeName}`);
            await pool.query(
                `INSERT INTO employees (employeename, employeeemail, employeemobile)
                 VALUES ($1, $2, $3)`,
                [createEmployeeDto.employeeName, createEmployeeDto.employeeEmail, createEmployeeDto.employeeMobile]
            );
            this.logger.log(`Employee created successfully: ${createEmployeeDto.employeeName}`);
            // this.metricsService.incrementCounter('employee.create.success'); 
            return [RESPONSE_DATA.EMPLOYEE_CREATE, createEmployeeDto];
        } catch (error) {
            this.logger.error(`Error creating employee: ${error.message}`);
            // this.metricsService.incrementCounter('employee.create.error');
            throw error;
        }
    }

    async getEmployeeById(employeeByIdDto: EmployeeByIdDto, pool: Pool) {
        // this.metricsService.incrementCounter('employee.get.attempt'); 
        try {
            this.logger.log(`Fetching employee by ID: ${employeeByIdDto.employeeId}`);
            const result = await pool.query(
                'SELECT * FROM employees WHERE employeeid = $1', 
                [employeeByIdDto.employeeId]
            );
            this.logger.log(`Employee fetched successfully: ${result.rows[0]?.employeename}`);
            // this.metricsService.incrementCounter('employee.get.success'); 
            return [RESPONSE_DATA.EMPLOYEE_GET, result.rows[0]];
        } catch (error) {
            this.logger.error(`Error fetching employee by ID: ${error.message}`);
            // this.metricsService.incrementCounter('employee.get.error');
            throw error;
        }
    }

    async updateEmployeeById(employeeByIdDto: EmployeeByIdDto, updateEmployeeDto: UpdateEmployeeDto, pool: Pool) {
        // this.metricsService.incrementCounter('employee.update.attempt'); 
        try {
            this.logger.log(`Updating employee ID: ${employeeByIdDto.employeeId}`);
            const result = await pool.query(
                `UPDATE employees 
                 SET employeename = $1, employeeemail = $2, employeemobile = $3
                 WHERE employeeid = $4`,
                [updateEmployeeDto.employeeName, updateEmployeeDto.employeeEmail, updateEmployeeDto.employeeMobile, employeeByIdDto.employeeId]
            );
            this.logger.log(`Employee updated successfully: ${employeeByIdDto.employeeId}`);
            // this.metricsService.incrementCounter('employee.update.success'); 
            return [RESPONSE_DATA.EMPLOYEE_UPDATE, result.rows[0]];
        } catch (error) {
            this.logger.error(`Error updating employee by ID: ${error.message}`);
            // this.metricsService.incrementCounter('employee.update.error');
            throw error;
        }
    }

    async deleteEmployeeById(employeeByIdDto: EmployeeByIdDto, pool: Pool) {
        // this.metricsService.incrementCounter('employee.delete.attempt'); 
        try {
            this.logger.log(`Deleting employee ID: ${employeeByIdDto.employeeId}`);
            await pool.query(
                'DELETE FROM employees WHERE employeeid = $1',
                [employeeByIdDto.employeeId]
            );
            this.logger.log(`Employee deleted successfully: ${employeeByIdDto.employeeId}`);
            // this.metricsService.incrementCounter('employee.delete.success'); 
            return [RESPONSE_DATA.EMPLOYEE_DELETE, {}];
        } catch (error) {
            this.logger.error(`Error deleting employee by ID: ${error.message}`);
            // this.metricsService.incrementCounter('employee.delete.error');
            throw error;
        }
    }
}
