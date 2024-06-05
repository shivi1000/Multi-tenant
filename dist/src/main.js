"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const core_1 = require("@nestjs/core");
const express = __importStar(require("express"));
const nest_winston_1 = require("nest-winston");
const app_module_1 = require("./app.module");
const exceptionFilter_1 = require("./filters/exceptionFilter");
const logging_middleware_1 = require("./middlewares/logging.middleware");
const swagger_1 = require("@nestjs/swagger");
const constant_1 = require("./common/constant");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.enableShutdownHooks();
    app.use(express.json({
        verify: (req, res, buf) => {
            req.rawBody = buf;
        },
    }));
    app.useGlobalPipes(new common_1.ValidationPipe({
        transform: true,
        transformOptions: { enableImplicitConversion: true },
    }));
    app.enableCors();
    app.use(new logging_middleware_1.LoggerMiddleware().use);
    app.useLogger(app.get(nest_winston_1.WINSTON_MODULE_NEST_PROVIDER));
    const httpAdapter = app.get(core_1.HttpAdapterHost);
    app.useGlobalFilters(new exceptionFilter_1.AllExceptionsFilter(httpAdapter));
    const configService = app.get(config_1.ConfigService);
    const nestPort = configService.get('PORT') || 8001;
    const config = new swagger_1.DocumentBuilder()
        .setTitle(constant_1.Swagger.Title)
        .setDescription(constant_1.Swagger.Description)
        .setVersion(constant_1.Swagger.Version)
        .addApiKey({
        type: 'apiKey',
        name: constant_1.Swagger.AddApiKey.Name,
        in: constant_1.Swagger.AddApiKey.In,
    }, constant_1.Swagger.AuthType)
        .addBearerAuth()
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup(constant_1.Swagger.Path, app, document);
    await app.listen(nestPort);
    console.info(`Nest server listening on Port: ${nestPort}`);
}
bootstrap();
//# sourceMappingURL=main.js.map