"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
const typeorm_1 = require("typeorm");
const config_1 = require("@nestjs/config");
const dotenv_1 = require("dotenv");
const _1674199980999_datatypes_1 = require("../../migrations/1674199980999-datatypes");
const _1574199981999_sequences_1 = require("../../migrations/1574199981999-sequences");
const _1674199982999_tables_1 = require("../../migrations/1674199982999-tables");
const env = process.env.NODE_ENV || false;
if (!env)
    process.exit(100);
(0, dotenv_1.config)({ path: `bin/.env.${env}` });
const configService = new config_1.ConfigService();
exports.AppDataSource = new typeorm_1.DataSource({
    type: 'postgres',
    host: configService.get('POSTGRES_HOST'),
    port: configService.get('POSTGRES_PORT'),
    username: configService.get('POSTGRES_USER'),
    password: configService.get('POSTGRES_PASSWORD'),
    database: configService.get('DATABASE_NAME'),
    logging: ['error', 'migration', 'query', 'warn'],
    logger: 'advanced-console',
    entities: [],
    synchronize: false,
    migrations: [_1674199980999_datatypes_1.datatypes1674199980999, _1574199981999_sequences_1.sequences1574199981999, _1674199982999_tables_1.tables1674199982999],
});
//# sourceMappingURL=database.provider.js.map