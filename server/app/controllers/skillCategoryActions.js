const tables = require("../../database/tables");

const browse = async (req, res, next) => {
  try {
    const skillCategorys = await tables.skill_category.readAll();
    res.json(skillCategorys);
  } catch (err) {
    next(err);
  }
};

const add = async (req, res, next) => {
  const skillCategory = req.body;

  try {
    const insertId = await tables.skill_category.create(skillCategory);
    res.status(201).json({ insertId });
  } catch (err) {
    next(err);
  }
};

const destroy = async (req, res, next) => {
  try {
    await tables.skill_category.delete({
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
