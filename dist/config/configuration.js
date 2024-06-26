"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = require("dotenv");
const env = process.env.NODE_ENV || false;
if (!env)
    process.exit(100);
(0, dotenv_1.config)({ path: `bin/.env.${env}` });
exports.default = () => ({
    PORT: process.env.PORT,
    ENV: process.env.NODE_ENV,
    CMD_HOST: process.env.CMD_HOST,
    CMD_PORT: process.env.CMD_PORT,
    CMD_USER: process.env.CMD_USER,
    CMD_PASSWORD: process.env.CMD_PASSWORD,
    CMD_DATABASE: process.env.CMD_DATABASE,
    ENCRYPTION_KEY: process.env.ENCRYPTION_KEY,
    CMD_CONNECTION_TIMEOUT_MILLIS: process.env.CMD_CONNECTION_TIMEOUT_MILLIS,
    CMD_IDLE_TIMEOUT_MILLIS: process.env.CMD_IDLE_TIMEOUT_MILLIS,
    CMD_MAX: process.env.CMD_MAX,
    CMD_ALLOW_EXIT_ON_IDLE: process.env.CMD_ALLOW_EXIT_ON_IDLE,
    TENANT_CONNECTION_TIMEOUT_MILLIS: process.env.TENANT_CONNECTION_TIMEOUT_MILLIS,
    TENANT_IDLE_TIMEOUT_MILLIS: process.env.TENANT_IDLE_TIMEOUT_MILLIS,
    TENANT_MAX: process.env.TENANT_MAX,
    TENANT_ALLOW_EXIT_ON_IDLE: process.env.TENANT_ALLOW_EXIT_ON_IDLE
});
//# sourceMappingURL=configuration.js.map