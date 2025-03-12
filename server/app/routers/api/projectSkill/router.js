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
const validateSkill = require("../../../services/validateProjectSkill");
const { checkUser } = require("../../../services/verification/cookies");

// Route to get a list of projectSkills
router.get("/", checkUser, browse);

// Route to get a specific projectSkill by ID
router.get("/:id", checkUser, read);

// Route to add a new projectSkill
router.post("/", validateSkill, checkUser, add);

router.delete("/:project_id/skill/:skill_id", checkUser, destroy);

/* ************************************************************************* */

module.exports = router;
