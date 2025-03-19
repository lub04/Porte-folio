const express = require("express");

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

// Import skill-related actions
const {
  browse,
  read,
  add,
  destroy,
} = require("../../../controllers/skillActions");

// Route to get a list of skills
router.get("/", browse);

// Route to get a specific skill by ID
router.get("/:id", read);

// Route to add a new skill
router.post("/", add);

// Route to delete a skill
router.delete("/:id", destroy);
/* ************************************************************************* */

module.exports = router;
