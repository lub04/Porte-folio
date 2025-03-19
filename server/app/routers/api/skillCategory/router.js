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
const { checkUser } = require("../../../services/verification/cookies");

// Route to get a list of skillCategories
router.get("/", checkUser, browse);

// Route to get a specific skillCategory by ID
router.get("/:id", read);

// Route to add a new skillCategory
router.post("/", checkUser, add);

// Route to delete a skillCategory
router.delete("/:id", checkUser, destroy);

/* ************************************************************************* */

module.exports = router;
