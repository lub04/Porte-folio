const AbstractRepository = require("./AbstractRepository");

class ProjectSkillRepository extends AbstractRepository {
  constructor() {
    // Call the constructor of the parent class (AbstractRepository)
    // and pass the table name "projectSkill" as configuration
    super({ table: "project_skill" });
  }

  // The C of CRUD - Create operation

  async create(projectSkill) {
    // Execute the SQL INSERT query to add a new projectSkill to the "projectSkill" table
    const [result] = await this.database.query(
      `insert into ${this.table} (title, user_id) values (?, ?)`,
      [projectSkill.title, projectSkill.user_id]
    );

    // Return the ID of the newly inserted projectSkill
    return result.insertId;
  }

  // The Rs of CRUD - Read operations

  async read(id) {
    // Execute the SQL SELECT query to retrieve a specific projectSkill by its ID
    const [rows] = await this.database.query(
      `select * from ${this.table} where id = ?`,
      [id]
    );

    // Return the first row of the result, which represents the projectSkill
    return rows[0];
  }

  async readAll() {
    // Execute the SQL SELECT query to retrieve all projectSkills from the "projectSkill" table
    const [rows] = await this.database.query(`select * from ${this.table}`);

    // Return the array of projectSkills
    return rows;
  }

  // The U of CRUD - Update operation
  // TODO: Implement the update operation to modify an existing projectSkill

  // async update(projectSkill) {
  //   ...
  // }

  // The D of CRUD - Delete operation
  // TODO: Implement the delete operation to remove an projectSkill by its ID

  async delete(projectSkill) {
    // Execute the SQL DELETE query to delete a specific user
    const [result] = await this.database.query(
      `delete from ${this.table} where project_id = ? AND skill_id = ?`,
      [projectSkill.project_id, projectSkill.skill_id]
    );

    // Return how many rows were affected
    return result.affectedRows;
  }
}

module.exports = ProjectSkillRepository;
