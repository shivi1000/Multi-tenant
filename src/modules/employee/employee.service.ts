import { Injectable } from '@nestjs/common';
import { CreateEmployeeDto, EmployeeByIdDto, UpdateEmployeeDto } from './dto/employee.dto';
import { Pool, QueryResult } from 'pg';
import { RESPONSE_DATA } from 'src/common/responses';

@Injectable()
export class EmployeeService {
    constructor() {
      }

    async createEmployee(createEmployeeDto: CreateEmployeeDto, pool: Pool) {
        try {
            await pool.query(
                `INSERT INTO employees (employeename, employeeemail, employeemobile)
                 VALUES ($1,$2, $3)`,
                [createEmployeeDto.employeeName, createEmployeeDto.employeeEmail, createEmployeeDto.employeeMobile ]);
            return [RESPONSE_DATA.EMPLOYEE_CREATE, createEmployeeDto ];
        } catch (error) {
            console.log("error", error);
            throw error;
        }
    }

    async getEmployeeById(employeeByIdDto: EmployeeByIdDto, pool: Pool) {
        try {
            const result = await pool.query(
                'SELECT * FROM employees WHERE employeeid = $1', 
                [employeeByIdDto.employeeId]
            );
            return [RESPONSE_DATA.EMPLOYEE_GET, result.rows[0]];
        } catch (error) {
            console.log("error", error);
            throw error;
        }
    }

    async updateEmployeeById(employeeByIdDto: EmployeeByIdDto, updateEmployeeDto: UpdateEmployeeDto, pool: Pool) {
        try {
            const result = await pool.query(
                `UPDATE employees 
                 SET employeename = $1, employeeemail = $2, employeemobile = $3
                 WHERE employeeid = $4`,
                [updateEmployeeDto.employeeName, updateEmployeeDto.employeeEmail, updateEmployeeDto.employeeMobile, employeeByIdDto.employeeId]
            );
            return [RESPONSE_DATA.EMPLOYEE_UPDATE, result.rows[0]];
        } catch (error) {
            console.log("error", error);
            throw error;
        }
    }

    async deleteEmployeeById(employeeByIdDto: EmployeeByIdDto, pool: Pool) {
        try {
            await pool.query(
                'DELETE FROM employees WHERE employeeid = $1',
                [employeeByIdDto.employeeId]
            );
            return [RESPONSE_DATA.EMPLOYEE_DELETE, {}];
        } catch (error) {
            console.log("error", error);
            throw error;
        }
    }
}

  

