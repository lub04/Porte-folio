const AbstractRepository = require("./AbstractRepository");

class SkillCategoryRepository extends AbstractRepository {
  constructor() {
    // Call the constructor of the parent class (AbstractRepository)
    // and pass the table name "SkillCategory" as configuration
    super({ table: "skill_category" });
  }

  // The C of CRUD - Create operation

  async create(skillCategory) {
    // Execute the SQL INSERT query to add a new skillCategory to the "skillCategory" table
    const [result] = await this.database.query(
      `insert into ${this.table} (category) values (?)`,
      [skillCategory.category]
    );

    // Return the ID of the newly inserted skillCategory
    return result.insertId;
  }

  // The Rs of CRUD - Read operations

  async read(id) {
    // Execute the SQL SELECT query to retrieve a specific skillCategory by its ID
    const [rows] = await this.database.query(
      `select * from ${this.table} where id = ?`,
      [id]
    );

    // Return the first row of the result, which represents the skillCategory
    return rows[0];
  }

  async readAll() {
    // Execute the SQL SELECT query to retrieve all skillCategorys from the "skillCategory" table
    const [rows] = await this.database.query(`select * from ${this.table}`);

    // Return the array of skillCategorys
    return rows;
  }

  // The U of CRUD - Update operation
  // TODO: Implement the update operation to modify an existing skillCategory

  // async update(skillCategory) {
  //   ...
  // }

  // The D of CRUD - Delete operation
  // TODO: Implement the delete operation to remove an skillCategory by its ID

  // async delete(id) {
  //   ...
  // }
}

module.exports = SkillCategoryRepository;
