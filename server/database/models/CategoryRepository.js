const AbstractRepository = require("./AbstractRepository");

class CategoryRepository extends AbstractRepository {
  constructor() {
    super({ table: "project_category" });
  }

  async create(category) {
    const [result] = await this.database.query(
      `insert into ${this.table} (category) values (?)`,
      [category.category]
    );

    return result.insertId;
  }

  async readAll() {
    const [rows] = await this.database.query(`select * from ${this.table}`);
    return rows;
  }

  async delete(category) {
    const [result] = await this.database.query(
      `delete from ${this.table} where id = ?`,
      [category.id]
    );

    return result.affectedRows;
  }
}

module.exports = CategoryRepository;
