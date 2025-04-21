const tables = require("../../database/tables");

const read = async (req, res, next) => {
  try {
    const projectSkill = await tables.project_skill.read(req.params.id);

    if (projectSkill == null) {
      res.sendStatus(404);
    } else {
      res.json(projectSkill);
    }
  } catch (err) {
    next(err);
  }
};

const add = async (req, res, next) => {
  const projectSkill = req.body;

  try {
    const insertId = await tables.project_skill.create(projectSkill);

    res.status(201).json({ insertId });
  } catch (err) {
    next(err);
  }
};
const destroy = async (req, res, next) => {
  try {
    await tables.project_skill.delete({
      project_id: req.params.project_id,
      skill_id: req.params.skill_id,
    });

    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  read,
  add,
  destroy,
};
