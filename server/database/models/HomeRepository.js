const AbstractRepository = require("./AbstractRepository");

class HomePageRepository extends AbstractRepository {
  constructor() {
    // Call the constructor of the parent class (AbstractRepository)
    // and pass the table name "homePage" as configuration
    super({ table: "homepage" });
  }

  // The C of CRUD - Create operation

  async create(homePage) {
    // Execute the SQL INSERT query to add a new homePage to the "homePage" table
    const [result] = await this.database.query(
      `insert into ${this.table} (title, user_id) values (?, ?)`,
      [homePage.title, homePage.user_id]
    );

    // Return the ID of the newly inserted homePage
    return result.insertId;
  }

  // The Rs of CRUD - Read operations

  async read(id) {
    // Execute the SQL SELECT query to retrieve a specific homePage by its ID
    const [rows] = await this.database.query(
      `select * from ${this.table} where id = ?`,
      [id]
    );

    // Return the first row of the result, which represents the homePage
    return rows[0];
  }

  async readAll() {
    // Execute the SQL SELECT query to retrieve all homePages from the "homePage" table
    const [rows] = await this.database.query(`select * from ${this.table}`);

    // Return the array of homePages
    return rows;
  }

  // The U of CRUD - Update operation
  // TODO: Implement the update operation to modify an existing homePage

  // async update(homePage) {
  //   ...
  // }

  // The D of CRUD - Delete operation
  // TODO: Implement the delete operation to remove an homePage by its ID

  // async delete(id) {
  //   ...
  // }
}

module.exports = HomePageRepository;
