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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoggerModule = void 0;
const common_1 = require("@nestjs/common");
const nest_winston_1 = require("nest-winston");
const winston = __importStar(require("winston"));
const moment = require("moment");
const constant_1 = require("../common/constant");
const DailyRotateFile = require('winston-daily-rotate-file');
let LoggerModule = class LoggerModule {
};
exports.LoggerModule = LoggerModule;
exports.LoggerModule = LoggerModule = __decorate([
    (0, common_1.Module)({
        imports: [
            nest_winston_1.WinstonModule.forRoot({
                transports: [
                    new DailyRotateFile({
                        filename: process.cwd() + '/logs/Combined.log',
                        datePattern: 'YYYY-MM-DD',
                        level: 'info',
                        maxSize: '5m',
                        format: winston.format.combine(winston.format.timestamp(), winston.format.ms(), nest_winston_1.utilities.format.nestLike(constant_1.CONSTANT.LOGGER_NAME, {
                            colors: true,
                            prettyPrint: true,
                        }), winston.format.printf((info) => `${info.level}: ${[info.timestamp]} ${info.message} }`)),
                    }),
                    new DailyRotateFile({
                        filename: process.cwd() + '/logs/Errors-' + moment().format('MMMM-YYYY') + '.log',
                        datePattern: 'YYYY-MM-DD',
                        level: 'error',
                        maxSize: '5m',
                        format: winston.format.combine(winston.format.timestamp(), winston.format.ms(), nest_winston_1.utilities.format.nestLike(constant_1.CONSTANT.LOGGER_NAME, {
                            colors: true,
                            prettyPrint: true,
                        }), winston.format.printf((info) => `${info.level}: ${[info.timestamp]}: API ENDPOINT ${info.message} MESSAGE ${info.stack ? info.stack : 'NO ERROR'}`)),
                    }),
                ],
            }),
        ],
    })
], LoggerModule);
//# sourceMappingURL=logger.module.js.map