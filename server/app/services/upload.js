const multer = require("multer");

// Configuration de Multer pour gérer le stockage des fichiers
const storage = multer.diskStorage({
  destination(req, file, cb) {
    if (file.fieldname === "image") {
      // Sauvegarde dans le dossier images si c'est une image
      cb(null, "public/assets/images");
    } else if (file.fieldname === "avatar") {
      cb(null, "public/assets/images/avatar");
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
  // Types de fichiers autorisés
  const allowedTypes = [
    "image/jpeg",
    "image/png",
    "image/gif",
    "image/webp",
    "image/svg+xml",
  ];

  // Vérifier le type MIME
  if (!allowedTypes.includes(file.mimetype)) {
    return cb(
      new Error("Le fichier doit être une image (JPEG, PNG, GIF, WebP, SVG)."),
      false
    );
  }

  // Si c'est une image, vérifier la taille
  if (file.size > 5 * 1024 * 1024) {
    return cb(new Error("Le fichier ne doit pas dépasser 5 Mo."), false);
  }

  // Sinon, accepter le fichier
  return cb(null, true);
};

// Configuration finale de Multer avec stockage et validation
const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // Taille maximale du fichier 5 Mo
});

module.exports = upload;
