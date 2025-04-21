const AbstractRepository = require("./AbstractRepository");

class MessagesRepository extends AbstractRepository {
  constructor() {
    super({ table: "message" });
  }

  async create(message) {
    const [result] = await this.database.query(
      `insert into ${this.table} (user_last_name, user_first_name, user_email, message) values (?, ?, ?, ?)`,
      [
        message.user_last_name,
        message.user_first_name,
        message.user_email,
        message.message,
      ]
    );
    return result.insertId;
  }

  async readAll() {
    const [rows] = await this.database.query(`select * from ${this.table}`);

    return rows;
  }

  async updateMessageStatus(message) {
    const [result] = await this.database.query(
      `UPDATE ${this.table} SET is_read = ? WHERE id = ?`,
      [message.is_read, message.id]
    );
    return result.affectedRows;
  }

  async delete(id) {
    const [result] = await this.database.query(
      `delete from ${this.table} where id = ?`,
      [id]
    );
    return result.affectedRows;
  }
}

module.exports = MessagesRepository;
