import { Response } from 'express';
import { HttpResponse } from 'src/common/httpResponse';
import { EmployeeService } from './employee.service';
import { CreateEmployeeDto, EmployeeByIdDto, HeaderDto, UpdateEmployeeDto } from './dto/employee.dto';
export declare class EmployeeController {
    private readonly employeeService;
    private readonly httpResponse;
    constructor(employeeService: EmployeeService, httpResponse: HttpResponse);
    createEmployee(createEmployeeDto: CreateEmployeeDto, headerDto: HeaderDto, res: Response): Promise<void>;
    getEmployeeById(employeeByIdDto: EmployeeByIdDto, headerDto: HeaderDto, res: Response): Promise<void>;
    updateEmployeeById(employeeByIdDto: EmployeeByIdDto, updateEmployeeDto: UpdateEmployeeDto, headerDto: HeaderDto, res: Response): Promise<void>;
    deleteEmployeeById(employeeByIdDto: EmployeeByIdDto, headerDto: HeaderDto, res: Response): Promise<void>;
}
