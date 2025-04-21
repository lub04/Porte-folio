const tables = require("../../database/tables");

const browse = async (req, res, next) => {
  try {
    const messages = await tables.message.readAll();
    res.json(messages);
  } catch (err) {
    next(err);
  }
};

const add = async (req, res, next) => {
  const message = req.body;

  try {
    const insertId = await tables.message.create(message);

    res.status(201).json({ insertId });
  } catch (err) {
    next(err);
  }
};

const edit = async (req, res, next) => {
  const message = { ...req.body, id: req.params.id };

  try {
    await tables.message.updateMessageStatus(message);
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
};

const destroy = async (req, res, next) => {
  try {
    await tables.message.delete(req.params.id);

    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  browse,
  edit,
  add,
  destroy,
};
