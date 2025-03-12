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
const { checkUser } = require("../../../services/verification/cookies");

// Route to get a list of images
router.get("/", checkUser, browse);

// Route to get a specific image by ID
router.get("/:id", checkUser, read);

// Route to add a new image
router.post("/", upload.single("image"), checkUser, add);

router.put("/:id", upload.single("image"), checkUser, edit);

router.delete("/:id", checkUser, destroy);
/* ************************************************************************* */

module.exports = router;
