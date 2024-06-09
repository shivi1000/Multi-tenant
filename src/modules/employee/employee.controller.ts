import { Controller, Post, Body, Res, Get, Patch, Delete, Query, Headers } from '@nestjs/common';
import { Response } from 'express';
import { HttpResponse } from 'src/common/httpResponse';
import { ApiTags } from '@nestjs/swagger';
import { EmployeeService } from './employee.service';
import { CreateEmployeeDto, EmployeeByIdDto, HeaderDto, UpdateEmployeeDto } from './dto/employee.dto';
import { LoggerService } from 'src/configuration/logger.service';
// import { MetricsService } from 'src/configuration/metrics';

@ApiTags('Employee')
@Controller('/employee')
export class EmployeeController {
    constructor(private readonly employeeService: EmployeeService, private readonly httpResponse: HttpResponse,private readonly logger: LoggerService) {}

    @Post('/')
    async createEmployee(@Body() createEmployeeDto: CreateEmployeeDto, @Headers() headerDto: HeaderDto, @Res() res: Response) {
        // this.metricsService.incrementCounter('employee.create.attempt');
        try {
            const [status, result] = await this.employeeService.createEmployee(createEmployeeDto, res.locals.tenantPool);
            this.logger.log(`Employee creation status: ${status}`);
            // this.metricsService.incrementCounter('employee.create.success'); 
            return this.httpResponse.sendResponse(res, status, result);
        } catch (error) {
            this.logger.error(`Error creating employee: ${error.message}`);
            // this.metricsService.incrementCounter('employee.create.error'); 
        }
    }

    @Get('/')
    async getEmployeeById(@Query() employeeByIdDto: EmployeeByIdDto, @Headers() headerDto: HeaderDto, @Res() res: Response) {
        // this.metricsService.incrementCounter('employee.get.attempt');
        try {
            const [status, result] = await this.employeeService.getEmployeeById(employeeByIdDto, res.locals.tenantPool);
            this.logger.log(`Get employee by ID status: ${status}`);
            // this.metricsService.incrementCounter('employee.get.success'); 
            return this.httpResponse.sendResponse(res, status, result);
        } catch (error) {
            this.logger.error(`Error getting employee by ID: ${error.message}`);
            // this.metricsService.incrementCounter('employee.get.error'); 
        }
    }

    @Patch('/')
    async updateEmployeeById(@Query() employeeByIdDto: EmployeeByIdDto, @Body() updateEmployeeDto: UpdateEmployeeDto, @Headers() headerDto: HeaderDto, @Res() res: Response) {
        // this.metricsService.incrementCounter('employee.update.attempt');
        try {
            const [status, result] = await this.employeeService.updateEmployeeById(employeeByIdDto, updateEmployeeDto, res.locals.tenantPool);
            this.logger.log(`Update employee by ID status: ${status}`);
            // this.metricsService.incrementCounter('employee.update.success'); 
            return this.httpResponse.sendResponse(res, status, result);
        } catch (error) {
            this.logger.error(`Error updating employee by ID: ${error.message}`);
            // this.metricsService.incrementCounter('employee.update.error'); 
        }
    }

    @Delete('/')
    async deleteEmployeeById(@Query() employeeByIdDto: EmployeeByIdDto, @Headers() headerDto: HeaderDto, @Res() res: Response) {
        // this.metricsService.incrementCounter('employee.delete.attempt');
        try {
            const [status, result] = await this.employeeService.deleteEmployeeById(employeeByIdDto, res.locals.tenantPool);
            this.logger.log(`Delete employee by ID status: ${status}`);
            // this.metricsService.incrementCounter('employee.delete.success'); 
            return this.httpResponse.sendResponse(res, status, result);
        } catch (error) {
            this.logger.error(`Error deleting employee by ID: ${error.message}`);
            // this.metricsService.incrementCounter('employee.delete.error'); 
        }
    }
}
