const express = require("express");

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

// Import projectSkill-related actions
const {
  browse,
  read,
  add,
  destroy,
} = require("../../../controllers/projectSkillActions");

// Route to get a list of projectSkills
router.get("/", browse);

// Route to get a specific projectSkill by ID
router.get("/:id", read);

// Route to add a new projectSkill
router.post("/", add);

router.delete("/:project_id/skill/:skill_id", destroy);

/* ************************************************************************* */

module.exports = router;
