const multer = require("multer");

// Configuration de Multer pour gérer le stockage des fichiers
const storage = multer.diskStorage({
  destination(req, file, cb) {
    if (file.fieldname === "image") {
      // Sauvegarde dans le dossier images si c'est une image
      cb(null, "public/assets/images");
    } else if (file.fieldname === "avatar") {
      cb(null, "public/assets/images/avatar");
    } else if (file.fieldname === "CV") {
      cb(null, "public/assets/CV");
    } else {
      // Sauvegarde dans le dossier public pour d'autres fichiers
      cb(null, "public/");
    }
  },
  filename(req, file, cb) {
    // Création du nom du fichier basé sur l'original avec un ID unique
    const fileArray = file.originalname.split(".");
    const extension = fileArray.pop();
    const id = Date.now();
    cb(null, `${fileArray.join("-")}-${id}.${extension}`);
  },
});

// Validation du fichier (type et taille)
const fileFilter = (req, file, cb) => {
  let allowedTypes = [];
  // Types de fichiers autorisés
  if (file.fieldname === "image" || file.fieldname === "avatar") {
    allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/gif",
      "image/webp",
      "image/svg+xml",
    ];
  }
  if (file.fieldname === "CV") {
    allowedTypes = ["application/pdf"];
  }
  if (!allowedTypes.includes(file.mimetype)) {
    return cb(new Error("Format de fichier non supporté !"), false);
  }
  // Vérifier le type MIME

  return cb(null, true);
};

// Configuration finale de Multer avec stockage et validation
const upload = multer({
  storage,
  fileFilter,
});

module.exports = upload;
