"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AllExceptionsFilter = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const responses_1 = require("../common/responses");
let AllExceptionsFilter = class AllExceptionsFilter {
    constructor(httpAdapterHost) {
        this.httpAdapterHost = httpAdapterHost;
    }
    catch(exception, host) {
        var _a, _b;
        const { httpAdapter } = this.httpAdapterHost;
        const ctx = host.switchToHttp();
        const httpStatus = exception instanceof common_1.HttpException ? exception.getStatus() : common_1.HttpStatus.INTERNAL_SERVER_ERROR;
        const errorMessage = exception.response
            ? Array.isArray(exception.response.message)
                ? exception.response.message[0]
                : exception.response.message
            : responses_1.RESPONSE_MSG.ERROR;
        const responseBody = {
            status: httpStatus,
            success: false,
            error: errorMessage,
            message: errorMessage,
            path: httpAdapter.getRequestUrl(ctx.getRequest()),
            timestamp: new Date().toISOString(),
        };
        httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
        console.log('');
        console.log('*********************************RESPONSE ERROR START*************************************');
        console.log('path=======>', responseBody.path);
        console.log('status=======>', responseBody.status);
        console.log('error=======>', JSON.stringify(responseBody.error));
        console.log('message=======>', JSON.stringify(responseBody.message));
        console.log('TIME============>', new Date());
        console.log('Response Time=======>', new Date().getTime() - ((_b = (_a = ctx.getRequest()) === null || _a === void 0 ? void 0 : _a.startTime) === null || _b === void 0 ? void 0 : _b.getTime()), 'MS');
        console.log('********************************RESPONSE ERROR ENDS******************************************');
    }
};
exports.AllExceptionsFilter = AllExceptionsFilter;
exports.AllExceptionsFilter = AllExceptionsFilter = __decorate([
    (0, common_1.Catch)(),
    __metadata("design:paramtypes", [core_1.HttpAdapterHost])
], AllExceptionsFilter);
//# sourceMappingURL=exceptionFilter.js.map