const AbstractRepository = require("./AbstractRepository");

class SkillRepository extends AbstractRepository {
  constructor() {
    // Call the constructor of the parent class (AbstractRepository)
    // and pass the table name "skill" as configuration
    super({ table: "skill" });
  }

  // The C of CRUD - Create operation

  async create(skill) {
    // Execute the SQL INSERT query to add a new skill to the "skill" table
    const [result] = await this.database.query(
      `insert into ${this.table} (name, category_id, user_id) values (?, ?, 1)`,
      [skill.name, skill.category_id]
    );

    // Return the ID of the newly inserted skill
    return result.insertId;
  }

  // The Rs of CRUD - Read operations

  async read(id) {
    // Execute the SQL SELECT query to retrieve a specific skill by its ID
    const [rows] = await this.database.query(
      `select * from ${this.table} where id = ?`,
      [id]
    );

    // Return the first row of the result, which represents the skill
    return rows[0];
  }

  async readAll() {
    // Execute the SQL SELECT query to retrieve all skills from the "skill" table
    const [rows] = await this.database.query(`select * from ${this.table}`);

    // Return the array of skills
    return rows;
  }

  // The U of CRUD - Update operation
  // TODO: Implement the update operation to modify an existing skill

  // async update(skill) {
  //   ...
  // }

  // The D of CRUD - Delete operation
  // TODO: Implement the delete operation to remove an skill by its ID

  // async delete(id) {
  //   ...
  // }
}

module.exports = SkillRepository;
