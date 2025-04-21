const AbstractRepository = require("./AbstractRepository");

class SkillRepository extends AbstractRepository {
  constructor() {
    super({ table: "skill" });
  }

  async create(skill) {
    const [result] = await this.database.query(
      `insert into ${this.table} (name, category_id, user_id) values (?, ?, 1)`,
      [skill.name, skill.category_id]
    );
    return result.insertId;
  }

  async readAll() {
    const [rows] = await this.database.query(`select * from ${this.table}`);
    return rows;
  }

  async delete(skill) {
    const [result] = await this.database.query(
      `delete from ${this.table} where id = ?`,
      [skill.id]
    );
    return result.affectedRows;
  }
}

module.exports = SkillRepository;
