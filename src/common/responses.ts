/**
 * @file response
 * @description defines response for entity
 */

import { HttpStatus } from '@nestjs/common';

export const RESPONSE_MSG = {
  SUCCESS: 'Success.',
  ERROR: 'Something went wrong.',
  EMPLOYEE_CREATE: 'Employee created successfully',
  EMPLOYEE_GET: 'Employee details fetched successfully',
  EMPLOYEE_UPDATE: 'Employee details updated successfully',
  EMPLOYEE_DELETE: 'Employee deleted successfully'

};

export const RESPONSE_DATA = {
  SUCCESS: {
    statusCode: HttpStatus.OK,
    message: RESPONSE_MSG.SUCCESS,
  },
  ERROR: {
    statusCode: HttpStatus.BAD_REQUEST,
    message: RESPONSE_MSG.ERROR,
  },
  EMPLOYEE_CREATE: {
    statusCode: HttpStatus.OK,
    message: RESPONSE_MSG.EMPLOYEE_CREATE,
  },
  EMPLOYEE_GET: {
    statusCode: HttpStatus.OK,
    message: RESPONSE_MSG.EMPLOYEE_GET,
  },
  EMPLOYEE_UPDATE: {
    statusCode: HttpStatus.OK,
    message: RESPONSE_MSG.EMPLOYEE_UPDATE,
  },
  EMPLOYEE_DELETE: {
    statusCode: HttpStatus.OK,
    message: RESPONSE_MSG.EMPLOYEE_DELETE,
  },
};
