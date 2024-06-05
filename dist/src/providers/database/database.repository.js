"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const database_provider_1 = require("../database/database.provider");
database_provider_1.AppDataSource.initialize()
    .then(() => {
    console.log('<-----Data Source has been initialized----->');
})
    .catch((err) => {
    console.error('!!!!!------Error during Data Source initialization-----!!!!!', err);
});
//# sourceMappingURL=database.repository.js.map