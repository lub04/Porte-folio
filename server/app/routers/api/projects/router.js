const express = require("express");

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

// Import project-related actions
const {
  browse,
  read,
  add,
  destroy,
  edit,
} = require("../../../controllers/projectActions");
const validateProject = require("../../../services/validateProject");

// Route to get a list of projects
router.get("/", browse);

// Route to get a specific project by ID
router.get("/:id", read);

// Route to add a new project
router.post("/", validateProject, add);

router.delete("/:id", destroy);

router.put("/:id", validateProject, edit);
/* ************************************************************************* */

module.exports = router;
