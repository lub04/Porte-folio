const AbstractRepository = require("./AbstractRepository");

class ProjectRepository extends AbstractRepository {
  constructor() {
    // Call the constructor of the parent class (AbstractRepository)
    // and pass the table name "project" as configuration
    super({ table: "project" });
  }

  // The C of CRUD - Create operation

  async create(project) {
    // Execute the SQL INSERT query to add a new project to the "project" table
    const [result] = await this.database.query(
      `insert into ${this.table} (name, github_link, website_link, team, main_technologies, organization, description, logo_img, img1, img2, img3, img4, project_category_id, status_id) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        project.name,
        project.github_link,
        project.website_link,
        project.team,
        project.main_technologies,
        project.organization,
        project.description,
        project.logo_img,
        project.img1,
        project.img2,
        project.img3,
        project.img4,
        project.project_category_id,
        project.status_id,
      ]
    );

    // Return the ID of the newly inserted project
    return result.insertId;
  }

  // The Rs of CRUD - Read operations

  async read(id) {
    // Execute the SQL SELECT query to retrieve a specific project by its ID, including picture and categorized skills
    const [rows] = await this.database.query(
      `SELECT 
        p.*, 
        pc.category AS project_category,
        GROUP_CONCAT(
          DISTINCT CONCAT(sc.category, ': ', GROUPED.skills_per_category) SEPARATOR ' | '
        ) AS categorized_skills,
        JSON_OBJECT(
          'logo', (SELECT url FROM picture WHERE project_id = p.id AND type = 'logo' LIMIT 1),
          'screenshots', (SELECT JSON_ARRAYAGG(url) FROM picture WHERE project_id = p.id AND type = 'screenshot')
        ) AS pictures
      FROM 
        project AS p
      INNER JOIN project_category AS pc ON p.project_category_id = pc.id
      INNER JOIN project_skill AS ps ON p.id = ps.project_id
      INNER JOIN skill AS s ON ps.skill_id = s.id
      INNER JOIN skill_category AS sc ON s.category_id = sc.id
      LEFT JOIN (
          SELECT
            ps.project_id,
            s.category_id,
            GROUP_CONCAT(DISTINCT s.name ORDER BY s.name SEPARATOR ', ') AS skills_per_category
          FROM
            project_skill AS ps
          INNER JOIN skill AS s ON ps.skill_id = s.id
          GROUP BY ps.project_id, s.category_id
      ) AS GROUPED ON GROUPED.project_id = p.id AND GROUPED.category_id = sc.id
      WHERE p.id = ?
      GROUP BY p.id`,
      [id]
    );

    // If the project exists, return the first row (the project data)
    if (rows.length > 0) {
      return rows[0];
    }
    // If no project found with that ID, return null
    return null;
  }

  async readAll() {
    // Execute the SQL SELECT query to retrieve all projects from the "project" table
    const [rows] = await this.database.query(`select * from ${this.table}`);

    // Return the array of projects
    return rows;
  }

  // The U of CRUD - Update operation
  // TODO: Implement the update operation to modify an existing project

  // async update(project) {
  //   ...
  // }

  // The D of CRUD - Delete operation
  // TODO: Implement the delete operation to remove an project by its ID

  // async delete(id) {
  //   ...
  // }
}

module.exports = ProjectRepository;
