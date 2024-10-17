const AbstractRepository = require("./AbstractRepository");

class ProjectRepository extends AbstractRepository {
  constructor() {
    // Call the constructor of the parent class (AbstractRepository)
    // and pass the table name "project" as configuration
    super({ table: "project" });
  }

  // The C of CRUD - Create operation

  async create(project) {
    // Execute the SQL INSERT query to add a new project to the "project" table
    const [result] = await this.database.query(
      `insert into ${this.table} (title, user_id) values (?, ?)`,
      [project.title, project.user_id]
    );

    // Return the ID of the newly inserted project
    return result.insertId;
  }

  // The Rs of CRUD - Read operations

  async read(id) {
    // Execute the SQL SELECT query to retrieve a specific project by its ID
    const [rows] = await this.database.query(
      `select p.*, pc.category from ${this.table} as p inner join project_category as pc on p.project_category_id = pc.id where p.id = ?`,
      [id]
    );

    // Return the first row of the result, which represents the project
    return rows[0];
  }

  async readAll() {
    // Execute the SQL SELECT query to retrieve all projects from the "project" table
    const [rows] = await this.database.query(`select * from ${this.table}`);

    // Return the array of projects
    return rows;
  }

  // The U of CRUD - Update operation
  // TODO: Implement the update operation to modify an existing project

  // async update(project) {
  //   ...
  // }

  // The D of CRUD - Delete operation
  // TODO: Implement the delete operation to remove an project by its ID

  // async delete(id) {
  //   ...
  // }
}

module.exports = ProjectRepository;
