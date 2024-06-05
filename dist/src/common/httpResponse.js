"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpResponse = void 0;
const responses_1 = require("./responses");
const http_status_enum_1 = require("@nestjs/common/enums/http-status.enum");
class HttpResponse {
    async sendResponse(res, b = { statusCode: http_status_enum_1.HttpStatus.BAD_REQUEST }, data = {}) {
        var _a, _b;
        if (b.statusCode.toString().startsWith('2')) {
            b.data = data;
            res.status(b.statusCode).json(b);
        }
        else {
            res.status(b.statusCode).json({
                status: b.statusCode,
                success: false,
                error: data.message ? data.message : responses_1.RESPONSE_MSG.ERROR,
                message: b.message ? b.message : responses_1.RESPONSE_MSG.ERROR,
                path: res.req.originalUrl,
                timestamp: new Date().toISOString(),
            });
        }
        console.log('');
        console.log('*********************************RESPONSE SUCCESS START*************************************');
        console.log('path================>', res.req.originalUrl);
        console.log('type================>', res.req.method.toUpperCase());
        console.log('status==============>', b.statusCode);
        console.log('TIME================>', new Date());
        console.log('Response Time=======>', new Date().getTime() - ((_b = (_a = res.req) === null || _a === void 0 ? void 0 : _a.startTime) === null || _b === void 0 ? void 0 : _b.getTime()), 'MS');
        console.log('********************************RESPONSE SUCCESS ENDS******************************************');
    }
}
exports.HttpResponse = HttpResponse;
//# sourceMappingURL=httpResponse.js.map