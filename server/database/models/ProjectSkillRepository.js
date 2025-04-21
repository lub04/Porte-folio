const AbstractRepository = require("./AbstractRepository");

class ProjectSkillRepository extends AbstractRepository {
  constructor() {
    super({ table: "project_skill" });
  }

  async create(projectSkill) {
    const [result] = await this.database.query(
      `insert into ${this.table} (project_id, skill_id) values (?, ?)`,
      [projectSkill.project_id, projectSkill.skill_id]
    );

    return result.insertId;
  }

  async read(id) {
    const [rows] = await this.database.query(
      `SELECT s.id AS skill_id, s.name AS skill_name, sc.category
FROM project_skill ps
JOIN skill s ON ps.skill_id = s.id
JOIN skill_category sc ON s.category_id = sc.id
WHERE ps.project_id = ?
ORDER BY sc.category`,
      [id]
    );
    return rows;
  }

  async delete(projectSkill) {
    const [result] = await this.database.query(
      `delete from ${this.table} where project_id = ? AND skill_id = ?`,
      [projectSkill.project_id, projectSkill.skill_id]
    );
    return result.affectedRows;
  }
}

module.exports = ProjectSkillRepository;
