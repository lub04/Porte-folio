const tables = require("../../database/tables");

const read = async (req, res, next) => {
  try {
    const homePage = await tables.homePage.read(req.params.id);
    if (homePage == null) {
      res.sendStatus(404);
    } else {
      res.json(homePage);
    }
  } catch (err) {
    next(err);
  }
};

const edit = async (req, res, next) => {
  const { query } = req;
  const home = { ...req.body, id: req.params.id };
  if (req.file) {
    const url = `assets/images/avatar/${req.file.filename}`; // Créer l'URL de l'avatar
    home.img = url; // Ajouter l'URL de l'avatar à l'objet home
  }

  try {
    if (query.selector === "welcome") {
      await tables.homePage.updateWelcome(home);
      res.sendStatus(204);
    }
    if (query.selector === "presentation") {
      await tables.homePage.updatePresentation(home);
      res.sendStatus(204);
    }
    if (query.selector === "avatar") {
      await tables.homePage.updateAvatar(home);
      res.sendStatus(204);
    }
  } catch (err) {
    next(err);
  }
};

module.exports = {
  read,
  edit,
};
