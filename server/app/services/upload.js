const multer = require("multer");

const storage = multer.diskStorage({
  destination(req, file, cb) {
    if (file.fieldname === "image") {
      cb(null, "public/assets/images");
    } else {
      cb(null, "public/");
    }
  },
  filename(req, file, cb) {
    const fileArray = file.originalname.split(".");
    const extension = fileArray.pop();
    const id = Date.now();
    cb(null, `${fileArray.join("-")}-${id}.${extension}`);
  },
});

const upload = multer({ storage });

module.exports = upload;
