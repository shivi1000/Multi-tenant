import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { CreateEmployeeDto, EmployeeByIdDto, UpdateEmployeeDto } from './dto/employee.dto';  import { RESPONSE_DATA } from 'src/common/responses';
import { Employee } from 'src/entity/employee.entity';

@Injectable()
export class EmployeeService {
  constructor() {}

  async createEmployee(createEmployeeDto: CreateEmployeeDto, dataSource: DataSource) {
    try {
      const employeeRepository: any = dataSource.getRepository(Employee);
      await employeeRepository.save({
        employeename: createEmployeeDto.employeeName,
        employeeemail: createEmployeeDto.employeeEmail,
        employeemobile: createEmployeeDto.employeeMobile
      });
      return [RESPONSE_DATA.EMPLOYEE_CREATE, createEmployeeDto];
    } catch (error) {
      console.log('error in create employee-->', error);
      throw error;
    }
  }
  async getEmployeeById(employeeByIdDto: EmployeeByIdDto, dataSource: DataSource) {
    try {
      const employeeRepository: any = dataSource.getRepository(Employee);
      const employeeid = (employeeByIdDto.employeeId);
      const employee = await employeeRepository.findOne({ where: { employeeid } });
      return [RESPONSE_DATA.EMPLOYEE_GET, employee];
    } catch (error) {
      console.log("error in getEmployeeById--->", error);
      throw error;
    }
  }

  async updateEmployeeById(employeeByIdDto: EmployeeByIdDto, updateEmployeeDto: UpdateEmployeeDto, dataSource: DataSource) {
    try {
      const employeeRepository: any = dataSource.getRepository(Employee);
      const employeeid = (employeeByIdDto.employeeId);
      await employeeRepository.update(employeeid, {
        employeename: updateEmployeeDto.employeeName,
        employeeemail: updateEmployeeDto.employeeEmail,
        employeemobile: updateEmployeeDto.employeeMobile
      });
      const updatedEmployee = await employeeRepository.findOne({ where: { employeeid } });
      return [RESPONSE_DATA.EMPLOYEE_UPDATE, updatedEmployee];
    } catch (error) {
      console.log("error in updateEmployeeById-->", error);
      throw error;
    }
  }

  async deleteEmployeeById(employeeByIdDto: EmployeeByIdDto, dataSource: DataSource) {
    try {
      const employeeRepository: any = dataSource.getRepository(Employee);
      await employeeRepository.delete({employeeid: employeeByIdDto.employeeId});
      return [RESPONSE_DATA.EMPLOYEE_DELETE, {}];
    } catch (error) {
      console.log("error in deleteEmployeeById-->", error);
      throw error;
    }
  }
}
