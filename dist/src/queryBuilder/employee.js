"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Queries = void 0;
class Queries {
    async createEmployeesTable(pool) {
        try {
            await pool.query(`
        CREATE TABLE IF NOT EXISTS employees (
          employeeId SERIAL PRIMARY KEY, 
          employeeName VARCHAR(100) NOT NULL,
          employeeEmail VARCHAR(100) NOT NULL,
          employeeMobile VARCHAR(100) NOT NULL
        )
      `);
        }
        catch (error) {
            throw error;
        }
    }
}
exports.Queries = Queries;
//# sourceMappingURL=employee.js.map