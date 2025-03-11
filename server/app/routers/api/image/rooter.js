const express = require("express");

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

// Import image-related actions
const {
  browse,
  read,
  add,
  edit,
  destroy,
} = require("../../../controllers/imageActions");
const upload = require("../../../services/upload");

// Route to get a list of images
router.get("/", browse);

// Route to get a specific image by ID
router.get("/:id", read);

// Route to add a new image
router.post("/", upload.single("image"), add);

router.put("/:id", upload.single("image"), edit);

router.delete("/:id", destroy);
/* ************************************************************************* */

module.exports = router;
