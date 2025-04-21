const AbstractRepository = require("./AbstractRepository");

class HomePageRepository extends AbstractRepository {
  constructor() {
    super({ table: "homepage" });
  }

  async read(id) {
    const [rows] = await this.database.query(
      `select * from ${this.table} where id = ?`,
      [id]
    );
    return rows[0];
  }

  async updatePresentation(homepage) {
    const [result] = await this.database.query(
      `UPDATE ${this.table} SET presentation = ? WHERE id = ?`,
      [homepage.presentation, homepage.id]
    );
    return result.affectedRows;
  }

  async updateAvatar(homepage) {
    const [result] = await this.database.query(
      `UPDATE ${this.table} SET img = ? WHERE id = ?`,
      [homepage.img, homepage.id]
    );
    return result.affectedRows;
  }
}

module.exports = HomePageRepository;
