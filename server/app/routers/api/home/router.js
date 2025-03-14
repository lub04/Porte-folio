const express = require("express");

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

// Import homePage-related actions
const { read, edit } = require("../../../controllers/homePageActions");
const upload = require("../../../services/upload");

const uploadIfFile = (req, res, next) => {
  // On vérifie que le selector est "avatar" et qu'un fichier est envoyé
  if (req.body.selector === "avatar" && req.file) {
    return next(); // Si la condition est remplie, on passe au middleware multer
  }
  // Si la condition n'est pas remplie, on passe directement au contrôleur sans multer
  return next();
};

// Route to get a specific homePage by ID
router.get("/:id", read);

router.put("/:id", uploadIfFile, upload.single("avatar"), edit);
/* ************************************************************************* */

module.exports = router;
