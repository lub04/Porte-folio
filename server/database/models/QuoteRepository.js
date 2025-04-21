const AbstractRepository = require("./AbstractRepository");

class QuoteRepository extends AbstractRepository {
  constructor() {
    super({ table: "quote" });
  }

  async create(quote) {
    const [result] = await this.database.query(
      `insert into ${this.table} (quote, author) values (?, ?)`,
      [quote.quote, quote.author]
    );

    return result.insertId;
  }

  async readAllRandLimit() {
    const [rows] = await this.database.query(
      `select * from ${this.table} order by rand() limit 1`
    );
    return rows;
  }

  async readAll() {
    const [rows] = await this.database.query(`select * from ${this.table}`);
    return rows;
  }

  async delete(quote) {
    const [result] = await this.database.query(
      `delete from ${this.table} where id = ?`,
      [quote.id]
    );
    return result.affectedRows;
  }
}

module.exports = QuoteRepository;
