const express = require("express");

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

// Import category-related actions
const {
  browse,
  read,
  add,
  destroy,
} = require("../../../controllers/categoryActions");
const { checkUser } = require("../../../services/verification/cookies");

// Route to get a list of categorys
router.get("/", checkUser, browse);

// Route to get a specific category by ID
router.get("/:id", checkUser, read);

// Route to add a new category
router.post("/", checkUser, add);

// Route to delete a category
router.delete("/:id", destroy);
/* ************************************************************************* */

module.exports = router;
