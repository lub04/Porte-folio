// Import access to database tables
const tables = require("../../database/tables");

// The B of BREAD - Browse (Read All) operation
const browse = async (req, res, next) => {
  try {
    const categorys = await tables.category.readAll();
    res.json(categorys);
  } catch (err) {
    next(err);
  }
};

const add = async (req, res, next) => {
  const category = req.body;

  try {
    const insertId = await tables.category.create(category);

    res.status(201).json({ insertId });
  } catch (err) {
    next(err);
  }
};

const destroy = async (req, res, next) => {
  try {
    await tables.category.delete({
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
