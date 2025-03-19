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
} = require("../../../controllers/skillCategoryActions");

// Route to get a list of skillCategories
router.get("/", browse);

// Route to get a specific skillCategory by ID
router.get("/:id", read);

// Route to add a new skillCategory
router.post("/", add);

/* ************************************************************************* */

module.exports = router;
