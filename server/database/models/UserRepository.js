const AbstractRepository = require("./AbstractRepository");

class UserRepository extends AbstractRepository {
  constructor() {
    super({ table: "user" });
  }

  async create(user) {
    const [result] = await this.database.query(
      `insert into ${this.table} (title, user_id) values (?, ?)`,
      [user.title, user.user_id]
    );
    return result.insertId;
  }

  async read(id) {
    const [rows] = await this.database.query(
      `select id, avatar, last_name, first_name, phone, email, github, linkedin, description, resume from ${this.table} where id = ?`,
      [id]
    );
    return rows[0];
  }

  async readByEmail(email) {
    const [rows] = await this.database.query(
      `select * from ${this.table} where email = ?`,
      [email]
    );
    return rows;
  }

  async updateUser(user) {
    const [result] = await this.database.query(
      `UPDATE ${this.table} SET
  phone = ?,
  email = ?,
  github = ?,
  linkedin = ?,
  last_name = ?,
  first_name = ?,
  description = ?
  WHERE id = ?`,
      [
        user.phone,
        user.email,
        user.github,
        user.linkedin,
        user.last_name,
        user.first_name,
        user.description,
        user.id,
      ]
    );
    return result.affectedRows;
  }

  async updateCV(user) {
    const [result] = await this.database.query(
      `UPDATE ${this.table} SET
  resume = ?`,
      [user.resume]
    );
    return result.affectedRows;
  }
}

module.exports = UserRepository;
