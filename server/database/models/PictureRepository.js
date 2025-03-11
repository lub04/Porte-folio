const AbstractRepository = require("./AbstractRepository");

class PictureRepository extends AbstractRepository {
  constructor() {
    // Call the constructor of the parent class (AbstractRepository)
    // and pass the table name "picture" as configuration
    super({ table: "picture" });
  }

  // The C of CRUD - Create operation

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

  async readAllByProject(project) {
    // Execute the SQL SELECT query to retrieve all pictures from the "picture" table
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

  // The U of CRUD - Update operation
  // TODO: Implement the update operation to modify an existing picture

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

  // The D of CRUD - Delete operation
  // TODO: Implement the delete operation to remove an picture by its ID

  // async delete(id) {
  //   ...
  // }
}

module.exports = PictureRepository;
