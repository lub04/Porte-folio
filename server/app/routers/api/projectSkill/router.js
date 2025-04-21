const express = require("express");

const router = express.Router();

const {
  read,
  add,
  destroy,
} = require("../../../controllers/projectSkillActions");
const validateSkill = require("../../../services/validateProjectSkill");
const { checkUser } = require("../../../services/verification/cookies");

router.get("/:id", checkUser, read);

router.post("/", validateSkill, checkUser, add);

router.delete("/:project_id/skill/:skill_id", checkUser, destroy);

module.exports = router;
