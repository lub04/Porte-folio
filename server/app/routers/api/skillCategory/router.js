const express = require("express");

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

// Import skillCategory-related actions
const {
  browse,
  read,
  add,
  destroy,
} = require("../../../controllers/skillCategoryActions");

// Route to get a list of skillCategories
router.get("/", browse);

// Route to get a specific skillCategory by ID
router.get("/:id", read);

// Route to add a new skillCategory
router.post("/", add);

// Route to delete a skillCategory
router.delete("/:id", destroy);

/* ************************************************************************* */

module.exports = router;
