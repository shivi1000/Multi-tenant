import { Pool } from "pg";

export class Queries {

  async createEmployeesTable(pool: Pool) {
    try {
      await pool.query(`
        CREATE TABLE IF NOT EXISTS employees (
          employeeId SERIAL PRIMARY KEY, 
          employeeName VARCHAR(100) NOT NULL,
          employeeEmail VARCHAR(100) NOT NULL,
          employeeMobile VARCHAR(100) NOT NULL
        )
      `);
    } catch (error) {
      throw error;
    }
  }
}
