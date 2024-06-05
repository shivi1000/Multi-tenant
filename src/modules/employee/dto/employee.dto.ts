import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class HeaderDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  tenantid: string;
}

export class CreateEmployeeDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  employeeName: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  employeeEmail: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  employeeMobile: string;
}


export class EmployeeByIdDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  employeeId: string;
}

  export class UpdateEmployeeDto {
  @ApiPropertyOptional()
  employeeName: string;
  
  @ApiPropertyOptional()
  employeeEmail: string;
  
  @ApiPropertyOptional()
  employeeMobile: string;
  }
  