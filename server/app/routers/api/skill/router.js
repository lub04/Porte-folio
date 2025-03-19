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
const { checkUser } = require("../../../services/verification/cookies");

// Route to get a list of skills
router.get("/", checkUser, browse);

// Route to get a specific skill by ID
router.get("/:id", read);

// Route to add a new skill
router.post("/", checkUser, add);

// Route to delete a skill
router.delete("/:id", checkUser, destroy);
/* ************************************************************************* */

module.exports = router;
