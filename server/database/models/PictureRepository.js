const AbstractRepository = require("./AbstractRepository");

class PictureRepository extends AbstractRepository {
  constructor() {
    super({ table: "picture" });
  }

  async create(picture) {
    try {
      const [result] = await this.database.query(
        `INSERT INTO ${this.table} (project_id, url, type) VALUES (?, ?, ?)`,
        [picture.project_id, picture.url, picture.type]
      );
      return result;
    } catch (err) {
      console.error("Erreur dans la création de l'image :", err);
      throw err;
    }
  }

  async readAllByProject(project) {
    const [rows] = await this.database.query(
      `select * from ${this.table} where project_id = ?`,
      [project]
    );

    const formattedData = {
      screenshots: [],
      others: [],
    };

    rows.forEach((item) => {
      if (item.type === "screenshot") {
        formattedData.screenshots.push(item);
      } else {
        formattedData.others.push(item);
      }
    });

    return {
      ...Object.fromEntries(formattedData.others.map((obj) => [obj.type, obj])),
      screenshots: formattedData.screenshots,
    };
  }

  async updateLogo(picture) {
    const [result] = await this.database.query(
      `UPDATE ${this.table} SET url= ? WHERE project_id = ? and type = "logo" `,
      [picture.url, picture.project_id]
    );
    return result.affectedRows;
  }

  async updateMainPicture(picture) {
    const [result] = await this.database.query(
      `UPDATE ${this.table} SET url= ? WHERE project_id = ? and type = "main" `,
      [picture.url, picture.project_id]
    );
    return result.affectedRows;
  }

  async delete(picture) {
    const [result] = await this.database.query(
      `delete from ${this.table} where id = ?`,
      [picture]
    );
    return result.affectedRows;
  }
}

module.exports = PictureRepository;
