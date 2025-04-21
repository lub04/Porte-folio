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
      `insert into ${this.table} (name, github_link, website_link, team, main_technologies, organization, description,  project_category_id, status_id) values (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        project.name,
        project.github_link,
        project.website_link,
        project.team,
        project.main_technologies,
        project.organization,
        project.description,
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
        st.status AS project_status,
        JSON_OBJECT(
          'logo', (SELECT url FROM picture WHERE project_id = p.id AND type = 'logo' LIMIT 1),
          'main', (SELECT url FROM picture WHERE project_id = p.id AND type = 'main' LIMIT 1),
          'screenshots', (SELECT JSON_ARRAYAGG( JSON_OBJECT(
              'id', picture.id,
              'url', picture.url
            )) FROM picture WHERE project_id = p.id AND type = 'screenshot')
        ) AS pictures,
        -- Retrieve all skills by category, using GROUP_CONCAT to join skills for each category
        GROUP_CONCAT(DISTINCT CASE
            WHEN s.category_id = 1 THEN CONCAT(s.name) END ORDER BY s.name) AS frontend_skills,
        GROUP_CONCAT(DISTINCT CASE
            WHEN s.category_id = 2 THEN CONCAT(s.name) END ORDER BY s.name) AS backend_skills,
        GROUP_CONCAT(DISTINCT CASE
            WHEN s.category_id = 3 THEN CONCAT(s.name) END ORDER BY s.name) AS discovered_skills,
        GROUP_CONCAT(DISTINCT CASE
            WHEN s.category_id = 4 THEN CONCAT(s.name) END ORDER BY s.name) AS tools_skills,
        GROUP_CONCAT(DISTINCT CASE
            WHEN s.category_id = 5 THEN CONCAT(s.name) END ORDER BY s.name) AS libraries_skills
      FROM
        project AS p
      INNER JOIN project_category AS pc ON p.project_category_id = pc.id
      LEFT JOIN status AS st ON p.status_id = st.id
      LEFT JOIN project_skill AS ps ON p.id = ps.project_id
      LEFT JOIN skill AS s ON ps.skill_id = s.id
      WHERE p.id = ?
      GROUP BY p.id`,
      [id]
    );

    // If the project exists, return the first row (the project data)
    if (rows.length > 0) {
      // Transform the concatenated skill strings into arrays
      const project = rows[0];
      project.categorized_skills = [
        {
          category: "Frontend",
          skills: project.frontend_skills
            ? project.frontend_skills.split(",")
            : [],
        },
        {
          category: "Backend",
          skills: project.backend_skills
            ? project.backend_skills.split(",")
            : [],
        },
        {
          category: "Découvertes",
          skills: project.discovered_skills
            ? project.discovered_skills.split(",")
            : [],
        },
        {
          category: "Outils",
          skills: project.tools_skills ? project.tools_skills.split(",") : [],
        },
        {
          category: "Librairies",
          skills: project.libraries_skills
            ? project.libraries_skills.split(",")
            : [],
        },
      ];

      // Clean up the result by removing unnecessary fields
      delete project.frontend_skills;
      delete project.backend_skills;
      delete project.discovered_skills;
      delete project.tools_skills;
      delete project.libraries_skills;

      return project;
    }

    // If no project found with that ID, return null
    return null;
  }

  async readAll() {
    // Execute the SQL SELECT query to retrieve all projects and their logos
    const [rows] = await this.database.query(`
      SELECT
        p.*,
        (SELECT url FROM picture WHERE project_id = p.id AND type = 'logo' LIMIT 1) AS logo
      FROM
        project AS p;
    `);

    // Return the array of projects with logos
    return rows;
  }

  // The U of CRUD - Update operation
  // TODO: Implement the update operation to modify an existing project

  async update(project) {
    const [result] = await this.database.query(
      `UPDATE ${this.table}
SET
  name = ?,
  github_link = ?,
  website_link = ?,
  team = ?,
  main_technologies = ?,
  organization = ?,
  description = ?,
  project_category_id = ?,
  status_id = ?,
  updated_at = CURRENT_TIMESTAMP
WHERE id = ?;
`,
      [
        project.name,
        project.github_link,
        project.website_link,
        project.team,
        project.main_technologies,
        project.organization,
        project.description,
        project.project_category_id,
        project.status_id,
        project.id,
      ]
    );
    return result.affectedRows;
  }

  // The D of CRUD - Delete operation
  // TODO: Implement the delete operation to remove an project by its ID

  async delete(id) {
    // Execute the SQL DELETE query to delete a specific user
    const [result] = await this.database.query(
      `delete from ${this.table} where id = ?`,
      [id]
    );

    // Return how many rows were affected
    return result.affectedRows;
  }
}

module.exports = ProjectRepository;
