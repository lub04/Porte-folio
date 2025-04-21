const AbstractRepository = require("./AbstractRepository");

class StatusRepository extends AbstractRepository {
  constructor() {
    super({ table: "status" });
  }

  async create(status) {
    const [result] = await this.database.query(
      `insert into ${this.table} (status) values (?)`,
      [status.status]
    );
    return result.insertId;
  }

  async readAll() {
    const [rows] = await this.database.query(`select * from ${this.table}`);
    return rows;
  }

  async delete(status) {
    const [result] = await this.database.query(
      `delete from ${this.table} where id = ?`,
      [status.id]
    );
    return result.affectedRows;
  }
}

module.exports = StatusRepository;
