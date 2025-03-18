const AbstractRepository = require("./AbstractRepository");

class QuoteRepository extends AbstractRepository {
  constructor() {
    // Call the constructor of the parent class (AbstractRepository)
    // and pass the table name "quote" as configuration
    super({ table: "quote" });
  }

  // The C of CRUD - Create operation

  async create(quote) {
    // Execute the SQL INSERT query to add a new quote to the "quote" table
    const [result] = await this.database.query(
      `insert into ${this.table} (quote, author) values (?, ?)`,
      [quote.quote, quote.author]
    );

    // Return the ID of the newly inserted quote
    return result.insertId;
  }

  // The Rs of CRUD - Read operations

  async read(id) {
    // Execute the SQL SELECT query to retrieve a specific quote by its ID
    const [rows] = await this.database.query(
      `select * from ${this.table} where id = ?`,
      [id]
    );

    // Return the first row of the result, which represents the quote
    return rows[0];
  }

  async readAllRandLimit() {
    // Execute the SQL SELECT query to retrieve all quotes from the "quote" table
    const [rows] = await this.database.query(
      `select * from ${this.table} order by rand() limit 1`
    );

    // Return the array of quotes
    return rows;
  }

  async readAll() {
    // Execute the SQL SELECT query to retrieve all quotes from the "quote" table
    const [rows] = await this.database.query(`select * from ${this.table}`);

    // Return the array of quotes
    return rows;
  }

  // The U of CRUD - Update operation
  // TODO: Implement the update operation to modify an existing quote

  // async update(quote) {
  //   ...
  // }

  // The D of CRUD - Delete operation
  // TODO: Implement the delete operation to remove an quote by its ID

  // async delete(id) {
  //   ...
  // }
}

module.exports = QuoteRepository;
