import { Controller, Post, Body, Res, Get, Patch, Delete, Query, Headers } from '@nestjs/common';
import { Response } from 'express';
import { HttpResponse } from 'src/common/httpResponse';
import { ApiTags } from '@nestjs/swagger';
import { EmployeeService } from './employee.service';
import { CreateEmployeeDto, EmployeeByIdDto, HeaderDto, UpdateEmployeeDto } from './dto/employee.dto';

@ApiTags('Employee')
@Controller('/employee')
export class EmployeeController {
    constructor(private readonly employeeService: EmployeeService, private readonly httpResponse: HttpResponse) {}


    @Post('/')
    async createEmployee(@Body() createEmployeeDto: CreateEmployeeDto, @Headers() headerDto: HeaderDto, @Res() res: Response) {
        const [status, result] = await this.employeeService.createEmployee(createEmployeeDto, res.locals.tenantPool);
        return this.httpResponse.sendResponse(res, status, result);
    }

    @Get('/')
    async getEmployeeById(@Query() employeeByIdDto: EmployeeByIdDto, @Headers() headerDto: HeaderDto, @Res() res: Response) {
        const [status, result] = await this.employeeService.getEmployeeById(employeeByIdDto, res.locals.tenantPool);
        return this.httpResponse.sendResponse(res, status, result);
    }

    @Patch('/')
    async updateEmployeeById(@Query() employeeByIdDto: EmployeeByIdDto, @Body() updateEmployeeDto: UpdateEmployeeDto, @Headers() headerDto: HeaderDto, @Res() res: Response) {
        const [status, result] = await this.employeeService.updateEmployeeById(employeeByIdDto, updateEmployeeDto, res.locals.tenantPool);
        return this.httpResponse.sendResponse(res, status, result);
    }

    @Delete('/')
    async deleteEmployeeById(@Query() employeeByIdDto: EmployeeByIdDto, @Headers() headerDto: HeaderDto, @Res() res: Response) {
        const [status, result] = await this.employeeService.deleteEmployeeById(employeeByIdDto, res.locals.tenantPool);
        return this.httpResponse.sendResponse(res, status, result);
    }
}

