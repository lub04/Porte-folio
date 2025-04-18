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

  // The D of CRUD - Delete operation
  // TODO: Implement the delete operation to remove an homePage by its ID

  // async delete(id) {
  //   ...
  // }
}

module.exports = HomePageRepository;
