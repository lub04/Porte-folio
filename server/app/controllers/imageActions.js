// Import access to database tables
const tables = require("../../database/tables");

// The B of BREAD - Browse (Read All) operation
const browse = async (req, res, next) => {
  try {
    // Fetch all pictures from the database
    const pictures = await tables.picture.readAll();

    // Respond with the pictures in JSON format
    res.json(pictures);
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// The R of BREAD - Read operation
const read = async (req, res, next) => {
  try {
    // Fetch a specific picture from the database based on the provided ID
    const picture = await tables.picture.read(req.params.id);

    // If the picture is not found, respond with HTTP 404 (Not Found)
    // Otherwise, respond with the picture in JSON format
    if (picture == null) {
      res.sendStatus(404);
    } else {
      res.json(picture);
    }
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// The E of BREAD - Edit (Update) operation
// This operation is not yet implemented

// The A of BREAD - Add (Create) operation
const add = async (req, res, next) => {
  try {
    // Vérification de la présence du fichier
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

// The D of BREAD - Destroy (Delete) operation
// This operation is not yet implemented

// Ready to export the controller functions
module.exports = {
  browse,
  read,
  // edit,
  add,
  // destroy,
};
