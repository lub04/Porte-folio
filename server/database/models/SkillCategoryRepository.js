const AbstractRepository = require("./AbstractRepository");

class SkillCategoryRepository extends AbstractRepository {
  constructor() {
    super({ table: "skill_category" });
  }

  async create(skillCategory) {
    const [result] = await this.database.query(
      `insert into ${this.table} (category) values (?)`,
      [skillCategory.category]
    );

    return result.insertId;
  }

  async readAll() {
    const [rows] = await this.database.query(`select * from ${this.table}`);

    return rows;
  }

  async delete(skillCategory) {
    const [result] = await this.database.query(
      `delete from ${this.table} where id = ?`,
      [skillCategory.id]
    );
    return result.affectedRows;
  }
}

module.exports = SkillCategoryRepository;
