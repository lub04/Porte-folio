const AbstractRepository = require("./AbstractRepository");

class StatusRepository extends AbstractRepository {
  constructor() {
    // Call the constructor of the parent class (AbstractRepository)
    // and pass the table name "status" as configuration
    super({ table: "status" });
  }

  // The C of CRUD - Create operation

  async create(status) {
    // Execute the SQL INSERT query to add a new status to the "status" table
    const [result] = await this.database.query(
      `insert into ${this.table} (status) values (?)`,
      [status.status]
    );

    // Return the ID of the newly inserted status
    return result.insertId;
  }

  // The Rs of CRUD - Read operations

  async read(id) {
    // Execute the SQL SELECT query to retrieve a specific status by its ID
    const [rows] = await this.database.query(
      `select * from ${this.table} where id = ?`,
      [id]
    );

    // Return the first row of the result, which represents the status
    return rows[0];
  }

  async readAll() {
    // Execute the SQL SELECT query to retrieve all statuss from the "status" table
    const [rows] = await this.database.query(`select * from ${this.table}`);

    // Return the array of statuss
    return rows;
  }

  // The U of CRUD - Update operation
  // TODO: Implement the update operation to modify an existing status

  // async update(status) {
  //   ...
  // }

  // The D of CRUD - Delete operation
  // TODO: Implement the delete operation to remove an status by its ID

  // async delete(id) {
  //   ...
  // }
}

module.exports = StatusRepository;
