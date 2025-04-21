const tables = require("../../database/tables");

const browse = async (req, res, next) => {
  try {
    const status = await tables.status.readAll();
    res.json(status);
  } catch (err) {
    next(err);
  }
};

const add = async (req, res, next) => {
  const status = req.body;
  try {
    const insertId = await tables.status.create(status);
    res.status(201).json({ insertId });
  } catch (err) {
    next(err);
  }
};

const destroy = async (req, res, next) => {
  try {
    await tables.status.delete({
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
