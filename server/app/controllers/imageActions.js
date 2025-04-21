const tables = require("../../database/tables");

const browse = async (req, res, next) => {
  try {
    const pictures = await tables.picture.readAllByProject(req.query.project);

    res.json(pictures);
  } catch (err) {
    next(err);
  }
};

const edit = async (req, res, next) => {
  const { query } = req;
  const picture = {
    url: `assets/images/${req.file.filename}`,
    project_id: req.params.id,
  };

  try {
    if (query.type === "logo") {
      await tables.picture.updateLogo(picture);
      res.sendStatus(204);
    }
    if (query.type === "main") {
      await tables.picture.updateMainPicture(picture);
      res.sendStatus(204);
    }
  } catch (err) {
    next(err);
  }
};

const add = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "Aucun fichier envoyé." });
    }

    const pictureUrl = `assets/images/${req.file.filename}`;

    const result = await tables.picture.create({
      project_id: req.body.project_id,
      url: pictureUrl,
      type: req.body.type,
    });

    return res.status(201).json({ insertId: result.insertId, url: pictureUrl });
  } catch (err) {
    console.error("Erreur dans l'ajout de l'image :", err);
    return next(err); // Passer l'erreur au middleware pour qu'elle soit gérée
  }
};

const destroy = async (req, res, next) => {
  try {
    await tables.picture.delete(req.params.id);
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
