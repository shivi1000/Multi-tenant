"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RESPONSE_DATA = exports.RESPONSE_MSG = void 0;
const common_1 = require("@nestjs/common");
exports.RESPONSE_MSG = {
    SUCCESS: 'Success.',
    ERROR: 'Something went wrong.',
    EMPLOYEE_CREATE: 'Employee created successfully',
    EMPLOYEE_GET: 'Employee details fetched successfully',
    EMPLOYEE_UPDATE: 'Employee details updated successfully',
    EMPLOYEE_DELETE: 'Employee deleted successfully'
};
exports.RESPONSE_DATA = {
    SUCCESS: {
        statusCode: common_1.HttpStatus.OK,
        message: exports.RESPONSE_MSG.SUCCESS,
    },
    ERROR: {
        statusCode: common_1.HttpStatus.BAD_REQUEST,
        message: exports.RESPONSE_MSG.ERROR,
    },
    EMPLOYEE_CREATE: {
        statusCode: common_1.HttpStatus.OK,
        message: exports.RESPONSE_MSG.EMPLOYEE_CREATE,
    },
    EMPLOYEE_GET: {
        statusCode: common_1.HttpStatus.OK,
        message: exports.RESPONSE_MSG.EMPLOYEE_GET,
    },
    EMPLOYEE_UPDATE: {
        statusCode: common_1.HttpStatus.OK,
        message: exports.RESPONSE_MSG.EMPLOYEE_UPDATE,
    },
    EMPLOYEE_DELETE: {
        statusCode: common_1.HttpStatus.OK,
        message: exports.RESPONSE_MSG.EMPLOYEE_DELETE,
    },
};
//# sourceMappingURL=responses.js.map