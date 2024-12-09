const AbstractRepository = require("./AbstractRepository");

class MessagesRepository extends AbstractRepository {
  constructor() {
    // Call the constructor of the parent class (AbstractRepository)
    // and pass the table name "message" as configuration
    super({ table: "message" });
  }

  // The C of CRUD - Create operation

  async create(message) {
    // Execute the SQL INSERT query to add a new message to the "message" table
    const [result] = await this.database.query(
      `insert into ${this.table} (user_last_name, user_first_name, user_email, message) values (?, ?, ?, ?)`,
      [
        message.user_last_name,
        message.user_first_name,
        message.user_email,
        message.message,
      ]
    );

    // Return the ID of the newly inserted message
    return result.insertId;
  }

  // The Rs of CRUD - Read operations

  async read(id) {
    // Execute the SQL SELECT query to retrieve a specific message by its ID
    const [rows] = await this.database.query(
      `select * from ${this.table} where id = ?`,
      [id]
    );

    // Return the first row of the result, which represents the message
    return rows[0];
  }

  async readAll() {
    // Execute the SQL SELECT query to retrieve all messages from the "message" table
    const [rows] = await this.database.query(`select * from ${this.table}`);

    // Return the array of messages
    return rows;
  }

  // The U of CRUD - Update operation
  // TODO: Implement the update operation to modify an existing message

  // async update(message) {
  //   ...
  // }

  // The D of CRUD - Delete operation
  // TODO: Implement the delete operation to remove an message by its ID

  // async delete(id) {
  //   ...
  // }
}

module.exports = MessagesRepository;
