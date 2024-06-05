import { HttpStatus } from '@nestjs/common';
export declare const RESPONSE_MSG: {
    SUCCESS: string;
    ERROR: string;
    EMPLOYEE_CREATE: string;
    EMPLOYEE_GET: string;
    EMPLOYEE_UPDATE: string;
    EMPLOYEE_DELETE: string;
};
export declare const RESPONSE_DATA: {
    SUCCESS: {
        statusCode: HttpStatus;
        message: string;
    };
    ERROR: {
        statusCode: HttpStatus;
        message: string;
    };
    EMPLOYEE_CREATE: {
        statusCode: HttpStatus;
        message: string;
    };
    EMPLOYEE_GET: {
        statusCode: HttpStatus;
        message: string;
    };
    EMPLOYEE_UPDATE: {
        statusCode: HttpStatus;
        message: string;
    };
    EMPLOYEE_DELETE: {
        statusCode: HttpStatus;
        message: string;
    };
};
