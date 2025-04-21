const tables = require("../../database/tables");

const read = async (req, res, next) => {
  try {
    const user = await tables.user.read(req.params.id);
    if (user == null) {
      res.sendStatus(404);
    } else {
      res.json(user);
    }
  } catch (err) {
    next(err);
  }
};

const edit = async (req, res, next) => {
  const { query } = req;
  const user = { ...req.body, id: req.params.id };
  if (req.file) {
    const url = `assets/CV/${req.file.filename}`;
    user.resume = url;
  }

  try {
    if (query.selector === "user-informations") {
      await tables.user.updateUser(user);
      res.sendStatus(204);
    }
    if (query.selector === "user-resume") {
      await tables.user.updateCV(user);
      res.sendStatus(204);
    }
  } catch (err) {
    next(err);
  }
};

const add = async (req, res, next) => {
  const user = req.body;

  try {
    const insertId = await tables.user.create(user);
    res.status(201).json({ insertId });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  read,
  edit,
  add,
};
