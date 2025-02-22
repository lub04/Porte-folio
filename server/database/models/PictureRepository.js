const AbstractRepository = require("./AbstractRepository");

class PictureRepository extends AbstractRepository {
  constructor() {
    // Call the constructor of the parent class (AbstractRepository)
    // and pass the table name "picture" as configuration
    super({ table: "picture" });
  }

  // The C of CRUD - Create operation

  async create(picture) {
    // Execute the SQL INSERT query to add a new picture to the "picture" table
    const [result] = await this.database.query(
      `INSERT INTO ${this.table} (project_id, url, type) VALUES ((SELECT id FROM project WHERE name = ?), ?, ?)`,
      [picture.project_name, picture.url, picture.type]
    );

    // Return the ID of the newly inserted picture
    return result.insertId;
  }

  // The Rs of CRUD - Read operations

  async read(id) {
    // Execute the SQL SELECT query to retrieve a specific picture by its ID
    const [rows] = await this.database.query(
      `select * from ${this.table} where id = ?`,
      [id]
    );

    // Return the first row of the result, which represents the picture
    return rows[0];
  }

  async readAll() {
    // Execute the SQL SELECT query to retrieve all pictures from the "picture" table
    const [rows] = await this.database.query(`select * from ${this.table}`);

    // Return the array of pictures
    return rows;
  }

  // The U of CRUD - Update operation
  // TODO: Implement the update operation to modify an existing picture

  // async update(picture) {
  //   ...
  // }

  // The D of CRUD - Delete operation
  // TODO: Implement the delete operation to remove an picture by its ID

  // async delete(id) {
  //   ...
  // }
}

module.exports = PictureRepository;
