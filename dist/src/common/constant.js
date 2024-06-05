"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Swagger = exports.CONSTANT = void 0;
exports.CONSTANT = {
    LOGGER_NAME: 'LOGGER',
};
exports.Swagger = {
    Title: 'Swagger Title',
    Description: 'A Poc on Multi-tenant',
    Version: '1.0',
    AddApiKey: {
        Type: 'apiKey',
        Name: 'Authorization',
        In: 'header',
    },
    AuthType: 'basic',
    Path: 'swagger',
};
//# sourceMappingURL=constant.js.map