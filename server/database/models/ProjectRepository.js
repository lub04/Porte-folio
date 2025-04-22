const AbstractRepository = require("./AbstractRepository");

class ProjectRepository extends AbstractRepository {
  constructor() {
    super({ table: "project" });
  }

  async create(project) {
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
    return result.insertId;
  }

  async read(id) {
    const [[project]] = await this.database.query(
      `SELECT
        p.*,
        pc.category AS project_category,
        st.status AS project_status,
        JSON_OBJECT(
          'logo', (SELECT url FROM picture WHERE project_id = p.id AND type = 'logo' LIMIT 1),
          'main', (SELECT url FROM picture WHERE project_id = p.id AND type = 'main' LIMIT 1),
          'screenshots', (SELECT JSON_ARRAYAGG(JSON_OBJECT(
              'id', pic.id,
              'url', pic.url
            )) FROM picture pic WHERE project_id = p.id AND type = 'screenshot')
        ) AS pictures
      FROM
        project AS p
      INNER JOIN project_category pc ON p.project_category_id = pc.id
      LEFT JOIN status st ON p.status_id = st.id
      WHERE p.id = ?
      `,
      [id]
    );

    if (!project) return null;

    // Récupère aussi les skills
    const [skills] = await this.database.query(
      `SELECT
        s.id AS skill_id,
        s.name AS skill_name,
        c.category AS category_name
      FROM
        project_skill ps
      INNER JOIN skill s ON ps.skill_id = s.id
      INNER JOIN skill_category c ON s.category_id = c.id
      WHERE
        ps.project_id = ?
      ORDER BY 
      CASE 
        WHEN c.category = 'Frontend' THEN 0
        WHEN c.category = 'Backend' THEN 0
        WHEN c.category = 'Découvertes' THEN 2
        ELSE 1
    END,
    c.category, s.name`,
      [id]
    );

    // Regrouper par catégorie
    const categorizedSkills = skills.reduce((acc, skill) => {
      if (!acc[skill.category_name]) {
        acc[skill.category_name] = [];
      }
      acc[skill.category_name].push({
        id: skill.skill_id,
        name: skill.skill_name,
      });
      return acc;
    }, {});

    // Convertir en tableau [{ category, skills }]
    project.categorizedSkills = Object.entries(categorizedSkills).map(
      ([category, skillsList]) => ({
        category,
        skillsList,
      })
    );

    return project;
  }

  async readAll() {
    const [rows] = await this.database.query(`
      SELECT
  p.*,
  (SELECT url FROM picture WHERE project_id = p.id AND type = 'logo' LIMIT 1) AS logo,
  (SELECT JSON_ARRAYAGG(JSON_OBJECT('id', pic.id, 'url', pic.url, 'type', pic.type))
  FROM picture AS pic WHERE pic.project_id = p.id) AS pictures
FROM
  project AS p;
    `);
    return rows;
  }

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

  async delete(id) {
    const [result] = await this.database.query(
      `delete from ${this.table} where id = ?`,
      [id]
    );
    return result.affectedRows;
  }
}

module.exports = ProjectRepository;
