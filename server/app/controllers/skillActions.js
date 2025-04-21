const tables = require("../../database/tables");

const browse = async (req, res, next) => {
  try {
    const skills = await tables.skill.readAll();

    res.json(skills);
  } catch (err) {
    next(err);
  }
};

const add = async (req, res, next) => {
  const skill = req.body;

  try {
    const insertId = await tables.skill.create(skill);

    res.status(201).json({ insertId });
  } catch (err) {
    next(err);
  }
};

const destroy = async (req, res, next) => {
  try {
    await tables.skill.delete({
      id: req.params.id,
    });

    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  browse,
  add,
  destroy,
};
