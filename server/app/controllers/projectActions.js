const tables = require("../../database/tables");

const browse = async (req, res, next) => {
  try {
    const projects = await tables.project.readAll();
    res.json(projects);
  } catch (err) {
    next(err);
  }
};

const read = async (req, res, next) => {
  try {
    const project = await tables.project.read(req.params.id);

    if (project == null) {
      res.sendStatus(404);
    } else {
      res.json(project);
    }
  } catch (err) {
    next(err);
  }
};

const edit = async (req, res, next) => {
  const project = { ...req.body, id: req.params.id };
  try {
    await tables.project.update(project);
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
};

const add = async (req, res, next) => {
  const project = req.body;

  try {
    const insertId = await tables.project.create(project);

    res.status(201).json({ insertId });
  } catch (err) {
    next(err);
  }
};
const destroy = async (req, res, next) => {
  try {
    await tables.project.delete(req.params.id);

    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  browse,
  read,
  edit,
  add,
  destroy,
};
